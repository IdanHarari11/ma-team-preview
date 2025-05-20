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
    folder: '/gallery ashdod function1/',
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
    folder: '/gallery ashdod py1/',
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
    folder: '/gallery tlv py1/',
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
  const gallery = GALLERIES.find(g => g.id === selected);

  return (
    <section className="w-full py-16 bg-ma-light" id="gallery-tabs">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-ma-black">גלריה</h2>
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {GALLERIES.map(g => (
            <button
              key={g.id}
              onClick={() => setSelected(g.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 border-2 ${selected === g.id ? 'bg-ma-primary text-white border-ma-primary' : 'bg-white text-ma-black border-ma-primary/30 hover:border-ma-primary'}`}
            >
              {g.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery?.images.map((img, i) => (
            <div key={gallery.id + '-' + img} className="aspect-[9/16] w-full rounded-xl overflow-hidden bg-gray-200 shadow relative">
              <Image
                src={gallery.folder + img}
                alt={gallery.label + ' תמונה ' + (i+1)}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                priority={i < 2}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 