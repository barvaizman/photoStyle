import { useState, useEffect } from 'react'
import Head from 'next/head'
import { client } from '../../lib/sanity/client'
import { FaStar, FaQuoteLeft, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  // Sample reviews data (fallback) - only 6 reviews
  const sampleReviews = [
    {
      _id: 1,
      author: 'שרה כהן',
      imageUrl: '/images/hero/bagTora.jpeg',
      rating: 5,
      event_type: 'חתונה',
      quote: 'האטרקציות היו פשוט מדהימות! כל האורחים היו בהלם מהצילומים המתקדמים. צוות מקצועי ואיכותי ביותר.',
      date: '2024-01-15'
    },
    {
      _id: 2,
      author: 'דוד לוי',
      imageUrl: '/images/hero/hichalTora.jpeg',
      rating: 5,
      event_type: 'בר מצווה',
      quote: 'אירוע הבר מצווה של הבן שלי היה מושלם בזכות האטרקציות. הצילומים יצאו מקצועיים ומרהיבים.',
      date: '2024-01-10'
    },
    {
      _id: 3,
      author: 'מיכל רוזן',
      imageUrl: '/images/hero/lettersRing.jpeg',
      rating: 5,
      event_type: 'יום הולדת',
      quote: 'האטרקציות הוסיפו המון אווירה לאירוע. הצילומים היו יצירתיים ומקוריים. מומלץ בחום!',
      date: '2024-01-08'
    },
    {
      _id: 4,
      author: 'יוסי גולדברג',
      imageUrl: '/images/hero/fruits.jpeg',
      rating: 5,
      event_type: 'אירוע חברה',
      quote: 'צוות מקצועי ואיכותי. האטרקציות היו מתקדמות וכל העובדים נהנו מאוד. שירות מעולה!',
      date: '2024-01-05'
    },
    {
      _id: 5,
      author: 'נועה אברהם',
      imageUrl: '/images/hero/glasses.jpeg',
      rating: 5,
      event_type: 'חתונה',
      quote: 'החלטנו על PhotoStyle ברגע האחרון ולא התחרטנו. האטרקציות היו הכוכב של האירוע!',
      date: '2024-01-03'
    },
    {
      _id: 6,
      author: 'עמית שפירא',
      imageUrl: '/images/hero/laser.jpeg',
      rating: 5,
      event_type: 'בר מצווה',
      quote: 'איכות מעולה, שירות אדיב ומקצועי. האטרקציות הוסיפו המון ערך לאירוע. תודה!',
      date: '2023-12-28'
    }
  ]

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Try to fetch from Sanity first - only 6 reviews
        const query = `*[_type == "review"] | order(_createdAt desc) [0..5] {
          _id,
          author,
          quote,
          event_type,
          rating,
          "imageUrl": image.asset->url
        }`
        const data = await client.fetch(query)
        
        // If we got data from Sanity, use it; otherwise use sample data
        if (data && data.length > 0) {
          setReviews(data)
        } else {
          setReviews(sampleReviews)
        }
      } catch (error) {
        console.error('Error fetching reviews:', error)
        setReviews(sampleReviews)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-bold text-gray-700">טוען ביקורות...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>ביקורות - PhotoStyle</title>
        <meta name="description" content="ביקורות לקוחות על האטרקציות המתקדמות שלנו" />
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
                מה הלקוחות אומרים
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12">
              ביקורות אמיתיות מלקוחות מרוצים שחוו את האטרקציות המתקדמות שלנו
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl sm:text-4xl font-black text-purple-600 mb-2">500+</div>
                <div className="text-gray-600 font-bold">אירועים מוצלחים</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl sm:text-4xl font-black text-pink-600 mb-2">4.9</div>
                <div className="text-gray-600 font-bold">דירוג ממוצע</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl sm:text-4xl font-black text-orange-600 mb-2">100%</div>
                <div className="text-gray-600 font-bold">לקוחות מרוצים</div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="pb-20 sm:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Quote icon */}
                  <div className="relative z-10 mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                      <FaQuoteLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>

                  {/* Review content */}
                  <div className="relative z-10 mb-4">
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
                      "{review.quote}"
                    </p>
                    
                    {/* Stars */}
                    <div className="flex items-center mb-3">
                      {renderStars(review.rating || 5)}
                    </div>
                  </div>

                  {/* Author section */}
                  <div className="relative z-10 flex items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden mr-3">
                      <img
                        src={review.imageUrl}
                        alt={review.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">{review.author}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{review.event_type}</p>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-70 animate-ping"></div>
                  <div className="absolute bottom-2 left-2 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-70 animate-ping delay-300"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 sm:mb-8">
              רוצים להיות הבאים?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto">
              צרו איתנו קשר וקבלו הצעה מותאמת אישית לאטרקציות המתקדמות שלנו
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <a
                href="https://wa.me/972501234567?text=שלום%20אני%20מעוניין%20בפרטים%20על%20האטרקציות"
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
      </div>
    </>
  )
}

export async function getStaticProps() {
  try {
    const query = `*[_type == "review"] | order(_createdAt desc) [0..5]`
    const reviews = await client.fetch(query)
    
    return {
      props: {
        reviews: reviews || []
      },
      revalidate: 60
    }
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return {
      props: {
        reviews: []
      },
      revalidate: 60
    }
  }
}