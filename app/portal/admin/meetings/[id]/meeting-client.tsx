'use client'

import { useMemo, useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, Loader2, Upload, Video } from 'lucide-react'
import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import {
  buildExportRows,
  computeAttendance,
  detectColumnMapping,
  formatIst,
  formatUtcForCsv,
  parseAttendanceCsv,
  type ColumnMapping,
  type ComputedRow,
  type ParsedRow,
} from '@/lib/meeting-attendance'
import { importMeetingAttendance } from '../meeting-actions'
import type { AttendanceRow, MeetingDetail } from './page'

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
}

function statusBadge(status: string) {
  const b = STATUS_BADGE[status] ?? STATUS_BADGE['No data']
  return (
    <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold" style={{ background: b.bg, color: b.color }}>
      {status}
    </span>
  )
}

/** Turn a stored DB row back into a ComputedRow for display + export. */
function rowToComputed(r: AttendanceRow): ComputedRow {
  const firstJoin = r.first_join ? new Date(r.first_join) : null
  const lastLeave = r.last_leave ? new Date(r.last_leave) : null
  const status = !firstJoin && !lastLeave
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
  meetingsReady,
}: {
  meeting: MeetingDetail | null
  initialRows: AttendanceRow[]
  meetingsReady: boolean
}) {
  const [rows, setRows] = useState<AttendanceRow[]>(initialRows)
  const [notice, setNotice] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  // CSV import state
  const [fileName, setFileName] = useState('')
  const [headers, setHeaders] = useState<string[]>([])
  const [mapping, setMapping] = useState<ColumnMapping | null>(null)
  const [preview, setPreview] = useState<ComputedRow[]>([])
  const [parseErrors, setParseErrors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    const total = computedRows.length
    return {
      total,
      onTime: computedRows.filter((r) => r.status === 'On time').length,
      late: computedRows.filter((r) => r.status === 'Late' || r.status === 'Late + left early').length,
      leftEarly: computedRows.filter((r) => r.status === 'Left early' || r.status === 'Late + left early').length,
    }
  }, [computedRows])

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
        setNotice({
          type: 'ok',
          msg: `Imported ${result.imported ?? 0} new ${result.imported === 1 ? 'person' : 'people'}${(result.skipped ?? 0) > 0 ? `, ${result.skipped} already in the list were skipped` : ''}.`,
        })
        globalThis.location.reload()
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
              <div><p className="text-2xl font-black" style={{ color: '#0F5D5E' }}>{summary.total}</p><p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1F2933', opacity: 0.45 }}>Attended</p></div>
              <div><p className="text-2xl font-black" style={{ color: '#b45309' }}>{summary.late}</p><p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1F2933', opacity: 0.45 }}>Late (&gt;10 min)</p></div>
              <div><p className="text-2xl font-black" style={{ color: '#c2410c' }}>{summary.leftEarly}</p><p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1F2933', opacity: 0.45 }}>Left early</p></div>
              <div><p className="text-2xl font-black" style={{ color: '#0F5D5E' }}>{summary.onTime}</p><p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1F2933', opacity: 0.45 }}>On time</p></div>
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

          {/* Import CSV */}
          <div className="rounded-xl p-6" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
            <p className="text-sm font-bold" style={{ color: '#1F2933' }}>Import attendance CSV</p>
            <p className="text-xs mt-1 mb-4" style={{ color: '#1F2933', opacity: 0.55 }}>
              Export the CSV from your Meet attendance extension (AttendList, EngageLens, RollCall,
              Attendance for Google Meet — any of them works), then upload it here. Re-importing the
              same file changes nothing: people already in the list are skipped.
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
                  Preview — {preview.length} {preview.length === 1 ? 'person' : 'people'} (flags are computed from the meeting time)
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
                      {preview.slice(0, 10).map((r) => (
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
                {preview.length > 10 && (
                  <p className="text-xs mt-2" style={{ color: '#1F2933', opacity: 0.45 }}>
                    Showing 10 of {preview.length} — all of them will be imported.
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
                  {isPending ? 'Importing...' : `Import ${preview.length} ${preview.length === 1 ? 'person' : 'people'}`}
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
              10 minutes before the scheduled end. Times shown in IST; the CSV export uses UTC.
            </p>
          </div>
        </div>
      )}
    </PortalShell>
  )
}
