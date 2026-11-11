import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SubscribeButton } from '@/components/auth-gate-popup'
import { createClient } from '@/lib/supabase/server'
import { fetchBridgeArticles, type BridgeArticle } from '@/lib/bridge-rss'
import { ArrowRight, BookOpen, Mail } from 'lucide-react'

export const metadata = {
  title: 'The Bridge | Digital Access Now',
  description:
    'Read past issues of The Bridge, the Digital Access Now newsletter — stories from our chapters, volunteers, and the communities we serve.',
}

// The page is public — no login needed to read the archive. The login check
// below (via the Supabase session cookie) only decides whether the Subscribe
// button or the logged-in note is shown, so this route renders dynamically.
export const dynamic = 'force-dynamic'

function formatDate(pubDate: string): string {
  if (!pubDate) return ''
  const date = new Date(pubDate)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function ArticleCard({ article }: { article: BridgeArticle }) {
  const date = formatDate(article.pubDate)
  return (
    <article
      className="flex flex-col rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      style={{ background: '#ffffff', borderColor: '#E7ECEF' }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={{ background: '#EAF7FC' }}
        >
          <BookOpen size={18} strokeWidth={1.75} style={{ color: '#0F5D5E' }} />
        </div>
        {date && (
          <p
            className="text-xs font-semibold"
            style={{ color: '#4DB7E5' }}
          >
            {date}
          </p>
        )}
      </div>
      <h3
        className="mb-2 text-base font-bold leading-snug"
        style={{ color: '#1F2933' }}
      >
        {article.title}
      </h3>
      {article.excerpt && (
        <p
          className="mb-4 line-clamp-3 text-sm leading-relaxed"
          style={{ color: '#1F2933', opacity: 0.65 }}
        >
          {article.excerpt}
        </p>
      )}
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold transition-opacity hover:opacity-70"
        style={{ color: '#0F5D5E' }}
      >
        Read on beehiiv <ArrowRight size={14} />
      </a>
    </article>
  )
}

function ComingSoon() {
  return (
    <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-2xl p-10 text-center"
          style={{ background: '#EAF7FC' }}
        >
          <div
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: '#0F5D5E' }}
          >
            <Mail size={24} style={{ color: '#fff' }} />
          </div>
          <h2
            className="mb-3 text-2xl font-bold md:text-3xl"
            style={{ color: '#0F5D5E' }}
          >
            Archive coming soon
          </h2>
          <p
            className="mx-auto max-w-prose text-base leading-relaxed"
            style={{ color: '#1F2933', opacity: 0.75 }}
          >
            Past issues of The Bridge will live here soon. New issues are
            published on beehiiv — check back here for the full archive.
          </p>
        </div>
      </div>
    </section>
  )
}

export default async function BridgePage() {
  // Login check only — the archive itself is public. Any failure here
  // (e.g. Supabase not configured) just means "logged out", never an error.
  let isLoggedIn = false
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    isLoggedIn = Boolean(user)
  } catch {
    isLoggedIn = false
  }

  // Feed problems (missing env var, network error, bad XML) all come back
  // as an empty list — the page then shows the coming-soon state.
  const articles = await fetchBridgeArticles()

  return (
    <div
      className="min-h-screen"
      style={{ background: '#FAFAF7', color: '#1F2933' }}
    >
      <Navbar />

      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section
        className="pb-16 pt-28 md:pb-20 md:pt-36"
        style={{ background: '#FAFAF7' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p
            className="mb-5 text-xs font-bold uppercase tracking-widest"
            style={{ color: '#4DB7E5' }}
          >
            The Bridge · Newsletter
          </p>
          <div className="grid items-end gap-8 md:grid-cols-2">
            <div>
              <h1
                className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-[3.25rem]"
                style={{ color: '#0F5D5E' }}
              >
                The Bridge
              </h1>
              <p
                className="max-w-prose text-lg leading-relaxed"
                style={{ color: '#1F2933', opacity: 0.8 }}
              >
                Every issue of the Digital Access Now newsletter — stories
                from our chapters, volunteers, and the communities we serve.
              </p>
            </div>
            <div className="flex md:justify-end">
              {isLoggedIn ? (
                <p
                  className="max-w-xs rounded-xl p-4 text-sm leading-relaxed"
                  style={{
                    background: '#EAF7FC',
                    color: '#1F2933',
                  }}
                >
                  You&apos;re signed in. Newsletter preferences for existing
                  accounts are coming soon.
                </p>
              ) : (
                <SubscribeButton />
              )}
            </div>
          </div>
          <div
            className="mt-10 h-px"
            style={{
              background:
                'linear-gradient(to right, #4DB7E5, #0F5D5E, transparent)',
            }}
          />
        </div>
      </section>

      {/* ── 2. ARCHIVE ────────────────────────────────────────────────────── */}
      {articles.length > 0 ? (
        <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-center gap-3">
              <div
                className="h-6 w-1 shrink-0 rounded-full"
                style={{ background: '#238C91' }}
                aria-hidden="true"
              />
              <p
                className="text-xs font-black uppercase tracking-widest"
                style={{ color: '#238C91' }}
              >
                Past Issues
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.link} article={article} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <ComingSoon />
      )}

      {/* ── 3. SUBSCRIBE BAND ───────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: '#0B1A1A' }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
            Never miss an issue
          </h2>
          <p
            className="mx-auto mb-8 max-w-prose text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            Join the readers of The Bridge and hear first when a new issue
            goes out.
          </p>
          {isLoggedIn ? (
            <p
              className="mx-auto max-w-md rounded-xl p-4 text-sm leading-relaxed"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              You&apos;re signed in. Newsletter preferences for existing
              accounts are coming soon.
            </p>
          ) : (
            <div className="flex justify-center">
              <SubscribeButton />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
