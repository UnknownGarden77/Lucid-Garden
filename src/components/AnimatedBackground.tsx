import React from 'react';

interface AnimatedBackgroundProps {
  variant?: 'hero' | 'section';
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'hero' }) => {
  const isHero = variant === 'hero';
  
  // Generate more vibrant, animated particles with neon glows
  const particles = Array.from({ length: isHero ? 32 : 18 }).map((_, i) => {
    const size = Math.random() * 6 + 3;
    const neonColor = isHero
      ? `rgba(186, 51, 255, 0.5)`
      : `rgba(120, 119, 255, 0.25)`;
    return (
      <div
        key={i}
        className={`absolute rounded-full pointer-events-none`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: `0 0 12px 4px ${neonColor}`,
          background: isHero
            ? 'linear-gradient(135deg, #ff6ec4 0%, #7873f5 100%)'
            : 'linear-gradient(135deg, #c3cfe2 0%, #e2d1c3 100%)',
          opacity: isHero ? 0.22 : 0.13,
          animation: `floaty ${Math.random() * 12 + 8}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 20}s`,
        }}
      />
    );
  });

  // Define the keyframes for the floating animation
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Futuristic Gradient Background */}
      <div className={`absolute inset-0 ${
        isHero 
          ? 'bg-gradient-to-br from-[#1a0036] via-[#3a0ca3] to-[#ff6ec4] dark:from-[#0a001a] dark:via-[#2d0066] dark:to-[#ff6ec4]'
          : 'bg-gradient-to-br from-[#f8f8ff] via-[#e0c3fc] to-[#f9f6ff] dark:from-[#1a0036] dark:via-[#2d0066] dark:to-[#3a0ca3]'
      }`} />

      {/* Neon Animated Particles */}
      <div className="absolute inset-0">{particles}</div>
      
      {/* Futuristic Geometric Pattern Overlay */}
      <div className={`absolute inset-0 opacity-20 mix-blend-lighten pointer-events-none ${
        isHero ? 'bg-white' : 'bg-purple-600 dark:bg-purple-400'
      }`} 
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='10' y='10' width='60' height='60' rx='30' stroke='%23ff6ec4' stroke-width='2' fill='none'/%3E%3Ccircle cx='40' cy='40' r='28' stroke='%237873f5' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: '120px 120px',
        filter: 'blur(1px)',
      }}></div>
      
      {/* Floating Orbs with Neon Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-[#ff6ec4]/30 to-[#7873f5]/30 rounded-full blur-2xl animate-pulse shadow-[0_0_60px_10px_#ff6ec4]" />
        <div className="absolute top-3/4 right-1/4 w-28 h-28 bg-gradient-to-r from-[#7873f5]/30 to-[#ff6ec4]/30 rounded-full blur-2xl animate-pulse shadow-[0_0_40px_8px_#7873f5]" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-r from-[#ffb6ff]/40 to-[#7873f5]/40 rounded-full blur-xl animate-pulse shadow-[0_0_30px_6px_#ffb6ff]" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/3 left-2/3 w-24 h-24 bg-gradient-to-br from-[#ff6ec4]/40 to-[#7873f5]/40 rounded-full blur-2xl animate-pulse shadow-[0_0_40px_8px_#ff6ec4]/30" style={{ animationDelay: '6s' }} />
      </div>
      {/* Shimmer overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 animate-shimmer" />
      <style>
        {`
          @keyframes floaty {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-18px) scale(1.2); }
          }
        `}
      </style>
    </div>
  );
};