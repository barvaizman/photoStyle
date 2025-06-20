import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

export default function QuickContactForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

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
      {/* טופס ראשי */}
      <section className="bg-white -mt-10 z-20 relative shadow-xl rounded-3xl max-w-2xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-2 border border-pink-300">
        <div className="text-pink-600 text-sm sm:text-lg md:text-xl font-semibold text-center w-full animate-fade-in">
          <span>לקבלת פרטים על כל סוג אטרקציה</span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-center items-center gap-2 w-full md:w-auto"
        >
          <input
            type="text"
            placeholder="שם"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-center px-3 py-1.5 rounded-full border border-pink-400 shadow-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300 w-28 sm:w-36 hover:scale-105"
            required
          />
          <input
            type="tel"
            placeholder="טלפון"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="text-center px-3 py-1.5 rounded-full border border-pink-400 shadow-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300 w-28 sm:w-36 hover:scale-105"
            required
          />
          <button
            type="submit"
            className="bg-pink-600 text-white px-4 py-1.5 rounded-full font-bold shadow hover:bg-pink-700 transition-all duration-300 text-xs sm:text-sm hover:scale-105 animate-pulse"
          >
            שליחה
          </button>
          <a
            href={`https://wa.me/972501234567?text=שלום%20אני%20מעוניין%20בפרטים%20על%20האטרקציות`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-2 sm:px-3 py-1.5 rounded-full font-bold shadow hover:bg-[#1ebe5d] transition-all duration-300 flex items-center justify-center text-xs sm:text-sm animate-bounce hover:scale-110"
          >
            <FaWhatsapp className="text-sm sm:text-lg" />
          </a>
        </form>
      </section>

      {/* מודאל תודה */}
      {submitted && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-6 max-w-sm w-full text-center animate-scale-in">
            <div className="text-green-600 text-4xl mb-3 animate-bounce">✔️</div>
            <h2 className="text-xl font-bold mb-2 text-pink-600 animate-fade-in">נחזור אליך בהקדם!</h2>
            <p className="text-gray-600 text-sm mb-4">תודה שפנית אלינו. מייד ניצור קשר.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-2 bg-pink-600 text-white px-6 py-2 rounded-full shadow hover:bg-pink-700 transition hover:scale-105"
            >
              סגור
            </button>
          </div>
        </div>
      )}
    </>
  )
}
