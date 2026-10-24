const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env

/** API da TechLeads (CRM), que rastreia o site e recebe os contatos. */
const TECHLEADS_URL = env.VITE_TECHLEADS_URL?.replace(/\/$/, '')
/** Chave pública de rastreamento do workspace (tlw_…): só grava visitas. */
const TRACKING_KEY = env.VITE_TECHLEADS_TRACKING_KEY

const SESSION_COOKIE = '_tl_sid'

/**
 * Carrega o tl.js da TechLeads: registra visitas e páginas e, em todo link de
 * WhatsApp, acrescenta um código à mensagem para o CRM saber que o lead veio do
 * site (e de qual imóvel, pelo `data-tl-property` da página).
 */
export function loadTracking() {
  if (!TECHLEADS_URL || !TRACKING_KEY || typeof document === 'undefined') return
  const script = document.createElement('script')
  script.async = true
  script.src = `${TECHLEADS_URL}/public/tracking/tl.js?k=${encodeURIComponent(TRACKING_KEY)}`
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

/**
 * Envia o formulário de contato direto para o CRM, que abre o lead com origem
 * "Site". Não depende do tl.js: um bloqueador de rastreamento não pode fazer o
 * contato se perder.
 */
export async function submitContact(request: ContactRequest): Promise<boolean> {
  if (!TECHLEADS_URL || !TRACKING_KEY) return false
  const body: Record<string, string> = { pageUrl: window.location.href }
  const sessionCookie = readCookie(SESSION_COOKIE)
  if (sessionCookie) body.sessionCookie = sessionCookie
  for (const [key, value] of Object.entries(request)) {
    if (typeof value === 'string' && value.trim()) body[key] = value.trim()
  }
  try {
    const response = await fetch(`${TECHLEADS_URL}/public/tracking/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-tl-key': TRACKING_KEY },
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
