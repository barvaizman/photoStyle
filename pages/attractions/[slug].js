import { client } from '../../lib/sanity/client'
import Image from 'next/image'
import Head from 'next/head'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import ConnectUs from '../../components/connectUs'
import Card from '../../components/Card'

export async function getStaticPaths() {
  const data = await client.fetch(`*[_type == "attraction" && defined(slug.current)]{ slug }`)
  const paths = data.map((item) => ({ params: { slug: item.slug.current } }))
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const attraction = await client.fetch(`*[_type == "attraction" && slug.current == $slug][0]{
    _id,
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
    related = await client.fetch(`*[_type == "attraction" && references($familyId) && _id != $attractionId][0...5]{
      title,
      slug,
      mainImage { asset->{url} }
    }`, {
      familyId: attraction.familyId,
      attractionId: attraction._id
    })
  }

  // Fetch packages that include this attraction
  let includedPackages = []
  if (attraction) {
    includedPackages = await client.fetch(`*[_type == "eventPackage" && references($attractionId)]{
      title,
      slug,
      shortDescription,
      price,
      mainImage { asset->{url} }
    }`, { attractionId: attraction._id })
  }

  if (!attraction) return { notFound: true }
  return { props: { attraction: { ...attraction, related, includedPackages } }, revalidate: 60 }
}

export default function AttractionPage({ attraction }) {
  const {
    title,
    richDescription,
    price,
    mainImage,
    gallery,
    related,
    includedPackages,
  } = attraction

  const validGallery = Array.isArray(gallery) ? gallery : []
  const images = [mainImage, ...validGallery]

  const [currentIndex, setCurrentIndex] = useState(0)

  const components = {
    block: {
      h1: ({ children }) => (
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-pink-100 text-rose-600 rounded-lg sm:rounded-xl py-2 px-3 sm:px-4 shadow-md inline-block w-fit mx-auto mb-4 sm:mb-6">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-pink-50 text-pink-500 rounded-lg py-2 px-3 sm:px-4 shadow-sm inline-block w-fit mx-auto mb-3 sm:mb-4">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold bg-pink-50 text-pink-400 rounded-lg py-1 px-2 sm:px-3 shadow-sm inline-block w-fit mx-auto mb-2 sm:mb-3">
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className="text-base sm:text-lg leading-relaxed text-gray-700 mb-4 sm:mb-5">
          {children}
        </p>
      ),
    },
  }

  return (
    <>
      <main className="bg-white text-center sm:text-right">
        <Head>
          <title>{title} - אטרקציות לאירועים | PhotoStyle</title>
          <meta name="description" content={title} />
          <meta property="og:title" content={`${title} - אטרקציות`} />
          <meta property="og:description" content={title} />
          <meta property="og:image" content={mainImage?.asset?.url} />
        </Head>

        {/* Back Button */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20">
          <Link href="/attractions">
            <button className="group relative px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-sm sm:text-lg rounded-lg sm:rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden backdrop-blur-sm border border-white/20">
              <FaArrowRight className="inline-block ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              <span className="relative z-10">חזרה לאטרקציות</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
        </div>

        {/* תמונה ראשית עם fade חזק בשליש התחתון */}
        <div className="relative w-full max-h-[60vh] sm:max-h-[80vh] overflow-hidden">
          <Image
            src={mainImage?.asset?.url || mainImage?.url}
            alt={`${title} - תמונה`}
            layout="responsive"
            width={1600}
            height={600}
            className="object-cover w-full h-auto"
          />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent to-white pointer-events-none" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-3 sm:px-4">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-yellow-400 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            >
              ✨ החל מ־{price}₪ ✨
            </motion.p>
          </div>
        </div>

        {/* קרוסלת גלריה נפרדת */}
        {validGallery.length > 0 && (
          <div className="flex overflow-x-auto gap-2 sm:gap-3 mt-6 sm:mt-8 py-2 px-3 sm:px-4 justify-center">
            {validGallery.map((img, i) => (
              <Image
                key={i}
                src={img?.asset?.url || img?.url}
                alt={`${title} גלריה ${i + 1}`}
                width={150}
                height={90}
                className="rounded-lg sm:rounded-xl cursor-pointer transition hover:scale-105 shadow-lg"
              />
            ))}
          </div>
        )}

        {/* תיאור עשיר */}
        <div className="text-center mt-12 sm:mt-16 max-w-4xl sm:max-w-5xl mx-auto px-3 sm:px-4">
          <PortableText value={richDescription} components={components} />
        </div>

        {/* חבילות כלולות */}
        {includedPackages?.length > 0 && (
          <section className="relative py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 bg-gradient-to-b from-orange-50 via-pink-50 to-purple-50 mt-12 sm:mt-16 md:mt-20">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="flex items-center justify-center mb-4">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
                    חבילות כלולות
                  </h2>
                </div>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                  האטרקציה הזו כלולה בחבילות הבאות - בדקו אותן!
                </p>
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
                {includedPackages.map((pkg, index) => (
                  <Card
                    key={pkg.slug?.current || index}
                    linkTo={`/packages/${pkg.slug?.current || pkg._id}`}
                    imageUrl={pkg.mainImage?.asset?.url}
                    title={pkg.title}
                    price={pkg.price}
                    description={pkg.shortDescription}
                    imageContainerClassName="relative h-32 sm:h-48 md:h-56 overflow-hidden"
                    motionProps={{
                      initial: { opacity: 0, y: 30 },
                      whileInView: { opacity: 1, y: 0 },
                      transition: { duration: 0.6, delay: index * 0.1 },
                      viewport: { once: true }
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* אטרקציות דומות */}
        {related?.length > 0 && (
          <section className="relative py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 bg-gradient-to-b from-[#7e28f2] via-[#d400a7] to-[#ff6b00] mt-12 sm:mt-16 md:mt-20">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-0" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center text-white mb-8 sm:mb-12 md:mb-14 drop-shadow-2xl tracking-tight">
                אטרקציות נוספות שאולי תאהבו
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 max-w-7xl mx-auto">
                {related.map((item) => (
                  <Card
                    key={item.slug.current}
                    linkTo={`/attractions/${item.slug.current}`}
                    imageUrl={item.mainImage?.asset.url}
                    title={item.title}
                    containerClassName="relative group rounded-lg sm:rounded-xl shadow-xl overflow-hidden transition hover:scale-105 bg-white h-full"
                    imageContainerClassName="relative w-full h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48"
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <ConnectUs />
    </>
  )
}
