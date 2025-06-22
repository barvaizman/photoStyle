import { useState, useEffect } from 'react';
import Head from 'next/head';
import { client } from '../../lib/sanity/client';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import ConnectUs from '../../components/connectUs';
import Card from '../../components/Card';

export default function AttractionsPage() {
    const [attractions, setAttractions] = useState([]);
    const [attractionFamilies, setAttractionFamilies] = useState([]);
    const [selectedFamily, setSelectedFamily] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const familiesQuery = `*[_type == "attractionFamily"] | order(title asc)`;
                const attractionsQuery = `*[_type == "attraction"]{
                    _id,
                    title,
                    "slug": slug.current,
                    "imageUrl": mainImage.asset->url,
                    family,
                    "familyResolved": family->{_id, title}
                }`;

                const [familiesData, attractionsData] = await Promise.all([
                    client.fetch(familiesQuery),
                    client.fetch(attractionsQuery)
                ]);
                
                setAttractionFamilies(familiesData || []);
                setAttractions(attractionsData || []);

            } catch (error) {
                console.error('Error fetching data:', error);
                // Set to empty arrays on error to prevent crashes
                setAttractionFamilies([]);
                setAttractions([]);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    const selectedFamilyName = selectedFamily 
        ? attractionFamilies.find(f => f._id === selectedFamily)?.title 
        : 'בחר משפחת אטרקציות';

    const filteredAttractions = attractions
        .filter(attraction => selectedFamily ? attraction.familyResolved?._id === selectedFamily : true)
        .filter(attraction => {
            if (!selectedFamily) {
                return true; 
            }
            const shouldExclude = attraction.title.trim() === selectedFamilyName.trim();
            console.log(`Filtering Card: [${attraction.title.trim()}] vs Family: [${selectedFamilyName.trim()}] => Exclude: ${shouldExclude}`);
            return !shouldExclude;
        })
        .filter(attraction => attraction.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <>
            <Head>
                <title>אטרקציות לאירועים | PhotoStyle</title>
                <meta name="description" content="מגוון רחב של אטרקציות צילום מתקדמות לכל סוגי האירועים. שדרגו את האירוע שלכם עם חוויות בלתי נשכחות." />
            </Head>

            <div className="relative min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50 overflow-hidden pt-24 sm:pt-32 pb-16">
                {/* Floating Shapes */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <motion.div initial={{ opacity: 0, y: -100, x: '10%' }} animate={{ opacity: 1, y: 0, x: '10%' }} transition={{ duration: 1.5, ease: "easeInOut" }} className="absolute top-1/4 left-[10%] w-32 h-32 bg-purple-200/50 rounded-full blur-3xl"></motion.div>
                    <motion.div initial={{ opacity: 0, y: 100, x: '80%' }} animate={{ opacity: 1, y: 0, x: '80%' }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }} className="absolute bottom-1/4 right-[10%] w-40 h-40 bg-pink-200/50 rounded-full blur-3xl"></motion.div>
                    <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }} className="absolute top-1/2 left-[20%] w-24 h-24 bg-orange-200/50 rounded-xl blur-3xl"></motion.div>
                </div>

                <main className="container mx-auto px-4 relative z-10">
                    <motion.h1 
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="text-4xl sm:text-6xl font-black text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"
                    >
                        האטרקציות שלנו
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                        className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
                    >
                        מצאו את האטרקציה המושלמת שתהפוך את האירוע שלכם לבלתי נשכח.
                    </motion.p>

                    {/* Filters */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 flex-wrap"
                    >
                        <div className="relative w-full max-w-xs">
                            <input
                                type="text"
                                placeholder="חפשו אטרקציה..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
                            />
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-full border-2 border-gray-200 hover:border-purple-400 transition-colors min-w-[200px]"
                            >
                                <span className="flex-1 text-right">{selectedFamilyName}</span>
                                <FaChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
                                    <button onClick={() => { setSelectedFamily(null); setIsDropdownOpen(false); }} className="w-full px-4 py-3 text-right hover:bg-purple-50 transition-colors border-b border-gray-100">הכל</button>
                                    {attractionFamilies.map(family => (
                                        <button key={family._id} onClick={() => { setSelectedFamily(family._id); setIsDropdownOpen(false); }} className="w-full px-4 py-3 text-right hover:bg-purple-50 transition-colors border-b border-gray-100 last:border-b-0">{family.title}</button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {loading ? (
                        <div className="text-center text-xl font-semibold">טוען אטרקציות...</div>
                    ) : (
                        <>
                            {selectedFamily && (
                                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-8">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 mb-2">{selectedFamilyName}</h2>
                                    <p className="text-gray-600 text-lg">{filteredAttractions.length} אטרקציות נמצאו</p>
                                </motion.div>
                            )}
                            <motion.div
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <AnimatePresence>
                                    {filteredAttractions.length > 0 ? (
                                        filteredAttractions.map(attraction => (
                                            <Card
                                                key={attraction._id}
                                                linkTo={`/attractions/${attraction.slug || attraction._id}`}
                                                imageUrl={attraction.imageUrl}
                                                title={attraction.title}
                                                tag={!selectedFamily ? attraction.familyResolved?.title : null}
                                                imageContainerClassName="relative h-32 sm:h-36 overflow-hidden"
                                                motionProps={{
                                                    variants: itemVariants,
                                                    layout: true,
                                                    initial: "hidden",
                                                    animate: "visible",
                                                    exit: "hidden"
                                                }}
                                            />
                                        ))
                                    ) : (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-16">
                                            <h3 className="text-2xl font-bold text-gray-700">לא נמצאו אטרקציות</h3>
                                            <p className="text-gray-500 mt-2">נסו לשנות את החיפוש או הסינון</p>
                                            <button onClick={() => { setSelectedFamily(null); setSearchTerm(''); }} className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition">נקה סינון וחיפוש</button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </>
                    )}
                </main>
            </div>
            
            <ConnectUs />
        </>
    );
}
