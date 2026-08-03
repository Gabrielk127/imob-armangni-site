import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'

export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // no TanStack o hash vem sem o "#"
      const el = document.querySelector(`#${hash.replace(/^#/, '')}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return null
}
