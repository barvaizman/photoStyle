// components/PackagesSection.js

import { useEffect, useState } from 'react';
import { client } from '../lib/sanity/client';
import Link from 'next/link';
import Image from 'next/image';

export default function PackagesSection() {
  const [packages, setPackages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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

  // Show only first 8 packages
  const displayedPackages = packages.slice(0, 8);
  const hasMorePackages = packages.length > 8;

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-tl from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 mb-4 sm:mb-6">
            חבילות ומבצעים
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 font-medium">
            חבילות מותאמות אישית לכל סוגי האירועים ✨
          </p>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mx-auto rounded-full animate-pulse"></div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {displayedPackages.map((pkg, index) => (
            <Link 
              key={pkg._id} 
              href={`/packages/${pkg.slug.current}`} 
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 transform">
                {/* Card background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Image container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={pkg.mainImage?.asset?.url || '/images/fallback.jpg'}
                    alt={pkg.title}
                    width={300}
                    height={375}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay with package title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
                    <div className="text-center p-3 sm:p-6">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-black text-white drop-shadow-2xl leading-tight group-hover:scale-110 transition-transform duration-300">
                        {pkg.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[25px] sm:border-l-[35px] md:border-l-[50px] border-l-transparent border-t-[25px] sm:border-t-[35px] md:border-t-[50px] border-t-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Price section */}
                <div className="relative p-4 sm:p-6 flex items-center justify-center min-h-[60px] sm:min-h-[80px]">
                  <div className="text-center">
                    <p className="text-yellow-600 font-black text-lg sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                      החל מ- ₪{pkg.price?.toLocaleString()}
                    </p>
                    <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto mt-1 sm:mt-2 rounded-full group-hover:w-16 sm:group-hover:w-24 transition-all duration-300"></div>
                  </div>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </div>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-1 sm:w-2 h-1 sm:h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce delay-100"></div>
                <div className="absolute top-4 sm:top-8 right-3 sm:right-6 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce delay-200"></div>
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 w-0.5 sm:w-1.5 h-0.5 sm:h-1.5 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce delay-300"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        {hasMorePackages && (
          <div className="text-center mt-12 sm:mt-16">
            <Link href="/packages" className="group relative inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">גלה עוד חבילות</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
