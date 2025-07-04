import { AnimatedBackground } from './AnimatedBackground';
import { ProductCard } from './ProductCard';
import { Sparkles, ShoppingBag, Check, Info } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './useTheme';

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
    rating?: number;
    reviews?: number;
}

interface HomeSectionProps {
    featuredItems: Product[];
    researchStats: { icon: React.ElementType; value: string; label: string }[];
    handleAddToCart: (product: Product, quantity: number, pricePer: number) => void;
    setActiveSection: (section: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ featuredItems, researchStats, handleAddToCart }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f8f6ff] via-[#ede7fa] to-[#ffe6f6] dark:from-[#2a1150] dark:via-[#4b2067] dark:to-[#1a0036] max-w-full space-y-14">
      {/* Hero Section */}
      {/* Add top padding to hero section for consistent spacing from navigation */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full max-w-full pt-24 md:pt-32 lg:pt-40">
        <AnimatedBackground variant="hero" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-purple-400/5 to-pink-400/5 dark:from-[#1a0036]/40 dark:to-[#3a0ca3]/40 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none z-0 animate-gradient-x bg-gradient-to-r from-[#ff6ec4]/10 via-transparent to-[#7873f5]/10" />
        <div className="relative z-10 w-full max-w-full md:max-w-4xl mx-auto px-2 sm:px-4 md:px-6">
          <div className="relative text-center ">
            <div className="mb-8 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-2xl rounded-full px-6 py-2 text-white/90 border border-white/20 shadow-[0_0_24px_4px_#ff6ec4]/40 font-mono tracking-widest uppercase animate-fade-in">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="text-sm">Consciousness Research & Exploration</span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-extrabold tracking-[.04em] text-white mb-10 leading-tight drop-shadow-[0_2px_32px_#ff6ec4] font-[Inter,sans-serif] animate-fade-in">
              Lucid
              <span className="block bg-gradient-to-r from-[#b100e8] via-[#ff6ec4] to-[#7873f5] bg-clip-text text-[#ff6ed7] font-extrabold animate-gradient-x" style={{ textShadow: '0 0 32px #ff6ec4, 0 0 16px #b100e8' }}>
                Garden
              </span>
            </h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-white/90 mb-16 leading-relaxed font-light drop-shadow-[0_1px_12px_#ff6ec4]/30 animate-fade-in">
              Pioneering the frontiers of consciousness research with premium-grade materials and scientific rigor
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-8 justify-center mb-8 md:mb-12">
              <button
                onClick={() => navigate('/shop')}
                className={`group bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] ${theme === 'light' ? 'text-white' : 'text-white'} px-6 xs:px-8 sm:px-10 md:px-12 py-2 xs:py-3 sm:py-3 md:py-3.5 rounded-full text-base xs:text-lg sm:text-xl md:text-lg font-semibold shadow-[0_0_32px_8px_#ff6ec4]/50 hover:shadow-[0_0_48px_16px_#ff6ec4]/80 transform hover:scale-105 transition-all duration-300 border border-white/10 relative overflow-hidden min-w-[120px] xs:min-w-[140px]`}
              >
                <span className="relative z-10">Explore our Products</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-30 transition duration-300 bg-gradient-to-r from-white/30 to-transparent pointer-events-none" />
                <ShoppingBag className="inline ml-2 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              </button>
              <button
                onClick={() => navigate('/research')}
                className="bg-white/10 backdrop-blur-2xl text-white px-6 xs:px-8 sm:px-10 md:px-12 py-2 xs:py-3 sm:py-3 md:py-3.5 rounded-full text-base xs:text-lg sm:text-xl md:text-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-[0_0_24px_4px_#7873f5]/30 relative overflow-hidden min-w-[120px] xs:min-w-[140px]"
              >
                <span className="relative z-10">Research and Informations</span>
                <span className="absolute inset-0 opacity-0 hover:opacity-20 transition duration-300 bg-gradient-to-r from-[#ff6ec4]/30 to-[#7873f5]/30 pointer-events-none" />
              </button>
            </div>
            {/* Research Stats */}
            <section className="w-full max-w-full md:max-w-5xl mx-auto mt-4">
              <div className="relative mb-8">
                <div className="flex justify-center items-center gap-2 mb-6">
                  <h3 className="text-lg text-base dark:text-gray-200">Research Statistics</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6 mb-16">
                  {researchStats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center bg-white/40 bg-opacity-60 dark:bg-[#232042]/40 dark:bg-opacity-60 backdrop-blur-xl rounded-2xl shadow-[0_0_32px_8px_#ff6ec4]/10 border border-purple-100 dark:border-purple-900/40 py-8 px-4 transition hover:scale-105"
                      style={{ boxShadow: '0 8px 32px 0 #bdb2ff33, 0 1.5px 16px 0 #7873f544', border: '1.5px solid rgba(180,180,200,0.18)' }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6ec4] to-[#7873f5] shadow-lg mb-3">
                        <stat.icon className="w-7 h-7 text-white" />
                      </div>
                      {/* Original stat value and label */}
                      <span className=" text-2xl s-sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text text-transparent drop-shadow-[0_2px_12px_#ff6ec4]/30 mb-1">{stat.value}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300 text-center font-light">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
      {/* Featured Items */}
      <section className="w-full px-2 sm:px-4 md:px-6 max-w-full md:max-w-7xl mx-auto mb-16 md:mb-24 lg:mb-32">
          <div className="text-center mb-20">
              <h2 className="text-3xl xs:text-4xl sm:text-5xl font-extrabold px-4 bg-gradient-to-r from-[#7b2ff2] to-[#f357a8] bg-clip-text text-transparent tracking-tight drop-shadow-[0_2px_32px_#ff6ec4]/60 text-center animate-gradient-x leading-tight font-[Inter,sans-serif] dark:from-[#ff6ec4] dark:to-[#bdb2ff] mb-6">
                  Featured Research Materials
              </h2>
              <p className="text-lg sm:text-1xl md:text-2xl px-4 text-[#232042] dark:text-gray-300 max-w-3xl mx-auto font-light">
                  Carefully curated compounds for serious researchers and consciousness explorers
              </p>
          </div>
      {/* Featured Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2 gap-10 lg:gap-6">
              {featuredItems.map((item, index) => (
                  <ProductCard
                      key={item.id}
                      product={item}
                      index={index}
                      onAddToCart={handleAddToCart}
                      currency="EUR"
                      displayPrice={item.price}
                      compactAddToCart={true}
                  />
              ))}
          </div>
      </section>
      {/* Lucid Garden - Establishment */}
      <section className="w-full px-2 sm:px-4 md:px-6 max-w-full md:max-w-5xl xl:max-w-6xl mx-auto mb-14 animate-fade-in">
        <div className="relative overflow-visible rounded-[2.5rem] bg-gradient-to-br from-white/80 via-[#f8f6ff]/90 to-[#ffe6f6]/80 dark:from-[#1a0036]/80 dark:via-[#232042]/90 dark:to-[#3a0ca3]/80 shadow-[0_0_64px_16px_#ff6ec4]/20 border-2 border-[#ff6ec4] dark:border-[#ff6ec4] backdrop-blur-2xl p-2 xs:p-4 sm:p-6 md:p-12 flex flex-col md:flex-row items-stretch gap-4 md:gap-0">
          {/* Animated holographic orb accent */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 w-[3.5rem] h-[3.5rem] xs:w-[5rem] xs:h-[5rem] sm:w-[7rem] sm:h-[7rem] bg-gradient-to-br from-[#ff6ec4]/50 via-[#bdb2ff]/30 to-[#7873f5]/50 rounded-full blur-3xl opacity-60 pointer-events-none z-0 animate-pulse-slow" />
          {/* Animated, glowing orb accent (smaller) */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 w-[10rem] h-[4rem] md:w-[16rem] md:h-[6rem] bg-gradient-to-br from-[#ff6ec4]/60 via-[#bdb2ff]/40 to-[#7873f5]/60 rounded-full blur-3xl opacity-60 pointer-events-none z-0 animate-pulse-slow" />
          {/* Glassy, animated grid overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <svg width="100%" height="100%" className="w-full h-full" style={{position:'absolute',top:0,left:0}}>
              <defs>
                <linearGradient id="gridGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff6ec4" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#7873f5" stopOpacity="0.10" />
                </linearGradient>
              </defs>
              <g stroke="url(#gridGradient)" strokeWidth="1">
                {Array.from({length: 16}).map((_,i) => (
                  <line key={i} x1={i*40} y1="0" x2={i*40} y2="1000" />
                ))}
                {Array.from({length: 8}).map((_,i) => (
                  <line key={i} x1="0" y1={i*40} x2="1000" y2={i*40} />
                ))}
              </g>
            </svg>
          </div>
          {/* Content Section */}
          <div className="relative z-10 w-full flex flex-col md:flex-row items-stretch text-center md:text-left gap-2 py-2 px-4 md:px-0">
            {/* Left: Info & Call to Action */}
            <div className="flex-1 flex flex-col justify-center items-center md:items-start py-3 xs:py-4 md:py-8 px-1 xs:px-2 md:px-10 gap-2 md:gap-6">
              <h2 className="font-extrabold bg-gradient-to-r from-[#ff6ec4] via-[#7873f5] to-[#bdb2ff] bg-clip-text text-transparent mb-2 tracking-tight drop-shadow-[0_2px_24px_#ff6ec4]/30"
                  style={{fontSize:'clamp(0.98rem,5vw,1.15rem)', lineHeight:'1.1'}}>
                Welcome to Lucy Marketplace
              </h2>
              <p className="font-light text-[#232042] dark:text-gray-200 mb-1" style={{fontSize:'clamp(0.88rem,4vw,1rem)'}}>
                The website was launched on <span className="font-bold text-[#ff6ec4]">July 4, 2025</span>.<br/>
                We understand that you may encounter several problems or bugs, and we would greatly appreciate it if you could spare a moment to snap a screenshot of the problem so we can fix it and make the Marketplace flawless.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1" style={{fontSize:'clamp(0.88rem,4vw,1rem)'}}>
                If you have any questions, we strongly suggest getting in touch with us on our Instagram page.
              </p>
              <a
                href="https://instagram.com/_lucid_garden" target="_blank" rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white font-bold px-4 py-2 xs:px-6 xs:py-3 rounded-full shadow-xl hover:scale-105 hover:shadow-[0_0_32px_8px_#ff6ec4]/40 transition-all duration-300 border border-white/10 text-base md:text-lg mt-2 tracking-wider animate-gradient-x relative overflow-hidden w-full max-w-xs focus-visible:outline-4 focus-visible:outline-[#ff6ec4] focus-visible:outline focus:outline-none"
                style={{fontSize:'clamp(0.92rem,4vw,1.01rem)'}}
                tabIndex={0}
              >
                <span className="flex items-center justify-center z-10 gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" className="inline-block text-white">
                  <rect width="18" height="18" x="3" y="3" rx="5" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                  </svg>
                  Contact us on Instagram
                </span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-30 transition duration-300 bg-gradient-to-r from-white/30 to-transparent pointer-events-none" />
              </a>
            </div>
            {/* Right: Glassmorphic Info Cards */}
            <div className="flex-1 flex flex-col justify-center items-center gap-2 md:gap-6 py-3 xs:py-4 md:py-8 px-1 xs:px-2 md:px-10">
              <div className="w-full max-w-xs bg-white/30 dark:bg-[#232042]/30 rounded-2xl border border-[#ff6ec4]/30 dark:border-[#ff6ec4]/30 shadow-[0_0_16px_2px_#ff6ec4]/10 p-2 xs:p-3 flex flex-col items-center glassmorphic-card hover:scale-[1.03] transition-transform duration-200 relative overflow-hidden">
                <span className="flex items-center gap-1 font-semibold text-[#ff6ec4] mb-1" style={{fontSize:'clamp(0.88rem,3vw,0.98rem)'}}>
                  <Check className="w-4 h-4 animate-bounce-slow text-[#ff6ec4] drop-shadow-[0_0_6px_#ff6ec4]" />
                  Version 1.0
                </span>
                <span className="text-gray-700 dark:text-gray-300 text-center" style={{fontSize:'clamp(0.8rem,2.5vw,0.92rem)'}}>This is the first release, ready for open-beta testing and deployment.</span>
              </div>
              <div className="w-full max-w-xs bg-white/30 dark:bg-[#232042]/30 rounded-2xl border border-[#7873f5]/30 dark:border-[#bdb2ff]/30 shadow-[0_0_16px_2px_#7873f5]/10 p-2 xs:p-3 flex flex-col items-center glassmorphic-card hover:scale-[1.03] transition-transform duration-200 relative overflow-hidden">
                <span className="flex items-center gap-1 font-semibold text-[#7873f5] mb-1" style={{fontSize:'clamp(0.88rem,3vw,0.98rem)'}}>
                  <Info className="w-4 h-4 animate-spin-slow text-[#7873f5] drop-shadow-[0_0_6px_#7873f5]" />
                  Marketplace for Lucy
                </span>
                <span className="text-gray-700 dark:text-gray-300 text-center" style={{fontSize:'clamp(0.8rem,2.5vw,0.92rem)'}}>Open for all researchers and explorers. Your feedback will help us perfect the experience.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    <div className="h-8" />
  </div>
 );
};
