import { AnimatedBackground } from './AnimatedBackground';
import { Sparkles } from 'lucide-react';
import React, { useRef, useEffect } from 'react';
// Custom hook for drag/touch scroll
function useDragScroll(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let isTouch = false;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      isTouch = false;
      el.classList.add('select-none');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
      el.classList.remove('select-none');
    };
    const onMouseUp = () => {
      isDown = false;
      el.classList.remove('select-none');
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown || isTouch) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.2;
      el.scrollLeft = scrollLeft - walk;
    };
    // Touch events
    let touchStartX = 0;
    let touchScrollLeft = 0;
    const onTouchStart = (e: TouchEvent) => {
      isDown = true;
      isTouch = true;
      touchStartX = e.touches[0].pageX - el.offsetLeft;
      touchScrollLeft = el.scrollLeft;
    };
    const onTouchEnd = () => {
      isDown = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - el.offsetLeft;
      const walk = (x - touchStartX) * 1.2;
      el.scrollLeft = touchScrollLeft - walk;
    };
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('touchstart', onTouchStart);
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchmove', onTouchMove);
    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, [ref]);
}
import { useTheme } from './useTheme';

interface Substance {
  name: string;
  color?: string;
  img: string;
  summary: string;
  research: string[];
  details: {
    dosages: { label: string; value: string }[];
    tolerance: string;
    criticalInfo: string[];
    suggestions: string[];
  };
  timeline: { year: string; title: string; desc: string; icon: React.ReactNode }[];
}

