
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLiveQuery } from 'next-sanity/preview';
import { client } from '../lib/sanity/client';


const defaultFamilies = [
   {
    name: 'תוספות לבמה',
    emoji: '🎤',
    description: 'כל סוגי התוספות לבמה',
    slug: 'stage-effects',
    attractions: [
      { name: 'לייזרים', image: '/images/hero/laser.jpeg', id: 'laser' },
      { name: 'עשן כבד', image: '/images/hero/smokeColor.jpeg', id: 'smoke' },
      { name: 'תותחי עשן', image: '/images/hero/smokeColor.jpeg', id: 'smoke-cannons' },
      { name: 'תאורת גב במה', image: '/images/hero/lights.jpeg', id: 'stage-backlight' },
      { name: 'עמדת DJ', image: '/images/hero/boothTree.jpeg', id: 'dj-booth' },
    ],
  },
  {
    name: 'עמדות צילום',
    emoji: '📸',
    description: 'עמדות צילום 4K שונות לכל סוג',
    slug: 'photo-booths',
    attractions: [
      { name: 'עמדת 360', image: '/images/hero/slow.jpeg', id: '360-booth' },
      { name: 'מינימי', image: '/images/hero/miniMi.jpeg', id: 'mini-mi' },
      { name: 'עמדת רטרו', image: '/images/hero/strip3.jpeg', id: 'retro-booth' },
      { name: 'עמדת לדים', image: '/images/hero/lights.jpeg', id: 'led-booth' },
      { name: 'עמדת מגנטים', image: '/images/hero/glasses.jpeg', id: 'magnet-booth' },
    ],
  },
  {
    name: 'אותיות מעוצבות',
    emoji: '🔠',
    description: 'אותיות פרחים, נצנצים ועוד',
    slug: 'letters',
    attractions: [
      { name: 'אותיות פרחים', image: '/images/hero/lettersFlower.jpeg', id: 'flower-letters' },
      { name: 'אותיות נצנצים', image: '/images/hero/lettersRing.jpeg', id: 'glitter-letters' },
      { name: 'LOVE מואר', image: '/images/hero/lights.jpeg', id: 'love-light' },
      { name: 'אותיות לבמה', image: '/images/hero/strip3.jpeg', id: 'stage-letters' },
      { name: 'אותיות רטרו', image: '/images/hero/retro.jpeg', id: 'retro-letters' },
    ],
  },
  {
    name: 'קירות צילום',
    emoji: '🧱',
    description: 'קיר פרחים, קיר ורוד ועוד',
    slug: 'walls',
    attractions: [
      { name: 'קיר נצנצים', image: '/images/hero/lettersRing.jpeg', id: 'glitter-wall' },
      { name: 'קיר פרחים', image: '/images/hero/lettersFlower.jpeg', id: 'flower-wall' },
      { name: 'קיר ורוד', image: '/images/hero/bagTora.jpeg', id: 'pink-wall' },
      { name: 'קיר אפור', image: '/images/hero/hichalTora.jpeg', id: 'grey-wall' },
      { name: 'קיר שמות', image: '/images/hero/glasses.jpeg', id: 'name-wall' },
    ],
  },
  {
    name: 'סוגי סלואו',
    emoji: '🕊️',
    description: 'עשן, פרחים, בלונים ועוד',
    slug: 'slow-effects',
    attractions: [
      { name: 'נוצות', image: '/images/hero/strip3.jpeg', id: 'feathers' },
      { name: 'זיקוקים', image: '/images/hero/lights.jpeg', id: 'sparks' },
      { name: 'בלונים מתפוצצים', image: '/images/hero/smokeColor.jpeg', id: 'burst-balloons' },
      { name: 'פרחים לסלואו', image: '/images/hero/lettersFlower.jpeg', id: 'slow-flowers' },
      { name: 'עשן לבן', image: '/images/hero/smokeColor.jpeg', id: 'white-smoke' },
    ],
  },
  {
    name: 'חופה',
    emoji: '💒',
    description: 'עיצוב חופה אישי ומרגש',
    slug: 'chuppah',
    attractions: [
      { name: 'חופה לבנה', image: '/images/hero/hichalTora.jpeg', id: 'white-chuppah' },
      { name: 'חופה פרחים', image: '/images/hero/lettersFlower.jpeg', id: 'flower-chuppah' },
      { name: 'חופה פתוחה', image: '/images/hero/boothTree.jpeg', id: 'open-chuppah' },
      { name: 'חופה מוארת', image: '/images/hero/lights.jpeg', id: 'light-chuppah' },
      { name: 'חופה רומנטית', image: '/images/hero/strip3.jpeg', id: 'romantic-chuppah' },
    ],
  },
  {
    name: 'תוספות לאפטר',
    emoji: '🎉',
    description: 'קונפטי, בלונים, תאורה',
    slug: 'after-party',
    attractions: [
      { name: 'קונפטי', image: '/images/hero/smokeColor.jpeg', id: 'confetti' },
      { name: 'בלונים נופלים', image: '/images/hero/fruits.jpeg', id: 'falling-balloons' },
      { name: 'זוהרים', image: '/images/hero/glasses.jpeg', id: 'glow-items' },
      { name: 'סטיקלייטים', image: '/images/hero/lights.jpeg', id: 'stick-lights' },
      { name: 'אפקטים לדאנספלור', image: '/images/hero/smokeColor.jpeg', id: 'dancefloor-effects' },
    ],
  },
  {
    name: 'אוכל ותוספות',
    emoji: '🍡',
    description: 'פינות מתוקים ועמדות בופה',
    slug: 'food',
    attractions: [
      { name: 'שולחן ממתקים', image: '/images/hero/fruits.jpeg', id: 'candy-table' },
      { name: 'מכונת סוכר', image: '/images/hero/bagTora.jpeg', id: 'cotton-candy' },
      { name: 'עמדת פירות', image: '/images/hero/fruits.jpeg', id: 'fruit-bar' },
      { name: 'שוקולד נוזלי', image: '/images/hero/smokeColor.jpeg', id: 'choco-fountain' },
      { name: 'גלידות', image: '/images/hero/glasses.jpeg', id: 'ice-cream' },
    ],
  },
];

