import Hero from '@/components/Hero'
import TrainingTypes from '@/components/TrainingTypes'
import About from '@/components/About'
import BranchSelector from '@/components/BranchSelector'
import Testimonials from '@/components/Testimonials'
import Gallery from '@/components/Gallery'
import Faq from '@/components/Faq'
import Stats from '@/components/Stats'
import Schedule from '@/components/Schedule'
import Branches from '@/components/Branches'
import RegistrationForm from '@/components/RegistrationForm'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <section id="hero">
        <Hero />
      </section>
      
      <section id="about" className="pt-16">
        <About />
      </section>
      
      <section id="stats" className="pt-8">
        <Stats />
      </section>
      
      <section id="training-types" className="pt-16">
        <TrainingTypes />
      </section>
      
      <section id="branches" className="pt-16">
        <Branches />
      </section>
      
      <section id="branch-selector" className="pt-16">
        <BranchSelector />
      </section>
      
      <section id="schedule" className="pt-8">
        <Schedule />
      </section>
      
      <section id="gallery" className="pt-16">
        <Gallery />
      </section>
      
      <section id="testimonials" className="pt-16">
        <Testimonials />
      </section>
      
      <section id="faq" className="pt-8">
        <Faq />
      </section>
      
      <section id="contact" className="pt-16 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-ma-black mb-4">
              צרו איתנו קשר
            </h2>
            <p className="text-ma-black/70 max-w-xl mx-auto">
              השאירו פרטים ונחזור אליכם בהקדם
            </p>
          </div>
          <RegistrationForm />
        </div>
      </section>
    </main>
  )
}
