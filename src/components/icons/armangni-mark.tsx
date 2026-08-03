interface ArmangniMarkProps {
  className?: string
  strokeWidth?: number
}

/**
 * Marca da Armangni: três silhuetas de prédios em contorno com o "A"
 * estilizado (picos duplos) ao centro. Usa `currentColor` para herdar
 * a cor do contexto (dourado da marca) e funcionar em fundo claro ou escuro.
 */
export function ArmangniMark({ className, strokeWidth = 30 }: ArmangniMarkProps) {
  return (
    <svg
      viewBox="0 0 875 668"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* prédio da esquerda (topo inclinado) */}
      <path d="M94 662 V105 L362 20 V108" />
      {/* prédio central em primeiro plano */}
      <path d="M267 662 V108 H622 V662" />
      {/* prédio da direita ao fundo */}
      <path d="M541 108 V16 H777 V662" />
      {/* "A" estilizado — picos duplos */}
      <path d="M297 528 L440 224 L582 528" />
      <path d="M335 528 L440 300 L544 528" />
    </svg>
  )
}
