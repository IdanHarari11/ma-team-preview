import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import About from '@/components/About'
import BranchSelector from '@/components/BranchSelector'
import Gallery from '@/components/Gallery'
import GalleryTabs from '@/components/GalleryTabs'
import Faq from '@/components/Faq'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen bg-ma-light">
      <Hero />
      <Stats />
      <About />
      <BranchSelector />
      <GalleryTabs />
      <Gallery />
      <Faq />
      <Contact />
    </main>
  )
}