const query = `*[_type == "attractionFamily"] | order(orderRank) {
  _id,
  name,
  emoji,
  description,
  slug,
  "attractions": attractions[]->{ _id, name, "image": image.asset->url, slug }
}`;

export default function AttractionFamilies() {
  const [openSlug, setOpenSlug] = useState(null);
  const [families = defaultFamilies] = useLiveQuery(defaultFamilies, query);

  return (
    <section className="bg-white py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg sm:text-xl md:text-3xl font-extrabold text-center mb-12 text-gray-800 flex justify-center items-center gap-2">
          🎪 סוגי אטרקציות 🎪
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {families.map((family) => (
            <div
              key={family.slug.current}
              className="relative transform transition-transform duration-300 hover:scale-105"
            >
              <div className="bg-white rounded-2xl shadow-2xl hover:shadow-[0_10px_30px_rgba(255,0,150,0.5)] transition-transform duration-300 p-5 text-center flex flex-col items-center">
                <div className="text-2xl sm:text-3xl md:text-4xl mb-2 animate-pulse">
                  {family.emoji}
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-gray-800 mb-1 text-center">
                  {family.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 text-center">
                  {family.description}
                </p>
                <button
                  onClick={() => setOpenSlug(openSlug === family.slug.current ? null : family.slug.current)}
                  className="text-[10px] sm:text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 rounded-full px-4 py-2 transition shadow-md"
                >
                  {openSlug === family.slug.current ? 'סגור אטרקציות' : 'פתח אטרקציות'}
                </button>
              </div>

              <div
                className={`transition-[max-height] duration-700 ease-in-out overflow-hidden ${openSlug === family.slug.current ? 'max-h-[2000px] mt-6' : 'max-h-0'} grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4`}
              >
                {openSlug === family.slug.current && family.attractions.map((item) => (
                  <div
                    key={item._id}
                    className="relative group rounded-xl overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(255,0,150,0.3)] transition bg-white text-center transform hover:scale-105 duration-300"
                  >
                    <Link href={`/attractions/${item.slug.current}`} className="block">
                      <div className="relative w-full h-24 sm:h-28">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="py-2 font-extrabold text-xs sm:text-sm text-gray-800">
                        {item.name}
                      </div>
                    </Link>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                      <Link
                        href={`/attractions/${item.slug.current}`}
                        className="text-[10px] sm:text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-red-600 hover:from-red-600 hover:to-pink-600 px-3 py-1 rounded-full shadow-lg"
                      >
                        לפרטים נוספים
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
