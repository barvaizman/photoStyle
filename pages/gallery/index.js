import { useState, useEffect } from 'react'
import Head from 'next/head'
import { client } from '../../lib/sanity/client'
import { FaCamera, FaHeart, FaShare, FaInstagram, FaWhatsapp, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

export default function Gallery() {
  const [attractions, setAttractions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const query = `*[_type == "attraction"] {
          _id,
          title,
          description,
          mainImage,
          category,
          "imageUrl": mainImage.asset->url
        }`
        const data = await client.fetch(query)
        setAttractions(data)
      } catch (error) {
        console.error('Error fetching attractions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAttractions()
  }, [])

  const categories = ['all', ...new Set(attractions.map(attraction => attraction.category).filter(Boolean))]
  const filteredAttractions = filter === 'all' ? attractions : attractions.filter(attraction => attraction.category === filter)

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }
    
    if (selectedImage) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-bold text-gray-700">טוען גלריה...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>גלריה - PhotoStyle</title>
        <meta name="description" content="גלריה מרהיבה של אטרקציות צילום מתקדמות" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tl from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 sm:mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
                גלריה מרהיבה
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12">
              צפו במגוון האטרקציות המתקדמות שלנו ותנו לדמיון שלכם לטוס
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
                    filter === category
                      ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white shadow-lg transform scale-105'
                      : 'bg-white/80 text-gray-700 hover:bg-white hover:text-purple-600 shadow-md hover:shadow-lg'
                  }`}
                >
                  {category === 'all' ? 'הכל' : category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="pb-20 sm:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredAttractions.length === 0 ? (
              <div className="text-center py-20">
                <FaCamera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-600 mb-2">לא נמצאו תמונות</h3>
                <p className="text-gray-500">נסו לשנות את הפילטר או לחזור מאוחר יותר</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredAttractions.map((attraction, index) => (
                  <motion.div
                    key={attraction._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                    onClick={() => setSelectedImage(attraction)}
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={attraction.imageUrl}
                        alt={attraction.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Action buttons */}
                      <div className="absolute top-4 right-4 flex space-x-2 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300">
                          <FaHeart className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300">
                          <FaShare className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                        {attraction.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
                        {attraction.description}
                      </p>
                      
                      {/* Category badge */}
                      {attraction.category && (
                        <div className="mt-3 sm:mt-4">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-bold rounded-full">
                            {attraction.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Floating elements */}
                    <div className="absolute top-2 left-2 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-70 animate-ping"></div>
                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-70 animate-ping delay-300"></div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 sm:mb-8">
              רוצים לראות עוד?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto">
              צרו איתנו קשר וקבלו הצעה מותאמת אישית לאטרקציות המתקדמות שלנו
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <a
                href="https://wa.me/972523351678?text=%D7%94%D7%99%D7%99%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%2C%20%D7%90%D7%A4%D7%A9%D7%A8%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%9C%D7%90%D7%99%D7%A8%D7%95%D7%A2%20%D7%A9%D7%9C%D7%A0%D7%95%20%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>ווטסאפ</span>
              </a>
              
              <a
                href="https://instagram.com/Photostyle.il"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-purple-600 font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <FaInstagram className="w-5 h-5" />
                <span>אינסטגרם</span>
              </a>
            </div>
          </div>
        </section>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-full">
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                  <p className="text-white/90">{selectedImage.description}</p>
                </div>
                
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const query = '*[_type == "galleryImage"]{_id, "imageUrl": image.asset->url}'
  const images = await client.fetch(query)
  return {
    props: {
      images
    },
    revalidate: 60
  }
}