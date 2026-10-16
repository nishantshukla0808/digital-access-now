'use client'

import { useState, useTransition } from 'react'
import { ArrowUpLeft, FileText, CalendarDays, Video, BookOpen, Trash2 } from 'lucide-react'
import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { deleteContent, unpublishContent } from '../admin-actions'

type Item = { id: string; title: string; created_at: string; excerpt?: string | null }
type Props = {
  reports: Item[]
  events: (Item & { location?: string; start_date?: string })[]
  resources: (Item & { category?: string | null })[]
  vlogs: (Item & { video_url?: string })[]
}

const TABS = [
  { key: 'reports',   label: 'Reports',   icon: FileText     },
  { key: 'events',    label: 'Events',    icon: CalendarDays },
  { key: 'resources', label: 'Resources', icon: BookOpen     },
  { key: 'vlogs',     label: 'Vlogs',     icon: Video        },
] as const

export function ContentClient({ reports, events, resources, vlogs }: Props) {
  const [state, setState] = useState({ reports, events, resources, vlogs })
  const [notice, setNotice] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [isPending, startTransition] = useTransition()
  const [activeTab, setActiveTab] = useState<'reports' | 'events' | 'resources' | 'vlogs'>('reports')

  function handleUnpublish(table: 'reports' | 'events' | 'resources' | 'vlogs', id: string, title: string) {
    if (!confirm(`Unpublish "${title}"? It will move back to pending review.`)) return
    startTransition(async () => {
      setNotice(null)
      const result = await unpublishContent(table, id)
      if (result.error) {
        setNotice({ type: 'err', msg: result.error })
      } else {
        setState(prev => ({ ...prev, [table]: (prev[table] as Item[]).filter(i => i.id !== id) }))
        setNotice({ type: 'ok', msg: `"${title}" moved back to pending.` })
      }
    })
  }

  function handleDelete(table: 'reports' | 'events' | 'resources' | 'vlogs', id: string, title: string) {
    if (!confirm(`PERMANENTLY DELETE "${title}"? This cannot be undone.`)) return
    startTransition(async () => {
      setNotice(null)
      const result = await deleteContent(table, id)
      if (result.error) {
        setNotice({ type: 'err', msg: result.error })
      } else {
        setState(prev => ({ ...prev, [table]: (prev[table] as Item[]).filter(i => i.id !== id) }))
        setNotice({ type: 'ok', msg: `"${title}" permanently deleted.` })
      }
    })
  }

  function ContentRow({ item, table, extra }: { item: Item; table: 'reports' | 'events' | 'resources' | 'vlogs'; extra?: string }) {
    return (
      <div className="flex flex-col gap-3 rounded-xl p-4 md:flex-row md:items-start md:justify-between" style={{ background: '#FAFAF7', border: '1px solid rgba(15,93,94,0.08)' }}>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate" style={{ color: '#1F2933' }}>{item.title}</p>
          {item.excerpt && <p className="mt-1 text-xs leading-relaxed line-clamp-2" style={{ color: '#1F2933', opacity: 0.55 }}>{item.excerpt}</p>}
          {extra && <p className="mt-1 text-xs" style={{ color: '#1F2933', opacity: 0.4 }}>{extra}</p>}
          <p className="mt-1 text-xs" style={{ color: '#1F2933', opacity: 0.35 }}>
            {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(15,93,94,0.1)', color: '#0F5D5E' }}>Published</span>
          <button
            disabled={isPending}
            onClick={() => handleUnpublish(table, item.id, item.title)}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-opacity hover:opacity-80 disabled:opacity-40"
            style={{ background: 'rgba(234,179,8,0.1)', color: '#b45309', border: '1px solid rgba(234,179,8,0.25)' }}
          >
            <ArrowUpLeft className="size-3" /> Unpublish
          </button>
          <button
            disabled={isPending}
            onClick={() => handleDelete(table, item.id, item.title)}
            className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-bold transition-opacity hover:opacity-80 disabled:opacity-40"
            style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.2)' }}
          >
            <Trash2 className="size-3" />
          </button>
        </div>
      </div>
    )
  }

  const currentItems = state[activeTab] as Item[]

  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/content"
      badge="Admin"
      title="Content Manager"
      subtitle="Unpublish sends items back to pending review. Delete permanently removes them."
      navItems={adminNavItems}
    >
      {notice && (
        <div className="rounded-xl px-5 py-3 text-sm font-medium mb-5"
          style={notice.type === 'ok'
            ? { background: 'rgba(15,93,94,0.08)', color: '#0F5D5E' }
            : { background: '#fef2f2', color: '#b91c1c' }}>
          {notice.msg}
        </div>
      )}

      {/* Tab bar */}
      <div className="flex gap-1 p-1 rounded-xl mb-5 w-fit" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all"
            style={activeTab === key
              ? { background: '#0F5D5E', color: '#ffffff' }
              : { color: '#1F2933', opacity: 0.6 }}
          >
            <Icon className="size-4" /> {label} ({state[key].length})
          </button>
        ))}
      </div>

      {/* Content list */}
      <div className="rounded-xl p-5" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
        {currentItems.length === 0 ? (
          <p className="text-sm text-center py-10" style={{ color: '#1F2933', opacity: 0.4 }}>No published {activeTab}.</p>
        ) : (
          <div className="space-y-2">
            {activeTab === 'reports'   && state.reports.map(r => <ContentRow key={r.id} item={r} table="reports" />)}
            {activeTab === 'events'    && state.events.map(e => <ContentRow key={e.id} item={e} table="events" extra={[e.start_date ? new Date(e.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null, e.location].filter(Boolean).join(' · ')} />)}
            {activeTab === 'resources' && state.resources.map(r => <ContentRow key={r.id} item={r} table="resources" extra={(r as any).category ?? undefined} />)}
            {activeTab === 'vlogs'     && state.vlogs.map(v => <ContentRow key={v.id} item={v} table="vlogs" extra={(v as any).video_url} />)}
          </div>
        )}
      </div>
    </PortalShell>
  )
}
