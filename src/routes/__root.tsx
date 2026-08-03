import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { ScrollManager } from '@/components/layout/scroll-manager'
import { WhatsAppFloat } from '@/components/layout/whatsapp-float'

/** Casca do site: a mesma que ficava no antigo `App.tsx`. */
export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      <ScrollManager />
      <div className='flex min-h-screen flex-col'>
        <Header />
        <main className='flex-1'>
          <Outlet />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  )
}
