import { useState, useEffect } from 'react'
import Head from 'next/head'
import { client } from '../lib/sanity/client'
import { FaBuilding, FaCamera, FaHandshake, FaChartLine, FaMagic, FaInstagram, FaWhatsapp, FaUsers } from 'react-icons/fa'

export default function CorporateEvents() {
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
    'צילום כנסים ואירועים עסקיים',
    'אטרקציות מתקדמות לגיבוש עובדים',
    'הפקת סרטוני תדמית מקצועיים',
  ]

  const advantages = [
    'צוות דיסקרטי ומנוסה בעבודה מול חברות',
    'עמידה מדויקת בלוחות זמנים',
    'ייצוג המותג שלכם בצורה הטובה ביותר',
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-bold text-gray-700">טוען אטרקציות לאירועי חברה...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>אטרקציות לאירועי חברה - PhotoStyle</title>
        <meta name="description" content="אטרקציות צילום ופתרונות מתקדמים לאירועי חברה, כנסים וימי גיבוש." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-gray-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tl from-gray-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6">
              <FaBuilding className="w-16 h-16 text-blue-800 mx-auto" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 sm:mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-gray-700 to-black">
                אטרקציות לאירועי חברה
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12">
              מעלים את הרמה של האירוע העסקי הבא שלכם עם פתרונות צילום ואטרקציות שמותאמות לעולם העסקים.
            </p>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-8 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg text-center">
                <div className="text-2xl sm:text-4xl font-black text-blue-800 mb-1 sm:mb-2">50+</div>
                <div className="text-xs sm:text-base font-bold text-gray-600">חברות מרוצות</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg text-center">
                <div className="text-2xl sm:text-4xl font-black text-gray-700 mb-1 sm:mb-2">100+</div>
                <div className="text-xs sm:text-base font-bold text-gray-600">אירועים עסקיים</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg text-center">
                <div className="text-2xl sm:text-4xl font-black text-blue-900 mb-1 sm:mb-2">100%</div>
                <div className="text-xs sm:text-base font-bold text-gray-600">מקצועיות</div>
              </div>
            </div>
          </div>
        </section>

        {/* Specializations Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-gray-700 to-black">
                  ההתמחות שלנו
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                אנו מתמחים במתן פתרונות צילום ואטרקציות ייחודיות המותאמות לעולם העסקי.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {specializations.map((spec, index) => (
                <div key={index} className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-800 to-gray-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500">
                      <FaCamera className="w-8 h-8" />
                    </div>
                    <p className="text-gray-700 leading-relaxed font-medium">{spec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-900 via-gray-800 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
                היתרון שלנו
              </h2>
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
                אתם בידיים טובות - אנחנו מבינים את העולם העסקי.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {advantages.map((advantage, index) => (
                <div key={index} className="group relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/20 hover:bg-white/20 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white">
                      <FaHandshake className="w-6 h-6" />
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
                <div className="w-20 h-20 bg-gradient-to-r from-blue-800 to-gray-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                  <FaChartLine className="w-10 h-10" />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-gray-700 to-black">
                    הניסיון שלנו
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
                    עם ניסיון רב בעבודה מול החברות המובילות במשק, אנו יודעים לספק שירות מקצועי, דיסקרטי ואיכותי שעונה על הסטנדרטים הגבוהים ביותר של עולם העסקים.
                  </p>
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
                    אנו מתאימים את האטרקציות ופתרונות הצילום למטרות האירוע, בין אם מדובר בכנס מקצועי, אירוע השקה או יום גיבוש לעובדים.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="https://wa.me/972501234567?text=שלום%20אני%20מעוניין%20באטרקציות%20לאירוע%20חברה" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-3 px-8 py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                      <FaWhatsapp className="w-5 h-5" />
                      <span>קבל הצעת מחיר</span>
                    </a>
                    <a href="tel:+972501234567" className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-800 to-gray-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                      <FaMagic className="w-5 h-5" />
                      <span>התקשר עכשיו</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-100 to-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center h-full">
                    <div className="text-2xl font-black text-blue-800 mb-2">50+</div>
                    <div className="text-gray-700 font-bold">חברות מובילות</div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-100 to-blue-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center h-full">
                    <div className="text-2xl font-black text-gray-700 mb-2">20+</div>
                    <div className="text-gray-700 font-bold">סוגי אטרקציות</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center h-full">
                    <div className="text-2xl font-black text-blue-900 mb-2">10+</div>
                    <div className="text-gray-700 font-bold">שנות ניסיון</div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-100 to-blue-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center h-full">
                    <div className="text-2xl font-black text-gray-700 mb-2">100%</div>
                    <div className="text-gray-700 font-bold">עמידה בזמנים</div>
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-gray-700 to-black">
                  האטרקציות שלנו
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                מגוון פתרונות צילום ואטרקציות שישדרגו כל אירוע עסקי.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {attractions.map((attraction, index) => (
                <div key={attraction._id} className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={attraction.imageUrl} alt={attraction.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-800 transition-colors duration-300">{attraction.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 line-clamp-2">{attraction.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-900 via-gray-800 to-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 sm:mb-8">
              מוכנים לשדרג את האירוע הבא?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto">
              צרו קשר לקבלת הצעה מותאמת אישית לאירוע החברה שלכם.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <a href="https://wa.me/972501234567?text=שלום%20אני%20מעוניין%20באטרקציות%20לאירוע%20חברה" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-3 px-8 py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <FaWhatsapp className="w-5 h-5" />
                <span>דברו איתנו בוואטסאפ</span>
              </a>
              <a href="https://instagram.com/Photostyle.il" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-blue-800 font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <FaInstagram className="w-5 h-5" />
                <span>עקבו אחרינו באינסטגרם</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
} 