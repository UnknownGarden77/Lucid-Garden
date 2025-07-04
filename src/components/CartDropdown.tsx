import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import React from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartDropdownProps {
  items: CartItem[];
  onQuantityChange: (id: number, delta: number, newPriceStr?: string) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

// Cart dropdown component
export const CartDropdown: React.FC<CartDropdownProps> = ({
  items,
  onQuantityChange,
  onRemove,
  onCheckout,
}) => {
  // Helper to get discounted price based on quantity
  const getDiscountedPrice = (basePrice: number, qty: number) => {
    if (qty >= 100) return basePrice * 0.6;
    if (qty >= 50) return basePrice * 0.7;
    if (qty >= 25) return basePrice * 0.8;
    if (qty >= 10) return basePrice * 0.9;
    if (qty >= 5) return basePrice * 0.95;
    return basePrice;
  };

  // When quantity changes, update price if needed
  const handleQuantityChange = (id: number, delta: number) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    const basePrice = parseFloat(item.price.replace(/[^\d.]/g, '')) / (
      item.quantity >= 100 ? 0.6 :
      item.quantity >= 50 ? 0.7 :
      item.quantity >= 25 ? 0.8 :
      item.quantity >= 10 ? 0.9 :
      item.quantity >= 5 ? 0.95 : 1
    );
    const newQty = Math.max(1, item.quantity + delta);
    const newPrice = getDiscountedPrice(basePrice, newQty);
    const newPriceStr = `€${newPrice.toFixed(2)}`;
    // Only update price if discount tier changes
    const currentDiscount =
      item.quantity >= 100 ? 0.6 :
      item.quantity >= 50 ? 0.7 :
      item.quantity >= 25 ? 0.8 :
      item.quantity >= 10 ? 0.9 :
      item.quantity >= 5 ? 0.95 : 1;
    const nextDiscount =
      newQty >= 100 ? 0.6 :
      newQty >= 50 ? 0.7 :
      newQty >= 25 ? 0.8 :
      newQty >= 10 ? 0.9 :
      newQty >= 5 ? 0.95 : 1;
    if (currentDiscount !== nextDiscount) {
      onQuantityChange(id, delta, newPriceStr);
    } else {
      onQuantityChange(id, delta);
    }
  };

  //  constant for totl
  const total = items.reduce(
    (sum, item) =>
      sum + parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity,
    0
  );
  return (
    <div
      className="fixed top-[6.5rem] left-1/2 -translate-x-1/2 w-[95vw] max-w-xs md:absolute md:top-auto md:mt-4 md:right-0 md:left-auto md:translate-x-0 md:w-96 md:max-w-none font-sans rounded-2xl md:rounded-3xl shadow-2xl border border-purple-100 dark:border-[#7873f5]/60 z-50 p-4 md:p-7 animate-fade-in backdrop-blur-2xl bg-white/90 dark:bg-[#18102a]/95 overflow-hidden"
      style={{
        fontFeatureSettings: "'ss01' on, 'ss02' on",
        fontVariationSettings: "'wght' 600",
        boxShadow:
          '0 8px 48px 0 #ff6ec433, 0 1.5px 16px 0 #7873f544, 0 0 0 1.5px #7873f5',
      }}
    >
      {/* Top neon accent bar */}
      <div className="absolute -top-1 left-4 right-4 h-1 rounded-full bg-[#ff6ec4] blur-md opacity-80 pointer-events-none md:-top-2 md:left-8 md:right-8" />
      <h3 className="text-lg md:text-2xl font-extrabold mb-3 md:mb-4 flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text text-transparent drop-shadow-[0_2px_12px_#ff6ec4]/40 tracking-tight">
        <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-[#ff6ec4] drop-shadow-[0_0_8px_#ff6ec4]" />
        Cart
      </h3>
      {items.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-300/80 text-center py-8 font-semibold tracking-wide">
          Your cart is empty.
        </div>
      ) : (
        <div className="space-y-3 md:space-y-4 max-h-60 md:max-h-72 overflow-y-auto pr-1">
          {items.map(item => (
            <div
              key={item.id}
              className="flex items-center gap-2.5 md:gap-4 border-b border-gray-200 dark:border-[#7873f5]/30 pb-2.5 md:pb-3 group"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl object-cover shadow-[0_0_12px_2px_#ff6ec4]/20 md:shadow-[0_0_16px_2px_#ff6ec4]/20"
                style={{
                  background: '#232042',
                  opacity: 0.97,
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-800 dark:text-white text-sm md:text-base truncate">
                  {item.name}
                </div>
                <div className="text-xs md:text-sm text-gray-500 dark:text-[#ff6ec4]/80 font-mono flex items-center gap-1.5 md:gap-2">
                  {item.price}
                  {/* Discount badge if price is discounted */}
                  {parseFloat(item.price.replace(/[^\d.]/g, '')) <
                    parseFloat(item.price.replace(/[^\d.]/g, '')) * 1.0 /* always false, see note below */}
                  {/* 
                    If you want to show a badge, you need to know the base price.
                    If you pass base price as a prop, you can compare here.
                    For now, skip badge logic unless you want to refactor cart item structure.
                  */}
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 mt-1.5 md:mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="p-0.5 md:p-1 rounded-full bg-gray-100 dark:bg-[#2d0066]/70 hover:bg-gray-200 dark:hover:bg-[#3a0ca3]/80 transition"
                  >
                    <Minus className="w-3 h-3 md:w-4 md:h-4 text-[#7873f5] dark:text-[#bdb2ff]" />
                  </button>
                  <span className="px-1.5 md:px-2 font-mono text-gray-800 dark:text-[#ff6ec4] text-base md:text-lg font-bold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="p-0.5 md:p-1 rounded-full bg-gray-100 dark:bg-[#2d0066]/70 hover:bg-gray-200 dark:hover:bg-[#3a0ca3]/80 transition"
                  >
                    <Plus className="w-3 h-3 md:w-4 md:h-4 text-[#ff6ec4] dark:text-[#ff6ec4]" />
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="ml-2 md:ml-3 p-0.5 md:p-1 rounded-full bg-red-100 dark:bg-[#ff6ec4]/10 hover:bg-red-200 dark:hover:bg-[#ff6ec4]/30 transition"
                  >
                    <Trash2 className="w-3 h-3 md:w-4 md:h-4 text-red-500 dark:text-[#ff6ec4]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center mt-5 md:mt-7">
        <span className="font-bold text-base md:text-lg text-gray-800 dark:text-[#bdb2ff] tracking-wide">
          Total:
        </span>
        <span className="font-extrabold text-xl md:text-2xl bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text text-transparent drop-shadow-[0_2px_12px_#ff6ec4]/40 tracking-tight">
          €{total.toFixed(2)}
        </span>
      </div>
      <button
        className="w-full mt-5 md:mt-7 py-2 md:py-3 rounded-lg md:rounded-xl bg-[#ff6ec4] hover:bg-[#7873f5] text-white font-extrabold text-base md:text-lg shadow-lg hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-[#bdb2ff]/60 tracking-wide"
        onClick={e => { e.stopPropagation(); onCheckout(); }}
        disabled={items.length === 0}
        style={{
          letterSpacing: '0.04em',
          boxShadow: '0 0 24px 3px #ff6ec433, 0 1.5px 12px 0 #7873f544',
        }}
      >
        Proceed to Checkout
      </button>
      {/* Bottom neon accent */}
      <div className="absolute left-1/2 -bottom-6 md:-bottom-8 -translate-x-1/2 w-28 h-7 md:w-40 md:h-10 bg-[#ff6ec4]/40 rounded-full blur-2xl opacity-60 pointer-events-none" />
    </div>
  );
};
