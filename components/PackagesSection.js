// components/PackagesSection.js

import { useEffect, useState } from 'react';
import { client } from '../lib/sanity/client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PackagesSection() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await client.fetch(`*[_type == "eventPackage"]{
          _id,
          title,
          slug,
          price,
          mainImage{asset->{url}},
          description
        }`);
        setPackages(data || []);
      } catch (error) {
        console.error('Error fetching packages:', error);
        setPackages([]);
      }
    };
    fetchPackages();
  }, []);

  const displayedPackages = packages.slice(0, 8);
  const hasMorePackages = packages.length > 8;

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
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
            className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
            animate={{
                x: [0, 15, 0, -15, 0],
                y: [0, -15, 0, 15, 0],
                scale: [1, 1.05, 1, 0.95, 1],
                rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut'
            }}
        />
        <motion.div 
            className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-tl from-orange-400/20 to-pink-400/20 rounded-full blur-3xl"
            animate={{
                x: [0, -15, 0, 15, 0],
                y: [0, 15, 0, -15, 0],
                scale: [1, 0.95, 1, 1.05, 1],
                rotate: [0, -5, 0, 5, 0],
            }}
            transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'easeInOut'
            }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 mb-4 sm:mb-6">
            חבילות ומבצעים
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 font-medium">
            חבילות מותאמות אישית לכל סוגי האירועים ✨
          </p>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mx-auto rounded-full animate-pulse"></div>
        </motion.div>

        {/* Packages Grid */}
        <motion.div 
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
          {displayedPackages.map((pkg) => (
            <motion.div key={pkg._id} variants={itemVariants} className="h-full">
                <Link 
                  href={`/packages/${pkg.slug.current}`} 
                  className="group relative block h-full"
                >
                  <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 transform h-full flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <Image
                        src={pkg.mainImage?.asset?.url || '/images/fallback.jpg'}
                        alt={pkg.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
                        <div className="text-center p-3 sm:p-6">
                          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-[0_4px_8px_rgba(192,132,252,0.6)] leading-tight group-hover:scale-105 transition-transform duration-300">
                            {pkg.title}
                          </h3>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <div className="absolute top-0 right-0 w-0 h-0 border-l-[25px] sm:border-l-[35px] md:border-l-[50px] border-l-transparent border-t-[25px] sm:border-t-[35px] md:border-t-[50px] border-t-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="relative p-4 sm:p-6 flex items-center justify-center min-h-[60px] sm:min-h-[80px] mt-auto">
                      <div className="text-center">
                        <p className="text-yellow-600 font-black text-lg sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                          החל מ- ₪{pkg.price?.toLocaleString()}
                        </p>
                        <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto mt-1 sm:mt-2 rounded-full group-hover:w-16 sm:group-hover:w-24 transition-all duration-300"></div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  </div>
                </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        {hasMorePackages && (
          <motion.div 
            className="text-center mt-12 sm:mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/packages" className="group relative inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">גלה עוד חבילות</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
