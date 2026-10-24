import { MessageCircle } from '@/components/icons'
import { WHATSAPP } from '@/data/properties'

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá! Gostaria de falar com um especialista da Armangni.')}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com especialista pelo WhatsApp"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 sm:bottom-6 sm:right-6 z-40 grid h-13 w-13 sm:h-14 sm:w-14 place-items-center rounded-full bg-[#1fae55] text-white shadow-[var(--shadow-float)] transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-offset-4"
    >
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 fill-white" />
    </a>
  )
}
