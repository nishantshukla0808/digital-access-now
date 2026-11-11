'use client'

import { useMemo, useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, Loader2, Trash2, Upload, UserPlus, Video } from 'lucide-react'
import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import {
  buildExportRows,
  computeAbsent,
  computeAttendance,
  detectColumnMapping,
  formatIst,
  formatUtcForCsv,
  parseAttendanceCsv,
  removeAbsentRow,
  type ColumnMapping,
  type ComputedRow,
  type ParsedRow,
} from '@/lib/meeting-attendance'
import { addExpectedAttendee, importMeetingAttendance, removeExpectedAttendee } from '../meeting-actions'
import type { AttendanceRow, ExpectedAttendeeRow, MeetingDetail } from './page'

const inputStyle = {
  width: '100%', height: '42px', paddingLeft: '12px', paddingRight: '12px',
  borderRadius: '10px', fontSize: '14px', outline: 'none',
  background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933',
} as const

const STATUS_BADGE: Record<string, { bg: string; color: string }> = {
  'On time': { bg: 'rgba(15,93,94,0.1)', color: '#0F5D5E' },
  'Late': { bg: 'rgba(234,179,8,0.12)', color: '#b45309' },
  'Left early': { bg: 'rgba(234,88,12,0.1)', color: '#c2410c' },
  'Late + left early': { bg: 'rgba(220,38,38,0.08)', color: '#dc2626' },
  'No data': { bg: 'rgba(0,0,0,0.05)', color: '#6b7280' },
  'Absent': { bg: 'rgba(220,38,38,0.1)', color: '#b91c1c' },
}

function statusBadge(status: string) {
  const b = STATUS_BADGE[status] ?? STATUS_BADGE['No data']
  return (
    <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold" style={{ background: b.bg, color: b.color }}>
      {status}
    </span>
  )
}

/** Turn a stored DB row back into a ComputedRow for display + export.
 *  An Absent row (is_absent) has no join/leave times — it must read
 *  'Absent', not 'No data' (which is a CSV row with no times). */
function rowToComputed(r: AttendanceRow): ComputedRow {
  const firstJoin = r.first_join ? new Date(r.first_join) : null
  const lastLeave = r.last_leave ? new Date(r.last_leave) : null
  const status = r.is_absent
    ? 'Absent'
    : !firstJoin && !lastLeave
    ? 'No data'
    : r.is_late && r.left_early ? 'Late + left early'
    : r.is_late ? 'Late'
    : r.left_early ? 'Left early'
    : 'On time'
  return {
    name: r.name, email: r.email, firstJoin, lastLeave,
    totalMinutes: r.total_minutes, minutesLate: r.minutes_late,
    isLate: r.is_late, leftEarly: r.left_early, status,
  }
}

const MAPPING_FIELDS: { key: keyof ColumnMapping; label: string; required: boolean }[] = [
  { key: 'name', label: 'Name', required: true },
  { key: 'email', label: 'Email', required: true },
  { key: 'firstJoin', label: 'First join', required: false },
  { key: 'lastLeave', label: 'Last leave', required: false },
  { key: 'durationMinutes', label: 'Duration (minutes)', required: false },
]

