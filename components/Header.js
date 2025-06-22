import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredButton, setHoveredButton] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'בית' },
    { href: '/attractions', label: 'אטרקציות' },
    { href: '/packages', label: 'חבילות' },
    { href: '/gallery', label: 'גלריה' },
    { href: '/reviews', label: 'ביקורות' },
    { href: '/weddings', label: 'חתונות' },
    { href: '/bar-mitzvah', label: 'בר/ת מצוות' },
    { href: '/corporate-events', label: 'אירועי חברה' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50' : 'bg-white/90 backdrop-blur-lg'}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-10 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-8 right-20 w-2 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-2 left-1/3 w-1 h-1 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full animate-ping opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-pulse opacity-40"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link href="/" className="relative group">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  PhotoStyle
                </span>
                <span className="text-xs sm:text-sm text-gray-600 font-medium -mt-1">
                  חוויות צילום ואטרקציות מתקדמות
                </span>
              </div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredButton(index)}
                onMouseLeave={() => setHoveredButton(null)}
                className={`relative group px-3 py-2 font-bold text-base transition-all duration-500 overflow-hidden ${hoveredButton === index ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 transform scale-110' : 'text-gray-800 hover:text-purple-600'}`}>
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 transform transition-transform duration-500 ${hoveredButton === index ? 'scale-x-100' : 'scale-x-0'}`}></div>
                <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent opacity-0 transition-opacity duration-500 ${hoveredButton === index ? 'opacity-100' : ''}`}>
                  {item.label}
                </div>
                <span className="relative z-10 font-bold text-base tracking-wide">{item.label}</span>
                {hoveredButton === index && (
                  <>
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-80"></div>
                    <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping opacity-80 delay-300"></div>
                  </>
                )}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="relative group px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold text-lg rounded-2xl shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <span className="relative z-10 font-bold text-lg tracking-wide">צור קשר</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-80 animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-80 animate-ping delay-200"></div>
            </Link>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative group p-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            <div className="relative z-10 flex items-center space-x-2 rtl:space-x-reverse">
              {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              <span className="font-bold text-sm">תפריט</span>
            </div>
          </button>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-200/50 animate-slideDown">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center p-4 rounded-2xl font-bold text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 group">
                  <span className="font-bold text-base tracking-wide group-hover:text-purple-600 transition-colors duration-300">{item.label}</span>
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center p-5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                <span className="font-bold text-lg tracking-wide">צור קשר</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