export interface ResearchSectionProps {
  activeSubstance: number;
  setActiveSubstance: React.Dispatch<React.SetStateAction<number>>;
  substances: {
    name: string;
    color: string;
    img: string;
    summary: string;
    research: string[];
    timeline: {
      year: string;
      title: string;
      icon: string;
      desc: string;
    }[];
    details: {
      dosages: { label: string; value: string }[];
      tolerance: string;
      criticalInfo: string[];
      suggestions: string[];
    };
  }[];
}
const substances: Substance[] = [
  {
    name: 'LSD',
    color: 'from-[#ff6ec4] to-[#7873f5]',
    img: '/imgs/LSD.jpg',
    summary: 'Profound effects on perception, cognition, and creativity. Used in research for mental health and neuroplasticity.',
    research: [
      'First synthesized in 1938 by Albert Hofmann.',
      'Acts on serotonin 5-HT2A receptors, altering consciousness.',
      'Clinical trials show promise for depression, anxiety, and PTSD.',
      'Microdosing studies explore cognitive and creative enhancement.'
    ],
    timeline: [
      { year: '1938', title: 'Synthesis of LSD', icon: '🧪', desc: `Albert Hofmann first synthesizes LSD at Sandoz Laboratories.` },
      { year: '1943', title: 'Discovery of Effects', icon: '🚴', desc: `Hofmann discovers LSD's psychoactive effects (Bicycle Day).` },
      { year: '1950s', title: 'Therapeutic Research', icon: '🧠', desc: `LSD used in psychotherapy and research for mental health.` },
      { year: '1971', title: 'Regulation', icon: '🚫', desc: `LSD classified as Schedule I, research slows dramatically.` },
      { year: '2000s', title: 'Research Revival', icon: '🔬', desc: `Modern clinical trials explore LSD for anxiety, PTSD, and creativity.` }
    ],
    details: {
      dosages: [
        { label: 'Threshold', value: '10-20 µg' },
        { label: 'Light', value: '20-75 µg' },
        { label: 'Common', value: '75-150 µg' },
        { label: 'Strong', value: '150-300 µg' },
        { label: 'Heroic', value: '300+ µg' }
      ],
      tolerance: 'Tolerance builds rapidly and dissipates after ~2 weeks. Cross-tolerance with other psychedelics (e.g., psilocybin).',
      criticalInfo: [
        'Effects last 8-14 hours.',
        'Set and setting are crucial for safety.',
        'Not physically addictive, but can be psychologically challenging.',
        'Avoid mixing with SSRIs, MAOIs, or other serotonergic substances.'
      ],
      suggestions: [
        'Start with a low dose for first-time research.',
        'Have a trusted sitter present.',
        'Ensure a safe, comfortable environment.',
        'Stay hydrated and avoid driving or operating machinery.'
      ]
    }
  },
  {
    name: 'Psilocybin',
    color: 'from-[#ffb6ff] to-[#7873f5]',
    img: '/imgs/PSILOCYBIN.jpg',
    summary: 'The active compound in magic mushrooms, studied for its therapeutic potential in depression, anxiety, and addiction.',
    research: [
      'Naturally occurring in over 200 species of mushrooms.',
      'Promotes neurogenesis and neural plasticity.',
      'Breakthrough therapy for treatment-resistant depression (FDA).',
      'Research on mystical-type experiences and long-term well-being.'
    ],
    timeline: [
      { year: '1957', title: 'Discovery in Mushrooms', icon: '🍄', desc: 'Psilocybin identified as the active compound in magic mushrooms by Albert Hofmann.' },
      { year: '1960', title: 'Harvard Psilocybin Project', icon: '🏫', desc: 'Timothy Leary and Richard Alpert begin psilocybin research at Harvard.' },
      { year: '1971', title: 'Regulation', icon: '🚫', desc: 'Psilocybin classified as Schedule I, research halts.' },
      { year: '2006', title: 'Modern Clinical Trials', icon: '🔬', desc: 'Johns Hopkins publishes landmark study on psilocybin and mystical experience.' },
      { year: '2019', title: 'Breakthrough Therapy', icon: '🌟', desc: `FDA designates psilocybin as 'breakthrough therapy' for depression.` }
    ],
    details: {
      dosages: [
        { label: 'Threshold', value: '0.2-0.5 g (dried)' },
        { label: 'Light', value: '0.5-1.5 g' },
        { label: 'Common', value: '1.5-3.5 g' },
        { label: 'Strong', value: '3.5-5 g' },
        { label: 'Heroic', value: '5+ g' }
      ],
      tolerance: 'Tolerance develops quickly, returns to baseline after ~2 weeks. Cross-tolerance with LSD and other tryptamines.',
      criticalInfo: [
        'Duration: 4-8 hours.',
        'Effects vary by species and individual metabolism.',
        'Not physically addictive.',
        'Risk of nausea; consider fasting beforehand.'
      ],
      suggestions: [
        'Weigh doses carefully.',
        'Use in a safe, supportive environment.',
        'Have a sober sitter if inexperienced.',
        'Avoid combining with other substances.'
      ]
    }
  },
  {
    name: 'DMT',
    color: 'from-[#bdb2ff] to-[#ff6ec4]',
    img: '/imgs/DMT.jpg',
    summary: 'A naturally occurring tryptamine, known for intense, short-lived experiences. Investigated for its role in consciousness and potential therapeutic uses.',
    research: [
      'Found in many plants and the human brain.',
      'Central to ayahuasca ceremonies and shamanic traditions.',
      'Studied for near-death and mystical experiences.',
      'Potential for rapid-acting antidepressant effects.'
    ],
    timeline: [
      { year: '1931', title: 'First Synthesis', icon: '🧪', desc: 'DMT first synthesized by Richard Manske.' },
      { year: '1956', title: 'Psychoactive Effects', icon: '🧠', desc: `Stephen Szára describes DMT's psychoactive properties.` },
      { year: '1960s', title: 'Ayahuasca Research', icon: '🌿', desc: 'DMT studied as a key component of ayahuasca in South America.' },
      { year: '1990s', title: 'Consciousness Studies', icon: '🌌', desc: 'Rick Strassman leads clinical research on DMT and consciousness.' },
      { year: '2020s', title: 'Therapeutic Potential', icon: '🔬', desc: 'Ongoing studies into DMT for depression and neuroplasticity.' }
    ],
    details: {
      dosages: [
        { label: 'Threshold', value: '5-10 mg (vaporized)' },
        { label: 'Light', value: '10-20 mg' },
        { label: 'Common', value: '20-40 mg' },
        { label: 'Strong', value: '40-60 mg' }
      ],
      tolerance: 'No significant tolerance with occasional use. Rapid tolerance with repeated dosing.',
      criticalInfo: [
        'Effects last 5-20 minutes (vaporized).',
        'Very intense and immersive.',
        'Not physically addictive.',
        'Should be used sitting or lying down.'
      ],
      suggestions: [
        'Have a sober sitter present.',
        'Use a precise scale for dosing.',
        'Start with a low dose.',
        'Avoid if prone to anxiety or psychosis.'
      ]
    }
  },
  {
    name: 'MDMA',
    color: 'from-[#ff6ec4] to-[#bdb2ff]',
    img: '/imgs/MDMA.jpg',
    summary: 'Empathogen with unique effects on social connection and trauma processing. Studied for PTSD and couples therapy.',
    research: [
      'Promotes release of serotonin, dopamine, and oxytocin.',
      'Phase 3 clinical trials for PTSD (MAPS).',
      'Research on social bonding and emotional openness.',
      'Potential for anxiety reduction in end-of-life care.'
    ],
    timeline: [
      { year: '1912', title: 'Synthesis of MDMA', icon: '🧪', desc: 'Anton Köllisch first synthesizes MDMA at Merck.' },
      { year: '1976', title: 'Psychoactive Properties', icon: '💊', desc: `Alexander Shulgin explores MDMA's psychoactive effects.` },
      { year: '1985', title: 'Regulation', icon: '🚫', desc: 'MDMA classified as Schedule I in the US.' },
      { year: '2000s', title: 'Therapeutic Research', icon: '🧠', desc: 'MAPS initiates clinical trials for PTSD treatment.' },
      { year: '2021', title: 'Breakthrough Therapy', icon: '🌟', desc: 'Phase 3 trials show MDMA-assisted therapy highly effective for PTSD.' }
    ],
    details: {
      dosages: [
        { label: 'Threshold', value: '40-70 mg' },
        { label: 'Light', value: '70-100 mg' },
        { label: 'Common', value: '100-150 mg' },
        { label: 'Strong', value: '150-200 mg' }
      ],
      tolerance: 'Rapid tolerance; wait at least 4-6 weeks between sessions to avoid neurotoxicity.',
      criticalInfo: [
        'Duration: 4-6 hours.',
        'Risk of dehydration and overheating.',
        'Potential for serotonin depletion and low mood after use.',
        'Do not mix with MAOIs, SSRIs, or other stimulants.'
      ],
      suggestions: [
        'Stay hydrated, but do not overhydrate.',
        'Take breaks from dancing or physical activity.',
        'Consider supplementing with antioxidants (e.g., vitamin C).',
        'Test substance purity with a reagent kit.'
      ]
    }
  }
];

