import { AnimatedBackground } from './AnimatedBackground';
import { Shield, Award, } from 'lucide-react';
import React from 'react';
import { useTheme } from './useTheme';

export const AboutSection: React.FC = () => {
  const { theme } = useTheme();
  const milestoneText = theme === 'light' ? 'text-black' : 'text-white';
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#f8f8ff] to-[#e0c3fc] dark:from-[#1a0036] dark:to-[#3a0ca3] overflow-hidden px-2 sm:px-4 md:px-6 max-w-full">
      <AnimatedBackground variant="section" />
      <div className="absolute inset-0 pointer-events-none z-0 animate-gradient-x bg-gradient-to-r from-[#7873f5]/10 via-transparent to-[#ff6ec4]/10" />
      <section className="w-full max-w-full md:max-w-5xl mx-auto flex flex-col items-center justify-center py-16 z-10 space-y-12 md:space-y-16 relative px-2 sm:px-4 md:px-6">
      {/* Animated Constellation SVG Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 animate-fade-in-slow z-0" viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#bdb2ff" strokeWidth="1.2" opacity="0.5">
          <circle cx="120" cy="80" r="2.5"/>
          <circle cx="200" cy="200" r="2.5"/>
          <circle cx="400" cy="100" r="2.5"/>
          <circle cx="600" cy="180" r="2.5"/>
          <circle cx="700" cy="60" r="2.5"/>
          <circle cx="300" cy="300" r="2.5"/>
          <circle cx="500" cy="320" r="2.5"/>
          <circle cx="650" cy="350" r="2.5"/>
          <polyline points="120,80 200,200 400,100 600,180 700,60" />
          <polyline points="300,300 500,320 650,350" />
          <polyline points="400,100 300,300" />
          <polyline points="600,180 500,320" />
        </g>
        <g stroke="#ff6ec4" strokeWidth="0.8" opacity="0.3">
          <circle cx="180" cy="350" r="1.5"/>
          <circle cx="80" cy="250" r="1.5"/>
          <circle cx="750" cy="300" r="1.5"/>
          <polyline points="180,350 80,250 120,80" />
          <polyline points="750,300 650,350 700,60" />
        </g>
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="12s" repeatCount="indefinite"/>
      </svg>
      {/* Section Badge/Header */}
      <div className="flex flex-col items-center space-y-6 mb-6 z-10">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-2xl rounded-full px-7 py-2 text-[#ff6ec4] border border-white/20 shadow font-mono tracking-widest uppercase animate-fade-in">
          <Shield className="w-5 h-5 animate-pulse" />
          <span className="text-sm">About Us</span>
        </div>
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text text-transparent tracking-tight drop-shadow-[0_2px_24px_#ff6ec4]/30 text-center animate-gradient-x">
          Lucid Garden
        </h2>
        <p className="text-lg sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-light text-center animate-fade-in">
          Premium-grade resources and knowledge for the next generation of consciousness researchers and explorers.
        </p>
      </div>
      {/* Reassurance/Privacy Section */}
      <section
        className="relative bg-white/30 dark:bg-gray-900/40 backdrop-blur-2xl rounded-4xl border border-purple-100 dark:border-purple-900/50 shadow-[0_0_48px_16px_#ff6ec4]/10 px-8 py-12 w-full max-w-3xl mx-auto mb-0 mt-8 flex flex-col items-center gap-8 animate-fade-in overflow-hidden"
        style={{ boxShadow: '0 8px 48px 0 #ff6ec422, 0 1.5px 16px 0 #7873f544' }}
      >
        {/* Animated Glow Accents */}
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-[#ff6ec4]/30 to-[#7873f5]/30 rounded-full blur-2xl opacity-30 pointer-events-none" />
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#bdb2ff]/30 to-[#ff6ec4]/30 rounded-full blur-xl opacity-20 pointer-events-none" />
        <div className="inline-flex items-center space-x-2 bg-white/20 dark:bg-gray-900/30 backdrop-blur-2xl rounded-full px-6 py-2 text-[#ff6ec4] border border-white/20 shadow font-mono tracking-widest uppercase animate-fade-in z-10">
          <Shield className="w-5 h-5 animate-pulse" />
          {/* Privacy & Security Badge */}
          <span className="text-sm">Privacy & Security</span>
        </div>
        {/* Main Title */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text text-transparent text-center tracking-tight drop-shadow-[0_2px_24px_#ff6ec4]/30 animate-gradient-x mb-2">Your Privacy, Our Priority</h3>
        <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 font-light leading-relaxed text-center max-w-2xl mx-auto">
          Even though Lucid Garden operates on the standard web, your privacy and security are our highest priorities. We have taken every necessary step to protect both ourselves and our clients. This is why our website does not require any login or registration—there is no userbase, no accounts, and no personal data stored. Your visit leaves no trace beyond the fact that you may have browsed our site.
        </p>
        <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 font-light leading-relaxed text-center max-w-2xl mx-auto">
          We ship discreetly from the Netherlands or Belgium and serve all of Europe and the worldwide, with the only exceptions being Russia and Australia. Our commitment is to provide a safe, reliable, and confidential experience for every researcher and explorer. You are in the right place for trusted, research-grade materials—without compromise.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-2 z-10">
          <span className="px-5 py-2 rounded-full bg-gradient-to-r from-[#ff6ec4]/40 to-[#7873f5]/40 text-purple-700 dark:text-purple-200 text-xs font-bold tracking-widest uppercase shadow hover:scale-105 transition-transform duration-200">No User Accounts</span>
          <span className="px-5 py-2 rounded-full bg-gradient-to-r from-[#7873f5]/40 to-[#ff6ec4]/40 text-pink-700 dark:text-pink-200 text-xs font-bold tracking-widest uppercase shadow hover:scale-105 transition-transform duration-200">Privacy First</span>
          <span className="px-5 py-2 rounded-full bg-gradient-to-r from-[#bdb2ff]/40 to-[#ff6ec4]/40 text-blue-700 dark:text-blue-200 text-xs font-bold tracking-widest uppercase shadow hover:scale-105 transition-transform duration-200">EU Shipping</span>
          <span className="px-5 py-2 rounded-full bg-gradient-to-r from-[#ff6ec4]/40 to-[#bdb2ff]/40 text-pink-700 dark:text-pink-200 text-xs font-bold tracking-widest uppercase shadow hover:scale-105 transition-transform duration-200">Discreet & Secure</span>
        </div>
        {/* Subtle bottom accent */}
        <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 w-32 h-8 bg-[#ff6ec4]/30 rounded-full blur-xl opacity-40 pointer-events-none" />
      </section>
            {/* Core Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full relative z-10 mt-10 mb-2 px-2">
        {/* Integrity */}
        <div className="flex flex-col items-center bg-white/30 dark:bg-gray-900/40 rounded-3xl border border-purple-100 dark:border-purple-900/50 shadow-lg p-6 animate-fade-in">
          <span className="mb-2 text-4xl">🛡️</span>
          <span className="font-bold text-lg text-[#7873f5] mb-1">Integrity</span>
          <span className="text-gray-700 dark:text-gray-300 text-center text-sm" style={{fontSize:'clamp(0.95rem,1.1vw,1.05rem)'}}>We uphold the highest standards of honesty and ethics in all our actions.</span>
        </div>
        {/* Innovation */}
        <div className="flex flex-col items-center bg-white/30 dark:bg-gray-900/40 rounded-3xl border border-purple-100 dark:border-purple-900/50 shadow-lg p-6 animate-fade-in">
          <span className="mb-2 text-4xl">💡</span>
          <span className="font-bold text-lg text-[#ff6ec4] mb-1">Innovation</span>
          <span className="text-gray-700 dark:text-gray-300 text-center text-sm" style={{fontSize:'clamp(0.95rem,1.1vw,1.05rem)'}}>We embrace creativity and forward-thinking to advance research and discovery.</span>
        </div>
        {/* Transparency */}
        <div className="flex flex-col items-center bg-white/30 dark:bg-gray-900/40 rounded-3xl border border-purple-100 dark:border-purple-900/50 shadow-lg p-6 animate-fade-in">
          <span className="mb-2 text-4xl">🔍</span>
          <span className="font-bold text-lg text-[#bdb2ff] mb-1">Transparency</span>
          <span className="text-gray-700 dark:text-gray-300 text-center text-sm" style={{fontSize:'clamp(0.95rem,1.1vw,1.05rem)'}}>We are open about our processes, lab results, and sourcing for your peace of mind.</span>
        </div>
        {/* Community */}
        <div className="flex flex-col items-center bg-white/30 dark:bg-gray-900/40 rounded-3xl border border-purple-100 dark:border-purple-900/50 shadow-lg p-6 animate-fade-in">
          <span className="mb-2 text-4xl">🤝</span>
          <span className="font-bold text-lg text-[#7873f5] mb-1">Community</span>
          <span className="text-gray-700 dark:text-gray-300 text-center text-sm" style={{fontSize:'clamp(0.95rem,1.1vw,1.05rem)'}}>We foster a supportive network for researchers, visionaries, and explorers.</span>
        </div>
        {/* Safety */}
        <div className="flex flex-col items-center bg-white/30 dark:bg-gray-900/40 rounded-3xl border border-purple-100 dark:border-purple-900/50 shadow-lg p-6 animate-fade-in">
          <span className="mb-2 text-4xl">🧬</span>
          <span className="font-bold text-lg text-[#ff6ec4] mb-1">Safety</span>
          <span className="text-gray-700 dark:text-gray-300 text-center text-sm" style={{fontSize:'clamp(0.95rem,1.1vw,1.05rem)'}}>We prioritize rigorous quality control and safe practices in everything we do.</span>
        </div>
        {/* Support */}
        <div className="flex flex-col items-center bg-white/30 dark:bg-gray-900/40 rounded-3xl border border-purple-100 dark:border-purple-900/50 shadow-lg p-6 animate-fade-in">
          <span className="mb-2 text-4xl">💬</span>
          <span className="font-bold text-lg text-[#bdb2ff] mb-1">Support</span>
          <span className="text-gray-700 dark:text-gray-300 text-center text-sm" style={{fontSize:'clamp(0.95rem,1.1vw,1.05rem)'}}>We are here to help, answer questions, and guide your research journey.</span>
        </div>
      </div>
      {/* Call to Action */}
      <div className="flex flex-col items-center justify-center mt-10 mb-2 z-10 w-full px-2 sm:px-4">
        <a
          href="https://instagram.com/_lucid_garden"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 xs:px-8 sm:px-12 py-3 xs:py-4 sm:py-5 rounded-3xl bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] text-white font-extrabold text-base xs:text-lg sm:text-xl md:text-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-200 animate-fade-in w-full max-w-xs sm:max-w-md md:max-w-lg justify-center"
        >
          <span className="animate-pulse">🌱</span>
          <span className="text-base xs:text-lg sm:text-xl md:text-2xl">Join our community</span>
          <span className="animate-pulse">→</span>
        </a>
        <span className="mt-2 text-xs xs:text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 text-center max-w-xs sm:max-w-md md:max-w-lg">Connect with us on Instagram for updates, research insights, and community support.</span>
      </div>
      {/* Enhanced Our Mission Container */}
      <div className="relative w-full flex flex-col items-center z-10">
      <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-3xl rounded-4xl border-2 border-purple-200 dark:border-purple-900/60 shadow-[0_0_64px_16px_#ff6ec4]/30 px-8 sm:px-8 md:px-10 py-12 sm:py-14 md:py-16 flex flex-col items-center animate-fade-in max-w-2xl mx-auto" style={{background:'rgba(255,255,255,0.08)', boxShadow:'0 8px 64px 0 #ff6ec433, 0 1.5px 16px 0 #7873f544'}}>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text mb-2 sm:mb-3 md:mb-4 tracking-tight drop-shadow-[0_2px_24px_#ff6ec4]/30 text-center">Our Mission</h3>
          <div className="space-y-4">
            <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 font-light leading-relaxed text-center max-w-2xl mx-auto">
              At Lucid Garden, we are pioneering the world's first open-network marketplace dedicated exclusively to LSD (Lucy)—a platform built from the ground up to revolutionize how consciousness research and exploration are supported in the digital age.
            </p>
            <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 font-light leading-relaxed text-center max-w-2xl mx-auto">
              Originally founded in 2019 under the name Sarajevo Lysergic, our journey began with a focused commitment to the development, study, and advancement of LSD-based products. Over the years, we've remained unwavering in our dedication to Lucy—and only Lucy—believing it to be one of the most powerful catalysts for personal insight, scientific discovery, and mental well-being.
            </p>
            <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 font-light leading-relaxed text-center max-w-2xl mx-auto">
              As of today, Lucid Garden stands as the first-of-its-kind LSD marketplace published directly on the open-internet—a feat made possible through innovative tools, decentralized web technologies, and a relentless commitment to transparency and accessibility. This is more than just a platform; it’s a foundational shift away from hidden, fragmented networks toward an open, secure, and ethical system that serves researchers, visionaries, and responsible users alike.
            </p>
            <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 font-light leading-relaxed text-center max-w-2xl mx-auto">
              Our mission is to empower the next era of consciousness research—not behind closed doors, but in the open. We fuse ancient wisdom with modern science, creating a trusted hub for collaboration, safe access, and groundbreaking exploration of the mind. Every aspect of our marketplace—from design to infrastructure—reflects our belief in freedom of information, responsible use, and radical transparency.
            </p>
            <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 font-light leading-relaxed text-center max-w-2xl mx-auto">
              At Lucid Garden, we are more than a marketplace—we are a movement. A movement to reclaim psychedelics as tools for healing, inquiry, and evolution. A movement to normalize LSD research through integrity, innovation, and community-driven progress. A movement to redefine what is possible on the open-internet.
            </p>
            <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 font-light leading-relaxed text-center max-w-2xl mx-auto">
              Welcome to Lucid Garden—the future of Lucy lives here.
            </p>
          </div>
        </div>
      </div>
      {/* Milestones Timeline */}
      <section
        className="relative bg-white/40 dark:bg-gray-900/50 backdrop-blur-3xl rounded-4xl border-2 border-purple-200 dark:border-purple-900/60 shadow-[0_0_80px_24px_#ff6ec4]/30 px-4 xs:px-6 sm:px-10 py-12 xs:py-16 sm:py-20 w-full max-w-3xl mx-auto mt-12 mb-0 flex flex-col items-center gap-4 animate-fade-in overflow-hidden"
        style={{ boxShadow: '0 12px 80px 0 #ff6ec444, 0 2px 24px 0 #7873f555', borderRadius: '2rem' }}
      >
        {/* Large background gradient circles */}
        <div className="absolute left-1/2 -top-14 -translate-x-1/2 w-56 h-56 bg-gradient-to-br from-[#ff6ec4]/40 to-[#7873f5]/30 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute left-1/2 -bottom-14 -translate-x-1/2 w-44 h-44 bg-gradient-to-br from-[#bdb2ff]/40 to-[#ff6ec4]/30 rounded-full blur-2xl opacity-30 pointer-events-none" />
        <div className="inline-flex items-center space-x-2 bg-white/30 dark:bg-gray-900/40 backdrop-blur-2xl rounded-full px-6 xs:px-8 py-2 xs:py-3 text-[#ff6ec4] border border-white/30 shadow-lg font-mono tracking-widest uppercase animate-fade-in z-10">
          <Award className="w-6 h-6 animate-pulse" />
          <span className="text-xs xs:text-base font-bold tracking-wider">Our Journey</span>
        </div>
        <h3 className={`text-2xl xs:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text text-transparent text-center tracking-tight drop-shadow-[0_4px_32px_#ff6ec4]/40 animate-gradient-x mb-2 xs:mb-4`}>Milestones</h3>
        <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 font-light leading-relaxed text-center max-w-2xl mx-auto">
          Our journey is defined by a commitment to transparency, quality, and community. Each milestone reflects our dedication to ethical research, customer trust, and the advancement of safe, responsible science. We are proud to share our story and invite you to be part of the Lucid Garden movement.
        </p>
        <div className="relative w-full">
          {/* Desktop vertical timeline */}
          <ol className="hidden sm:block space-y-4 md:space-y-6 lg:space-y-8">
            {/* MILESTONES: vertical layout (unchanged) */}
            {[
              {
                icon: '🌱', year: '2019', color: 'text-[#ff6ec4]', bg: 'from-[#ff6ec4] to-[#7873f5]',
                desc: 'Established Lucid Garden (formerly Sarajevo Lysergic) with a vision for safe, ethical research.'
              },
              {
                icon: '🔬', year: '2020', color: 'text-[#7873f5]', bg: 'from-[#7873f5] to-[#ff6ec4]',
                desc: 'Expanded research offerings, built a trusted community, and launched our first educational initiatives.'
              },
              {
                icon: '🧬', year: '2022', color: 'text-[#bdb2ff]', bg: 'from-[#bdb2ff] to-[#ff6ec4]',
                desc: 'Launched advanced compound line, expanded EU shipping, and published open lab results for transparency.'
              },
              {
                icon: '🚀', year: '2024', color: 'text-[#ff6ec4]', bg: 'from-[#ff6ec4] to-[#bdb2ff]',
                desc: 'Temporarily paused operations to focus on compliance, quality, and new partnerships.'
              },
              {
                icon: '🪐', year: '2025', color: 'text-[#7873f5]', bg: 'from-[#7873f5] to-[#ff6ec4]',
                desc: 'Reopened and rebranded as Lucid Garden, with renewed focus on privacy, transparency, and customer support.'
              },
              {
                icon: '🤝', year: '2025+', color: 'text-[#bdb2ff]', bg: 'from-[#bdb2ff] to-[#7873f5]',
                desc: 'Ongoing: Building trust through open communication, third-party lab testing, and a commitment to ethical, customer-first service.'
              },
            ].map((m, i) => (
          <li key={i} className="relative flex items-start animate-fade-in group">
            <div className="flex-shrink-0 relative z-10 flex flex-col items-center" style={{ width: 40, height: 40 }}>
              <div className={`w-9 h-9 flex items-center justify-center bg-gradient-to-br ${m.bg} rounded-full shadow-xl text-xl group-hover:scale-105 transition-transform duration-200`}>
                <span role="img" aria-label="milestone-icon">{m.icon}</span>
              </div>
              {/* Center divider below circle */}
              <div className={`absolute left-1/2 top-full mt-1 -translate-x-1/2 h-10 xs:h-14 sm:h-16 w-1 bg-gradient-to-b from-[#ff6ec4]/40 via-[#bdb2ff]/40 to-[#7873f5]/40 rounded-full z-0`} />
            </div>
            <div className="ml-5 flex-1">
              <span className={`font-bold text-xs sm:text-sm md:text-base ${m.color} ${milestoneText}`}>{m.year}</span>
              <span className="ml-2 font-semibold text-xs sm:text-sm md:text-base text-[#232042] dark:text-white">{m.desc}</span>
            </div>
          </li>
            ))}
          </ol>
          {/* Mobile horizontal timeline */}
          <ol className="flex flex-col gap-3 xs:gap-4 sm:hidden">
            {[
              {
                icon: '🌱', year: '2019', color: 'text-[#ff6ec4]', bg: 'from-[#ff6ec4] to-[#7873f5]',
                desc: 'Established Lucid Garden (formerly Sarajevo Lysergic) with a vision for safe, ethical research.'
              },
              {
                icon: '🔬', year: '2020', color: 'text-[#7873f5]', bg: 'from-[#7873f5] to-[#ff6ec4]',
                desc: 'Expanded research offerings, built a trusted community, and launched our first educational initiatives.'
              },
              {
                icon: '🧬', year: '2022', color: 'text-[#bdb2ff]', bg: 'from-[#bdb2ff] to-[#ff6ec4]',
                desc: 'Launched advanced compound line, expanded EU shipping, and published open lab results for transparency.'
              },
              {
                icon: '🚀', year: '2024', color: 'text-[#ff6ec4]', bg: 'from-[#ff6ec4] to-[#bdb2ff]',
                desc: 'Temporarily paused operations to focus on compliance, quality, and new partnerships.'
              },
              {
                icon: '🪐', year: '2025', color: 'text-[#7873f5]', bg: 'from-[#7873f5] to-[#ff6ec4]',
                desc: 'Reopened and rebranded as Lucid Garden, with renewed focus on privacy, transparency, and customer support.'
              },
              {
                icon: '🤝', year: '2025+', color: 'text-[#bdb2ff]', bg: 'from-[#bdb2ff] to-[#7873f5]',
                desc: 'Ongoing: Building trust through open communication, third-party lab testing, and a commitment to ethical, customer-first service.'
              },
            ].map((m, i, arr) => (
          <li key={i} className="relative flex flex-col items-center text-center animate-fade-in group">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 flex items-center justify-center bg-gradient-to-br ${m.bg} rounded-full shadow-xl text-xl mb-2`}>
                <span role="img" aria-label="milestone-icon">{m.icon}</span>
              </div>
              {/* Horizontal divider except after last item, centered */}
              {i < arr.length - 1 && (
                <div className="w-12 xs:w-16 h-1 bg-gradient-to-r from-[#ff6ec4]/40 via-[#bdb2ff]/40 to-[#7873f5]/40 rounded-full my-2 mx-auto relative flex items-center justify-center">
                  <div className="absolute left-1/2 -top-2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-[#ff6ec4] to-[#7873f5] rounded-full shadow-lg" />
                </div>
              )}
            </div>
            <span className={`font-light text-xs sm:text-sm md:text-base ${m.color} ${milestoneText}`}>{m.year}</span>
            <span className="mt-1 font-light text-xs sm:text-sm md:text-base text-[#232042] dark:text-white">{m.desc}</span>
          </li>
            ))}
          </ol>
        </div>
        {/* Subtle bottom accent */}
        <div className="absolute left-1/2 -bottom-10 -translate-x-1/2 w-56 h-14 bg-[#ff6ec4]/40 rounded-full blur-2xl opacity-50 pointer-events-none" />
      </section>
    </section>
    </div>
  );
};
