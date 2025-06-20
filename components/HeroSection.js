import { useEffect, useState } from 'react'

export default function HeroSection() {
  const imageList = [
    '/images/hero/bagTora.jpeg',
    '/images/hero/boothTree.jpeg',
    '/images/hero/fruits.jpeg',
    '/images/hero/glasses.jpeg',
    '/images/hero/hichalTora.jpeg',
    '/images/hero/laser.jpeg',
    '/images/hero/lettersFlower.jpeg',
    '/images/hero/lettersRing.jpeg',
    '/images/hero/lights.jpeg',
    '/images/hero/miniMi.jpeg',
    '/images/hero/slow.jpeg',
    '/images/hero/smokeColor.jpeg',
    '/images/hero/strip3.jpeg',
    '/images/hero/tora.jpeg',
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageList.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [imageList.length])

  return (
    <section
      className="relative bg-white py-20 px-4 text-center"
        style={{
        backgroundImage: "url('/images/hero-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* שכבת כהות */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* כרטיסייה עם תוכן */}
      <div className="relative z-10 max-w-6xl mx-auto rounded-3xl bg-[#fff1f3]/90 border border-[#f2c5c5] shadow-[0_20px_60px_rgba(220,79,116,0.4)] backdrop-blur-md p-6 md:p-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 transition-all duration-500">

        {/* תמונה קטנה (ימין) */}
        <div className="w-28 md:w-44 h-28 md:h-44 border-2 border-[#ffb9c5] rounded-xl overflow-hidden shadow-xl">
          <img
            src={imageList[currentIndex]}
            alt="תמונה ראשית"
            className="w-full h-full object-cover"
          />
        </div>

        {/* תוכן */}
        <div className="text-center max-w-xl flex flex-col items-center text-gray-800">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 leading-snug text-center">
  אז למה בעצם לבחור  
  <br className="md:hidden" />
  <span className="block text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-[#dc4f74] via-[#ff4f73] to-[#dc4f74] text-transparent bg-clip-text mt-1 md:mt-0">
    פוטו סטייל ?
  </span>
</h2>


          <p className="text-gray-700 mb-5 text-sm md:text-lg leading-relaxed font-semibold max-w-md">
            עם <span className="text-[#dc4f74] font-bold">ניסיון עשיר</span>, <span className="text-[#dc4f74] font-bold">ציוד חדשני</span> ואנשי מקצוע מהשורה הראשונה – נהפוך את ה<span className="underline font-bold">אירוע</span> שלכם ל־
            <span className="text-[#ff4f73] font-bold"> בלתי נשכח</span>. הכל במקום אחד: <span className="text-[#dc4f74] font-semibold">אטרקציות</span>, <span className="text-[#dc4f74] font-semibold">צילום</span>, <span className="text-[#dc4f74] font-semibold">הפקה</span> ו־<span className="text-[#dc4f74] font-semibold">חוויה מלאה</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-6 text-sm">
            {['אטרקציות', 'תמונות', 'אירועי חברה', 'בר/ת מצווה', 'חתונות'].map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full border border-[#dc4f74] text-[#dc4f74] bg-[#ffe9ef] font-medium shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-[#dc4f74] hover:bg-[#b6385d] text-white px-6 py-3 rounded-full font-bold shadow-lg transition duration-300 text-sm md:text-base">
              קבלת הצעת מחיר
            </button>
            <button className="bg-[#fddcb5] hover:bg-[#f6cfa2] text-gray-900 px-6 py-3 rounded-full font-bold shadow-lg transition duration-300 text-sm md:text-base">
              שירותים נוספים
            </button>
          </div>
        </div>

        {/* תמונה שמאל – רספונסיבית */}
        <div className="hidden md:block w-44 h-44 border-2 border-[#ffb9c5] rounded-xl overflow-hidden shadow-xl">
          <img
            src={imageList[(currentIndex + 1) % imageList.length]}
            alt="תמונה שנייה"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
