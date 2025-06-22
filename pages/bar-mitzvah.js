import { useState, useEffect } from 'react'
import Head from 'next/head'
import { client } from '../lib/sanity/client'
import { FaStar, FaCamera, FaRocket, FaTrophy, FaMagic, FaInstagram, FaWhatsapp, FaGift } from 'react-icons/fa'

export default function BarMitzvah() {
  const [attractions, setAttractions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        // In the future, this would fetch from eventType
        const query = `*[_type == "attraction"] {
          _id,
          title,
          description,
          mainImage,
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

  const specializations = [
    'אטרקציות אינטראקטיביות לנוער',
    'צילום דינמי ואנרגטי',
    'אפקטים מיוחדים למוזיקה',
    'תאורה צבעונית ומושכת עין',
    'הפקת וידאו קצבי ומרתק'
  ]

  const advantages = [
    'מבחר עצום של אטרקציות לנוער',
    'צוות מקצועי עם ניסיון של 10+ שנים',
    'התאמה אישית לכל ילד/ה',
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-bold text-gray-700">טוען אטרקציות בר/ת מצווה...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>אטרקציות בר/ת מצווה - PhotoStyle</title>
        <meta name="description" content="אטרקציות צילום מתקדמות לבר/ת מצווה - חוויה בלתי נשכחת לכל המשפחה" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tl from-pink-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6">
              <FaStar className="w-16 h-16 text-blue-500 mx-auto animate-pulse" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 sm:mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                אטרקציות בר/ת מצווה
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12">
              הופכים את היום המיוחד לחוויה אנרגטית ובלתי נשכחת עם האטרקציות המתקדמות שלנו
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-8 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg text-center">
                <div className="text-2xl sm:text-4xl font-black text-blue-600 mb-1 sm:mb-2">150+</div>
                <div className="text-xs sm:text-base font-bold text-gray-600">בר/ת מצווה מוצלחים</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg text-center">
                <div className="text-2xl sm:text-4xl font-black text-purple-600 mb-1 sm:mb-2">10+</div>
                <div className="text-xs sm:text-base font-bold text-gray-600">שנות ניסיון</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg text-center">
                <div className="text-2xl sm:text-4xl font-black text-pink-600 mb-1 sm:mb-2">100%</div>
                <div className="text-xs sm:text-base font-bold text-gray-600">משפחות מרוצות</div>
              </div>
            </div>
          </div>
        </section>

        {/* Specializations Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  ההתמחות שלנו
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                אנו מתמחים ביצירת חוויות צילום אנרגטיות ומרתקות לבר/ת מצווה
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {specializations.map((spec, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500">
                      <FaRocket className="w-8 h-8" />
                    </div>
                    <p className="text-gray-700 leading-relaxed font-medium">{spec}</p>
                  </div>

                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-70 animate-ping"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
                היתרון שלנו
              </h2>
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
                אתם בראש שקט - יש לנו את כל המבחר והניסיון הנדרש
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {advantages.map((advantage, index) => (
                <div
                  key={index}
                  className="group relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/20 hover:bg-white/20 transition-all duration-500"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white">
                      <FaTrophy className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">יתרון {index + 1}</h3>
                  </div>
                  <p className="text-white/90 leading-relaxed">{advantage}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl">
              <div className="text-center mb-8 sm:mb-12">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                  <FaGift className="w-10 h-10" />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                    הניסיון שלנו
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
                    במשך יותר מ-10 שנים, הפכנו מאות בר/ת מצווה לחוויות בלתי נשכחות. הצוות שלנו מתמחה בהתאמת האטרקציות המתקדמות ביותר לכל ילד/ה ולכל סגנון אירוע.
                  </p>
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
                    אנחנו יודעים בדיוק איך להתאים את האטרקציות לאופי הילד/ה, לסגנון המשפחה ולמקום האירוע כדי ליצור חוויה מושלמת שתזכר לעד.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="https://wa.me/972501234567?text=שלום%20אני%20מעוניין%20באטרקציות%20לבר/ת%20מצווה"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-3 px-8 py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      <span>קבל הצעה לבר/ת מצווה</span>
                    </a>
                    <a
                      href="tel:+972501234567"
                      className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      <FaMagic className="w-5 h-5" />
                      <span>התקשר עכשיו</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center h-full">
                    <div className="text-2xl font-black text-blue-600 mb-2">150+</div>
                    <div className="text-gray-700 font-bold">בר/ת מצווה מוצלחים</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center h-full">
                    <div className="text-2xl font-black text-purple-600 mb-2">15+</div>
                    <div className="text-gray-700 font-bold">אטרקציות מתקדמות</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-100 to-blue-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center h-full">
                    <div className="text-2xl font-black text-pink-600 mb-2">10+</div>
                    <div className="text-gray-700 font-bold">שנות ניסיון</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center h-full">
                    <div className="text-2xl font-black text-blue-600 mb-2">100%</div>
                    <div className="text-gray-700 font-bold">משפחות מרוצות</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Attractions Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  האטרקציות שלנו
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                מגוון אטרקציות מתקדמות המותאמות במיוחד לבר/ת מצווה
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {attractions.map((attraction, index) => (
                <div
                  key={attraction._id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
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
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {attraction.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
                      {attraction.description}
                    </p>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-2 left-2 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-70 animate-ping"></div>
                  <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-70 animate-ping delay-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 sm:mb-8">
              מוכנים להתחיל?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto">
              צרו איתנו קשר וקבלו הצעה מותאמת אישית לאטרקציות בר/ת מצווה
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <a
                href="https://wa.me/972501234567?text=שלום%20אני%20מעוניין%20באטרקציות%20לבר/ת%20מצווה"
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
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <FaInstagram className="w-5 h-5" />
                <span>אינסטגרם</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
} 