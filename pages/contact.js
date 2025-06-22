import { useState } from 'react'
import Head from 'next/head'
import { FaWhatsapp, FaPhone, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('phone', formData.phone);
      data.append('eventType', formData.eventType);
      data.append('message', formData.message);

      const res = await fetch('https://script.google.com/macros/s/AKfycbzqJBBdObABi5VzG7gb4G15YBQDcxGi7g8ulEpiRuWArTMgA-B-vV053Lkia9chG_Q6Mg/exec', {
        method: 'POST',
        body: data,
      })

      if (res.ok) {
        setSuccess(true)
        setFormData({
          name: '',
          phone: '',
          eventType: '',
          message: ''
        })
      } else {
        console.error('Error submitting form to Google Sheets');
        // Optionally, add some user-facing error message here
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Head>
        <title>צור קשר - PhotoStyle</title>
        <meta name="description" content="צרו איתנו קשר לקבלת הצעה מותאמת אישית" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tl from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 sm:mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
                צור קשר
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              נשמח לעזור לכם ליצור אירוע בלתי נשכח עם האטרקציות המתקדמות שלנו
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="pb-20 sm:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl">
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8 text-center">
                  שלחו לנו הודעה
                </h2>

                {success ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaPaperPlane className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">ההודעה נשלחה בהצלחה!</h3>
                    <p className="text-gray-600 mb-6">נחזור אליכם בהקדם האפשרי</p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      שלח הודעה נוספת
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">שם מלא *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300"
                          placeholder="הכנס את שמך המלא"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">טלפון *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300"
                          placeholder="הכנס מספר טלפון"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">סוג אירוע</label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300"
                      >
                        <option value="">בחר סוג אירוע</option>
                        <option value="חתונה">חתונה</option>
                        <option value="בר/ת מצווה">בר/ת מצווה</option>
                        <option value="אירוע חברה">אירוע חברה</option>
                        <option value="יום הולדת">יום הולדת</option>
                        <option value="אחר">אחר</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">הודעה</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300 resize-none"
                        placeholder="באילו אטרקציות אתם מתעניינים?"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          שולח...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="w-5 h-5" />
                          שלח הודעה
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                {/* Quick Contact Buttons */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-2xl font-black text-gray-900 mb-6 text-center">צרו קשר מהיר</h3>
                  <div className="space-y-4">
                    <p className="text-gray-600 mb-8 max-w-lg mx-auto">נשמח לשמוע מכם! מלאו את הטופס או השתמשו באחת הדרכים ליצירת קשר מהיר.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <a href="https://wa.me/972523351678?text=%D7%94%D7%99%D7%99%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%2C%20%D7%90%D7%A4%D7%A9%D7%A8%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%9C%D7%90%D7%99%D7%A8%D7%95%D7%A2%20%D7%A9%D7%9C%D7%A0%D7%95%20%3F" target="_blank" rel="noopener noreferrer" className="bg-green-100 text-green-800 p-4 rounded-lg flex items-center justify-center space-x-2 space-x-reverse hover:bg-green-200 transition-colors">
                            <FaWhatsapp className="w-6 h-6" />
                            <span className="font-semibold">דברו איתנו בווטסאפ</span>
                        </a>
                        <a href="tel:+972523351678" className="bg-blue-100 text-blue-800 p-4 rounded-lg flex items-center justify-center space-x-2 space-x-reverse hover:bg-blue-200 transition-colors">
                            <FaPhone className="w-5 h-5" />
                            <span className="font-semibold">התקשרו אלינו</span>
                        </a>
                        <a href="https://instagram.com/Photostyle.il" target="_blank" rel="noopener noreferrer" className="bg-pink-100 text-pink-800 p-4 rounded-lg flex items-center justify-center space-x-2 space-x-reverse hover:bg-pink-200 transition-colors">
                            <FaInstagram className="w-5 h-5" />
                            <span className="font-semibold">עקבו באינסטגרם</span>
                        </a>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-2xl font-black text-gray-900 mb-6 text-center">פרטי התקשרות</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-xl flex items-center justify-center text-white">
                        <FaPhone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">טלפון</div>
                        <div className="text-gray-600">+972523351678</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-xl flex items-center justify-center text-white">
                        <FaEnvelope className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">אימייל</div>
                        <div className="text-gray-600">photostyle38@gmail.com</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-xl flex items-center justify-center text-white">
                        <FaMapMarkerAlt className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">כתובת</div>
                        <div className="text-gray-600">ראשון לציון</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-xl flex items-center justify-center text-white">
                        <FaClock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">שעות פתיחה</div>
                        <div className="text-gray-600">תמיד</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}