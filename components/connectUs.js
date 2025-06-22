import Link from 'next/link';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';

export default function ConnectUs() {
  return (
    <>
      {/* Add bottom padding to prevent content from being covered */}
      <div className="h-16 sm:h-20"></div>
      
      <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 text-white shadow-2xl backdrop-blur-md border-t border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3 flex justify-around items-center">
          <Link
            href="https://wa.me/972523351678"
            target="_blank"
            className="group relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg sm:rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <FaWhatsapp className="text-sm sm:text-lg group-hover:scale-110 transition-transform duration-300" />
            <span className="font-black text-xs sm:text-sm">שלח הודעה בוואטסאפ</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Link>

          <a
            href="tel:+972523351678"
            className="group relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <FaPhone className="text-sm sm:text-lg group-hover:scale-110 transition-transform duration-300" />
            <span className="font-black text-xs sm:text-sm">התקשר עכשיו</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </a>
        </div>
      </footer>
    </>
  );
}
