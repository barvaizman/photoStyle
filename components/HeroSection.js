// components/HeroSection.js

import { useState, useEffect } from 'react'
import { FaWhatsapp, FaPhone, FaCamera, FaGift } from 'react-icons/fa'
import Link from 'next/link'

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const heroImages = [
    '/images/hero/bagTora.jpeg',
    '/images/hero/hichalTora.jpeg',
    '/images/hero/lettersRing.jpeg'
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[45vh] sm:h-[55vh] md:h-[65vh] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600"></div>
      
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 via-pink-600/30 to-orange-600/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <div className={`text-center px-4 sm:px-6 md:px-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          {/* Main Title - More Emphasized */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 md:mb-8 leading-tight drop-shadow-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 animate-pulse">
              PhotoStyle
            </span>
          </h1>
          
          {/* Subtitle - More Bold */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-black mb-8 sm:mb-12 md:mb-16 max-w-5xl mx-auto leading-relaxed drop-shadow-2xl">
            אטרקציות צילום מתקדמות לאירועים בלתי נשכחים
          </p>

          {/* CTA Buttons - Smaller and redesigned */}
          <div className="flex flex-row justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 flex-wrap mt-auto">
            <Link 
              href="/attractions"
              className="group relative px-4 sm:px-5 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold text-sm sm:text-base rounded-xl shadow-xl transform hover:scale-110 hover:-translate-y-1 transition-all duration-500 overflow-hidden border-2 border-white/20 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <FaCamera className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-white/80 group-hover:scale-125 transition-transform duration-300" />
              <span className="relative z-10 pl-6 sm:pl-7">אטרקציות צילום</span>
            </Link>

            <Link 
              href="/packages"
              className="group relative px-4 sm:px-5 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold text-sm sm:text-base rounded-xl shadow-xl transform hover:scale-110 hover:-translate-y-1 transition-all duration-500 overflow-hidden border-2 border-white/20 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <FaGift className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-white/80 group-hover:scale-125 transition-transform duration-300" />
              <span className="relative z-10 pl-6 sm:pl-7">חבילות אירועים</span>
            </Link>

            <a
              href="tel:+972523351678"
              className="group relative px-4 sm:px-5 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold text-sm sm:text-base rounded-xl shadow-xl transform hover:scale-110 hover:-translate-y-1 transition-all duration-500 overflow-hidden border-2 border-white/20 backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <FaPhone className="text-sm sm:text-base group-hover:scale-125 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">התקשר עכשיו</span>
            </a>

            <a
              href={`https://wa.me/972523351678?text=%D7%94%D7%99%D7%99%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%2C%20%D7%90%D7%A4%D7%A9%D7%A8%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%9C%D7%90%D7%99%D7%A8%D7%95%D7%A2%20%D7%A9%D7%9C%D7%A0%D7%95%20%3F`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-4 sm:px-5 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-xl transform hover:scale-110 hover:-translate-y-1 transition-all duration-500 overflow-hidden border-2 border-white/20 backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-700 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <FaWhatsapp className="text-sm sm:text-base group-hover:scale-125 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">ווטסאפ</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
