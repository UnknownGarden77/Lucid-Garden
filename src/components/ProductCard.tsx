// This component renders a product card with hover effects, action buttons, and animations.
// It includes a product image, name, description, price, and action buttons for liking, viewing, and adding to cart.
// It also displays a premium badge and product rating if available.
// The card has a modern design with a gradient overlay and responsive styles.
// It uses Lucid icons for the action buttons and includes animations for hover effects.
// src/components/ProductCard.tsx


import React, { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { QuantityModal } from './QuantityModal';

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  rating?: number;
  reviews?: number;
}

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product, quantity: number, pricePer: number) => void;
  currency?: 'EUR' | 'XMR';
  displayPrice?: string;
  compactAddToCart?: boolean; // If true, make Add to Cart button extra small for md-lg
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  onAddToCart,
  displayPrice,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="group bg-white/20 dark:bg-gray-800/30 rounded-4xl overflow-hidden shadow-[0_0_48px_16px_#ff6ec4]/20 hover:shadow-[0_0_64px_24px_#ff6ec4]/40 transition-all duration-500 transform hover:-translate-y-4 border border-purple-200 dark:border-purple-900/60 backdrop-blur-2xl relative animate-shimmer"
        style={{
          animationDelay: `${index * 0.1}s`,
          borderImage: isHovered
            ? 'linear-gradient(135deg, #ff6ec4 0%, #7873f5 100%) 1'
            : undefined,
          boxShadow: isHovered
            ? '0 0 64px 16px #ff6ec4cc'
            : undefined,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-[#ff6ec4]/60 to-transparent transition-opacity duration-300 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
          {/* Premium Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-xl shadow-[0_0_8px_2px_#ff6ec4]/40 border border-white/20">
            Lab Grade
          </div>
          {/* Rating */}
          {product.rating && (
            <div className={`absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full px-4 py-1.5 transition-all duration-300 shadow-[0_0_8px_2px_#ff6ec4]/20 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{product.rating}</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">({product.reviews})</span>
            </div>
          )}
        </div>
        <div className="p-7">
          <h3 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-2 tracking-tight">{product.name}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-2 font-light">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className={`font-extrabold bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text text-transparent tracking-tight
              ${((displayPrice ?? product.price).length > 10) ? 'text-xl sm:text-2xl' : 'text-2xl'}
            `}>
              {displayPrice ?? product.price}
            </span>
            <button
              className={
                [
                  'add-to-cart-btn group/btn bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] text-white',
                  ((displayPrice ?? product.price).length > 10)
                    ? 'px-3 py-1.5 text-xs min-w-[80px] md:px-2.5 md:py-1 md:text-xs md:min-w-[70px] lg:px-3 lg:py-1.5 lg:text-sm lg:min-w-[80px]'
                    : 'px-4 md:px-5 lg:px-6 py-2 md:py-2.5 rounded-full text-sm md:text-base min-w-[100px] md:min-w-[110px] lg:min-w-[120px]',
                  'rounded-full hover:shadow-[0_0_16px_4px_#ff6ec4]/40 transition-none transform hover:scale-110 flex items-center space-x-2 font-semibold border border-white/10',
                ].join(' ')
              }
              onClick={() => setModalOpen(true)}
            >
              <span>Add to Cart</span>
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
        {/* Add shimmer overlay */}
        <span className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition duration-300 bg-gradient-to-r from-white/40 via-transparent to-white/40 animate-shimmer" />
      </div>
      <QuantityModal
        product={product}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddToCart={(quantity, pricePer) => onAddToCart(product, quantity, pricePer)}
      />
    </>
  );
};