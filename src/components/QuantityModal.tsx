import React from 'react';

interface QuantityModalProps {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (quantity: number, discountedPrice: number) => void;
}

const QUANTITIES = [1, 5, 10, 25, 50, 100];

export const QuantityModal: React.FC<QuantityModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedQty, setSelectedQty] = React.useState(1);

  if (!isOpen) return null;

  const basePrice = parseFloat(product.price.replace(/[^\d.]/g, ''));
  let discount = 0;
  if (selectedQty >= 100) discount = 0.40;
  else if (selectedQty >= 50) discount = 0.30;
  else if (selectedQty >= 25) discount = 0.20;
  else if (selectedQty >= 10) discount = 0.10;
  else if (selectedQty >= 5) discount = 0.05;
  const pricePer = basePrice * (1 - discount);
  const total = pricePer * selectedQty;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white/90 dark:bg-[#18102a]/95 rounded-2xl sm:rounded-3xl shadow-[0_0_64px_16px_#ff6ec4]/30 border-2 border-purple-100 dark:border-[#7873f5]/60 w-full max-w-[98vw] xs:max-w-[92vw] sm:max-w-md p-0 font-[Inter,sans-serif] animate-fade-in overflow-hidden backdrop-blur-2xl flex flex-col max-h-[96vh]">
        {/* Top neon accent bar */}
        <div className="absolute -top-2 left-8 right-8 h-1 rounded-full bg-[#ff6ec4] blur-md opacity-80 pointer-events-none" />
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 xs:top-4 xs:right-4 text-[#ff6ec4] hover:text-[#7873f5] text-2xl font-bold focus:outline-none z-10 p-1 xs:p-2"
          aria-label="Close"
        >
          ×
        </button>
        {/* Modal content */}
        <div className="flex flex-col items-center px-4 xs:px-6 sm:px-8 pt-8 xs:pt-10 sm:pt-12 pb-3 xs:pb-5 sm:pb-10 overflow-y-auto w-full max-h-[90vh]">
          {/* Product image and info */}
          <div className="flex items-center gap-4 xs:gap-6 sm:gap-8 mb-6 xs:mb-8 w-full">
            <div className="relative">
              <img src={product.image} alt={product.name} className="w-12 h-12 xs:w-16 xs:h-16 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-[0_0_16px_4px_#ff6ec4]/30 border-2 border-[#e0c3fc] dark:border-[#3a0ca3]" />
              <div className="absolute -top-2 -right-2 xs:-top-3 xs:-right-3 w-5 h-5 xs:w-7 xs:h-7 bg-gradient-to-br from-[#ff6ec4] to-[#7873f5] rounded-full blur-md opacity-60 pointer-events-none" />
            </div>
            <div className="flex-1 min-w-0">
            <div className="font-extrabold text-lg sm:text-xl text-[#3a0ca3] dark:text-[#bdb2ff] truncate leading-tight">{product.name}</div>
              <div className="text-sm sm:text-base text-[#7873f5] dark:text-[#ff6ec4]/80 font-mono font-semibold leading-snug">{product.price} each</div>
            </div>
          </div>
          {/* Divider */}
          <div className="my-3 h-[2.5px] w-14 xs:w-20 sm:w-28 md:w-24 lg:w-16 bg-gradient-to-r from-[#ff6ec4] via-[#bdb2ff] to-[#7873f5] opacity-70 rounded-full" />
          {/* Quantity selection */}
          <div className="mb-5 xs:mb-6 w-full">
            <div className="font-semibold text-[#ff6ec4] mb-3 text-center text-base sm:text-lg tracking-wide">Select Quantity:</div>
            <div className="flex flex-wrap gap-1.5 sm:gap-3 justify-center">
              {QUANTITIES.map(qty => (
                <button
                  key={qty}
                  className={`px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full border font-bold transition-all duration-200 min-w-[40px] sm:min-w-[64px] text-sm sm:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6ec4] focus-visible:ring-offset-2
                    md:px-3 md:py-1.5 md:text-base md:min-w-[48px] lg:px-3 lg:py-1.5 lg:text-base lg:min-w-[48px]
                    ${selectedQty === qty ? 'bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white border-[#ff6ec4] shadow-lg scale-105' : 'bg-white dark:bg-[#232042] text-[#7873f5] dark:text-[#bdb2ff] border-[#e0c3fc] dark:border-[#3a0ca3] hover:bg-[#ff6ec4]/10 hover:border-[#ff6ec4]'}
                  `}
                  onClick={() => setSelectedQty(qty)}
                  tabIndex={0}
                  aria-label={`Select quantity ${qty}`}
                >
                  x{qty}
                </button>
              ))}
            </div>
          </div>
          {/* Discount info */}
          {discount > 0 && (
            <div className="mb-5 flex items-center gap-2 sm:gap-3 justify-center">
              <span className="inline-block px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white text-xs sm:text-sm font-bold shadow-[0_0_8px_2px_#ff6ec4]/30">
                {discount * 100}% OFF
              </span>
              <span className="text-green-600 dark:text-green-400 font-semibold text-base sm:text-lg">
                Discounted price: <span className="font-bold">€{pricePer.toFixed(2)}</span> each
              </span>
            </div>
          )}
          {/* Total */}
          <div className="flex items-center justify-between mb-6 sm:mb-8 w-full">
            <span className="font-bold text-lg sm:text-xl text-[#7873f5] dark:text-[#bdb2ff] tracking-wide">Total:</span>
            <span className="font-extrabold text-xl sm:text-2xl bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text text-transparent drop-shadow-[0_2px_8px_#ff6ec4]/40">
              €{total.toFixed(2)}
            </span>
          </div>
          {/* Add to Cart button */}
          <button
            className="w-full py-2.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white font-extrabold text-base sm:text-xl shadow-lg hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-[#bdb2ff]/60 tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6ec4] focus-visible:ring-offset-2"
            onClick={() => { onAddToCart(selectedQty, pricePer); onClose(); }}
            tabIndex={0}
            aria-label="Add selected quantity to cart"
          >
            Add to Cart
          </button>
        </div>
        {/* Bottom neon accent */}
        <div className="absolute left-1/2 -bottom-4 xs:-bottom-6 sm:-bottom-8 -translate-x-1/2 w-16 xs:w-20 sm:w-32 h-5 xs:h-6 sm:h-8 bg-[#ff6ec4]/40 rounded-full blur-2xl opacity-60 pointer-events-none" />
      </div>
    </div>
  );
};