export function MeetingClient({
  meeting,
  initialRows,
  initialExpected,
  meetingsReady,
  expectedReady,
}: {
  meeting: MeetingDetail | null
  initialRows: AttendanceRow[]
  initialExpected: ExpectedAttendeeRow[]
  meetingsReady: boolean
  expectedReady: boolean
}) {
  const [rows, setRows] = useState<AttendanceRow[]>(initialRows)
  const [expected, setExpected] = useState<ExpectedAttendeeRow[]>(initialExpected)
  const [notice, setNotice] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  // CSV import state
  const [fileName, setFileName] = useState('')
  const [headers, setHeaders] = useState<string[]>([])
  const [mapping, setMapping] = useState<ColumnMapping | null>(null)
  const [preview, setPreview] = useState<ComputedRow[]>([])
  const [parseErrors, setParseErrors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Add-expected-attendee form state
  const [newExpectedName, setNewExpectedName] = useState('')
  const [newExpectedEmail, setNewExpectedEmail] = useState('')
  const [removingEmail, setRemovingEmail] = useState<string | null>(null)

  const meetingWindow = useMemo(
    () =>
      meeting
        ? {
            scheduledStart: new Date(meeting.scheduled_start),
            scheduledEnd: new Date(meeting.scheduled_end),
          }
        : null,
    [meeting],
  )

  const computedRows = useMemo(() => rows.map(rowToComputed), [rows])
  const summary = useMemo(() => {
    const absent = computedRows.filter((r) => r.status === 'Absent').length
    return {
      total: computedRows.length,
      attended: computedRows.length - absent,
      absent,
      onTime: computedRows.filter((r) => r.status === 'On time').length,
      late: computedRows.filter((r) => r.status === 'Late' || r.status === 'Late + left early').length,
      leftEarly: computedRows.filter((r) => r.status === 'Left early' || r.status === 'Late + left early').length,
    }
  }, [computedRows])

  // True when every person on this meeting's expected list came from
  // the saved default roster (copied at scheduling). Derived from the
  // rows, so it stays correct as the admin edits the list: adding
  // someone by hand clears it, removing someone keeps it.
  const expectedFromDefaults = expected.length > 0 && expected.every((e) => e.from_defaults)

  // Absent rows for the import preview: expected people who are in
  // neither the CSV preview nor the already-imported rows. Derived, so
  // it recomputes whenever the mapping changes (preview rebuilds), an
  // expected attendee is added/removed, or rows change.
  const previewAbsent = useMemo(() => {
    if (!meeting) return []
    const present = new Set<string>([
      ...rows.map((r) => r.email.toLowerCase()),
      ...preview.map((r) => r.email.toLowerCase()),
    ])
    return computeAbsent(
      expected.map((e) => ({ email: e.email, full_name: e.full_name })),
      [...present],
    )
  }, [preview, expected, rows, meeting])

  function applyMapping(text: string, map: ColumnMapping, heads: string[]) {
    if (!meetingWindow || !meeting) return
    const { rows: parsed, errors } = parseAttendanceCsv(text, map, meetingWindow.scheduledStart)
    const computed = parsed.map((p: ParsedRow) => computeAttendance(meetingWindow, p))
    setPreview(computed)
    setParseErrors(errors)
    setHeaders(heads)
    setMapping(map)
  }

  function handleFile(file: File | undefined) {
    if (!file || !meeting) return
    setFileName(file.name)
    setNotice(null)
    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result ?? '')
      // Parse once with auto-detected mapping; the admin can adjust below.
      const firstLine = text.replace(/^\uFEFF/, '').split(/\r?\n/)[0] ?? ''
      const heads = firstLine.split(',').map((h) => h.trim().replace(/^"|"$/g, ''))
      const { mapping: detected } = detectColumnMapping(heads)
      applyMapping(text, detected, heads)
    }
    reader.onerror = () => setNotice({ type: 'err', msg: 'Could not read the file.' })
    reader.readAsText(file)
  }

  function handleMappingChange(field: keyof ColumnMapping, header: string) {
    if (!mapping || !fileInputRef.current?.files?.[0]) return
    const next: ColumnMapping = { ...mapping, [field]: header === '' ? null : header }
    const file = fileInputRef.current.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result ?? '')
      const heads = text.replace(/^\uFEFF/, '').split(/\r?\n/)[0]?.split(',').map((h) => h.trim().replace(/^"|"$/g, '')) ?? []
      applyMapping(text, next, heads)
    }
    reader.readAsText(file)
  }

  function handleImport() {
    if (!meeting || preview.length === 0) return
    startTransition(async () => {
      setNotice(null)
      const result = await importMeetingAttendance(
        meeting.id,
        preview.map((r) => ({
          name: r.name,
          email: r.email,
          firstJoin: r.firstJoin ? r.firstJoin.toISOString() : null,
          lastLeave: r.lastLeave ? r.lastLeave.toISOString() : null,
          totalMinutes: r.totalMinutes,
        })),
      )
      if (result.error) {
        setNotice({ type: 'err', msg: result.error })
      } else {
        const parts = [`Imported ${result.imported ?? 0} new ${result.imported === 1 ? 'person' : 'people'}`]
        if ((result.skipped ?? 0) > 0) parts.push(`${result.skipped} already in the list were skipped`)
        if ((result.absent ?? 0) > 0) parts.push(`${result.absent} expected ${result.absent === 1 ? 'person was' : 'people were'} marked absent`)
        setNotice({ type: 'ok', msg: `${parts.join(', ')}.` })
        globalThis.location.reload()
      }
    })
  }

  function handleAddExpected() {
    if (!meeting) return
    const email = newExpectedEmail.trim()
    const fullName = newExpectedName.trim() || null
    if (!email) {
      setNotice({ type: 'err', msg: 'Enter an email address.' })
      return
    }
    startTransition(async () => {
      setNotice(null)
      const result = await addExpectedAttendee(meeting.id, { email, full_name: fullName })
      if (result.error) {
        setNotice({ type: 'err', msg: result.error })
      } else {
        const lowered = email.toLowerCase()
        // Already on the list (added twice quickly) — no duplicate row.
        if (!expected.some((e) => e.email.toLowerCase() === lowered)) {
          setExpected((prev) => [...prev, { id: `local-${lowered}`, email: lowered, full_name: fullName, from_defaults: false }])
        }
        if (result.createdAbsent) {
          if (result.absentRowId) {
            setRows((prev) => [
              ...prev,
              {
                id: result.absentRowId as string,
                name: fullName ?? lowered,
                email: lowered,
                first_join: null,
                last_leave: null,
                total_minutes: 0,
                is_late: false,
                left_early: false,
                minutes_late: 0,
                is_absent: true,
              },
            ])
            setNotice({ type: 'ok', msg: `${fullName ?? lowered} was expected but has not joined — marked Absent.` })
          } else {
            globalThis.location.reload()
          }
        } else {
          setNotice({ type: 'ok', msg: 'Expected attendee added.' })
        }
        setNewExpectedName('')
        setNewExpectedEmail('')
      }
    })
  }

  function handleRemoveExpected(email: string) {
    if (!meeting) return
    setRemovingEmail(email)
    startTransition(async () => {
      setNotice(null)
      const result = await removeExpectedAttendee(meeting.id, email)
      setRemovingEmail(null)
      if (result.error) {
        setNotice({ type: 'err', msg: result.error })
      } else {
        setExpected((prev) => prev.filter((e) => e.email.toLowerCase() !== email.toLowerCase()))
        // Only the Absent row goes (if there was one) — a real
        // attendance row for this person stays in the table.
        setRows((prev) => removeAbsentRow(prev, email))
        setNotice({ type: 'ok', msg: 'Removed from the expected list.' })
      }
    })
  }

  function downloadAttendanceCsv() {
    const escapeCell = (value: string) => `"${value.replace(/"/g, '""')}"`
    const csv = buildExportRows(computedRows)
      .map((r) => r.map(escapeCell).join(','))
      .join('\r\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `meeting-attendance-${meeting ? new Date(meeting.scheduled_start).toISOString().slice(0, 10) : 'export'}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/meetings"
      badge="Admin"
      title={meeting ? meeting.title : 'Meeting'}
      subtitle={
        meeting
          ? `${formatIst(new Date(meeting.scheduled_start))} – ${formatIst(new Date(meeting.scheduled_end))} (IST)`
          : 'Meeting attendance'
      }
      navItems={adminNavItems}
    >
      <div className="mb-5">
        <Link href="/portal/admin/meetings" className="text-sm font-bold hover:underline" style={{ color: '#0F5D5E' }}>
          ← All meetings
        </Link>
      </div>

      {notice && (
        <div className="rounded-xl px-5 py-3 text-sm font-medium mb-5"
          style={notice.type === 'ok'
            ? { background: 'rgba(15,93,94,0.08)', color: '#0F5D5E' }
            : { background: '#fef2f2', color: '#b91c1c' }}>
          {notice.msg}
        </div>
      )}

      {!meetingsReady || !meeting ? (
        <div className="rounded-xl p-6" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <p className="text-sm font-bold mb-2" style={{ color: '#1F2933' }}>Meetings tables are not in the database yet</p>
          <p className="text-sm" style={{ color: '#1F2933', opacity: 0.65 }}>
            Run <span className="font-mono text-xs">supabase/add-meeting-attendance.sql</span> in the
            Supabase SQL Editor, then reload this page.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Summary + export */}
          <div className="rounded-xl p-5 flex flex-wrap items-center gap-4" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
            <div className="flex gap-6 flex-wrap">
              <div><p className="text-2xl font-black" style={{ color: '#0F5D5E' }}>{summary.attended}</p><p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1F2933', opacity: 0.45 }}>Attended</p></div>
              <div><p className="text-2xl font-black" style={{ color: '#b45309' }}>{summary.late}</p><p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1F2933', opacity: 0.45 }}>Late (&gt;10 min)</p></div>
              <div><p className="text-2xl font-black" style={{ color: '#c2410c' }}>{summary.leftEarly}</p><p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1F2933', opacity: 0.45 }}>Left early</p></div>
              <div><p className="text-2xl font-black" style={{ color: '#0F5D5E' }}>{summary.onTime}</p><p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1F2933', opacity: 0.45 }}>On time</p></div>
              <div><p className="text-2xl font-black" style={{ color: '#b91c1c' }}>{summary.absent}</p><p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1F2933', opacity: 0.45 }}>Absent</p></div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              {meeting.meet_link && (
                <a href={meeting.meet_link} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold"
                  style={{ background: 'rgba(77,183,229,0.1)', color: '#238C91' }}>
                  <Video className="size-3.5" /> Meet link
                </a>
              )}
              <button
                type="button"
                onClick={downloadAttendanceCsv}
                disabled={computedRows.length === 0}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
              >
                <Download className="size-3.5" /> Download CSV
              </button>
            </div>
          </div>

          {/* Expected attendees */}
          <div className="rounded-xl p-6" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
            <p className="text-sm font-bold" style={{ color: '#1F2933' }}>Expected attendees ({expected.length})</p>
            <p className="text-xs mt-1 mb-4" style={{ color: '#1F2933', opacity: 0.55 }}>
              Anyone listed here who never joins is marked Absent — when the CSV is imported,
              and immediately if you add them after the import. Removing someone deletes their
              Absent row, never a real attendance row.
              {expectedFromDefaults && (
                <> This list was copied from your default roster — change the defaults on the
                meetings page to change future meetings.</>
              )}
            </p>
            {!expectedReady ? (
              <p className="text-sm rounded-xl px-4 py-3" style={{ background: '#fef2f2', color: '#b91c1c' }}>
                The expected-attendees table is not set up yet — run{' '}
                <span className="font-mono text-xs">supabase/add-meeting-expected-attendees.sql</span>{' '}
                in the Supabase SQL Editor, then reload this page.
              </p>
            ) : (
              <>
                <div className="flex flex-wrap gap-3">
                  <input
                    value={newExpectedName}
                    onChange={(e) => setNewExpectedName(e.target.value)}
                    placeholder="Name (optional)"
                    style={{ ...inputStyle, flex: '1 1 160px' }}
                  />
                  <input
                    value={newExpectedEmail}
                    onChange={(e) => setNewExpectedEmail(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddExpected() } }}
                    placeholder="email@example.org"
                    type="email"
                    style={{ ...inputStyle, flex: '2 1 220px' }}
                  />
                  <button
                    type="button"
                    onClick={handleAddExpected}
                    disabled={isPending || !newExpectedEmail.trim()}
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
                  >
                    {isPending ? <Loader2 className="size-4 animate-spin" /> : <UserPlus className="size-4" />}
                    Add
                  </button>
                </div>
                {expected.length === 0 ? (
                  <p className="text-sm mt-4" style={{ color: '#1F2933', opacity: 0.4 }}>
                    No expected attendees yet — add the people who should have been at this meeting.
                  </p>
                ) : (
                  <div className="mt-4 space-y-2">
                    {expected.map((e) => {
                      const attended = rows.some((r) => r.email.toLowerCase() === e.email.toLowerCase() && !r.is_absent)
                      const isAbsent = rows.some((r) => r.email.toLowerCase() === e.email.toLowerCase() && r.is_absent)
                      return (
                        <div key={e.id} className="flex flex-wrap items-center gap-3 rounded-xl px-4 py-2.5" style={{ background: '#FAFAF7', border: '1px solid rgba(15,93,94,0.08)' }}>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold truncate" style={{ color: '#1F2933' }}>{e.full_name ?? e.email}</p>
                            <p className="text-xs" style={{ color: '#1F2933', opacity: 0.55 }}>{e.email}</p>
                          </div>
                          {attended
                            ? <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold" style={{ background: 'rgba(15,93,94,0.1)', color: '#0F5D5E' }}>Attended</span>
                            : isAbsent
                            ? <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold" style={{ background: 'rgba(220,38,38,0.1)', color: '#b91c1c' }}>Absent</span>
                            : <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold" style={{ background: 'rgba(0,0,0,0.05)', color: '#6b7280' }}>Not imported yet</span>}
                          <button
                            type="button"
                            disabled={removingEmail === e.email}
                            onClick={() => handleRemoveExpected(e.email)}
                            className="flex items-center justify-center size-8 rounded-lg disabled:opacity-40"
                            style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.2)' }}
                            aria-label={`Remove ${e.email} from expected attendees`}
                          >
                            {removingEmail === e.email ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Import CSV */}
          <div className="rounded-xl p-6" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
            <p className="text-sm font-bold" style={{ color: '#1F2933' }}>Import attendance CSV</p>
            <p className="text-xs mt-1 mb-4" style={{ color: '#1F2933', opacity: 0.55 }}>
              Export the CSV from your Meet attendance extension (AttendList, EngageLens, RollCall,
              Attendance for Google Meet — any of them works), then upload it here. Re-importing the
              same file changes nothing: people already in the list are skipped. Expected people
              who are not in the file are marked Absent on import.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
            >
              <Upload className="size-4" /> {fileName ? fileName : 'Choose CSV file'}
            </button>

            {mapping && headers.length > 0 && (
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#1F2933', opacity: 0.45 }}>
                  Column mapping — check it matches your file
                </p>
                <div className="grid gap-3 md:grid-cols-3">
                  {MAPPING_FIELDS.map((f) => (
                    <div key={f.key} className="space-y-1.5">
                      <label className="text-sm font-semibold" style={{ color: '#1F2933' }}>
                        {f.label}{f.required ? ' *' : ''}
                      </label>
                      <select
                        value={mapping[f.key] ?? ''}
                        onChange={(e) => handleMappingChange(f.key, e.target.value)}
                        style={inputStyle}
                      >
                        <option value="">(not in file)</option>
                        {headers.map((h) => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {parseErrors.length > 0 && (
              <div className="mt-4 rounded-xl px-4 py-3 text-xs space-y-1" style={{ background: '#fef2f2', color: '#b91c1c' }}>
                {parseErrors.map((e, i) => <p key={i}>{e}</p>)}
              </div>
            )}

            {preview.length > 0 && (
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#1F2933', opacity: 0.45 }}>
                  Preview — {preview.length} {preview.length === 1 ? 'person' : 'people'} from the file
                  {previewAbsent.length > 0 ? ` · ${previewAbsent.length} expected ${previewAbsent.length === 1 ? 'person' : 'people'} will be marked absent` : ''}
                  {' '}(flags are computed from the meeting time)
                </p>
                <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(15,93,94,0.08)' }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: '#FAFAF7', borderBottom: '1px solid rgba(15,93,94,0.08)' }}>
                        {['Name', 'Email', 'First join', 'Last leave', 'Mins', 'Late by', 'Status'].map((h) => (
                          <th key={h} className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-widest" style={{ color: '#1F2933', opacity: 0.45 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[...preview, ...previewAbsent].slice(0, 10).map((r) => (
                        <tr key={r.email} style={{ borderBottom: '1px solid rgba(15,93,94,0.05)' }}>
                          <td className="px-4 py-3 font-semibold" style={{ color: '#1F2933' }}>{r.name}</td>
                          <td className="px-4 py-3 text-xs" style={{ color: '#1F2933', opacity: 0.65 }}>{r.email}</td>
                          <td className="px-4 py-3 text-xs">{formatIst(r.firstJoin)}</td>
                          <td className="px-4 py-3 text-xs">{formatIst(r.lastLeave)}</td>
                          <td className="px-4 py-3 text-xs">{r.totalMinutes}</td>
                          <td className="px-4 py-3 text-xs">{r.minutesLate > 0 ? `${r.minutesLate} min` : '—'}</td>
                          <td className="px-4 py-3">{statusBadge(r.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {preview.length + previewAbsent.length > 10 && (
                  <p className="text-xs mt-2" style={{ color: '#1F2933', opacity: 0.45 }}>
                    Showing 10 of {preview.length + previewAbsent.length} — all of them will be imported.
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleImport}
                  disabled={isPending}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
                >
                  {isPending ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
                  {isPending ? 'Importing...' : `Import ${preview.length} ${preview.length === 1 ? 'person' : 'people'}${previewAbsent.length > 0 ? ` + mark ${previewAbsent.length} absent` : ''}`}
                </button>
              </div>
            )}
          </div>

          {/* Attendance table */}
          <div className="rounded-xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(15,93,94,0.08)' }}>
              <p className="text-sm font-bold" style={{ color: '#1F2933' }}>Attendance ({computedRows.length})</p>
            </div>
            {computedRows.length === 0 ? (
              <p className="px-5 py-10 text-sm text-center" style={{ color: '#1F2933', opacity: 0.4 }}>
                No attendance imported yet — upload the extension CSV above.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: '#FAFAF7', borderBottom: '1px solid rgba(15,93,94,0.08)' }}>
                      {['Name', 'Email', 'First join', 'Last leave', 'Mins', 'Late by', 'Status'].map((h) => (
                        <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest" style={{ color: '#1F2933', opacity: 0.45 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {computedRows.map((r) => (
                      <tr key={r.email} style={{ borderBottom: '1px solid rgba(15,93,94,0.05)' }}>
                        <td className="px-5 py-4 font-semibold" style={{ color: '#1F2933' }}>{r.name}</td>
                        <td className="px-5 py-4 text-xs" style={{ color: '#1F2933', opacity: 0.65 }}>{r.email}</td>
                        <td className="px-5 py-4 text-xs">{formatIst(r.firstJoin)}</td>
                        <td className="px-5 py-4 text-xs">{formatIst(r.lastLeave)}</td>
                        <td className="px-5 py-4 text-xs">{r.totalMinutes}</td>
                        <td className="px-5 py-4 text-xs">{r.minutesLate > 0 ? `${r.minutesLate} min` : '—'}</td>
                        <td className="px-5 py-4">{statusBadge(r.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <p className="px-5 py-3 text-xs" style={{ color: '#1F2933', opacity: 0.45 }}>
              Late = joined more than 10 minutes after the scheduled start. Left early = left more than
              10 minutes before the scheduled end. Absent = expected for this meeting but never joined.
              Times shown in IST; the CSV export uses UTC.
            </p>
          </div>
        </div>
      )}
    </PortalShell>
  )
}
