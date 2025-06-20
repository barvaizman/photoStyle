import Head from 'next/head'
import { client } from '../../lib/sanityClient'

export default function Packages({ packages }) {
  return (
    <>
      <Head>
        <title>חבילות צילום לאירועים - PhotoStyle</title>
        <meta name="description" content="מבחר חבילות משתלמות הכוללות מספר אטרקציות ומבצעים מיוחדים" />
      </Head>
      <main className="p-4 space-y-6">
        <h1 className="text-2xl md:text-4xl font-bold text-center">החבילות שלנו</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <div key={pkg._id} className="bg-white rounded shadow p-4 text-center">
              <h2 className="text-xl font-bold text-pink-600 mb-2">{pkg.title}</h2>
              <p className="text-sm text-gray-600 mb-1">{pkg.description}</p>
              <ul className="text-sm text-gray-800 list-disc list-inside mb-2">
                {pkg.attractions.map((att, index) => (
                  <li key={index}>{att}</li>
                ))}
              </ul>
              <p className="text-green-600 font-semibold">מבצע: {pkg.deal}</p>
              <p className="text-pink-500 font-bold mt-1">מחיר: ₪{pkg.price}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const query = '*[_type == "package"]{_id, title, description, attractions, deal, price}'
  const packages = await client.fetch(query)
  return {
    props: {
      packages
    },
    revalidate: 60
  }
}