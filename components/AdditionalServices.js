import Link from "next/link";

export default function AdditionalServices() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 overflow-visible">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-12 leading-tight flex justify-center items-center gap-3">
          <span className="text-xl sm:text-2xl">✨</span>
          <span>השירותים הנוספים שלנו</span>
          <span className="text-xl sm:text-2xl">✨</span>
        </h2>

        <div className="grid grid-cols-3 gap-3 sm:gap-5 md:gap-8">
          {/* כרטיס 1 */}
          <div className="bg-white rounded-3xl shadow-2xl hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] transition-all duration-300 p-3 sm:p-4 flex flex-col items-center text-center h-full min-w-0">
            <div className="bg-blue-100/50 rounded-full p-3 shadow-md mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.862 3.487a1.5 1.5 0 0 1 2.121 2.121l-10.5 10.5a1.5 1.5 0 0 1-.53.354l-4.5 1.5a.75.75 0 0 1-.95-.95l1.5-4.5a1.5 1.5 0 0 1 .354-.53l10.5-10.5Z" />
              </svg>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 leading-tight">
              עיצוב הזמנות & תפריטים
            </h3>
            <p className="text-xs text-gray-700 leading-tight mb-4">
              עיצובים מיוחדים להזמנות, תפריטים ועוד
              <span className="hidden sm:inline">, מדבקות ושלטים – בסטייל שמותאם אישית ומשאיר רושם.</span>
            </p>
            <div className="mt-auto">
              <Link href="/design" className="text-xs font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-full px-3 py-1 transition duration-300">
                פרטים
              </Link>
            </div>
          </div>

          {/* כרטיס 2 */}
          <div className="bg-white rounded-3xl shadow-2xl hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] transition-all duration-300 p-3 sm:p-4 flex flex-col items-center text-center h-full min-w-0">
            <div className="bg-green-100/50 rounded-full p-3 shadow-md mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 leading-tight">
              אישורי הגעה לאירועים
            </h3>
            <p className="text-xs text-gray-700 leading-tight mb-4">
              מערכת אישורי הגעה חכמה ב-SMS וואטסאפ ושיחות
              <span className="hidden sm:inline">, שיחות ווואטסאפ – כך תדעו בדיוק מי מגיע וכמה להזמין.</span>
            </p>
            <div className="mt-auto">
              <Link href="/confirmations" className="text-xs font-semibold text-white bg-green-500 hover:bg-green-600 rounded-full px-3 py-1 transition duration-300">
                פרטים
              </Link>
            </div>
          </div>

          {/* כרטיס 3 */}
          <div className="bg-white rounded-3xl shadow-2xl hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] transition-all duration-300 p-3 sm:p-4 flex flex-col items-center text-center h-full min-w-0">
            <div className="bg-pink-100/50 rounded-full p-3 shadow-md mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 19V6h11v2h-9v11H9zM5 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              </svg>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 leading-tight">
              שירותי דיג'יי & מוזיקה
            </h3>
            <p className="text-xs text-gray-700 leading-tight mb-4">
              דיג'יים מקצועיים מהשורה הראשונה במדינה
              <span className="hidden sm:inline">, סאונד מדויק ותאורה עוצמתית – כדי שהרחבה שלכם תישאר מלאה כל הלילה.</span>
            </p>
            <div className="mt-auto">
              <Link href="/dj-services" className="text-xs font-semibold text-white bg-pink-500 hover:bg-pink-600 rounded-full px-3 py-1 transition duration-300">
                פרטים
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
