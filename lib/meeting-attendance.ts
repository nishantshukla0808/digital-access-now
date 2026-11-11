// Meeting attendance — pure logic, no imports, no I/O, no framework code.
// Used both in the browser (CSV preview + column mapping) and on the
// server (recomputing flags at import, so client-computed flags are
// never trusted). Safe to import from server actions and client
// components alike.
//
// TIMEZONE RULE (read this before changing anything): DAN meetings are
// scheduled in IST (Asia/Kolkata, the team's working timezone, no DST).
// Extension CSVs are exported in the exporter's local time, which for
// DAN is IST. Naive datetimes (no Z, no offset) are therefore treated
// as IST wall time and converted to UTC. Absolute timestamps (with Z
// or an explicit ±HH:MM offset) are used as-is. All comparisons are
// done on UTC instants, so the flags are timezone-proof once parsed.
//
// ABSENT (added 2026-11-12): the CSV only lists people who joined, so
// someone who never joined never appears. The admin lists who was
// expected for a meeting (meeting_expected_attendees); anyone expected
// but missing from the CSV — and from the attendance table — is an
// Absent row: same ComputedRow shape, no join/leave times, 0 minutes.
// Absent rows are STORED in meeting_attendance (flagged is_absent) so
// the table, the counts and the CSV export all see the same list.

export const LATE_AFTER_MINUTES = 10
export const EARLY_LEAVE_BEFORE_MINUTES = 10

/** IST is UTC+05:30, fixed (no daylight saving). */
export const MEETING_TIMEZONE = 'Asia/Kolkata'
export const MEETING_TIMEZONE_OFFSET_MINUTES = 330

export type AttendanceStatus =
  | 'On time'
  | 'Late'
  | 'Left early'
  | 'Late + left early'
  | 'No data'
  | 'Absent'

/** Column mapping: the exact header text from the uploaded CSV, or null
 *  when the file has no such column. The admin confirms / adjusts this
 *  at import time — the extension is not decided yet, so nothing here
 *  assumes one vendor's header names. */
export interface ColumnMapping {
  name: string | null
  email: string | null
  firstJoin: string | null
  lastLeave: string | null
  durationMinutes: string | null
}

export interface ParsedRow {
  name: string
  email: string
  firstJoin: Date | null
  lastLeave: Date | null
  /** Minutes from the file, when the extension provides them. Null when
   *  the file has no duration column — computed from join → leave. */
  totalMinutes: number | null
}

export interface ComputedRow extends ParsedRow {
  minutesLate: number
  isLate: boolean
  leftEarly: boolean
  status: AttendanceStatus
}

export interface MeetingWindow {
  scheduledStart: Date
  scheduledEnd: Date
}

/** One person the admin expects at a meeting. Email is the identity —
 *  matched case-insensitively everywhere. full_name may be null when
 *  the admin typed a bare email; the display falls back to the email. */
export interface ExpectedAttendeeInput {
  email: string
  full_name: string | null
}

// ─── CSV parsing (dependency-free, handles quoted fields) ───────────────

export function parseCsv(text: string): string[][] {
  const src = text.replace(/^\uFEFF/, '')
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < src.length; i++) {
    const ch = src[i]
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') { field += '"'; i++ } else { inQuotes = false }
      } else {
        field += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      row.push(field)
      field = ''
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i++
      row.push(field)
      field = ''
      rows.push(row)
      row = []
    } else {
      field += ch
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  // Drop fully-empty rows (trailing newline, blank lines).
  return rows.filter((r) => r.some((c) => c.trim() !== ''))
}

// ─── Header detection ───────────────────────────────────────────────────

function normalizeHeader(h: string): string {
  return h.trim().toLowerCase().replace(/[^a-z0-9]/g, '')
}

/** Accepted header spellings per field, after normalization. Covers the
 *  candidate extensions (AttendList, EngageLens, RollCall, Attendance
 *  for Google Meet) plus generic variants. Extend this list — not the
 *  parser — when a new extension shows up with different headers. */
