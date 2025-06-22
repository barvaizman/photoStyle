import { client } from '../../lib/sanity/client'
import Image from 'next/image'
import Head from 'next/head'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaArrowRight, FaStar, FaUsers, FaCamera, FaVideo, FaLightbulb, FaMusic, FaCrown, FaCheck, FaPhone, FaWhatsapp, FaInstagram } from 'react-icons/fa'
import ConnectUs from '../../components/connectUs'

export async function getStaticPaths() {
  const data = await client.fetch(`*[_type == "additionalService" && defined(slug.current)]{ slug }`)
  const paths = data.map((item) => ({ params: { slug: item.slug.current } }))
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const service = await client.fetch(`*[_type == "additionalService" && slug.current == $slug][0]{
    title,
    shortDescription,
    richDescription,
    price,
    mainImage { asset->{url} },
    gallery[]{ asset->{url} }
  }`, { slug: params.slug })

  // Fallback content if no service found in Sanity
  if (!service) {
    const fallbackServices = {
      'professional-photography': {
        title: 'צילום מקצועי',
        shortDescription: 'צילום איכותי עם ציוד מתקדם לכל סוגי האירועים',
        richDescription: [
          {
            _type: 'block',
            style: 'h1',
            children: [{ _type: 'span', text: 'צילום מקצועי לאירועים' }]
          },
          {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: 'אנו מתמחים בצילום מקצועי לכל סוגי האירועים - חתונות, בר מצוות, אירועים עסקיים ועוד. הצוות שלנו מצויד בציוד המתקדם ביותר ומתמחה בצילום איכותי שישמר לכם זיכרונות יקרים לכל החיים.' }]
          },
          {
            _type: 'block',
            style: 'h2',
            children: [{ _type: 'span', text: 'מה כלול בשירות?' }]
          },
          {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: '• צילום מקצועי עם מצלמות DSLR מתקדמות\n• עריכה מקצועית של כל התמונות\n• אלבום דיגיטלי איכותי\n• תמונות מודפסות באיכות גבוהה\n• שירות אישי ומקצועי לאורך כל האירוע' }]
          }
        ],
        price: 1500,
        mainImage: { asset: { url: '/images/logo.png' } },
        gallery: []
      },
      'video-production': {
        title: 'הפקת וידאו',
        shortDescription: 'הפקת סרטוני אירועים מקצועיים עם עריכה מתקדמת',
        richDescription: [
          {
            _type: 'block',
            style: 'h1',
            children: [{ _type: 'span', text: 'הפקת וידאו מקצועית' }]
          },
          {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: 'הפקת וידאו מקצועית לאירועים שלכם. אנו מציעים שירותי צילום וידאו ועריכה מתקדמת שיהפכו את האירוע שלכם לסרטון מקצועי ומרגש.' }]
          }
        ],
        price: 2500,
        mainImage: { asset: { url: '/images/logo.png' } },
        gallery: []
      },
      'advanced-lighting': {
        title: 'תאורה מתקדמת',
        shortDescription: 'מערכות תאורה מתקדמות ליצירת אווירה מושלמת',
        richDescription: [
          {
            _type: 'block',
            style: 'h1',
            children: [{ _type: 'span', text: 'תאורה מתקדמת לאירועים' }]
          },
          {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: 'מערכות תאורה מתקדמות שיוצרות אווירה מושלמת לאירוע שלכם. תאורה דינמית, צבעונית ומתקדמת שתהפוך כל אירוע לחוויה בלתי נשכחת.' }]
          }
        ],
        price: 800,
        mainImage: { asset: { url: '/images/logo.png' } },
        gallery: []
      },
      'sound-system': {
        title: 'הגברה ומוזיקה',
        shortDescription: 'מערכות הגברה איכותיות ומוזיקת רקע מותאמת',
        richDescription: [
          {
            _type: 'block',
            style: 'h1',
            children: [{ _type: 'span', text: 'מערכות הגברה ומוזיקה' }]
          },
          {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: 'מערכות הגברה איכותיות ומוזיקת רקע מותאמת לכל סוגי האירועים. איכות סאונד מעולה ואווירה מוזיקלית מושלמת.' }]
          }
        ],
        price: 1200,
        mainImage: { asset: { url: '/images/logo.png' } },
        gallery: []
      },
      'vip-service': {
        title: 'שירות VIP',
        shortDescription: 'שירות פרימיום עם תשומת לב אישית לכל פרט',
        richDescription: [
          {
            _type: 'block',
            style: 'h1',
            children: [{ _type: 'span', text: 'שירות VIP פרימיום' }]
          },
          {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: 'שירות VIP פרימיום עם תשומת לב אישית לכל פרט. חבילה יוקרתית הכוללת את כל השירותים שלנו ברמה הגבוהה ביותר.' }]
          }
        ],
        price: 3000,
        mainImage: { asset: { url: '/images/logo.png' } },
        gallery: []
      },
      'custom-packages': {
        title: 'חבילות מותאמות',
        shortDescription: 'חבילות מותאמות אישית לכל סוגי האירועים',
        richDescription: [
          {
            _type: 'block',
            style: 'h1',
            children: [{ _type: 'span', text: 'חבילות מותאמות אישית' }]
          },
          {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: 'חבילות מותאמות אישית לכל סוגי האירועים. אנו מתאימים את השירותים לצרכים הספציפיים שלכם ולתקציב שלכם.' }]
          }
        ],
        price: 2000,
        mainImage: { asset: { url: '/images/logo.png' } },
        gallery: []
      }
    }

    const fallbackService = fallbackServices[params.slug]
    if (fallbackService) {
      return { props: { service: fallbackService }, revalidate: 60 }
    }
  }

  if (!service) return { notFound: true }
  return { props: { service }, revalidate: 60 }
}

