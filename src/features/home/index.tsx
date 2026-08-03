import { Hero } from '@/features/home/components/hero'
import { FeaturedSection } from '@/features/home/components/featured-section'
import { HomeBannersCarousel } from '@/features/home/components/home-banners-carousel'
import { ValuationSection } from '@/features/home/components/valuation-section'
import { NeighborhoodsSection } from '@/features/home/components/neighborhoods-section'
import { LegacySection } from '@/features/home/components/legacy-section'
import { ContactSection } from '@/features/home/components/contact-section'

export function Home() {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <ValuationSection />
      <HomeBannersCarousel />
      <NeighborhoodsSection />
      <LegacySection />
      <ContactSection />
    </>
  )
}