const HEADER_VARIANTS: Record<keyof ColumnMapping, string[]> = {
  name: ['name', 'participant', 'participantname', 'attendee', 'person', 'displayname', 'fullname', 'username'],
  email: ['email', 'emailaddress', 'mail', 'emailid'],
  firstJoin: ['firstjoin', 'join', 'jointime', 'firstjointime', 'joined', 'joinedat', 'entrytime', 'firstseen', 'checkin', 'joinat', 'firstjoint'],
  lastLeave: ['lastleave', 'leave', 'leavetime', 'lastleavetime', 'left', 'leftat', 'exittime', 'lastseen', 'checkout', 'leaveat', 'lastleavet'],
  durationMinutes: ['duration', 'durationminutes', 'totalminutes', 'totaltime', 'timeinmeeting', 'meetingduration', 'minutes', 'totalduration', 'durationmin', 'attendanceduration', 'callduration'],
}

export function detectColumnMapping(headers: string[]): {
  mapping: ColumnMapping
  unusedHeaders: string[]
} {
  const normalized = headers.map(normalizeHeader)
  const used = new Set<number>()
  const mapping = {} as ColumnMapping
  ;(Object.keys(HEADER_VARIANTS) as (keyof ColumnMapping)[]).forEach((field) => {
    const variants = HEADER_VARIANTS[field]
    const idx = normalized.findIndex((h, i) => !used.has(i) && variants.includes(h))
    if (idx >= 0) {
      used.add(idx)
      mapping[field] = headers[idx]
    } else {
      mapping[field] = null
    }
  })
  return { mapping, unusedHeaders: headers.filter((_, i) => !used.has(i)) }
}

// ─── Date parsing ───────────────────────────────────────────────────────

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
}

/** Treat a naive wall time as IST and return the UTC instant. */
function istWallTimeToUtc(
  year: number, month: number, day: number,
  hour: number, minute: number, second: number,
): Date {
  const utcMs = Date.UTC(year, month, day, hour, minute, second)
  return new Date(utcMs - MEETING_TIMEZONE_OFFSET_MINUTES * 60_000)
}

/**
 * Parse one join/leave cell. Accepted forms:
 *  - ISO with Z or ±HH:MM offset (absolute — used as-is)
 *  - ISO without offset, e.g. 2026-11-12T10:05:00 (naive — read as IST)
 *  - "Nov 12, 2026 10:05 AM" / "12 Nov 2026 10:05" (naive — read as IST)
 *  - Time only, e.g. 10:05 / 10:05:23 / 10:05 AM (uses fallbackDate's
 *    IST calendar date — needed when an extension exports times only)
 * Anything else returns null (the row is reported as an error at import,
 * never silently guessed).
 */
export function parseDateTime(value: string, fallbackDate?: Date): Date | null {
  const v = value.trim()
  if (!v) return null

  // 1. Absolute ISO (Z or explicit offset).
  if (/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:?\d{2})$/.test(v)) {
    const d = new Date(v)
    return Number.isNaN(d.getTime()) ? null : d
  }

  // 2. Naive ISO: 2026-11-12T10:05 or 2026-11-12 10:05:30.
  const iso = v.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?$/)
  if (iso) {
    return istWallTimeToUtc(+iso[1], +iso[2] - 1, +iso[3], +iso[4], +iso[5], +(iso[6] ?? 0))
  }

  // 3. "Nov 12, 2026 10:05 AM" or "12 Nov 2026 10:05".
  const named = v.match(/^(?:([A-Za-z]{3,9})\.?\s+(\d{1,2}),?\s+(\d{4})|(\d{1,2})\s+([A-Za-z]{3,9})\.?\s+(\d{4}))\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*([AaPp][Mm])?$/)
  if (named) {
    const monName = (named[1] ?? named[5] ?? '').slice(0, 3).toLowerCase()
    const month = MONTHS[monName]
    if (month === undefined) return null
    const day = +(named[2] ?? named[4])
    const year = +(named[3] ?? named[6])
    let hour = +named[7]
    const minute = +named[8]
    const second = +(named[9] ?? 0)
    const ampm = (named[10] ?? '').toLowerCase()
    if (ampm === 'pm' && hour < 12) hour += 12
    if (ampm === 'am' && hour === 12) hour = 0
    if (hour > 23 || minute > 59 || second > 59 || day < 1 || day > 31) return null
    return istWallTimeToUtc(year, month, day, hour, minute, second)
  }

  // 4. Time only: 10:05, 10:05:23, 10:05 AM — needs the meeting date.
  const timeOnly = v.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*([AaPp][Mm])?$/)
  if (timeOnly) {
    if (!fallbackDate) return null
    let hour = +timeOnly[1]
    const minute = +timeOnly[2]
    const second = +(timeOnly[3] ?? 0)
    const ampm = (timeOnly[4] ?? '').toLowerCase()
    if (ampm === 'pm' && hour < 12) hour += 12
    if (ampm === 'am' && hour === 12) hour = 0
    if (hour > 23 || minute > 59 || second > 59) return null
    // The meeting's scheduled start, read in IST, gives the calendar date.
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: MEETING_TIMEZONE, year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(fallbackDate)
    const get = (type: string) => +(parts.find((p) => p.type === type)?.value ?? 0)
    return istWallTimeToUtc(get('year'), get('month') - 1, get('day'), hour, minute, second)
  }

  return null
}