export const ResearchSection: React.FC<ResearchSectionProps> = ({ activeSubstance, setActiveSubstance, substances: propSubstances }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const moleculeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!moleculeRef.current) return;
      const { left, top, width, height } = moleculeRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / width;
      const y = (e.clientY - top - height / 2) / height;
      moleculeRef.current.style.transform = `rotateY(${x * 30}deg) rotateX(${-y * 30}deg) scale(1.08)`;
    };
    const reset = () => {
      if (moleculeRef.current) moleculeRef.current.style.transform = '';
    };
    const el = moleculeRef.current;
    if (el) {
      el.addEventListener('mousemove', handle);
      el.addEventListener('mouseleave', reset);
    }
    return () => {
      if (el) {
        el.removeEventListener('mousemove', handle);
        el.removeEventListener('mouseleave', reset);
      }
    };
  }, []);

  // Use propSubstances if provided and non-empty, otherwise fallback to local array
  const allSubstances = (propSubstances && propSubstances.length > 0) ? propSubstances : substances;

  // Example live feed (should be passed as prop or imported in real app)
  const liveFeed = [
    "LSD microdosing study published in Nature Neuroscience.",
    "Psilocybin therapy receives FDA breakthrough status.",
    "DMT research explores rapid-acting antidepressant effects.",
    "MDMA-assisted therapy shows 88% remission in PTSD trial.",
    "First legal psychedelic research center opens in Europe.",
    "Neuroplasticity boost confirmed in LSD animal studies.",
    "Monero accepted for privacy-focused research purchases.",
    "Global conference on psychedelic science announced.",
    "AI-driven molecule discovery accelerates compound research.",
    "MAPS launches phase 3 MDMA clinical trials."
  ];
  const feedItems = [...liveFeed, ...liveFeed];

  const navRef = useRef<HTMLUListElement>(null);
  useDragScroll(navRef);

  return (
    <div className="research-section relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#f8f6ff] via-[#ede7fa] to-[#ffe6f6] dark:from-[#1a0036] dark:via-[#3a0ca3] dark:to-[#7873f5] overflow-hidden px-2 xs:px-3 sm:px-4 md:px-6 max-w-full font-sans">
      <AnimatedBackground variant="section" />
      <div className="absolute inset-0 pointer-events-none z-0 animate-gradient-x bg-gradient-to-r from-[#7873f5]/10 via-transparent to-[#ff6ec4]/10" />
      <div className="w-full max-w-full md:max-w-5xl mx-auto flex flex-col items-center justify-center py-20 xs:py-20 sm:py-20 z-10 space-y-10 xs:space-y-12 md:space-y-16 relative">
        {/* Section Title */}
        <div className="flex flex-col items-center space-y-4 z-10 px-2 xs:px-4 w-full">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-2xl rounded-full px-7 py-2 text-[#ff6ec4] border border-white/20 shadow font-mono tracking-widest uppercase animate-fade-in">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-[Inter,sans-serif]">Research</span>
          </div>
          <h2 className="text-2xl xxs:text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#7b2ff2] to-[#f357a8] bg-clip-text text-transparent tracking-tight drop-shadow-[0_2px_32px_#ff6ec4]/60 text-center animate-gradient-x leading-tight font-[Inter,sans-serif] dark:from-[#ff6ec4] dark:to-[#bdb2ff]">The Future of Research</h2>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light text-center animate-fade-in text-[#232042] dark:text-gray-100 font-[Inter,sans-serif]">Explore the science, breakthroughs, and mysteries of consciousness-altering compounds in a seamless, immersive experience.</p>
        </div>
        {/* Live Research Feed Ticker - continuous */}
        <div className="w-full flex justify-center z-40 mb-6 xs:mb-8 px-1 xs:px-2">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-full bg-gradient-to-r from-[#ff6ec4]/30 to-[#7873f5]/30 shadow-[0_0_32px_8px_#ff6ec4]/20 border border-white/20">
            <div
            className="whitespace-nowrap text-sm xs:text-base md:text-lg font-mono text-[#232042] dark:text-white px-4 xs:px-8 py-2 xs:py-3 flex animate-continuous-marquee"
              style={{ minWidth: '200%' }}
            >
              {feedItems.map((item, i) => (
                <span key={i} className="mx-8">{item}</span>
              ))}
            </div>
            <style>{`
              @keyframes continuous-marquee {
                0% { transform: translateX(0);}
                100% { transform: translateX(-50%);}
              }
              .animate-continuous-marquee {
                animation: continuous-marquee 28s linear infinite;
              }
            `}</style>
          </div>
        </div>
        {/* Substance Navigation Bar - ShopSection style, only LSD, Psilocybin, DMT, MDMA */}
        <nav className="relative flex justify-center mt-14 mb-8 xs:mb-14 z-30 px-2 xs:px-4 w-full font-[Inter,sans-serif]">
          <div className="w-full flex justify-center">
            <ul
              ref={navRef}
              className="inline-flex flex-row flex-nowrap gap-1 sm:gap-3 md:gap-3 py-1 px-1 rounded-[2.5rem] border-2 border-purple-200 dark:border-purple-900 60 shadow-[0_4px_48px_12px_#ff6ec4]/40 backdrop-blur-2xl bg-gradient-to-br from-[#ff6ec4]/30 via-[#e0c3fc]/20 to-[#7873f5]/30 dark:from-[#1a0036]/80 dark:to-[#3a0ca3]/40 relative animate-fade-in max-w-full font-sans overflow-x-auto md:overflow-x-visible scrollbar-hide"
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                maxWidth: '100%',
              }}
            >
              <div className="absolute -z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-[#ff6ec4]/10 via-[#bdb2ff]/10 to-[#7873f5]/10 rounded-[2.5rem] blur-2xl opacity-60 pointer-events-none animate-pulse-slow" />
              {[
                { label: 'LSD', icon: '🧩' },
                { label: 'PSILOCYBIN', icon: '🍄' },
                { label: 'DMT', icon: '🧬' },
                { label: 'MDMA', icon: '🧸' },
              ].map((sub, idx) => (
                <li key={sub.label} className="relative snap-center last:mr-0">
                  <button
                    type="button"
                    onClick={() => setActiveSubstance(idx)}
                    className={`group min-w-[72px] xs:min-w-[90px] sm:min-w-[110px] px-2 xs:px-4 sm:px-6 py-2 xs:py-2.5 rounded-full font-extrabold border-2 transition-all duration-200 text-xs xs:text-sm sm:text-base tracking-widest shadow-xl flex items-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ff6ec4]/40 font-mono
                      ${activeSubstance === idx
                        ? 'bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white border-[#ff6ec4] scale-110 ring-2 ring-[#ff6ec4]/40 drop-shadow-[0_2px_20px_#ff6ec4]/50 animate-glow-pulse font-[Inter,sans-serif]'
                        : 'bg-white/70 dark:bg-[#232042]/70 text-[#7873f5] border-white/40 dark:border-purple-900 hover:bg-[#ff6ec4]/20 hover:text-[#ff6ec4] hover:font-extrabold hover:scale-105 font-[Inter,sans-serif]'}
                    `}
                    aria-current={activeSubstance === idx ? 'page' : undefined}
                    tabIndex={0}
                    style={{boxShadow:'0 2px 16px 0 #ff6ec422'}}>
                    <span className="inline-block text-base sm:text-lg transition-all duration-200">
                      {sub.icon}
                    </span>
                    <span className="drop-shadow-[0_1px_4px_#ff6ec4]/30 transition-all duration-200 font-[Inter,sans-serif]">{sub.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        {/* 3D Parallax Molecule Visual + Info Panel */}
        <div className="relative flex flex-col md:flex-row items-center gap-7 xs:gap-10 w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6 animate-fade-in">
          <div
            ref={moleculeRef}
            className="relative w-48 h-48 xs:w-56 xs:h-56 md:w-72 md:h-72 bg-gradient-to-br from-[#ff6ec4]/40 via-[#bdb2ff]/30 to-[#7873f5]/40 rounded-[2.5rem] border-2 border-purple-200 dark:border-purple-900/60 shadow-[0_0_64px_16px_#ff6ec4]/30 flex items-center justify-center transition-transform duration-300 cursor-pointer overflow-hidden group animate-fade-in"
            tabIndex={0}
            aria-label="3D Molecule"
          >
            <div className="absolute inset-0 rounded-[2.5rem] border-4 border-transparent group-hover:border-[#ff6ec4]/40 transition-all duration-700 pointer-events-none animate-glow-border" style={{zIndex:2}} />
            <img
              src={allSubstances[activeSubstance].img}
              alt={allSubstances[activeSubstance].name}
              className="w-full h-full object-contain drop-shadow-[0_0_32px_#ff6ec4]/40"
              draggable={false}
            />
            <div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-[#ff6ec4]/40 to-[#7873f5]/40 rounded-full blur-2xl opacity-60 pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-14 h-14 bg-gradient-to-br from-[#bdb2ff]/40 to-[#ff6ec4]/40 rounded-full blur-2xl opacity-50 pointer-events-none" />
          </div>
          {/* Substance Info Panel */ }
            <div className="flex-1 bg-white/95 dark:bg-gray-900/50 backdrop-blur-3xl rounded-[2.5rem] border-2 border-purple-200 dark:border-purple-900/60 shadow-[0_0_64px_16px_#ff6ec4]/30 p-5 xs:p-7 sm:p-8 md:p-10 min-w-[220px] xs:min-w-[260px] max-w-xl transition-all duration-300 overflow-hidden animate-fade-in flex flex-col items-center gap-2">
            <p className="text-xs sm:text-sm md:text-base text-[#232042] dark:text-gray-100 font-light leading-relaxed text-center max-w-2xl mx-auto mb-2 font-[Inter,sans-serif]">{allSubstances[activeSubstance].summary}</p>
            <ul className="list-disc pl-4 xs:pl-6 space-y-1 xs:space-y-2 text-xs sm:text-sm md:text-base text-[#232042] dark:text-gray-100">
              {allSubstances[activeSubstance].research.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
        {/* --- Substance Details Section --- */}
        <section className="w-full max-w-2xl md:max-w-3xl mx-auto mt-8 xs:mt-10 sm:mt-12 z-30">
          <div className="relative overflow-visible">
            {/* Glassmorphic Card with badge/flair inside - improved visuals */}
            <div className="flex flex-col items-center bg-white/30 dark:bg-gray-900/40 rounded-3xl border border-purple-100 dark:border-purple-900/50 shadow-lg p-6 animate-fade-in overflow-visible" style={{borderRadius:'1.5rem'}}>
              {/* Decorative badge flair - now inside and relative */}
              <div className="flex items-center gap-2 mb-2 justify-center w-full">
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#bdb2ff]/80 to-[#ff6ec4]/80 text-xs font-bold text-white shadow">Data updates containing the chosen substance</span>
              </div>
              {/* Section Title - more compact, modern */}
              <h3 className="text-fluid-xl md:text-fluid-2xl font-extrabold mb-1 tracking-tight drop-shadow-[0_2px_12px_#ff6ec4]/20 text-transparent bg-gradient-to-r from-[#7b2ff2] to-[#f357a8] bg-clip-text text-center font-[Inter,sans-serif] dark:from-[#7873f5] dark:to-[#ff6ec4] flex items-center gap-2">
                <Sparkles className="inline w-6 h-6 text-[#ff6ec4] animate-pulse" />
                {substances[activeSubstance].name} Details
              </h3>
              <div className="my-1 h-[2px] w-16 mx-auto bg-gradient-to-r from-[#ff6ec4] via-[#bdb2ff] to-[#7873f5] opacity-60 rounded-full" />
              {/* Details Grid - modern cards, smaller text, more compact, with subtle hover ring and shadow */}
              <div className="grid md:grid-cols-2 gap-6 mt-4 px-3 sm:px-5 w-full">
                {/* Dosages Card */}
                <div className="relative flex flex-col items-start bg-white/30 dark:bg-gray-900/40 rounded-2xl border border-purple-100 dark:border-purple-900/50 shadow-lg p-5 group transition-all duration-200 hover:shadow-xl hover:scale-[1.025] animate-fade-in w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#ff6ec4] to-[#7873f5] shadow-md inline-flex items-center justify-center text-white text-lg">💊</span>
                    <span className="text-base sm:text-lg font-extrabold bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text text-transparent tracking-wide font-[Inter,sans-serif]">Dosage Guide</span>
                  </div>
                  {/* Dosages List */}
                  <ul className="space-y-1 text-xs xs:text-sm sm:text-[15px] md:text-sm text-gray-700 dark:text-gray-100">
                    {allSubstances[activeSubstance].details.dosages.map((dose, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <span className="font-semibold text-[#ff6ec4]">{dose.label}:</span> <span>{dose.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Tolerance Card */}
                <div className="relative flex flex-col items-start bg-white/30 dark:bg-gray-900/40 rounded-2xl border border-purple-100 dark:border-purple-900/50 shadow-lg p-5 group transition-all duration-200 hover:shadow-xl hover:scale-[1.025] animate-fade-in w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7873f5] to-[#ff6ec4] shadow-md inline-flex items-center justify-center text-white text-lg">⏳</span>
                    <span className="text-base sm:text-lg font-extrabold bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] bg-clip-text text-transparent tracking-wide font-[Inter,sans-serif]">Tolerance</span>
                  </div>
                  <p className="text-xs xs:text-sm sm:text-[15px] md:text-sm text-gray-700 dark:text-gray-100 leading-relaxed">{allSubstances[activeSubstance].details.tolerance}</p>
                </div>
              </div>
              {/* Critical Info & Suggestions - modern cards, smaller text */}
              <div className="grid md:grid-cols-2 gap-4 mt-6 px-3 sm:px-5">
                {/* Critical Info Card */}
                <div className="relative flex flex-col items-start bg-white/30 dark:bg-gray-900/40 rounded-2xl border border-pink-100 dark:border-pink-900/50 shadow-lg p-5 group transition-all duration-200 hover:shadow-xl hover:scale-[1.025] animate-fade-in w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#ff6ec4] to-[#bdb2ff] shadow-md inline-flex items-center justify-center text-white text-lg">⚡</span>
                    <span className="text-base sm:text-lg font-extrabold bg-gradient-to-r from-[#ff6ec4] to-[#bdb2ff] bg-clip-text text-transparent tracking-wide font-[Inter,sans-serif]">Critical Information</span>
                  </div>
                  <ul className="list-disc pl-5 text-xs xs:text-sm sm:text-[15px] md:text-sm space-y-1 text-gray-700 dark:text-gray-100">
                    {allSubstances[activeSubstance].details.criticalInfo.map((info, i) => (
                      <li key={i} className="flex items-start">{info}</li>
                    ))}
                  </ul>
                </div>
                {/* Suggestions Card */}
                <div className="relative flex flex-col items-start bg-white/30 dark:bg-gray-900/40 rounded-2xl border border-blue-100 dark:border-blue-900/50 shadow-lg p-5 group transition-all duration-200 hover:shadow-xl hover:scale-[1.025] animate-fade-in w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#bdb2ff] to-[#7873f5] shadow-md inline-flex items-center justify-center text-white text-lg">💡</span>
                    <span className="text-base sm:text-lg font-extrabold bg-gradient-to-r from-[#bdb2ff] to-[#7873f5] bg-clip-text text-transparent tracking-wide font-[Inter,sans-serif]">Suggestions</span>
                  </div>
                  <ul className="list-disc pl-5 text-xs xs:text-sm sm:text-[15px] md:text-sm space-y-1 text-gray-700 dark:text-gray-100">
                    {allSubstances[activeSubstance].details.suggestions.map((sugg, i) => (
                      <li key={i} className="flex items-start">{sugg}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Glow/blur accents */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#ff6ec4]/30 to-[#7873f5]/30 rounded-full blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-[#bdb2ff]/30 to-[#ff6ec4]/30 rounded-full blur-xl opacity-15 pointer-events-none" />
            </div>
          </div>
        </section>
        {/* --- Research Timeline Section (AboutSection Milestones visual design) --- */}
        <section className="relative bg-white/40 dark:bg-gray-900/50 backdrop-blur-3xl rounded-[2.5rem] border-2 border-purple-200 dark:border-purple-900/60 shadow-[0_0_80px_24px_#ff6ec4]/30 px-10 py-10 sm:py-14 w-full max-w-3xl mx-auto mt-12 mb-0 flex flex-col items-center gap-6 sm:gap-10 animate-fade-in overflow-hidden font-sans" style={{boxShadow:'0 12px 80px 0 #ff6ec444, 0 2px 24px 0 #7873f555', borderRadius:'2.5rem'}}>
          <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-extrabold bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text text-transparent text-center tracking-tight drop-shadow-[0_2px_12px_#ff6ec4]/20 animate-gradient-x mb-1 font-[Inter,sans-serif]">Substance Timeline</h3>
          <p className="text-xs sm:text-sm md:text-base text-[#3a1a5d] dark:text-gray-100 font-light leading-relaxed text-center max-w-2xl mx-auto mb-2 font-[Inter,sans-serif]">This timeline updates with the selected substance above.</p>
          <div className="relative w-full">
            {/* Desktop vertical timeline - AboutSection style */}
            <ol className="hidden sm:block space-y-4 md:space-y-6 lg:space-y-8">
              {allSubstances[activeSubstance].timeline.map((item, idx, arr) => {
                // Per-milestone gradient bg (fallback to substance color if not present)
                const bg = allSubstances[activeSubstance].color || 'from-[#ff6ec4] to-[#7873f5]';
                const color = 'text-[#ff6ec4]';
                return (
                  <li key={item.year} className="relative flex items-start animate-fade-in group" style={{ animationDelay: `${idx * 0.18}s` }}>
                    <div className="flex-shrink-0 relative z-10 flex flex-col items-center" style={{ width: 40, height: 40 }}>
                      <div className={`w-9 h-9 flex items-center justify-center bg-gradient-to-br ${bg} rounded-full shadow-xl text-xl group-hover:scale-105 transition-transform duration-200`}>
                        <span role="img" aria-label="milestone-icon">{item.icon}</span>
                      </div>
                      {/* Center divider below circle, except after last */}
                      {idx < arr.length - 1 && (
                        <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 h-10 xs:h-14 sm:h-16 w-1 bg-gradient-to-b from-[#ff6ec4]/40 via-[#bdb2ff]/40 to-[#7873f5]/40 rounded-full z-0" />
                      )}
                    </div>
                    <div className="ml-5 flex-1">
                      <span className={`font-bold text-sm sm:text-base md:text-lg ${color}`}>{item.year}</span>
                    <span className="ml-2 font-semibold text-xs sm:text-sm md:text-base text-[#232042] dark:text-white">{item.title}</span>
                    <p className="max-w-xl text-xs sm:text-sm md:text-base text-[#232042] dark:text-gray-300">{item.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            {/* Mobile horizontal timeline - AboutSection style */}
            <ol className="flex flex-col gap-3 xs:gap-4 sm:hidden">
              {allSubstances[activeSubstance].timeline.map((item, idx, arr) => {
                const bg = allSubstances[activeSubstance].color || 'from-[#ff6ec4] to-[#7873f5]';
                const color = 'text-[#ff6ec4]';
                return (
                  <li key={item.year} className="relative flex flex-col items-center text-center animate-fade-in group" style={{ animationDelay: `${idx * 0.18}s` }}>
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 flex items-center justify-center bg-gradient-to-br ${bg} rounded-full shadow-xl text-xl mb-2`}>
                        <span role="img" aria-label="milestone-icon">{item.icon}</span>
                      </div>
                      {/* Horizontal divider except after last item, centered */}
                      {idx < arr.length - 1 && (
                        <div className="w-12 xs:w-16 h-1 bg-gradient-to-r from-[#ff6ec4]/40 via-[#bdb2ff]/40 to-[#7873f5]/40 rounded-full my-2 mx-auto relative flex items-center justify-center">
                          <div className="absolute left-1/2 -top-2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-[#ff6ec4] to-[#7873f5] rounded-full shadow-lg" />
                        </div>
                      )}
                    </div>
                    <span className={`font-bold text-xs sm:text-sm md:text-base ${color}`}>{item.year}</span>
                    <span className="mt-1 font-semibold text-xs sm:text-sm md:text-base text-[#232042] dark:text-white">{item.title}</span>
                    <p className="max-w-xl text-xs sm:text-sm md:text-base text-[#232042] dark:text-gray-300">{item.desc}</p>
                  </li>
                );
              })}
            </ol>
          </div>
          {/* Subtle bottom accent */}
          <div className="absolute left-1/2 -bottom-10 -translate-x-1/2 w-56 h-14 bg-[#ff6ec4]/40 rounded-full blur-2xl opacity-50 pointer-events-none" />
        </section>
        {/* Futuristic Vision Section */}
        <div className="relative bg-gradient-to-br from-[#e0c3fc]/80 to-[#ff6ec4]/20 dark:from-[#1a0036]/60 dark:to-[#3a0ca3]/30 rounded-[2.5rem] border-2 border-purple-200 dark:border-purple-900/70 shadow-[0_0_48px_16px_#ff6ec4]/20 px-14 py-20 flex flex-col items-center w-full animate-fade-in overflow-hidden group mt-16">
          {/* Animated constellation SVG background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 animate-fade-in-slow" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{zIndex:1}}>
            <circle cx="120" cy="80" r="2.5" fill="#bdb2ff"/>
            <circle cx="700" cy="120" r="2" fill="#ff6ec4"/>
            <circle cx="400" cy="300" r="3" fill="#7873f5"/>
            <circle cx="600" cy="350" r="1.5" fill="#ff6ec4"/>
            <circle cx="200" cy="320" r="2" fill="#bdb2ff"/>
            <line x1="120" y1="80" x2="400" y2="300" stroke="#ff6ec4" strokeDasharray="4 4" strokeWidth="1"/>
            <line x1="400" y1="300" x2="700" y2="120" stroke="#bdb2ff" strokeDasharray="2 6" strokeWidth="1"/>
            <line x1="200" y1="320" x2="600" y2="350" stroke="#7873f5" strokeDasharray="3 5" strokeWidth="1"/>
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="8s" repeatCount="indefinite"/>
          </svg>
          {/* Animated glowing border accent */}
          <div className="absolute inset-0 rounded-[2.5rem] border-4 border-transparent group-hover:border-[#ff6ec4]/60 transition-all duration-700 pointer-events-none animate-glow-border" style={{zIndex:2}} />
          <div className="flex flex-col items-center space-y-2 relative z-10">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-2xl rounded-full px-6 py-2 text-[#7873f5] border border-white/20 shadow-[0_0_24px_4px_#7873f5]/30 font-mono tracking-widest uppercase">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="text-sm">Vision</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text text-transparent tracking-tight drop-shadow-[0_2px_24px_#ff6ec4]/30 text-center mb-2 animate-gradient-x">A New Era of Consciousness</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl text-center font-light">
              Lucid Garden is dedicated to pioneering the future of human potential. We blend advanced science, ethical sourcing, and creative vision to empower researchers and explorers worldwide. Our mission is to unlock new frontiers in consciousness, healing, and innovation—together.
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              <span className={`px-4 py-2 rounded-full bg-gradient-to-r from-[#ff6ec4]/30 to-[#7873f5]/30 text-xs font-semibold tracking-widest uppercase shadow ${isLight ? 'text-purple-700' : 'dark:text-purple-200'}`}>Innovation</span>
              <span className={`px-4 py-2 rounded-full bg-gradient-to-r from-[#7873f5]/30 to-[#ff6ec4]/30 text-xs font-semibold tracking-widest uppercase shadow ${isLight ? 'text-pink-700' : 'dark:text-pink-200'}`}>Integrity</span>
              <span className={`px-4 py-2 rounded-full bg-gradient-to-r from-[#bdb2ff]/30 to-[#ff6ec4]/30 text-xs font-semibold tracking-widest uppercase shadow ${isLight ? 'text-blue-700' : 'dark:text-blue-200'}`}>Collaboration</span>
              <span className={`px-4 py-2 rounded-full bg-gradient-to-r from-[#ff6ec4]/30 to-[#bdb2ff]/30 text-xs font-semibold tracking-widest uppercase shadow ${isLight ? 'text-pink-700' : 'dark:text-pink-200'}`}>Exploration</span>
            </div>
            {/* Visionary Timeline Mini-Carousel */}
            <div className="mt-8 w-full max-w-xl">
              {/* VisionaryTimeline component not defined; placeholder below */}
            <div className={`text-center text-lg py-8 ${isLight ? 'text-black/70' : 'text-white/70'}`}>
              <span className="italic">Visionary timeline coming soon...</span>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   );  
};