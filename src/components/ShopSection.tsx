import { ProductCard } from './ProductCard';
import React, { useState } from 'react';
import { Shield, ShoppingCart, Send, Wallet } from 'lucide-react';


interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  rating?: number;
  reviews?: number;
}


interface ShopSectionProps {
  allProducts: Product[];
  handleAddToCart: (product: Product, quantity: number, pricePer: number) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({ allProducts, handleAddToCart }) => {
  const XMR_EUR = 262.51;
  const [currency, setCurrency] = useState<'EUR' | 'XMR'>('EUR');
  const [sort, setSort] = useState<'price-desc' | 'price-asc' | 'rating' | 'star'>('price-asc');

  const getEUR = (price: string) => parseFloat(price.replace(/[^\d.]/g, ''));
  const convertPrice = (eur: number) => {
    if (currency === 'EUR') return eur;
    if (currency === 'XMR') return eur / XMR_EUR;
    return eur;
  };
  const formatPrice = (value: number) => {
    if (currency === 'EUR') return `€${value.toFixed(2)}`;
    if (currency === 'XMR') return `${value.toFixed(6)} XMR`;
    return value.toString();
  };
  const sortedProducts = [...allProducts].sort((a, b) => {
    const aEUR = getEUR(a.price);
    const bEUR = getEUR(b.price);
    if (sort === 'price-desc') return convertPrice(bEUR) - convertPrice(aEUR);
    if (sort === 'price-asc') return convertPrice(aEUR) - convertPrice(bEUR);
    if (sort === 'rating') return (b.rating ?? 0) - (a.rating ?? 0);
    if (sort === 'star') {
      const aScore = (a.rating ?? 0) * (a.reviews ?? 0);
      const bScore = (b.rating ?? 0) * (b.reviews ?? 0);
      return bScore - aScore;
    }
    return 0;
  });
{/* Render the shop section */}
  return (
    <div className="min-h-screen w-full px-2 sm:px-4 md:px-6 py-24 bg-gradient-to-br from-[#f8f6ff] via-[#ede7fa] to-[#ffe6f6] dark:from-[#2a1150] dark:via-[#4b2067] dark:to-[#1a0036] max-w-full">
      <div className="max-w-full md:max-w-7xl mx-auto w-full">
        <div className="text-center mb-20 w-full px-2 sm:px-4 md:px-6">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[#7b2ff2] to-[#f357a8] bg-clip-text text-transparent mb-8 tracking-tight drop-shadow-[0_2px_24px_#ff6ec4]/30 dark:from-[#7873f5] dark:to-[#ff6ec4]">
            Research Materials
          </h2>
          <p className="text-lg sm:text-2xl text-[#232042] dark:text-gray-300 max-w-3xl mx-auto font-light">
            Premium-grade compounds for serious researchers and authorized professionals
          </p>
        </div>
        {/* Privacy and Payment - Panel */}
        <div className="mb-12 w-full flex justify-center px-1 sm:px-2 md:px-4">
          <div 
            className="privacy-panel-font relative bg-gray/80 dark:bg-[#18102a] rounded-[1.5rem] p-4 py-6 xs:py-16 sm:px-16 py-16 border-0 shadow-[0_0_32px_8px_#ff6ec4]/15 backdrop-blur-2xl flex flex-col md:flex-row items-stretch text-left overflow-hidden max-w-4xl w-full gap-6"
            style={{ boxShadow: '0 4px 24px 0 #ff6ec422, 0 1.5px 8px 0 #7873f522', position: 'relative', borderRadius: '2.5rem', minHeight: '420px' }}
          >
            {/* Subtle gradient overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] z-10" style={{background: 'linear-gradient(120deg,rgba(255,255,255,0.12) 0%,rgba(123,47,242,0.08) 60%,rgba(243,87,168,0.10) 100%)'}} />
            {/* Soft inner shadow */}
            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] z-20" style={{boxShadow: 'inset 0 2px 32px 0 #bdb2ff33, inset 0 0px 12px 0 #ff6ec422'}} />
            {/* Large, ultra-faint watermark icon (centered) */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-0 select-none">
              <Shield className="w-[18rem] h-[18rem] md:w-[22rem] md:h-[22rem] text-[#ff6ec4] opacity-5 dark:opacity-7 blur-[2px]" />
            </div>
            {/* Minimal luxury accent: vertical line with dot */}
            <div className="hidden md:flex absolute left-1/2 top-10 bottom-10 z-30 flex-col items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#ffe6f6] via-[#ff6ec4] to-[#bdb2ff] shadow-lg mb-2 border border-white/60 dark:border-[#232042]/60" />
              <span className="w-0.5 flex-1 bg-gradient-to-b from-[#ffecd6] via-[#bdb2ff] to-[#ff6ec4] opacity-80" style={{minHeight:'120px',borderRadius:'1px'}} />
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#bdb2ff] via-[#ff6ec4] to-[#ffe6f6] shadow-lg mt-2 border border-white/60 dark:border-[#232042]/60" />
            </div>
            {/* Glow/gradient accent */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-44 h-12 bg-gradient-to-r from-[#ff6ec4]/70 via-[#bdb2ff]/50 to-[#7873f5]/70 rounded-full blur-2xl opacity-70 pointer-events-none z-30 animate-pulse-slow" />
            {/* ...removed glowing pulsing badge and text... */}
            {/* Left: Notice and quick info */}
            <div className="flex-1 flex flex-col justify-between min-w-[260px] max-w-xl pl-2 gap-6 md:pr-10 z-30">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-7 h-7 text-[#7873f5] animate-pulse drop-shadow-[0_0_14px_#7873f5]" />
                  <h3 className="text-xl font-extrabold bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text text-transparent tracking-tight drop-shadow-[0_2px_20px_#ff6ec4]/30 mb-0">Privacy & Payment</h3>
                </div>
                <h4 className="text-lg privacy-panel-font text-[#ff6ec4] mb-2">We Accept Only Monero (XMR)</h4>
                <p className="text-base text-gray-700 dark:text-gray-200 mb-1">All research material purchases are processed exclusively via <span className="privacy-panel-font text-[#ff6ec4]">Monero (XMR)</span> for privacy and security.</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">For instructions, order confirmations, and support, we communicate <span className="privacy-panel-font text-[#7873f5]">only via Instagram</span> messenger.</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3"><span className="privacy-panel-font">No other payment methods or communication channels are supported.</span></p>
                <div className="flex flex-col items-start gap-1 mb-4">
                </div>
                <div className="flex items-center gap-3 mb-3 mt-4">
                  <Wallet className="w-7 h-7 text-[#ff6ec4] animate-pulse drop-shadow-[0_0_12px_#ff6ec4]" />
                  <h4 className="text-lg font-extrabold bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] bg-clip-text text-transparent tracking-tight drop-shadow-[0_2px_16px_#7873f5]/30 mb-0">How to Make a Monero Wallet</h4>
                </div>
                <ol className="list-decimal list-inside text-gray-700 dark:text-gray-200 space-y-1 mb-3 text-sm">
                  <li>Download the official Monero wallet from <a href="https://www.getmonero.org/downloads/" className="underline text-purple-600 hover:text-purple-400 transition-colors" target="_blank">getmonero.org</a>.</li>
                  <li>Install and create a new wallet. Write down your seed phrase and keep it offline and secure.</li>
                  <li>Never share your seed phrase or private keys with anyone.</li>
                </ol>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/40 rounded-xl border-l-4 border-yellow-400 text-yellow-800 dark:text-yellow-200 text-xs">
                  <strong>Important:</strong> Use the official wallet. Never share your seed phrase. Double-check addresses before sending funds.
                </div>
              </div>
            </div>
            {/* Right: How-to panel, more compact */}
            <div className="flex-1 flex flex-col justify-between min-w-[260px] max-w-xl pl-2 gap-6 md:pl-10 z-30">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <ShoppingCart className="w-7 h-7 text-[#7873f5] animate-pulse drop-shadow-[0_0_12px_#7873f5]" />
                  <h4 className="text-lg font-extrabold bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text text-transparent tracking-tight drop-shadow-[0_2px_16px_#ff6ec4]/30 mb-0">How to Buy Monero (XMR)</h4>
                </div>
                <ol className="list-decimal list-inside text-gray-700 dark:text-gray-200 space-y-1 mb-3 text-sm">
                  <li>Register on a reputable crypto exchange (e.g., Kraken, Binance).</li>
                  <li>Verify your identity as required by the exchange.</li>
                  <li>Buy Monero (XMR) using your preferred payment method.</li>
                  <li>Withdraw XMR to your personal Monero wallet.</li>
                </ol>
                <div className="flex items-center gap-3 mb-6 mt-7">
                  <Send className="w-7 h-7 text-[#ff6ec4] animate-pulse drop-shadow-[0_0_12px_#ff6ec4]" />
                  <h4 className="text-lg font-extrabold bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] bg-clip-text text-transparent tracking-tight drop-shadow-[0_2px_16px_#7873f5]/30 mb-0">How to Pay with Monero</h4>
                </div>
                <ol className="list-decimal list-inside text-gray-700 dark:text-gray-200 space-y-1 mb-3 text-sm">
                  <li>Open your Monero wallet and select "Send".</li>
                  <li>Paste the recipient's Monero address (provided at checkout).</li>
                  <li>Enter the exact amount of XMR to send.</li>
                  <li>Double-check the address and amount, then confirm the transaction.</li>
                  <li>Wait for the transaction to be confirmed on the blockchain.</li>
                </ol>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-xl border-l-4 border-blue-400 text-blue-800 dark:text-blue-200 text-xs">
                  <strong>Tip:</strong> For maximum privacy, always verify the recipient address before sending.
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Shop navigation bar */}
        <nav className="sticky-top z-40 flex justify-center w-full mb-12">
          <div className="relative flex flex-col md:flex-row flex-wrap items-center justify-between gap-2 px-8  lg:px-14 py-0.5 xs:py-1 md:py-1.5 rounded-[2.2rem] shadow-[0_6px_32px_0_rgba(123,47,242,0.15)] bg-gradient-to-br from-[#fff6fd]/98 via-[#ede7fa]/98 to-[#e0c3fc]/98 dark:from-[#1a0036]/98 dark:via-[#232042]/98 dark:to-[#ff6ec4]/98 border-[1.5px] border-[#ff6ec4] dark:border-[#ff6ec4] max-w-full lg:max-w-6xl w-full transition-all duration-300 backdrop-blur-2xl text-[11px] xs:text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px] font-[Inter,sans-serif]">
            {/* Currency Switcher */}
            <div className="flex items-center gap-1 xs:gap-2 md:gap-3 flex-shrink-0 min-w-0">
            <span className="flex items-center font-semibold text-[#ff6ec4] dark:text-[#bdb2ff] gap-1 tracking-wider uppercase truncate drop-shadow-[0_1px_6px_#ff6ec4]/10">
                <svg className="w-4 h-4 text-[#ff6ec4] dark:text-[#bdb2ff] animate-spin-slow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                Currency
              </span>
              <div className="flex gap-1 md:gap-2 flex-wrap min-w-0">
                {['EUR','XMR'].map((cur) => (
                  <button
                    key={cur}
                    type="button"
                    onClick={() => setCurrency(cur as typeof currency)}
                    className={`relative group px-2 xs:px-3 md:px-4 py-1 xs:py-1.5 md:py-2 rounded-full font-extrabold border-2 transition-all duration-200 flex items-center gap-1 tracking-wide focus:outline-none focus:ring-2 focus:ring-[#ff6ec4]/40 truncate shadow-[0_1px_8px_#ff6ec4]/10
                      ${currency === cur
                        ? 'bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white border-[#ff6ec4] scale-105 shadow-md'
                        : 'bg-white/80 dark:bg-[#232042]/80 text-[#7873f5] dark:text-[#bdb2ff] border-[#ede7fa] dark:border-[#ff6ec4] hover:bg-[#ff6ec4]/10 hover:text-[#ff6ec4] hover:scale-105'}
                    `}
                  >
                    <span className="hidden xs:inline font-bold tracking-widest truncate">{cur}</span>
                    <span className="inline xs:hidden font-bold tracking-widest truncate">{cur==='EUR'?'€':'XMR'}</span>
                    {/* Animated underline for active */}
                    {currency === cur && (
                      <span className="absolute left-2 right-2 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-[#ff6ec4] via-[#bdb2ff] to-[#7873f5] animate-pulse-slow" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            {/* Divider for larger screens */}
            <div className="hidden sm:block h-8 md:h-10 w-px bg-gradient-to-b from-[#ff6ec4]/50 via-[#7873f5]/30 to-[#bdb2ff]/20 mx-2 xs:mx-4 md:mx-8 rounded-full opacity-80 flex-shrink-0" aria-hidden="true" />
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 xs:gap-2 md:gap-3 flex-shrink-0 min-w-0">
            <span className="flex items-center font-semibold text-[#ff6ec4] dark:text-[#bdb2ff] gap-1 tracking-wider uppercase truncate">
                <svg className="w-4 h-4 text-[#7873f5] dark:text-[#bdb2ff] animate-bounce-slow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                Sort
              </span>
              <div className="relative w-full min-w-[80px] max-w-[140px] md:min-w-[120px] md:max-w-[180px]">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value as typeof sort)}
                  className="appearance-none bg-white/95 dark:bg-[#351657]/95 border-2 border-[#ff6ec4] dark:border-[#ff6ec4] text-[#7873f5] dark:text-[#bdb2ff] font-bold rounded-full px-2 xs:px-4 md:px-5 py-1 xs:py-1.5 md:py-2 pr-7 xs:pr-8 md:pr-10 focus:outline-none focus:ring-2 focus:ring-[#ff6ec4]/30 transition-all shadow-sm w-full cursor-pointer truncate"
                >
                  <option value="price-desc">💸 Price: High → Low</option>
                  <option value="price-asc">💰 Price: Low → High</option>
                  <option value="rating">⭐ Best Rated</option>
                  <option value="star">🌟 Overall Star Score</option>
                </select>
                <svg className="pointer-events-none absolute right-1 xs:right-2 md:right-3 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-[#bdb2ff]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
              </div>
            </div>
          </div>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 md:mt-4 lg:mt-6">
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={handleAddToCart}
              currency={currency}
              displayPrice={formatPrice(convertPrice(getEUR(product.price)))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
