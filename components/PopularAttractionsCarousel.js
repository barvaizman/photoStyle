import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { client } from '../lib/sanity/client';
import imageUrlBuilder from '@sanity/image-url'
import { motion } from 'framer-motion'

const builder = imageUrlBuilder(client)
const urlFor = (source) => builder.image(source)

export default function PopularAttractionsCarousel() {
  const carouselRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [attractions, setAttractions] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsVisible(true)
    const fetchAttractions = async () => {
      try {
        setIsLoading(true)
        const data = await client.fetch(`*[_type == "attraction"] | order(_createdAt desc) [0...12] {
          _id,
          title,
          slug,
          mainImage
        }`)

        if (data && data.length > 0) {
          setAttractions(data)
        } else {
          console.log('No attractions found')
          setAttractions([])
        }
      } catch (error) {
        console.error('Error fetching attractions:', error)
        setAttractions([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchAttractions()
  }, [])

  useEffect(() => {
    if (attractions.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % attractions.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [attractions])

  const scrollToIndex = (index) => {
    setCurrentIndex(index)
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth / 4
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      })
    }
  }

  const scrollLeft = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : attractions.length - 1
    scrollToIndex(newIndex)
  }

  const scrollRight = () => {
    const newIndex = (currentIndex + 1) % attractions.length
    scrollToIndex(newIndex)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  return (
    <>
      {isLoading ? (
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto text-center px-3 sm:px-4">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-lg mb-8"></div>
            </div>
          </div>
        </section>
      ) : attractions.length > 0 ? (
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
              className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-tl from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"
            ></motion.div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto text-center px-3 sm:px-4">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 mb-4 sm:mb-6">
                האטרקציות הפופולריות
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 font-medium">
                האטרקציות הכי מבוקשות לאירועים שלכם ⭐
              </p>
              <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mx-auto rounded-full animate-pulse"></div>
            </motion.div>

            <div className="relative w-full mx-auto">
              {/* Navigation Buttons */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                onClick={scrollLeft}
                className="hidden md:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-10 transform hover:scale-110 group backdrop-blur-sm border border-white/20"
              >
                <FaChevronLeft className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300" />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                onClick={scrollRight}
                className="hidden md:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-orange-500 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-10 transform hover:scale-110 group backdrop-blur-sm border border-white/20"
              >
                <FaChevronRight className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300" />
              </motion.button>

              {/* Carousel */}
              <div
                ref={carouselRef}
                className="flex overflow-x-auto overflow-y-hidden scrollbar-hide gap-4 sm:gap-6 md:gap-8 px-4 sm:px-8 pt-4 sm:pt-8 snap-x snap-mandatory scroll-smooth justify-start md:justify-center"
              >
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex gap-4 sm:gap-6 md:gap-8"
                >
                  {attractions.map((attr, i) => {
                    const attractionSlug = attr.slug?.current || attr._id
                    const imageUrl = attr.mainImage ? urlFor(attr.mainImage).width(300).height(300).url() : '/images/logo.png'
                    
                    return (
                      <motion.div
                        key={attr._id || i}
                        variants={itemVariants}
                        className="snap-start shrink-0 w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48"
                      >
                        <Link
                          href={`/attractions/${attractionSlug}`}
                          className="block group"
                        >
                          <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-purple-400/50 shadow-2xl transform group-hover:rotate-3 duration-500 bg-white group-hover:border-pink-400/50 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(192,132,252,0.6)]">
                            <Image
                              src={imageUrl}
                              alt={attr.title}
                              width={200}
                              height={200}
                              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                              onError={(e) => {
                                e.target.src = '/images/logo.png'
                              }}
                            />
                            
                            {/* Overlay with attraction name */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <div className="p-2 sm:p-4 w-full">
                                <h3 className="text-xs sm:text-sm md:text-base font-black text-white drop-shadow-lg leading-tight group-hover:scale-105 transition-transform duration-300">
                                  {attr.title}
                                </h3>
                              </div>
                            </div>
                            
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            
                            {/* Corner accent */}
                            <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] sm:border-l-[30px] md:border-l-[40px] border-l-transparent border-t-[20px] sm:border-t-[30px] md:border-t-[40px] border-t-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Hover glow effect */}
                            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                          </div>
                          
                          <h3 className="mt-2 sm:mt-4 text-xs sm:text-sm md:text-base lg:text-lg font-black text-gray-800 group-hover:text-purple-600 transition-all duration-300 leading-tight text-center">
                            {attr.title}
                          </h3>
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 sm:mt-8 gap-2 sm:gap-3">
                {attractions.slice(0, Math.min(8, attractions.length)).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToIndex(idx)}
                    className={`h-2 sm:h-3 w-2 sm:w-3 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentIndex 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125 shadow-lg' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
