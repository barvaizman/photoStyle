import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * A reusable card component for displaying items like attractions, packages, etc.
 * @param {string} linkTo - The URL the card links to.
 * @param {string} imageUrl - The URL for the card's image.
 * @param {string} title - The main title of the card.
 * @param {number|string} price - The price to display.
 * @param {string} description - A short description text.
 * @param {string} tag - A small tag, e.g., for a category.
 * @param {'default' | 'package'} variant - The card style variant.
 * @param {string} containerClassName - Custom classes for the main card container.
 * @param {string} imageContainerClassName - Custom classes for the image container.
 * @param {object} motionProps - Props to pass to the motion.div container for animations.
 * @param {string} titleClassName - Custom classes for the title.
 * @param {React.ReactNode} children - Additional content to render inside the card.
 */
export default function Card({
  linkTo,
  imageUrl,
  title,
  price,
  description,
  tag,
  variant = 'default',
  containerClassName,
  imageContainerClassName,
  motionProps,
  titleClassName,
  children
}) {
  const baseContainerClass = "group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200 h-full";
  const finalContainerClass = containerClassName || baseContainerClass;

  const defaultImageContainerClass = "relative h-40 overflow-hidden";
  const finalImageContainerClass = imageContainerClassName || defaultImageContainerClass;

  const defaultTitleClass = "text-center text-lg md:text-xl font-black text-gray-800 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2 mb-2";

  // Default variant content
  let content = (
    <div className="p-4 flex flex-col flex-grow">
      {/* The title is now rendered inside the image for the default variant */}
      {price && (
        <div className="text-center mb-2">
          <span className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
            החל מ־₪{price}
          </span>
        </div>
      )}
      {description && (
        <p className="text-center text-sm text-gray-600 line-clamp-3 flex-grow mb-2">
          {description}
        </p>
      )}
      {tag && (
        <div className="text-center mt-auto">
          <span className="text-xs font-bold bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
            {tag}
          </span>
        </div>
      )}
    </div>
  );

  // Package variant content
  if (variant === 'package') {
    // Content is now passed as children, so we clear the default content for this variant.
    content = null;
  }

  return (
    <motion.div {...motionProps} className="h-full">
      <Link href={linkTo} className="block h-full">
        <div className={finalContainerClass}>
          {variant === 'default' && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          )}
          
          <div className={`relative z-10 flex flex-col h-full`}>
            {imageUrl && (
              <div className={finalImageContainerClass}>
                <Image
                  src={imageUrl}
                  alt={title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                 {/* Title Overlay for both variants */}
                 <div className="absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                    <h3 className={titleClassName || 'text-white text-2xl md:text-3xl font-black text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}>
                      {title}
                    </h3>
                  </div>
              </div>
            )}
            {content}
            {children}
          </div>
          
          {variant === 'default' && (
            <>
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-0 group-hover:opacity-70 animate-ping"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-pink-300 rounded-full opacity-0 group-hover:opacity-70 animate-ping delay-300"></div>
            </>
          )}
        </div>
      </Link>
    </motion.div>
  );
} 