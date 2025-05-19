'use client'

import { useState } from 'react'
import Image from 'next/image'

const GALLERIES = [
  {
    id: 'ashdod-function',
    label: 'פונקציונלי אשדוד',
    folder: 'gallery ashdod function',
    images: [
      'RASHTA-00720.jpg',
      'RASHTA-00250.jpg',
      'RASHTA-00272.jpg',
      'RASHTA-00138.jpg',
      'RASHTA-00142.jpg',
      'RASHTA-00261.jpg',
      'RASHTA-00357.jpg',
      'RASHTA-00360.jpg',
      'RASHTA-00359.jpg',
      'RASHTA-00219.jpg',
      'Facetune_26-10-2022-16-57-39_Original.jpg',
    ]
  },
  {
    id: 'ashdod-py',
    label: 'פילאטיס ויוגה אשדוד',
    folder: 'gallery ashdod p y',
    images: [
      'RASHTA-00538.jpg',
      'RASHTA-00369.jpg',
      'RASHTA-00462.jpg',
      'RASHTA-00382.jpg',
      'RASHTA-00365.jpg',
      'RASHTA-00530.jpg',
      'RASHTA-00552.jpg',
      'RASHTA-00187.jpg',
      'RASHTA-00674.jpg',
      'RASHTA-00701.jpg',
      'DSC_8871.JPG',
    ]
  },
  {
    id: 'tlv-py',
    label: 'פילאטיס ויוגה תל אביב',
    folder: 'galleryi tlv p y',
    images: [
      'RASHTA-08800.jpg',
      'RASHTA-08830.jpg',
      'RASHTA-08886 (1).jpg',
      'RASHTA-08886.jpg',
      'RASHTA-08884 (1).jpg',
      'RASHTA-08884.jpg',
      'RASHTA-08927.jpg',
      'RASHTA-08980.jpg',
      'RASHTA-08990 (1).jpg',
      'RASHTA-08990.jpg',
      'RASHTA-09008 (1).jpg',
      'RASHTA-09008.jpg',
      'RASHTA-09115.jpg',
      'RASHTA-09127 (1).jpg',
      'RASHTA-09127.jpg',
      'RASHTA-09139.jpg',
      'RASHTA-09133.jpg',
      'RASHTA-09173.jpg',
      'RASHTA-09196 (1).jpg',
      'RASHTA-09196.jpg',
      'RASHTA-09207.jpg',
    ]
  }
]

export default function BranchGallerySelector() {
  const [selected, setSelected] = useState('ashdod-function')
  const gallery = GALLERIES.find(g => g.id === selected)

  return (
    <section className="w-full py-16 bg-ma-light" id="branch-gallery">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-ma-black text-center mb-8">גלריית סניפים</h2>
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {GALLERIES.map(g => (
            <button
              key={g.id}
              onClick={() => setSelected(g.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border-2 ${selected === g.id ? 'bg-ma-primary text-white border-ma-primary' : 'bg-white text-ma-black border-gray-200 hover:border-ma-primary'}`}
            >
              {g.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery?.images.map((img, i) => (
            <div key={img} className="aspect-[9/16] w-full max-w-[400px] mx-auto rounded-xl overflow-hidden shadow-lg bg-gray-100">
              <Image
                src={`/${gallery.folder}/${img}`}
                alt={gallery.label + ' תמונה ' + (i+1)}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
                priority={i < 2}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 