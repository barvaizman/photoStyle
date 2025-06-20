import Head from 'next/head'

export default function Contact() {
  return (
    <>
      <Head>
        <title>צור קשר - PhotoStyle</title>
        <meta name="description" content="צרו קשר עם צוות PhotoStyle להזמנת עמדות צילום ייחודיות" />
      </Head>
      <main className="p-4 space-y-6 max-w-xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-center">צור קשר</h1>
        <form className="space-y-4">
          <input type="text" placeholder="שם מלא" className="w-full p-2 border rounded" required />
          <input type="email" placeholder="אימייל" className="w-full p-2 border rounded" required />
          <textarea placeholder="הודעה" rows="5" className="w-full p-2 border rounded" required></textarea>
          <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition">
            שלח הודעה
          </button>
        </form>
      </main>
    </>
  )
}