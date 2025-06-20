import Link from 'next/link';
import Image from 'next/image';

function PackagesSection() {
  const packages = [
    {
      id: 'premium-laser',
      title: 'חבילת לייזרים פרימיום',
      price: '₪4900',
      image: '/images/hero/laser.jpeg',
    },
    {
      id: 'slowbooth-package',
      title: 'חבילת סלואו ובות',
      price: '₪2900',
      image: '/images/hero/slow.jpeg',
    },
    {
      id: 'ring-letters',
      title: 'אותיות מנצנצות וטבעת',
      price: '₪2600',
      image: '/images/hero/lettersRing.jpeg',
    },
    {
      id: 'glow-glasses',
      title: 'בלוקים + משקפיים זוהרים',
      price: '₪1990',
      image: '/images/hero/glasses.jpeg',
    },
    {
      id: 'strip-color',
      title: 'סטריפים צבעוניים',
      price: '₪3990',
      image: '/images/hero/strip3.jpeg',
    },
    {
      id: 'smoke-show',
      title: 'מופע עשן צבעוני',
      price: '₪1900',
      image: '/images/hero/smokeColor.jpeg',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-center text-red-700 mb-10 flex items-center justify-center gap-3">
          🎁 חבילות ומבצעים 🎁
        </h2>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          {packages.map((pkg) => (
            <Link key={pkg.id} href={`/packages/${pkg.id}`} legacyBehavior passHref>
              <a className="group block rounded-xl overflow-hidden shadow-xl bg-black relative transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 hover:ring-4 hover:ring-pink-400 hover:ring-offset-2">
                <div className="relative w-full h-28 sm:h-36 md:h-48">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-2 sm:px-3">
                  <h3 className="text-xs sm:text-sm md:text-lg font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)] leading-tight">
                    {pkg.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-2xl font-bold text-yellow-300 mt-1 drop-shadow-[0_1px_6px_rgba(255,255,255,0.7)]">
                    {pkg.price}
                  </p>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 sm:mt-3">
                    <button
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/packages/${pkg.id}`;
                      }}
                      className="text-[10px] sm:text-xs md:text-sm font-semibold text-white bg-pink-600 hover:bg-pink-700 px-2 sm:px-3 py-1 rounded-full transition duration-300 shadow"
                    >
                      עוד פרטים
                    </button>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PackagesSection;
