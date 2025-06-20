import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { client } from '../lib/sanity/client';
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)
const urlFor = (source) => builder.image(source)

export default function PopularAttractionsCarousel() {
  const carouselRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [attractions, setAttractions] = useState([])

  useEffect(() => {
    const fetchAttractions = async () => {
      const data = await client.fetch(`*[_type == "popularAttractions"][0]{
        attractions[]-> {
          title,
          slug,
          mainImage
        }
      }`)

      if (data?.attractions) {
        setAttractions(data.attractions)
      }
    }

    fetchAttractions()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % attractions.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [attractions])

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth / 3
      carouselRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      })
    }
  }, [currentIndex])

  const scrollLeft = () => {
    const cardWidth = carouselRef.current?.offsetWidth / 3
    carouselRef.current?.scrollBy({ left: -cardWidth, behavior: 'smooth' })
  }

  const scrollRight = () => {
    const cardWidth = carouselRef.current?.offsetWidth / 3
    carouselRef.current?.scrollBy({ left: cardWidth, behavior: 'smooth' })
  }

  return (
    <section className="py-16 px-4 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-10 animate-fade-in">
        האטרקציות הפופולריות
      </h2>

      <div className="relative w-full mx-auto">
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-pink-500 text-white p-3 rounded-full shadow-2xl hover:bg-pink-600 transition z-10"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={scrollRight}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-pink-500 text-white p-3 rounded-full shadow-2xl hover:bg-pink-600 transition z-10"
        >
          <FaChevronRight />
        </button>

        <div
          ref={carouselRef}
          className="flex overflow-x-auto overflow-y-hidden scrollbar-hide gap-10 px-10 pt-10 snap-x snap-mandatory scroll-smooth justify-center"
        >
          {attractions.map((attr, i) => (
            <Link
              href={`/attractions/${attr.slug?.current || ''}`}
              key={i}
              className="snap-start shrink-0 w-24 sm:w-28 md:w-36 flex flex-col items-center group transition-transform hover:scale-105"
            >
              <div className="w-full aspect-square rounded-full overflow-hidden border-4 border-pink-400 shadow-[0_10px_50px_rgba(255,0,128,0.5)] transform group-hover:rotate-3 duration-500 bg-white">
                <Image
                  src={urlFor(attr.mainImage).width(300).height(300).url()}
                  alt={attr.title}
                  width={180}
                  height={180}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="mt-3 text-sm sm:text-base md:text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-all">
                {attr.title}
              </h3>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {attractions.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-pink-500 scale-125' : 'bg-gray-300'}`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  )
}
