import Link from "next/link";
import { useState, useEffect } from "react";
import { FaCamera, FaVideo, FaLightbulb, FaMusic, FaCrown, FaStar } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function AdditionalServices() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: FaCamera,
      title: 'צילום מקצועי',
      description: 'צילום איכותי עם ציוד מתקדם לכל סוגי האירועים',
      slug: 'professional-photography',
      price: 1500
    },
    {
      icon: FaVideo,
      title: 'הפקת וידאו',
      description: 'הפקת סרטוני אירועים מקצועיים עם עריכה מתקדמת',
      slug: 'video-production',
      price: 2500
    },
    {
      icon: FaLightbulb,
      title: 'תאורה מתקדמת',
      description: 'מערכות תאורה מתקדמות ליצירת אווירה מושלמת',
      slug: 'advanced-lighting',
      price: 800
    },
    {
      icon: FaMusic,
      title: 'הגברה ומוזיקה',
      description: 'מערכות הגברה איכותיות ומוזיקת רקע מותאמת',
      slug: 'sound-system',
      price: 1200
    },
    {
      icon: FaCrown,
      title: 'שירות VIP',
      description: 'שירות פרימיום עם תשומת לב אישית לכל פרט',
      slug: 'vip-service',
      price: 3000
    },
    {
      icon: FaStar,
      title: 'חבילות מותאמות',
      description: 'חבילות מותאמות אישית לכל סוגי האירועים',
      slug: 'custom-packages',
      price: 2000
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-200/30 rounded-full blur-3xl"
        ></motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
              שירותים נוספים
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            מגוון שירותים מקצועיים להשלמת חווית האירוע המושלמת
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-200"
              >
                <Link href={`/services/${service.slug}`} className="block">
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-purple-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    {service.price && (
                      <div className="text-right">
                        <span className="text-lg sm:text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
                          החל מ־₪{service.price}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-70 animate-ping"></div>
                  <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-70 animate-ping delay-300"></div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
}
