import { createServiceClient } from '@/lib/supabase/service'
import { FundraisingClient } from './fundraising-client'

export default async function AdminFundraisingPage() {
  const service = createServiceClient()
  const { data: rows } = await service.from('site_metrics').select('key, value')

  const metrics: Record<string, string> = {}
  rows?.forEach(r => { metrics[r.key] = r.value })

  const defaults: Record<string, string> = {
    donation_raised: '$128,400',
    donor_count: '1,426',
    monthly_goal: '$25,000',
    devices_funded: '89,000+',
    campaign_message: 'Bridge the digital divide by empowering communities to access technology.',
  }

  return <FundraisingClient metrics={{ ...defaults, ...metrics }} />
}