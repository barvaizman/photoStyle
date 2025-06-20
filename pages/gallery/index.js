import Head from 'next/head'
import { client } from '../../lib/sanity/client'

export default function Gallery({ images }) {
  return (
    <>
      <Head>
        <title>גלריית תמונות - PhotoStyle</title>
        <meta name="description" content="הצצה לתמונות מאירועים עם עמדות הצילום שלנו" />
      </Head>
      <main className="p-4 space-y-6">
        <h1 className="text-2xl md:text-4xl font-bold text-center">גלריה</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img) => (
            <div key={img._id} className="overflow-hidden rounded shadow hover:scale-105 transition-transform duration-300 ease-in-out">
              <img src={img.imageUrl} alt="gallery" className="w-full h-40 object-cover" />
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const query = '*[_type == "galleryImage"]{_id, "imageUrl": image.asset->url}'
  const images = await client.fetch(query)
  return {
    props: {
      images
    },
    revalidate: 60
  }
}