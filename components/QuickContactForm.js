import { useState, useEffect } from 'react'
import { FaWhatsapp, FaPhone, FaUser } from 'react-icons/fa'

export default function QuickContactForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('phone', phone)

      const res = await fetch('https://script.google.com/macros/s/AKfycbzQpCG1gTn3dafUlC5IIM-oH8x2ADkLUkYgREskf2y9AhBJnYScOus7MkkhqBgBJtx9Qw/exec', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        setSubmitted(true)
        setName('')
        setPhone('')
        new Audio('/sounds/success.mp3').play()
      } else {
        console.error('Error submitting the form')
      }
    } catch (err) {
      console.error('Error sending contact info:', err)
    }
  }

  return (
    <>
      {/* Main Form */}
      <section className="relative z-20 -mt-6 sm:-mt-8 mb-8 sm:mb-12">
        <div className={`max-w-6xl mx-auto px-3 sm:px-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-purple-200/50 overflow-hidden">
            <div className="p-4 sm:p-6 md:p-8">
              {/* Header */}
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 mb-1 sm:mb-2">
                  קבלת פרטים מיידית
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
                  השאירו פרטים וקבלו הצעת מחיר מותאמת אישית ✨
                </p>
              </div>

              {/* Form - All in one row */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-row justify-center items-center gap-2 sm:gap-3 w-full"
              >
                <div className="relative flex-1 max-w-[120px] sm:max-w-[140px] md:max-w-[160px]">
                  <div className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-purple-400">
                    <FaUser className="text-xs sm:text-sm" />
                  </div>
                  <input
                    type="text"
                    placeholder="השם שלך"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-6 sm:pl-8 pr-2 sm:pr-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-purple-200 shadow-lg text-xs sm:text-sm text-center focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    required
                  />
                </div>

                <div className="relative flex-1 max-w-[120px] sm:max-w-[140px] md:max-w-[160px]">
                  <div className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-pink-400">
                    <FaPhone className="text-xs sm:text-sm" />
                  </div>
                  <input
                    type="tel"
                    placeholder="מספר טלפון"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-6 sm:pl-8 pr-2 sm:pr-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-pink-200 shadow-lg text-xs sm:text-sm text-center focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="group relative px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-xs sm:text-sm rounded-lg sm:rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden whitespace-nowrap"
                >
                  <span className="relative z-10">קבלת הצעה מיידית</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <a
                  href={`https://wa.me/972501234567?text=שלום%20אני%20מעוניין%20בפרטים%20על%20האטרקציות`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-black text-xs sm:text-sm rounded-lg sm:rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap"
                >
                  <FaWhatsapp className="text-xs sm:text-sm group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10">ווטסאפ</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {submitted && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center animate-fade-in">
          <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl shadow-3xl px-6 sm:px-8 py-6 sm:py-8 max-w-sm sm:max-w-md w-full text-center animate-scale-in border border-purple-200/50 mx-4">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 animate-bounce">🎉</div>
            <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              תודה שפנית אלינו!
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6 font-medium">
              נחזור אליך בהקדם עם הצעה מותאמת אישית
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="group relative px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">סגור</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
