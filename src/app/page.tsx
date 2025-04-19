import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import About from '@/components/About'
import BranchSelector from '@/components/BranchSelector'
import Gallery from '@/components/Gallery'
import Faq from '@/components/Faq'
import Contact from '@/components/Contact'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  return (
    <main className="min-h-screen bg-ma-light">
      <Hero />
      <Stats />
      <About />
      <BranchSelector />
      <Gallery />
      <Faq />
      <Contact />
      {/* WhatsApp כפתור מתחת לטופס */}
      <div className="m-8 mt-2 flex justify-center">
        <WhatsAppButton className=" max-w-sm" />
      </div>
    </main>
  )
}
