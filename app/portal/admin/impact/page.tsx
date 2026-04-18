import { createServiceClient } from '@/lib/supabase/service'
import { ImpactClient } from './impact-client'

export default async function AdminImpactPage() {
  const service = createServiceClient()
  const { data: rows } = await service.from('site_metrics').select('key, value')

  // Convert rows array to a plain key→value map
  const metrics: Record<string, string> = {}
  rows?.forEach(r => { metrics[r.key] = r.value })

  // Fallback defaults so the form is never empty before the SQL migration runs
  const defaults: Record<string, string> = {
    lives_empowered: '340K+',
    devices_distributed: '89K+',
    communities_served: '245',
    countries_active: '52',
    impact_summary: "Measuring the real-world change we're making through digital access, devices, and community-led leadership.",
  }

  return <ImpactClient metrics={{ ...defaults, ...metrics }} />
}