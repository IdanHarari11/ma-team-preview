import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import About from '@/components/About'
import BranchSelector from '@/components/BranchSelector'
import Gallery from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'
import Faq from '@/components/Faq'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen bg-ma-light">
      <Hero />
      <Stats />
      <About />
      <BranchSelector />
      <Gallery />
      <Testimonials />
      <Faq />
      <Contact />
    </main>
  )
}
