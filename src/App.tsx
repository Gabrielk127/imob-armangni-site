import { Routes, Route } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext'
import ScrollManager from './components/ScrollManager'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import Listings from './pages/Listings'
import PropertyDetail from './pages/PropertyDetail'
import Favorites from './pages/Favorites'

export default function App() {
  return (
    <FavoritesProvider>
      <ScrollManager />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/imoveis" element={<Listings />} />
            <Route path="/imovel/:code" element={<PropertyDetail />} />
            <Route path="/favoritos" element={<Favorites />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </FavoritesProvider>
  )
}
