'use client'

import { useState, useTransition } from 'react'
import { ArrowUpLeft, FileText, CalendarDays, Video, BookOpen, Loader2, Trash2 } from 'lucide-react'
import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { deleteContent, unpublishContent } from '../admin-actions'

type Item = { id: string; title: string; created_at: string; excerpt?: string | null }
type Props = {
  reports: Item[]
  events: (Item & { location?: string; start_date?: string })[]
  resources: (Item & { category?: string | null })[]
  vlogs: (Item & { video_url?: string })[]
}

export function ContentClient({ reports, events, resources, vlogs }: Props) {
  const [state, setState] = useState({ reports, events, resources, vlogs })
  const [notice, setNotice] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [isPending, startTransition] = useTransition()

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

  const tabCount = (arr: Item[]) => arr.length

  function ContentRow({ item, table, extra }: { item: Item; table: 'reports' | 'events' | 'resources' | 'vlogs'; extra?: string }) {
    return (
      <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 p-5 md:flex-row md:items-start md:justify-between">
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-950 truncate">{item.title}</p>
          {item.excerpt && <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.excerpt}</p>}
          {extra && <p className="mt-1 text-xs text-gray-400">{extra}</p>}
          <p className="mt-1 text-xs text-gray-400">
            {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge className="rounded-full bg-green-50 border border-green-200 px-3 py-1 text-green-700 text-xs">● Published</Badge>
          <Button
            variant="outline"
            size="sm"
            disabled={isPending}
            onClick={() => handleUnpublish(table, item.id, item.title)}
            className="rounded-full border-amber-200 text-amber-600 hover:bg-amber-50 text-xs"
            title="Unpublish"
          >
            <ArrowUpLeft className="size-3.5 mr-1" />
            Unpublish
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={isPending}
            onClick={() => handleDelete(table, item.id, item.title)}
            className="rounded-full border-red-200 text-red-500 hover:bg-red-50"
            title="Delete permanently"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/content"
      badge="Content Manager"
      title="Manage all published content across the public website."
      subtitle="Unpublish sends items back to pending review. Delete permanently removes them."
      navItems={adminNavItems}
    >
      {notice && (
        <div className={`rounded-2xl px-5 py-3 text-sm font-medium mb-6 ${notice.type === 'ok' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
          {notice.type === 'ok' ? '✓' : '⚠'} {notice.msg}
        </div>
      )}

      <Tabs defaultValue="reports" className="gap-6">
        <TabsList className="h-auto rounded-2xl bg-white p-2 shadow-sm flex-wrap">
          <TabsTrigger value="reports" className="rounded-xl px-5 py-2.5 gap-2">
            <FileText className="size-4" /> Reports ({tabCount(state.reports)})
          </TabsTrigger>
          <TabsTrigger value="events" className="rounded-xl px-5 py-2.5 gap-2">
            <CalendarDays className="size-4" /> Events ({tabCount(state.events)})
          </TabsTrigger>
          <TabsTrigger value="resources" className="rounded-xl px-5 py-2.5 gap-2">
            <BookOpen className="size-4" /> Resources ({tabCount(state.resources)})
          </TabsTrigger>
          <TabsTrigger value="vlogs" className="rounded-xl px-5 py-2.5 gap-2">
            <Video className="size-4" /> Vlogs ({tabCount(state.vlogs)})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          <Card className="border-primary-blue/15 bg-white py-0">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-xl font-black text-gray-950">Published Impact Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6">
              {state.reports.length === 0 && <p className="text-gray-400 text-sm py-8 text-center">No published reports.</p>}
              {state.reports.map(r => (
                <ContentRow key={r.id} item={r} table="reports" extra={r.excerpt ?? undefined} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card className="border-primary-blue/15 bg-white py-0">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-xl font-black text-gray-950">Published Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6">
              {state.events.length === 0 && <p className="text-gray-400 text-sm py-8 text-center">No published events.</p>}
              {state.events.map(e => (
                <ContentRow
                  key={e.id} item={e} table="events"
                  extra={[e.start_date ? new Date(e.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null, e.location].filter(Boolean).join(' · ')}
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card className="border-primary-blue/15 bg-white py-0">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-xl font-black text-gray-950">Published Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6">
              {state.resources.length === 0 && <p className="text-gray-400 text-sm py-8 text-center">No published resources.</p>}
              {state.resources.map(r => (
                <ContentRow key={r.id} item={r} table="resources" extra={(r as any).category ?? undefined} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vlogs">
          <Card className="border-primary-blue/15 bg-white py-0">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-xl font-black text-gray-950">Published Vlogs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6">
              {state.vlogs.length === 0 && <p className="text-gray-400 text-sm py-8 text-center">No published vlogs.</p>}
              {state.vlogs.map(v => (
                <ContentRow key={v.id} item={v} table="vlogs" extra={(v as any).video_url} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  )
}
