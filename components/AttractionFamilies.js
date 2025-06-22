// components/AttractionFamiliesGrid.js

import { useEffect, useState } from 'react';
import { client } from '../lib/sanity/client';
import Image from 'next/image';
import Link from 'next/link';

export default function AttractionFamiliesGrid() {
  const [families, setFamilies] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const fetchFamilies = async () => {
      try {
        const data = await client.fetch(`*[_type == "attractionFamily"]{
          _id,
          title,
          slug,
          mainImage{ asset->{url} },
          "attractions": *[_type == "attraction" && references(^._id)]{
            title,
            slug,
            mainImage { asset->{url} }
          }
        }`);
        setFamilies(data || []);
      } catch (error) {
        console.error('Error fetching attraction families:', error);
        setFamilies([]);
      }
    };
    fetchFamilies();
  }, []);

  const handleToggleFamily = (family) => {
    setSelectedFamily((prev) => (prev && prev._id === family._id ? null : family));
  };

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 mb-6">
            סוגי אטרקציות
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
            בחרו את סוג האטרקציה המועדף עליכם 🎉
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mx-auto rounded-full animate-pulse"></div>
        </div>

        {/* Selected Family Display */}
        {selectedFamily && (
          <div className="mb-16 transform transition-all duration-500">
            <div className="bg-white rounded-3xl shadow-2xl border border-purple-200/50 overflow-hidden">
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                    {selectedFamily.title}
                  </h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {/* Family Card */}
                  <div className="group relative">
                    <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden shadow-xl transform group-hover:scale-105 transition-all duration-500">
                      {selectedFamily.mainImage?.asset?.url && (
                        <div className="w-full aspect-square relative">
                          <Image
                            src={selectedFamily.mainImage.asset.url}
                            alt={selectedFamily.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                      )}
                      <div className="p-4 text-center">
                        <h4 className="font-black text-gray-800 text-lg leading-tight">
                          {selectedFamily.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Attraction Cards */}
                  {selectedFamily.attractions.map((attr, index) => (
                    <Link
                      href={`/attractions/${attr.slug.current}`}
                      key={attr.slug.current}
                      className="group relative"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500">
                        <div className="w-full aspect-square relative">
                          <Image
                            src={attr.mainImage.asset.url}
                            alt={attr.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="p-4 text-center">
                          <h4 className="font-black text-gray-800 group-hover:text-purple-600 transition-colors duration-300 text-lg leading-tight">
                            {attr.title}
                          </h4>
                        </div>
                        
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={() => setSelectedFamily(null)}
                    className="group relative px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-lg rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10">סגור</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Families Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {families.filter(f => !selectedFamily || f._id !== selectedFamily._id).map((family, index) => (
            <div 
              key={family._id} 
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button 
                onClick={() => handleToggleFamily(family)} 
                className="w-full"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500">
                  {family.mainImage?.asset?.url && (
                    <div className="w-full aspect-square relative">
                      <Image
                        src={family.mainImage.asset.url}
                        alt={family.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  )}
                  <div className="p-4 text-center">
                    <h3 className="font-black text-gray-800 group-hover:text-purple-600 transition-colors duration-300 text-lg leading-tight">
                      {family.title}
                    </h3>
                  </div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
