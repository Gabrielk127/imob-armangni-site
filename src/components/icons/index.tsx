/**
 * Camada única de ícones do site — Solar (linear).
 *
 * Nenhum componente importa a biblioteca direto: todos passam por aqui, o que
 * mantém o mesmo desenho para o mesmo conceito e deixa a troca de conjunto
 * restrita a um arquivo. Os SVGs são compilados no build pelo
 * `unplugin-icons`, então só entra no bundle o que é usado.
 *
 * Mesmo contrato do painel (tech-imob-frontend/src/components/icons.tsx).
 */
import type { ComponentType, SVGProps } from 'react'

export type Icon = ComponentType<SVGProps<SVGSVGElement>>


// ── Navegação ──
export { default as Menu } from '~icons/solar/hamburger-menu-linear'
export { default as Search } from '~icons/solar/magnifer-linear'
export { default as Filter } from '~icons/solar/filter-linear'
export { default as SlidersHorizontal } from '~icons/solar/tuning-2-linear'
export { default as ChevronDown } from '~icons/solar/alt-arrow-down-linear'
export { default as ChevronLeft } from '~icons/solar/alt-arrow-left-linear'
export { default as ChevronRight } from '~icons/solar/alt-arrow-right-linear'
export { default as ArrowDown } from '~icons/solar/arrow-down-linear'
export { default as ArrowRight } from '~icons/solar/arrow-right-linear'
export { default as RotateCcw } from '~icons/solar/restart-linear'

// ── Imóvel ──
export { default as Home } from '~icons/solar/home-2-linear'
export { default as Building2 } from '~icons/solar/buildings-linear'
export { default as BedDouble } from '~icons/solar/bed-linear'
export { default as ShowerHead } from '~icons/solar/bath-linear'
export { default as Car } from '~icons/solar/garage-linear'
export { default as Ruler } from '~icons/solar/ruler-linear'
export { default as Camera } from '~icons/solar/camera-minimalistic-linear'
export { default as MapPin } from '~icons/solar/map-point-linear'
export { default as Map } from '~icons/solar/map-linear'
export { default as DollarSign } from '~icons/solar/dollar-minimalistic-linear'
export { default as FileText } from '~icons/solar/document-text-linear'
export { default as Clock } from '~icons/solar/clock-circle-linear'
export { default as Calendar } from '~icons/solar/calendar-linear'

// ── Contato e social ──
export { default as Phone } from '~icons/solar/phone-linear'
export { default as Mail } from '~icons/solar/letter-linear'
export { default as MessageCircle } from '~icons/solar/chat-round-linear'
export { default as Send } from '~icons/solar/plain-linear'
export { default as Share2 } from '~icons/solar/share-linear'


// ── Destaque ──
export { default as Heart } from '~icons/solar/heart-linear'
export { default as Star } from '~icons/solar/star-linear'
export { default as Sparkles } from '~icons/solar/star-shine-linear'
export { default as Quote } from '~icons/solar/chat-square-linear'

// ── Variantes preenchidas (estados ativos) ──
export { default as HeartFilled } from '~icons/solar/heart-bold'
export { default as StarFilled } from '~icons/solar/star-bold'

// ── Glifos puros que o Solar não tem ──
export { X, Check } from './glyphs'

// ── Marca e redes sociais (SVGs próprios do projeto) ──
export { ArmangniMark } from './armangni-mark'
export * from './social-icons'
