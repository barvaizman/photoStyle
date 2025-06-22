import { useState, useEffect } from 'react'
import Head from 'next/head'
import { client } from '../../lib/sanity/client'
import { FaStar } from 'react-icons/fa'
import { motion } from 'framer-motion'
import ConnectUs from '../../components/connectUs'

// דמו לביקורות במידה ואין נתונים מהשרת
const sampleReviews = [
  {
    _id: '1',
    author: 'דנה כהן',
    quote: 'חוויה מדהימה! הצוות היה מקצועי, התמונות יצאו מהממות והאורחים לא הפסיקו להחמיא.',
    event_type: 'חתונה',
    rating: 5,
    imageUrl: '/images/reviews/1.jpg',
  },
  {
    _id: '2',
    author: 'יוסי לוי',
    quote: 'הזמנו את השירות לבר מצווה, הילדים עפו על זה! תודה רבה!',
    event_type: 'בר מצווה',
    rating: 5,
    imageUrl: '/images/reviews/2.jpg',
  },
  {
    _id: '3',
    author: 'נועה ישראלי',
    quote: 'הכל היה מושלם, החל מהשירות ועד לאיכות התמונות. ממליצה בחום!',
    event_type: 'אירוע חברה',
    rating: 4,
    imageUrl: '/images/reviews/3.jpg',
  },
  {
    _id: '4',
    author: 'רועי בן דוד',
    quote: 'צוות מקצועי, שירות אדיב, חוויה בלתי נשכחת!',
    event_type: 'חתונה',
    rating: 5,
    imageUrl: '/images/reviews/4.jpg',
  },
  {
    _id: '5',
    author: 'שיר אלון',
    quote: 'הפתעה מושלמת לאורחים, כולם יצאו מרוצים!',
    event_type: 'יום הולדת',
    rating: 5,
    imageUrl: '/images/reviews/5.jpg',
  },
  {
    _id: '6',
    author: 'איתי כהן',
    quote: 'הזמנו לאירוע חברה, השירות היה ברמה גבוהה מאוד!',
    event_type: 'אירוע חברה',
    rating: 4,
    imageUrl: '/images/reviews/6.jpg',
  },
]

export default function Reviews({ reviews: initialReviews }) {
  const [reviews, setReviews] = useState(initialReviews && initialReviews.length > 0 ? initialReviews : sampleReviews)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  }

  const renderStars = (rating) => (
    <div className="flex justify-center mb-2">
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
      ))}
    </div>
  )

  return (
    <>
      <Head>
        <title>המלצות לקוחות | PhotoStyle</title>
        <meta name="description" content="המלצות לקוחות מרוצים על השירותים שלנו - צילום, אטרקציות ואירועים מושלמים." />
        <meta name="keywords" content="המלצות לקוחות, ביקורות, צילום אירועים, אטרקציות, PhotoStyle" />
        <meta property="og:title" content="המלצות לקוחות | PhotoStyle" />
        <meta property="og:description" content="המלצות לקוחות מרוצים על השירותים שלנו" />
        <meta property="og:image" content="/images/logo.png" />
        <link rel="canonical" href="https://photostyle.co.il/reviews" />
      </Head>

      <div className="relative min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50 overflow-hidden pt-24 sm:pt-32 pb-16">
        {/* Floating Shapes */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <motion.div initial={{ opacity: 0, y: -100, x: '15%' }} animate={{ opacity: 1, y: 0, x: '15%' }} transition={{ duration: 2, ease: "easeInOut" }} className="absolute top-1/4 left-[15%] w-32 h-32 bg-purple-200/50 rounded-full blur-3xl"></motion.div>
          <motion.div initial={{ opacity: 0, y: 100, x: '85%' }} animate={{ opacity: 1, y: 0, x: '85%' }} transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-1/3 right-[15%] w-48 h-48 bg-pink-200/50 rounded-full blur-3xl"></motion.div>
          <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 2, ease: "easeInOut", delay: 1 }} className="absolute top-1/2 left-[25%] w-24 h-24 bg-orange-200/50 rounded-xl blur-3xl"></motion.div>
        </div>

        <main className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-6xl font-black text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
              המלצות לקוחות
            </h1>
            <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto">
              מה הלקוחות שלנו אומרים על השירותים שלנו ⭐
            </p>
          </motion.div>

          {reviews && reviews.length > 0 ? (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {reviews.map((review, index) => (
                <motion.div
                  key={review._id || index}
                  variants={itemVariants}
                  className="group bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 h-full flex flex-col"
                >
                  {/* תמונה של צילום מסך (להוספה עתידית) */}
                  {/*
                  {review.screenshotUrl && (
                    <div className="w-full h-32 sm:h-40 md:h-48 overflow-hidden flex items-center justify-center bg-gray-100">
                      <img src={review.screenshotUrl} alt="צילום מסך של הודעת המלצה" className="object-contain w-full h-full" />
                    </div>
                  )}
                  */}
                  <div className="p-4 sm:p-6 flex-grow flex flex-col">
                    {/* דירוג */}
                    {renderStars(review.rating || 5)}
                    {/* טקסט הביקורת */}
                    <div className="flex-grow">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 italic text-center">
                        "{review.quote || 'שירות מעולה ומקצועי! ממליץ בחום.'}"
                      </p>
                    </div>
                    {/* פרטי הלקוח */}
                    <div className="text-center mt-auto">
                      <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-1">
                        {review.author || 'לקוח מרוצה'}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {review.event_type || 'אירוע מוצלח'}
                      </p>
                    </div>
                  </div>
                  {/* Hover Effects */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-400 rounded-xl sm:rounded-2xl transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(192,132,252,0.8)]"></div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-700">לא נמצאו המלצות</h3>
              <p className="text-gray-500 mt-2">נשמח לקבל את ההמלצה הראשונה שלכם!</p>
            </div>
          )}
        </main>
      </div>
      <ConnectUs />
    </>
  )
}

export async function getStaticProps() {
  try {
    const query = `*[_type == "review"] | order(_createdAt desc) [0..5]{
      _id,
      author,
      quote,
      event_type,
      rating,
      "imageUrl": image.asset->url
    }`
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