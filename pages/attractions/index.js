import Head from 'next/head'
import { client } from '../../lib/sanityClient'

export default function Attractions({ attractions }) {
  return (
    <>
      <Head>
        <title>אטרקציות לאירועים - PhotoStyle</title>
        <meta name="description" content="אטרקציות ייחודיות לצילום באירועים מכל הסוגים" />
      </Head>
      <main className="p-4 space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center">האטרקציות שלנו</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {attractions.map((item) => (
            <div key={item._id} className="bg-white rounded shadow p-4 text-center">
              <img src={item.imageUrl} alt={item.title} className="rounded mb-2 w-full h-48 object-cover" />
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-sm text-gray-700">{item.description}</p>
              <p className="text-pink-600 font-semibold mt-2">מחיר: ₪{item.price}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const query = '*[_type == "attraction"]{_id, title, description, price, "imageUrl": image.asset->url}'
  const attractions = await client.fetch(query)
  return {
    props: {
      attractions
    },
    revalidate: 60
  }
}