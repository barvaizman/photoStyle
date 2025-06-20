// components/AttractionFamilies.js

import { useEffect, useState } from 'react'
import { client } from '../lib/sanity/client';
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function AttractionFamilies() {
  const [families, setFamilies] = useState([])
  const [selectedFamily, setSelectedFamily] = useState(null)

  useEffect(() => {
    const fetchFamilies = async () => {
      const data = await client.fetch(`*[_type == "attractionFamily"]{
        _id,
        title,
        slug,
        mainImage{
          asset->{url}
        },
        "attractions": *[_type == "attraction" && references(^._id)]{
          title,
          slug,
          mainImage {
            asset->{url}
          }
        }
      }`)
      setFamilies(data)
    }
    fetchFamilies()
  }, [])

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#fff7f9] to-[#fff] text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-10">משפחות האטרקציות</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {families.map((family) => (
          <button
            key={family._id}
            onClick={() => setSelectedFamily(family)}
            className="group bg-white rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105"
          >
            {family.mainImage?.asset?.url && (
              <div className="aspect-square relative w-full">
                <Image
                  src={family.mainImage.asset.url}
                  alt={family.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-sm md:text-base lg:text-lg font-bold text-gray-800 group-hover:text-pink-600 transition">
                {family.title}
              </h3>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selectedFamily && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="mt-16 max-w-6xl mx-auto text-right"
          >
            <div className="flex justify-between items-center mb-4 px-4">
              <h3 className="text-2xl font-bold text-pink-500">
                אטרקציות במשפחת {selectedFamily.title}
              </h3>
              <button
                onClick={() => setSelectedFamily(null)}
                className="text-sm text-pink-600 font-semibold hover:underline"
              >
                ← חזור לרשימת המשפחות
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4">
              {selectedFamily.attractions.map((attr) => (
                <Link
                  href={`/attractions/${attr.slug.current}`}
                  key={attr.slug.current}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition hover:scale-105"
                >
                  {attr.mainImage?.asset?.url && (
                    <div className="aspect-square relative w-full">
                      <Image
                        src={attr.mainImage.asset.url}
                        alt={attr.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <h4 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 group-hover:text-pink-600 transition">
                      {attr.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
