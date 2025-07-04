import React from 'react';


export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f8f8ff] to-[#e0c3fc] dark:from-[#1a0036] dark:to-[#3a0ca3]">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-[#ff6ec4]/30 rounded-full animate-spin shadow-[0_0_32px_8px_#ff6ec4]/30"></div>
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-[#ff6ec4] rounded-full animate-spin" style={{ animationDuration: '1.2s' }}></div>
        <div className="absolute top-2 left-2 w-16 h-16 border-4 border-transparent border-t-[#7873f5] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6ec4]/60 to-[#7873f5]/60 blur-md animate-pulse"></div>
        <div className="absolute top-0 left-0 w-20 h-20 rounded-full bg-gradient-to-br from-[#ff6ec4]/20 to-[#7873f5]/20 blur-lg animate-shimmer" />
      </div>
    </div>
  );
};