// ─── Row parsing ────────────────────────────────────────────────────────

export function parseAttendanceCsv(
  text: string,
  mapping: ColumnMapping,
  fallbackDate?: Date,
): { rows: ParsedRow[]; errors: string[] } {
  const errors: string[] = []
  const grid = parseCsv(text)
  if (grid.length === 0) return { rows: [], errors: ['The file is empty.'] }

  const headers = grid[0]
  const colIndex = (header: string | null): number =>
    header === null ? -1 : headers.indexOf(header)
  const nameIdx = colIndex(mapping.name)
  const emailIdx = colIndex(mapping.email)
  const joinIdx = colIndex(mapping.firstJoin)
  const leaveIdx = colIndex(mapping.lastLeave)
  const durationIdx = colIndex(mapping.durationMinutes)

  if (nameIdx < 0) errors.push('No Name column found — pick the name column in the mapping above.')
  if (emailIdx < 0) errors.push('No Email column found — pick the email column in the mapping above.')
  if (errors.length > 0) return { rows: [], errors }

  const rows: ParsedRow[] = []
  for (let r = 1; r < grid.length; r++) {
    const cells = grid[r]
    const lineNo = r + 1
    const name = (cells[nameIdx] ?? '').trim()
    const email = (cells[emailIdx] ?? '').trim().toLowerCase()
    if (!name && !email) continue // blank line inside the file
    if (!name || !email) {
      errors.push(`Row ${lineNo}: missing ${!name ? 'name' : 'email'} — skipped.`)
      continue
    }

    const joinRaw = joinIdx >= 0 ? (cells[joinIdx] ?? '').trim() : ''
    const leaveRaw = leaveIdx >= 0 ? (cells[leaveIdx] ?? '').trim() : ''
    const firstJoin = joinRaw ? parseDateTime(joinRaw, fallbackDate) : null
    const lastLeave = leaveRaw ? parseDateTime(leaveRaw, fallbackDate) : null
    if (joinRaw && !firstJoin) {
      errors.push(`Row ${lineNo} (${name}): could not read the join time "${joinRaw}" — skipped.`)
      continue
    }
    if (leaveRaw && !lastLeave) {
      errors.push(`Row ${lineNo} (${name}): could not read the leave time "${leaveRaw}" — skipped.`)
      continue
    }

    let totalMinutes: number | null = null
    if (durationIdx >= 0) {
      const raw = (cells[durationIdx] ?? '').trim()
      if (raw !== '') {
        const n = Number.parseFloat(raw.replace(/[^0-9.]/g, ''))
        totalMinutes = Number.isFinite(n) ? Math.round(n) : null
      }
    }

    rows.push({ name, email, firstJoin, lastLeave, totalMinutes })
  }
  return { rows, errors }
}

// ─── Expected attendees (the Absent feature) ────────────────────────────

/** A line is valid when it yields an email. The email check is
 *  deliberately simple (something@something.tld, no spaces) — this is
 *  an admin-typed list, not a public signup form. */
function isValidEmail(email: string): boolean {
  return /^\S+@\S+\.\S+$/.test(email)
}

/**
 * Parse the "Expected attendees" textarea: one person per line, either
 *   Ritika Malik <ritika@example.org>
 *   ritika@example.org
 * Rules: blank lines skipped; emails lowercased; duplicates dropped
 * (first occurrence wins); a line with no usable email is SKIPPED
 * silently, not an error — the schedule form says so next to the
 * field. A bare "First Last email@x.org" line (name + email without
 * angle brackets) is ambiguous and is also skipped; use <email> for
 * a name. Returns the list in the order typed.
 */
