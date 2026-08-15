import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './index.css'
import { queryClient } from '@/lib/query-client'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  // O queryClient entra no contexto para os `loader` das rotas aquecerem o
  // mesmo cache que os componentes leem — ver `api/query-options.ts`.
  context: { queryClient },
  defaultPreload: 'intent',
  // Recomendado quando o React Query é o dono do cache: o router não guarda
  // cópia própria do resultado do loader.
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
