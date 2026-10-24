type ClassValue = string | false | null | undefined | 0

/** Junta classes condicionais. Sem dependência extra — o projeto não usa tailwind-merge. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}
