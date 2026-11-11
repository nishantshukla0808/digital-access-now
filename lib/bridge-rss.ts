// The Bridge — newsletter archive feed helpers.
//
// Reads the beehiiv RSS feed (URL from the BEEHIIV_RSS_URL env var) and
// turns it into plain article objects. Dependency-free: the repo has no XML
// parser, so this uses small, defensive regex parsing. Everything here is
// total — bad input yields an empty list, never a throw.

export type BridgeArticle = {
  title: string
  link: string
  /** Raw pubDate string from the feed (may be empty). */
  pubDate: string
  /** Plain-text excerpt, HTML stripped, max ~200 chars. */
  excerpt: string
}

const MAX_ITEMS = 12
const MAX_EXCERPT_CHARS = 200
const MAX_FEED_BYTES = 2_000_000
const FETCH_TIMEOUT_MS = 8_000
const FEED_REVALIDATE_SECONDS = 3600 // ~1 hour

/** Unwrap CDATA sections and decode the HTML entities feeds commonly use. */
function decodeEntities(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_m, hex: string) =>
      String.fromCharCode(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_m, dec: string) =>
      String.fromCharCode(Number(dec)),
    )
}

/** Strip HTML tags and collapse whitespace to a single plain-text string. */
function toPlainText(value: string): string {
  return decodeEntities(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * First `<tag>…</tag>` value inside an <item> block, as plain text.
 * Returns null when the tag is absent. Tag matching is case-insensitive and
 * tolerates attributes on the opening tag (e.g. `<link href="…">` is not
 * used by RSS, but `<content:encoded>` is matched as a literal tag name).
 */
function tagValue(block: string, tag: string): string | null {
  const pattern = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i')
  const match = block.match(pattern)
  if (!match) return null
  return toPlainText(match[1])
}

/** Truncate an excerpt at a word boundary and add an ellipsis. */
function truncateExcerpt(excerpt: string): string {
  if (excerpt.length <= MAX_EXCERPT_CHARS) return excerpt
  const cut = excerpt.slice(0, MAX_EXCERPT_CHARS).replace(/\s+\S*$/, '')
  return `${cut}…`
}

/**
 * Parse an RSS 2.0 document into article objects. Items without a usable
 * title or an http(s) link are skipped. Never throws.
 */
export function parseBridgeFeed(xml: string): BridgeArticle[] {
  const articles: BridgeArticle[] = []
  if (!xml || typeof xml !== 'string') return articles

  let blocks: RegExpMatchArray | null
  try {
    blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi)
  } catch {
    return articles
  }
  if (!blocks) return articles

  for (const block of blocks) {
    try {
      const title = tagValue(block, 'title')
      const link = tagValue(block, 'link')
      if (!title || !link) continue

      let url: string
      try {
        url = new URL(link).toString()
      } catch {
        continue
      }
      if (!/^https?:\/\//i.test(url)) continue

      const pubDate = tagValue(block, 'pubDate') ?? ''
      const description =
        tagValue(block, 'description') ??
        tagValue(block, 'content:encoded') ??
        ''

      articles.push({
        title,
        link: url,
        pubDate,
        excerpt: truncateExcerpt(description),
      })
      if (articles.length >= MAX_ITEMS) break
    } catch {
      // One bad item must never break the whole archive.
      continue
    }
  }

  return articles
}

/**
 * Fetch the configured beehiiv RSS feed and parse it. Returns an empty list
 * when the env var is missing, the fetch fails/times out, the response is
 * not OK, or the feed cannot be parsed. Never throws.
 */
export async function fetchBridgeArticles(): Promise<BridgeArticle[]> {
  const feedUrl = process.env.BEEHIIV_RSS_URL
  if (!feedUrl) return []

  try {
    const res = await fetch(feedUrl, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      next: { revalidate: FEED_REVALIDATE_SECONDS },
      headers: {
        Accept: 'application/rss+xml, application/xml, text/xml, */*',
      },
    })
    if (!res.ok) return []

    const xml = await res.text()
    if (!xml || xml.length > MAX_FEED_BYTES) return []
    return parseBridgeFeed(xml)
  } catch {
    return []
  }
}
