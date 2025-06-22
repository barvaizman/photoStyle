// pages/packages/index.js

import { client } from '../../lib/sanity/client';
import Head from 'next/head';
import { motion } from 'framer-motion';
import ConnectUs from '../../components/connectUs';
import Card from '../../components/Card';

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
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {packages.map((pack, idx) => (
                                <Card
                                    key={pack.slug}
                                    linkTo={`/packages/${pack.slug}`}
                                    variant="package"
                                    imageUrl={pack.imageUrl}
                                    title={pack.title}
                                    containerClassName="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                                    imageContainerClassName="relative w-full aspect-[4/3] overflow-hidden"
                                    titleClassName="text-white text-3xl lg:text-4xl font-black text-center drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]"
                                    motionProps={{
                                        variants: itemVariants,
                                        initial: 'hidden',
                                        animate: 'visible',
                                        transition: { duration: 0.5, delay: idx * 0.08 },
                                    }}
                                >
                                    <div className="p-4 text-center">
                                        <p className="text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
                                            ₪{pack.price?.toLocaleString()}
                                        </p>
                                    </div>
                                </Card>
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
            price,
            "slug": slug.current,
            "imageUrl": mainImage.asset->url
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
