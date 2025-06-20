import { client } from '../../lib/sanity/client'
import Image from 'next/image'
import Head from 'next/head'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

export async function getStaticPaths() {
  const data = await client.fetch(`*[_type == "attraction" && defined(slug.current)]{ slug }`)
  const paths = data.map((item) => ({ params: { slug: item.slug.current } }))
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const attraction = await client.fetch(`*[_type == "attraction" && slug.current == $slug][0]{
    title,
    shortDescription,
    richDescription,
    price,
    mainImage { asset->{url} },
    gallery[]{ asset->{url} },
    family->{ title, _id },
    "familyId": family._ref
  }`, { slug: params.slug })

  let related = []
  if (attraction?.familyId) {
    related = await client.fetch(`*[_type == "attraction" && references($familyId) && slug.current != $slug]{
      title,
      slug,
      mainImage { asset->{url} }
    }`, {
      familyId: attraction.familyId,
      slug: params.slug,
    })
  }

  if (!attraction) return { notFound: true }
  return { props: { attraction: { ...attraction, related } }, revalidate: 60 }
}

export default function AttractionPage({ attraction }) {
  const {
    title,
    shortDescription,
    richDescription,
    price,
    mainImage,
    gallery,
    related,
  } = attraction

  const validGallery = Array.isArray(gallery) ? gallery : []
  const images = [mainImage, ...validGallery]

  const [currentIndex, setCurrentIndex] = useState(0)
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <main className="bg-gradient-to-b from-[#fff7fa] to-white px-4 py-10 sm:px-8 text-center sm:text-right">
      <Head>
        <title>{title} - אטרקציות לאירועים | PhotoStyle</title>
        <meta name="description" content={shortDescription} />
        <meta property="og:title" content={`${title} - אטרקציות`} />
        <meta property="og:description" content={shortDescription} />
        <meta property="og:image" content={mainImage?.asset?.url} />
      </Head>

      {/* חזרה לדף הבית */}
      <div className="mb-6 text-right">
        <Link href="/" className="inline-block bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-full hover:bg-gray-300 transition">
          ← חזרה לדף הראשי
        </Link>
      </div>

      {/* תוכן עליון */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* טקסט */}
        <div className="order-2 md:order-1 flex flex-col gap-6">
          <motion.div
            className="p-6 rounded-xl bg-[#fff5f5] border shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-rose-500 mb-3 animate-pulse">
              {title}
            </h1>
            <p className="text-gray-800 text-xl font-bold">{shortDescription}</p>
          </motion.div>

          <div className="flex flex-col gap-4 items-center md:items-start">
            <motion.p
              className="text-[2.6rem] font-extrabold text-yellow-500 animate-bounce text-center md:text-right"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              החל מ־{price}₪
            </motion.p>
            <Link
              href={`https://wa.me/972501234567?text=שלום, אשמח לקבל פרטים על ${title}`}
              target="_blank"
              className="inline-block bg-green-700 text-white font-bold text-lg py-3 px-8 rounded-full shadow-lg hover:scale-105 hover:bg-green-800 transition"
            >
              📲 דברו איתנו בוואטסאפ
            </Link>
          </div>
        </div>

        {/* תמונה וקרוסלה */}
        <div className="order-1 md:order-2 flex flex-col items-center">
          <div className="rounded-2xl shadow-[0_15px_60px_rgba(0,0,0,0.25)] overflow-hidden transition duration-500">
            <Image
              src={images[currentIndex]?.asset?.url || images[currentIndex]?.url}
              alt={`${title} - תמונה`}
              width={800}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>

          {images.length > 1 && (
            <>
              <div className="flex justify-center gap-6 mt-4">
                <button onClick={prevImage} className="text-2xl text-pink-600 hover:text-pink-800 transition">❮</button>
                <button onClick={nextImage} className="text-2xl text-pink-600 hover:text-pink-800 transition">❯</button>
              </div>
              <div className="flex overflow-x-auto gap-3 mt-4 py-2 px-1 justify-center">
                {images.map((img, i) => (
                  <Image
                    key={i}
                    src={img?.asset?.url || img?.url}
                    alt={`${title} ${i + 1}`}
                    width={100}
                    height={100}
                    className={`rounded-xl cursor-pointer transition hover:scale-105 border-2 ${i === currentIndex ? 'border-pink-500' : 'border-transparent'}`}
                    onClick={() => setCurrentIndex(i)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* תיאור מעוצב */}
      <div className="prose text-center mt-16 max-w-5xl mx-auto text-gray-800 prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h1:text-rose-600 prose-h2:text-pink-500 prose-h3:text-pink-400 prose-h1:font-extrabold prose-h2:font-bold prose-h3:font-bold prose-p:text-lg prose-p:font-semibold prose-p:text-gray-700 prose-h1:font-[sans-serif] prose-h2:font-[sans-serif] prose-h3:font-[sans-serif]">
        <PortableText value={richDescription} />
      </div>

      {/* אטרקציות דומות */}
      {related?.length > 0 && (
  <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-rose-200 to-pink-100 mt-20">
    <h2 className="text-4xl font-extrabold text-center text-pink-700 mb-12 drop-shadow-lg">
      🎉 אטרקציות נוספות שאולי תאהבו
    </h2>

    <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 max-w-7xl mx-auto">
      {related.map((item) => (
        <Link
          key={item.slug.current}
          href={`/attractions/${item.slug.current}`}
          className="relative group rounded-xl shadow-xl overflow-hidden transition hover:scale-105 bg-white"
        >
          <Image
            src={item.mainImage.asset.url}
            alt={item.title}
            width={400}
            height={400}
            className="object-cover w-full h-40 sm:h-44 md:h-48 lg:h-52"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 flex items-center justify-center transition">
            <h4 className="text-white text-xl sm:text-2xl font-extrabold text-center px-2 drop-shadow-2xl">
              {item.title}
            </h4>
          </div>
        </Link>
      ))}
    </div>
  </section>
)}

    
    </main>
  )
}