export function parseExpectedAttendees(text: string): ExpectedAttendeeInput[] {
  const seen = new Set<string>()
  const out: ExpectedAttendeeInput[] = []
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line) continue
    let email = ''
    let fullName: string | null = null
    const angled = line.match(/^(.*?)\s*<([^<>]+)>\s*$/)
    if (angled) {
      fullName = angled[1].trim() || null
      email = angled[2].trim().toLowerCase()
    } else if (isValidEmail(line)) {
      email = line.toLowerCase()
    } else {
      continue // no usable email on this line — skip, don't error
    }
    if (!isValidEmail(email)) continue
    if (seen.has(email)) continue
    seen.add(email)
    out.push({ email, full_name: fullName })
  }
  return out
}

/**
 * Which expected list a new meeting gets. The rule is deliberately
 * simple and either/or — never a merge:
 *   - typed list non-empty → the typed list (deduped, lowercased).
 *     The defaults are ignored for this meeting entirely, so a typed
 *     list can also shrink the roster (a special meeting with only a
 *     few people). When the same email is in both lists, the typed
 *     entry wins — its name is the one kept.
 *   - typed list empty → the saved default roster (deduped the same
 *     way).
 *   - both empty → no expected list; the meeting behaves exactly as
 *     before the Absent feature existed.
 * Dedupe reuses the same first-wins, lowercase-email rule as
 * parseExpectedAttendees — no second copy of that logic.
 */
export function resolveExpectedList(
  typed: ExpectedAttendeeInput[],
  defaults: ExpectedAttendeeInput[],
): ExpectedAttendeeInput[] {
  const source = typed.length > 0 ? typed : defaults
  const seen = new Set<string>()
  const out: ExpectedAttendeeInput[] = []
  for (const person of source) {
    const email = person.email.trim().toLowerCase()
    if (!email || seen.has(email)) continue
    seen.add(email)
    out.push({ email, full_name: (person.full_name ?? '').trim() || null })
  }
  return out
}

/**
 * Absent rows for expected people who have no attendance row yet.
 * `attendedEmails` is every email that already has a row in
 * meeting_attendance for this meeting — real rows AND Absent rows —
 * plus the emails in the CSV being imported, so a re-import never
 * re-creates an Absent row. Matching is case-insensitive.
 * An Absent row carries totalMinutes 0 (not null) so it matches the
 * export shape exactly: empty join/leave times, 0 minutes, 0 late.
 */
export function computeAbsent(
  expected: ExpectedAttendeeInput[],
  attendedEmails: string[],
): ComputedRow[] {
  const attended = new Set(attendedEmails.map((e) => e.trim().toLowerCase()))
  const seen = new Set<string>()
  const rows: ComputedRow[] = []
  for (const person of expected) {
    const email = person.email.trim().toLowerCase()
    if (!email || seen.has(email) || attended.has(email)) continue
    seen.add(email)
    rows.push({
      name: (person.full_name ?? '').trim() || email,
      email,
      firstJoin: null,
      lastLeave: null,
      totalMinutes: 0,
      minutesLate: 0,
      isLate: false,
      leftEarly: false,
      status: 'Absent',
    })
  }
  return rows
}

// ─── Flags ──────────────────────────────────────────────────────────────

export function computeAttendance(
  window: MeetingWindow,
  parsed: ParsedRow,
): ComputedRow {
  const { scheduledStart, scheduledEnd } = window
  const minutesLate = parsed.firstJoin
    ? Math.max(0, Math.round((parsed.firstJoin.getTime() - scheduledStart.getTime()) / 60_000))
    : 0
  const isLate = minutesLate > LATE_AFTER_MINUTES
  const leftEarly = parsed.lastLeave
    ? (scheduledEnd.getTime() - parsed.lastLeave.getTime()) / 60_000 > EARLY_LEAVE_BEFORE_MINUTES
    : false
  const totalMinutes = parsed.totalMinutes ?? (
    parsed.firstJoin && parsed.lastLeave
      ? Math.max(0, Math.round((parsed.lastLeave.getTime() - parsed.firstJoin.getTime()) / 60_000))
      : 0
  )
  let status: AttendanceStatus = 'On time'
  if (!parsed.firstJoin && !parsed.lastLeave) status = 'No data'
  else if (isLate && leftEarly) status = 'Late + left early'
  else if (isLate) status = 'Late'
  else if (leftEarly) status = 'Left early'
  return { ...parsed, totalMinutes, minutesLate, isLate, leftEarly, status }
}

