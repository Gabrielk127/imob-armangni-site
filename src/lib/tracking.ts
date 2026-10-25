import { getJson } from '@/lib/http'

interface SiteConfig {
  trackingScriptUrl: string | null
  trackingApiUrl: string | null
  trackingKey: string | null
}

const SESSION_COOKIE = '_tl_sid'

let configPromise: Promise<SiteConfig | null> | null = null

function siteConfig() {
  configPromise ??= getJson<SiteConfig>('/public/site-config').catch(() => null)
  return configPromise
}

export async function loadTracking() {
  if (typeof document === 'undefined') return
  const config = await siteConfig()
  if (!config?.trackingScriptUrl) return
  const script = document.createElement('script')
  script.async = true
  script.src = config.trackingScriptUrl
  document.head.appendChild(script)
}

export interface ContactRequest {
  name: string
  email?: string
  phone?: string
  preference?: string
  message?: string
  propertyCode?: string
}

export async function submitContact(request: ContactRequest): Promise<boolean> {
  const config = await siteConfig()
  if (!config?.trackingApiUrl || !config.trackingKey) return false
  const body: Record<string, string> = { pageUrl: window.location.href }
  const sessionCookie = readCookie(SESSION_COOKIE)
  if (sessionCookie) body.sessionCookie = sessionCookie
  for (const [key, value] of Object.entries(request)) {
    if (typeof value === 'string' && value.trim()) body[key] = value.trim()
  }
  try {
    const response = await fetch(`${config.trackingApiUrl}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-tl-key': config.trackingKey,
      },
      body: JSON.stringify(body),
    })
    return response.ok
  } catch {
    return false
  }
}

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}
