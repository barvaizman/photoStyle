// pages/packages/index.js

import { client } from '../../lib/sanity/client';
import Head from 'next/head';
import Link from 'next/link';
import ConnectUs from '../../components/connectUs';
import { motion } from 'framer-motion';

export default function Packages({ packages }) {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <>
            <Head>
                <title>החבילות שלנו | PhotoStyle</title>
                <meta name="description" content="גלו את כל חבילות האטרקציות המיוחדות שלנו לאירועים - כולל חבילות לחתונות, בר מצוות ועוד. עיצוב, צילום והפקה במחיר משתלם." />
                <meta name="keywords" content="חבילות אטרקציות, צילום לאירועים, חבילות צילום, חבילה לחתונה, בר מצווה, חבילת צילום, חבילות מושלמות, PhotoStyle" />
                <meta property="og:title" content="החבילות שלנו | PhotoStyle" />
                <meta property="og:description" content="צפו במגוון חבילות צילום ואטרקציות לאירועים" />
                <meta property="og:image" content="/images/logo.png" />
                <link rel="canonical" href="https://photostyle.co.il/packages" />
            </Head>

            <div className="relative min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50 overflow-hidden pt-24 sm:pt-32 pb-16">
                {/* Floating Shapes */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                    <motion.div initial={{ opacity: 0, y: -100, x: '15%' }} animate={{ opacity: 1, y: 0, x: '15%' }} transition={{ duration: 2, ease: "easeInOut" }} className="absolute top-1/4 left-[15%] w-32 h-32 bg-purple-200/50 rounded-full blur-3xl"></motion.div>
                    <motion.div initial={{ opacity: 0, y: 100, x: '85%' }} animate={{ opacity: 1, y: 0, x: '85%' }} transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-1/3 right-[15%] w-48 h-48 bg-pink-200/50 rounded-full blur-3xl"></motion.div>
                    <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 2, ease: "easeInOut", delay: 1 }} className="absolute top-1/2 left-[25%] w-24 h-24 bg-orange-200/50 rounded-xl blur-3xl"></motion.div>
                </div>

                <main className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl sm:text-6xl font-black text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
                            החבילות שלנו
                        </h1>
                        <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto">
                            כל מה שצריך לאירוע מושלם, בחבילות משתלמות שעוצבו במיוחד עבורכם.
                        </p>
                    </motion.div>

                    {packages && packages.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {packages.map((pack) => (
                                <Link key={pack.slug.current} href={`/packages/${pack.slug.current}`} passHref>
                                    <motion.div
                                        variants={itemVariants}
                                        className="group bg-white/60 backdrop-blur-md rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 h-64 sm:h-72 md:h-80"
                                    >
                                        <div className="relative h-40 sm:h-48 md:h-56">
                                            {pack.mainImage?.asset?.url ? (
                                                <img src={pack.mainImage.asset.url} alt={pack.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                                                    <span className="text-purple-600 font-bold text-sm">אין תמונה</span>
                                                </div>
                                            )}
                                            
                                            {/* Title overlay on image */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
                                                <h3 className="text-white font-black text-lg sm:text-xl md:text-2xl text-center px-3 leading-tight drop-shadow-lg">
                                                    {pack.title}
                                                </h3>
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 sm:p-6 h-24 sm:h-24 flex items-center justify-center">
                                            <div className="text-center">
                                                <p className="text-xl sm:text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
                                                    ₪{pack.price?.toLocaleString()}
                                                </p>
                                                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-2 rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-400 rounded-xl transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(192,132,252,0.8)]"></div>
                                    </motion.div>
                                </Link>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-16">
                            <h3 className="text-2xl font-bold text-gray-700">לא נמצאו חבילות</h3>
                            <p className="text-gray-500 mt-2">נשמח לעמוד לרשותכם ולבנות עבורכם חבילה מותאמת אישית.</p>
                        </div>
                    )}
                </main>
            </div>

            <ConnectUs />
        </>
    );
}

export async function getStaticProps() {
    try {
        const query = `*[_type == "eventPackage"]{
            title,
            richDescription,
            price,
            slug,
            mainImage { asset->{ url } }
        }`;

        const packages = await client.fetch(query);

        return {
            props: {
                packages: packages || []
            },
            revalidate: 60
        };
    } catch (error) {
        console.error('Error fetching packages:', error);
        return {
            props: {
                packages: []
            },
            revalidate: 60
        };
    }
}
