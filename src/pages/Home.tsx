import Hero from '../components/Hero'
import SearchPanel from '../components/SearchPanel'
import FeaturedSection from '../components/FeaturedSection'
import ValuationSection from '../components/ValuationSection'
import CategoriesSection from '../components/CategoriesSection'
import NeighborhoodsSection from '../components/NeighborhoodsSection'
import LegacySection from '../components/LegacySection'
import Testimonials from '../components/Testimonials'
import ContactSection from '../components/ContactSection'

export default function Home() {
  return (
    <>
      <Hero />
      <SearchPanel />
      <FeaturedSection />
      <ValuationSection />
      <CategoriesSection />
      <NeighborhoodsSection />
      <LegacySection />
      <Testimonials />
      <ContactSection />
    </>
  )
}
