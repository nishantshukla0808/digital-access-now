-- ============================================================
-- site_metrics table — stores editable public-facing metrics
-- Run this in your Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS public.site_metrics (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row-Level Security
ALTER TABLE public.site_metrics ENABLE ROW LEVEL SECURITY;

-- Public read access (for homepage/impact pages)
CREATE POLICY "public_read_metrics" ON public.site_metrics
  FOR SELECT USING (true);

-- Only service role can mutate (admin actions use service client)
-- No INSERT/UPDATE policy needed — service role bypasses RLS

-- Seed default metrics
INSERT INTO public.site_metrics (key, value) VALUES
  ('lives_empowered', '340K+'),
  ('devices_distributed', '89K+'),
  ('communities_served', '245'),
  ('countries_active', '52'),
  ('donation_raised', '$128,400'),
  ('donor_count', '1,426'),
  ('monthly_goal', '$25,000'),
  ('devices_funded', '89,000+'),
  ('campaign_message', 'Bridge the digital divide by empowering communities to access technology.'),
  ('impact_summary', 'Measuring the real-world change we''re making through digital access, devices, and community-led leadership.')
ON CONFLICT (key) DO NOTHING;
