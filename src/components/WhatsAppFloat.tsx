import { MessageCircle } from 'lucide-react'
import { WHATSAPP } from '../data/properties'

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá! Gostaria de falar com um especialista.')}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-110"
    >
      <MessageCircle className="h-7 w-7 fill-white" />
    </a>
  )
}
