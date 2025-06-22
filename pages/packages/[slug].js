// pages/packages/[slug].js

import { client } from '../../lib/sanity/client';
import Image from 'next/image';
import Head from 'next/head';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { useState } from 'react';
import ConnectUs from '../../components/connectUs';

export async function getStaticPaths() {
  const data = await client.fetch(`*[_type == "eventPackage" && defined(slug.current)]{ slug }`);
  const paths = data.map((item) => ({ params: { slug: item.slug.current } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const data = await client.fetch(
    `*[_type == "eventPackage" && slug.current == $slug][0]{
      title,
      price,
      mainImage { asset->{url} },
      richDescription,
      attractions[]-> {
        title,
        slug,
        mainImage { asset->{url} },
        gallery[]{ asset->{url} }
      }
    }`,
    { slug: params.slug }
  );

  const allPackages = await client.fetch(`*[_type == "eventPackage" && slug.current != $slug]{
    title,
    slug,
    mainImage { asset->{url} },
    price
  }`, { slug: params.slug });

  if (!data) return { notFound: true };
  return { props: { pkg: data, morePackages: allPackages }, revalidate: 60 };
}

export default function PackagePage({ pkg, morePackages }) {
  const { title, price, mainImage, richDescription, attractions } = pkg;
  const [currentImage, setCurrentImage] = useState(0);

  const galleryImages = attractions ? attractions.flatMap((a) => [a.mainImage, ...(a.gallery || [])].filter(Boolean)) : [];

  const components = {
    block: {
      h2: ({ children }) => (
        <h2 className="text-3xl font-bold bg-pink-50 text-pink-500 rounded-xl py-2 px-4 shadow-sm inline-block w-fit mx-auto mb-4">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-semibold bg-pink-50 text-pink-400 rounded-lg py-1 px-3 shadow-sm inline-block w-fit mx-auto mb-3">
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className="text-lg leading-relaxed text-gray-700 mb-5">{children}</p>
      ),
    },
  };

  return (
    <>
      <main className="bg-white text-center sm:text-right">
        <Head>
          <title>{title} - חבילת אירועים | PhotoStyle</title>
          <meta name="description" content={title} />
          <meta property="og:title" content={`${title} - חבילה`} />
          <meta property="og:description" content={title} />
          <meta property="og:image" content={mainImage?.asset?.url} />
        </Head>

        <div className="relative w-full max-h-[80vh] overflow-hidden">
          <Image
            src={mainImage?.asset?.url || '/images/fallback.jpg'}
            alt={title}
            layout="responsive"
            width={1600}
            height={600}
            className="object-cover w-full h-auto"
          />
          <div className="absolute top-5 right-5 z-10">
            <Link href="/" className="bg-white text-pink-600 font-bold px-4 py-2 rounded-full shadow-lg hover:bg-pink-100 transition">
              חזרה לדף הראשי
            </Link>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-5xl sm:text-6xl font-extrabold drop-shadow-lg">{title}</h1>
            <p className="mt-4 text-4xl sm:text-5xl font-black text-yellow-300 drop-shadow-lg">₪{price}</p>
          </div>
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-pink-600 text-center mt-16 mb-8 drop-shadow-lg">
          אטרקציות כלולות
        </h2>

        <div className="w-full">
          <div className="flex flex-wrap justify-center gap-4">
            {attractions && attractions.map((a, i) => (
              <Link
                key={i}
                href={`/attractions/${a.slug.current}`}
                className="group relative w-[180px] aspect-square bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
              >
                <Image
                  src={a.mainImage?.asset?.url || '/images/fallback.jpg'}
                  alt={a.title}
                  layout="fill"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-sm sm:text-base font-bold drop-shadow-xl text-center px-1">
                    {a.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {galleryImages.length > 0 && (
          <div className="mt-16 px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">גלריית תמונות</h2>

            <div className="mb-6">
              <Image
                src={galleryImages[currentImage]?.asset?.url || galleryImages[currentImage]?.url}
                alt={`תמונה ${currentImage + 1}`}
                width={800}
                height={500}
                className="rounded-xl mx-auto shadow-xl max-w-full"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-4 justify-center">
              {galleryImages.map((img, i) => (
                <Image
                  key={i}
                  src={img?.asset?.url || img?.url}
                  alt={`גלריית אטרקציה ${i + 1}`}
                  width={100}
                  height={80}
                  onClick={() => setCurrentImage(i)}
                  className={`rounded-lg shadow cursor-pointer transition hover:scale-110 ${
                    currentImage === i ? 'ring-4 ring-pink-400' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-16 max-w-5xl mx-auto px-4">
          <PortableText value={richDescription} components={components} />
        </div>

        {morePackages && morePackages.length > 0 && (
          <section className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-[#7e28f2] via-[#d400a7] to-[#ff6b00] mt-20">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-0" />

            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-black text-center text-white mb-14 drop-shadow-2xl tracking-tight">
                חבילות נוספות שאולי תאהבו
              </h2>

              <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto">
                {morePackages.slice(0, 5).map((item) => (
                  <Link
                    key={item.slug.current}
                    href={`/packages/${item.slug.current}`}
                    className="relative group rounded-xl shadow-xl overflow-hidden transition hover:scale-105 bg-white w-[180px] aspect-square"
                  >
                    <Image
                      src={item.mainImage?.asset?.url || '/images/fallback.jpg'}
                      alt={item.title}
                      layout="fill"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 flex items-center justify-center transition">
                      <h4 className="text-white text-sm sm:text-base font-extrabold text-center px-2 drop-shadow-2xl">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <ConnectUs />
    </>
  );
}