export function attendanceSummary(rows: ComputedRow[]): {
  total: number
  onTime: number
  late: number
  leftEarly: number
  lateAndEarly: number
  absent: number
} {
  return {
    total: rows.length,
    onTime: rows.filter((r) => r.status === 'On time').length,
    late: rows.filter((r) => r.status === 'Late').length,
    leftEarly: rows.filter((r) => r.status === 'Left early').length,
    lateAndEarly: rows.filter((r) => r.status === 'Late + left early').length,
    absent: rows.filter((r) => r.status === 'Absent').length,
  }
}

// ─── Import planning (pure — the server action applies this plan) ───────

/** One row already stored for this meeting. is_absent tells a real
 *  attendance row apart from an Absent placeholder. */
export interface ExistingAttendanceRow {
  email: string
  is_absent: boolean
}

export interface ImportPlan {
  /** CSV rows with no DB row yet — inserted as-is. */
  insert: ComputedRow[]
  /** CSV rows whose DB row is currently an Absent row — the real row
   *  replaces the placeholder (upsert on (meeting_id, email)). */
  replaceAbsent: ComputedRow[]
  /** CSV rows already stored as real rows — skipped, re-import is a no-op. */
  skipped: number
  /** Expected people missing from the CSV and from the DB — new Absent rows. */
  absent: ComputedRow[]
}

/**
 * Decide what a CSV import does, without touching the database. The
 * server action applies the plan; the tests exercise this function
 * directly (idempotent re-import, Absent → real replacement).
 */
export function planImport(
  existing: ExistingAttendanceRow[],
  csvRows: ComputedRow[],
  expected: ExpectedAttendeeInput[],
): ImportPlan {
  const existingByEmail = new Map<string, boolean>()
  for (const e of existing) {
    existingByEmail.set(e.email.trim().toLowerCase(), e.is_absent)
  }
  const insert: ComputedRow[] = []
  const replaceAbsent: ComputedRow[] = []
  let skipped = 0
  const csvEmails = new Set<string>()
  for (const r of csvRows) {
    const email = r.email.trim().toLowerCase()
    csvEmails.add(email)
    const flag = existingByEmail.get(email)
    if (flag === undefined) insert.push(r)
    else if (flag) replaceAbsent.push(r)
    else skipped += 1
  }
  // "Already present" for Absent purposes = any stored row (real or
  // Absent) plus anything in this CSV — so a re-import never duplicates
  // an Absent row, and an Absent person in the CSV gets the real row
  // instead (replaceAbsent above), not a second Absent row.
  const present = new Set<string>([...existingByEmail.keys(), ...csvEmails])
  const absent = computeAbsent(expected, [...present])
  return { insert, replaceAbsent, skipped, absent }
}

/**
 * Drop the Absent row for one email from a stored-row list. Real rows
 * (is_absent false) are never removed — used by the meeting page when
 * an expected attendee is removed, and by the tests for the "never
 * delete a real row" rule.
 */
export function removeAbsentRow<T extends { email: string; is_absent: boolean }>(
  rows: T[],
  email: string,
): T[] {
  const lowered = email.trim().toLowerCase()
  return rows.filter((r) => !(r.email.toLowerCase() === lowered && r.is_absent))
}

// ─── Formatting / export ────────────────────────────────────────────────

/** IST display for the admin UI, e.g. "12 Nov 2026, 10:05 am". */
export function formatIst(d: Date | null): string {
  if (!d) return '—'
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: MEETING_TIMEZONE,
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  }).format(d)
}

/** UTC ISO for CSV export — unambiguous, Excel parses it as a date. */
export function formatUtcForCsv(d: Date | null): string {
  if (!d) return ''
  return `${d.toISOString().slice(0, 10)} ${d.toISOString().slice(11, 16)}`
}

export function buildExportRows(rows: ComputedRow[]): string[][] {
  const header = ['Name', 'Email', 'First join (UTC)', 'Last leave (UTC)', 'Total minutes', 'Minutes late', 'Status']
  const body = rows.map((r) => [
    r.name,
    r.email,
    formatUtcForCsv(r.firstJoin),
    formatUtcForCsv(r.lastLeave),
    String(r.totalMinutes),
    String(r.minutesLate),
    r.status,
  ])
  return [header, ...body]
}

/** Parse a datetime-local input ("2026-11-12T10:00") as an IST wall time.
 *  The browser gives no timezone, and the server runs on UTC — reading
 *  it as UTC would shift every meeting by 5:30. */
export function parseIstDateTimeLocal(value: string): Date | null {
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/)
  if (!m) return null
  return istWallTimeToUtc(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], 0)
}
