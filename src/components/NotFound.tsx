import React from 'react';

export const NotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f8f8ff] to-[#e0c3fc] dark:from-[#1a0036] dark:to-[#3a0ca3] text-center p-8">
    <h1 className="text-6xl font-extrabold text-[#ff6ec4] mb-4">404</h1>
    <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
    <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">The page you are looking for does not exist.</p>
    <a href="#home" className="px-6 py-2 rounded-full bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] text-white font-bold shadow-lg hover:scale-105 transition-transform duration-200">Go Home</a>
  </div>
);