export default function ServicePage({ service }) {
  const {
    title,
    shortDescription,
    richDescription,
    price,
    mainImage,
    gallery,
  } = service

  const validGallery = Array.isArray(gallery) ? gallery : []
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const components = {
    block: {
      h1: ({ children }) => (
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent rounded-lg sm:rounded-xl py-2 px-3 sm:px-4 shadow-md inline-block w-fit mx-auto mb-4 sm:mb-6">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent rounded-lg py-2 px-3 sm:px-4 shadow-sm inline-block w-fit mx-auto mb-3 sm:mb-4">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent rounded-lg py-1 px-2 sm:px-3 shadow-sm inline-block w-fit mx-auto mb-2 sm:mb-3">
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className="text-base sm:text-lg leading-relaxed text-gray-700 mb-4 sm:mb-5">
          {children}
        </p>
      ),
    },
  }

  const stats = [
    { number: '500+', label: 'אירועים מוצלחים', icon: FaUsers },
    { number: '98%', label: 'לקוחות מרוצים', icon: FaStar },
    { number: '24/7', label: 'תמיכה זמינה', icon: FaPhone },
    { number: '5+', label: 'שנות ניסיון', icon: FaCrown }
  ]

  const features = [
    'ציוד מקצועי מתקדם',
    'צוות מנוסה ומוסמך',
    'שירות אישי ומקצועי',
    'מחירים תחרותיים',
    'גמישות מלאה',
    'תמיכה טכנית מלאה'
  ]

  const testimonials = [
    {
      name: 'שרה כהן',
      event: 'חתונה',
      text: 'השירות היה פשוט מושלם! הצוות מקצועי מאוד והתוצאות מדהימות.',
      rating: 5
    },
    {
      name: 'דוד לוי',
      event: 'בר מצווה',
      text: 'איכות מעולה ומחירים הוגנים. ממליץ בחום!',
      rating: 5
    },
    {
      name: 'מיכל רוזן',
      event: 'אירוע עסקי',
      text: 'שירות מקצועי ואיכותי. האירוע היה הצלחה גדולה.',
      rating: 5
    }
  ]

  return (
    <>
      <main className="bg-white text-center sm:text-right relative overflow-hidden">
        <Head>
          <title>{title} - שירותים נוספים | PhotoStyle</title>
          <meta name="description" content={shortDescription || title} />
          <meta property="og:title" content={`${title} - שירותים נוספים`} />
          <meta property="og:description" content={shortDescription || title} />
          <meta property="og:image" content={mainImage?.asset?.url} />
        </Head>

        {/* Back Button */}
        <div className="absolute top-4 right-4 z-50">
          <Link href="/">
            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-sm sm:text-lg rounded-xl sm:rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden backdrop-blur-sm border border-white/20"
            >
              <FaArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              <span className="relative z-10">חזרה לדף הבית</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Elements */}
          <motion.div 
            style={{ y }}
            className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900"
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute top-40 right-40 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>
          </motion.div>

          {/* Main Image */}
          <div className="absolute inset-0">
            <Image
              src={mainImage?.asset?.url || mainImage?.url}
              alt={`${title} - תמונה`}
              layout="fill"
              objectFit="cover"
              className="opacity-30"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 sm:mb-8 drop-shadow-2xl">
                {title}
              </h1>
              {shortDescription && (
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-12 max-w-4xl mx-auto drop-shadow-lg">
                  {shortDescription}
                </p>
              )}
              {price && (
                <div className="mb-8 sm:mb-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 sm:px-12 py-4 sm:py-6 rounded-2xl sm:rounded-3xl shadow-2xl"
                  >
                    <span className="text-2xl sm:text-4xl md:text-5xl font-black">
                      החל מ־{price}₪
                    </span>
                  </motion.div>
                </div>
              )}
              
              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
              >
                <Link href="/contact">
                  <button className="group relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-lg sm:text-xl rounded-xl sm:rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                    <span className="relative z-10">צרו קשר עכשיו</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </Link>
                <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer">
                  <button className="group relative px-8 sm:px-12 py-4 sm:py-6 bg-green-500 text-white font-black text-lg sm:text-xl rounded-xl sm:rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                    <FaWhatsapp className="inline-block ml-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="relative z-10">ווטסאפ</span>
                  </button>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              ></motion.div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-200/30 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 mb-4">
                למה לבחור בנו?
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center group"
                  >
                    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-100">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500 mx-auto mb-3 sm:mb-4">
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                      </div>
                      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                        {stat.number}
                      </div>
                      <div className="text-xs sm:text-sm md:text-base font-bold text-gray-700">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Tab Navigation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-8 sm:mb-12">
              {[
                { id: 'overview', label: 'סקירה כללית' },
                { id: 'features', label: 'תכונות' },
                { id: 'testimonials', label: 'המלצות' },
                { id: 'gallery', label: 'גלריה' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl font-bold text-xs sm:text-sm md:text-base transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px] sm:min-h-[400px]">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-4xl mx-auto"
                >
                  {richDescription && (
                    <PortableText value={richDescription} components={components} />
                  )}
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-lg mr-3 sm:mr-4">
                          <FaCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-sm sm:text-lg md:text-xl font-bold text-gray-800">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'testimonials' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-6xl mx-auto"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {testimonials.map((testimonial, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-purple-100"
                      >
                        <div className="flex justify-center mb-3 sm:mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <FaStar key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 italic">"{testimonial.text}"</p>
                        <div className="text-center">
                          <div className="font-bold text-gray-800 text-sm sm:text-base">{testimonial.name}</div>
                          <div className="text-xs sm:text-sm text-gray-600">{testimonial.event}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'gallery' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-6xl mx-auto"
                >
                  {validGallery.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                      {validGallery.map((img, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="group cursor-pointer"
                        >
                          <Image
                            src={img?.asset?.url || img?.url}
                            alt={`${title} גלריה ${i + 1}`}
                            width={300}
                            height={200}
                            className="rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300 w-full h-32 sm:h-40 md:h-48 object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 sm:py-12">
                      <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📸</div>
                      <p className="text-lg sm:text-xl text-gray-600">גלריה תתווסף בקרוב</p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#7e28f2] via-[#d400a7] to-[#ff6b00] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
            <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 lg:mb-8 drop-shadow-2xl"
            >
              מוכנים להתחיל?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 lg:mb-12 drop-shadow-lg"
            >
              צרו קשר עכשיו ונשמח לעמוד לרשותכם עם כל הפרטים והמחירים
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 justify-center items-center max-w-md sm:max-w-lg mx-auto"
            >
              <Link href="/contact">
                <button className="group relative w-full px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 bg-white text-purple-600 font-black text-base sm:text-lg md:text-xl rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10">צרו קשר עכשיו</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
              <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer" className="w-full">
                <button className="group relative w-full px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 bg-green-500 text-white font-black text-base sm:text-lg md:text-xl rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <FaWhatsapp className="inline-block ml-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10">ווטסאפ</span>
                </button>
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      
      <ConnectUs />
    </>
  )
} 