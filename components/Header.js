import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header className="bg-gradient-to-l from-pink-500 to-purple-600 sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* לוגו */}
        <div className="flex items-center">
          <Link href="/" className="block w-36 md:w-44">
            <Image
              src="/images/logo.png"
              alt="PhotoStyle Logo"
              width={160}
              height={40}
              priority
              className="w-full h-auto object-contain drop-shadow-sm"
            />
          </Link>
        </div>

        {/* מובייל */}
        <div className="flex md:hidden gap-2 items-center">
          <Link href="/attractions" className="px-3 py-2 text-white font-bold text-sm">
            אטרקציות
          </Link>
          <Link href="/contact" className="px-3 py-2 rounded-full bg-purple-700 text-white font-bold text-sm shadow hover:bg-purple-800">
            צור קשר
          </Link>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-3 py-2 text-white font-bold text-sm"
          >
            ☰
          </button>
        </div>

        {/* דסקטופ */}
        <ul className="hidden md:flex gap-4 text-sm font-semibold">
          <li>
            <Link href="/attractions" className="inline-block px-4 py-2 text-white font-bold text-base">
              אטרקציות
            </Link>
          </li>
          <li className="relative">
            <Link href="/packages" className="inline-block px-4 py-2 text-white font-bold text-base">
              חבילות
            </Link>
            <span className="absolute -top-2 -right-2 text-xs text-yellow-300 font-bold animate-pulse drop-shadow-sm">
              🎉
            </span>
          </li>
          <li className="relative">
            <Link href="/bar-mitzvah" className="inline-block px-4 py-2 text-white font-bold text-base">
              בר/ת מצוות
            </Link>
            <span className="absolute -top-2 -right-2 text-xs text-yellow-300 font-bold animate-pulse drop-shadow-sm">
              🔥
            </span>
          </li>
          <li>
            <Link href="/corporate-events" className="inline-block px-4 py-2 text-white font-bold text-base">
              אירועי חברה
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="inline-block px-4 py-2 text-white font-bold text-base">
              גלריה
            </Link>
          </li>
          <li>
            <Link href="/reviews" className="inline-block px-4 py-2 text-white font-bold text-base">
              חוות דעת
            </Link>
          </li>
          <li>
            <Link href="/contact" className="inline-block px-4 py-2 rounded-full bg-purple-700 text-white hover:bg-purple-800 font-bold text-base shadow">
              צור קשר
            </Link>
          </li>
        </ul>
      </nav>

      {/* תפריט Dropdown במובייל */}
      {dropdownOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <div className="relative text-center">
            <Link href="/packages" className="block px-4 py-2 text-white font-bold">
              חבילות
            </Link>
            <span className="absolute -top-2 -right-2 text-xs text-yellow-300 font-bold animate-pulse drop-shadow-sm">
              🎉
            </span>
          </div>
          <div className="relative text-center">
            <Link href="/bar-mitzvah" className="block px-4 py-2 text-white font-bold">
              בר/ת מצוות
            </Link>
            <span className="absolute -top-2 -right-2 text-xs text-yellow-300 font-bold animate-pulse drop-shadow-sm">
              🔥
            </span>
          </div>
          <Link href="/corporate-events" className="block px-4 py-2 text-white text-center font-bold">
            אירועי חברה
          </Link>
          <Link href="/gallery" className="block px-4 py-2 text-white text-center font-bold">
            גלריה
          </Link>
          <Link href="/reviews" className="block px-4 py-2 text-white text-center font-bold">
            חוות דעת
          </Link>
        </div>
      )}
    </header>
  )
}
