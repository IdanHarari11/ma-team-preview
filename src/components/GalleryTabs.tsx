'use client';
import { useState } from 'react';
import Image from 'next/image';

interface GalleryData {
  id: string;
  label: string;
  folder: string;
  images: string[];
}

const GALLERIES: GalleryData[] = [
  {
    id: 'ashdod-function',
    label: 'פונקציונלי אשדוד',
    folder: '/gallery-ashdod-function1/',
    images: [
      'fftscmg27cnxi5ujodtj.webp',
      'cjsmsm9na2csxbwbjyln.webp',
      'hhwi05mtebdnf9gejjsa.webp',
      'k9leivrkloclwwpxdlg3.webp',
      'xrwjrgj0hqvs65v1ac4h.webp',
      'zxnhok2e0ekpnjlmdprb.webp',
      'mxaebwehmjds3fvf5wbk.webp',
      'n8bk3kxyvl5egqa9inoz.webp',
      'ozdp6tvo4vaukcthcrca.webp',
      'cbzsij9flojrcz9v12zx.webp',
      'oa3tkgvwh5qqrc5blwf3.webp',
      'xqagakwadofmjwueaxcp.webp',
    ],
  },
  {
    id: 'ashdod-py',
    label: 'פילאטיס ויוגה אשדוד',
    folder: '/gallery-ashdod-py1/',
    images: [
      'b30vzaaiax5tmnjyco8g.webp',
      'eymco2u7rem5nqhrwenx.webp',
      'q9zm35paq4fgxvwk4jqy.webp',
      'rcaprjttafdo0gptwvax.webp',
      't584aefemqjmdgko2gob.webp',
      'ja9ug9sh99y2l6la3hgh.webp',
      'k288c8qftp8exajl0ehe.webp',
      'ovaz4bupn40uh9ft2e90.webp',
      'oz455znthfraxpzcdmg3.webp',
      'u2icteb6vxwcnh2hvzmr.webp',
    ],
  },
  {
    id: 'tlv-py',
    label: 'פילאטיס ויוגה תל אביב',
    folder: '/gallery-tlv-py1/',
    images: [
      'fbglchqizpaumnvh2kk3.webp',
      'iqltheejhnx1w92faeak.webp',
      'vfasommuux3pz8iufuln.webp',
      'wi29df4jlo8lff10spen.webp',
      'zqapo2yzhaue8yhajhcp.webp',
      'di2dvoe0whc7la0sykfj.webp',
      'jtxahxbt45sodlkhkvih.webp',
      'lsxfxfdntyefgny3oc1w.webp',
      'm3yhrll3iakbsehkiyju.webp',
      'y6qknnhiaulzuunvunqs.webp',
      'axwvkvus5lboesggaz7e.webp',
      'cks6zkz9aetlllht0j50.webp',
      'hgb6yr07n6azag3d7rao.webp',
      't07zfbwefvyrgjzdafal.webp',
      'w1uu0yxebyannyqcg2ag.webp',
    ],
  },
];

export default function GalleryTabs() {
  const [selected, setSelected] = useState('ashdod-function');
  const [startIdx, setStartIdx] = useState(0);
  const gallery = GALLERIES.find(g => g.id === selected);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
  const mobileVisibleCount = 1;
  const desktopVisibleCount = 3;
  const visibleCount = typeof window !== 'undefined' && window.innerWidth <= 640 ? mobileVisibleCount : desktopVisibleCount;
  const images = gallery?.images || [];
  const total = images.length;

  const handlePrev = () => {
    setStartIdx((prev) => (prev - 1 + total) % total);
  };
  const handleNext = () => {
    setStartIdx((prev) => (prev + 1) % total);
  };
  const getVisibleImages = () => {
    if (total <= visibleCount) return images;
    const end = startIdx + visibleCount;
    if (end <= total) {
      return images.slice(startIdx, end);
    } else {
      return [...images.slice(startIdx), ...images.slice(0, end - total)];
    }
  };

  if (!gallery) return null;

  return (
    <section className="w-full py-10 md:py-16 bg-ma-light" id="gallery-tabs">
      <div className="max-w-6xl mx-auto px-2 md:px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-ma-black">גלריה</h2>
        <div className="flex justify-center gap-2 mb-6 md:mb-8 flex-wrap">
          {GALLERIES.map(g => (
            <button
              key={g.id}
              onClick={() => { setSelected(g.id); setStartIdx(0); }}
              className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all duration-200 border-2 text-sm md:text-base ${selected === g.id ? 'bg-ma-primary text-white border-ma-primary' : 'bg-white text-ma-black border-ma-primary/30 hover:border-ma-primary'}`}
            >
              {g.label}
            </button>
          ))}
        </div>
        <div className="relative flex items-center justify-center w-full">
          {/* חץ קודם */}
          <button
            onClick={handlePrev}
            aria-label="הקודם"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white shadow hover:bg-ma-primary/10 transition disabled:opacity-50"
            style={{}}
          >
            <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="flex gap-2 md:gap-6 items-center justify-center w-full max-w-xs md:max-w-2xl mx-auto">
            {getVisibleImages().map((img, i) => (
              <div
                key={gallery.id + '-' + img}
                className="aspect-[9/16] w-44 md:w-40 lg:w-64 rounded-xl overflow-hidden bg-gray-200 shadow relative mx-auto"
                style={{ minWidth: '0' }}
              >
                <Image
                  src={gallery.folder + img}
                  alt={gallery.label + ' תמונה ' + ((startIdx + i) % total + 1)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, (max-width: 1200px) 33vw, 25vw"
                  priority={i < 2}
                  unoptimized
                />
              </div>
            ))}
          </div>
          {/* חץ הבא */}
          <button
            onClick={handleNext}
            aria-label="הבא"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white shadow hover:bg-ma-primary/10 transition disabled:opacity-50"
            style={{}}
          >
            <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
        </div>
        <style jsx>{`
          @media (max-width: 640px) {
            #gallery-tabs .aspect-\[9\/16\] {
              width: 90vw !important;
              max-width: 320px !important;
            }
            #gallery-tabs .rounded-xl {
              border-radius: 1.2rem !important;
            }
            #gallery-tabs .max-w-xs {
              max-width: 90vw !important;
            }
            #gallery-tabs button[aria-label="הקודם"] {
              right: 0.5rem !important;
              left: auto !important;
              top: 50% !important;
              transform: translateY(-50%);
              z-index: 10;
            }
            #gallery-tabs button[aria-label="הבא"] {
              left: 0.5rem !important;
              right: auto !important;
              top: 50% !important;
              transform: translateY(-50%);
              z-index: 10;
            }
          }
        `}</style>
      </div>
    </section>
  );
} 