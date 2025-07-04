import { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navigation } from './components/Navigation';
import { ScrollProgress } from './components/ScrollProgress';
import { CheckoutSection } from './components/CheckoutSection';
import { NotFound } from './components/NotFound';
import { ThemeProvider } from './components/ThemeProvider';
import { ChevronUp, Users, Globe, Award, Zap, Sparkles, } from 'lucide-react';
import { ResearchSection } from './components/ResearchSection';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { ShopSection } from './components/ShopSection';
import { LoadingSpinner } from './components/LoadingSpinner';

// Simple notification component
const Notification: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
    {message}
    <button className="ml-4 text-white/80 hover:text-white underline" onClick={onClose}>Close</button>
  </div>
);

// Guard for /checkout route
const CheckoutGuard: React.FC<{ cartItems: CartItem[]; children: React.ReactNode; setNotification: (msg: string) => void }> = ({ cartItems, children, setNotification }) => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/checkout' && cartItems.length === 0) {
      setNotification('You cannot access checkout with an empty cart.');
    }
  }, [location, cartItems, setNotification]);
  if (cartItems.length === 0) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

// --- TYPE DEFINITIONS ---
export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  rating?: number;
  reviews?: number;
}

// Cart item interface
export interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

// Main application content component
const AppContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSubstance, setActiveSubstance] = useState(0); // LIFTED STATE
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notification, setNotification] = useState<string>("");
  const navigate = useNavigate();

// Featured Items in Home Section
  const featuredItems = [
    {
      id: 1,
      name: "Testing Kit - Laboratory Grade Purity Verification",
      price: "€5.00",
      image: "/imgs/product1.jpg",
      description: "Laboratory-grade testing kit for verifying substance purity and authenticity for research purposes.",
      rating: 4.4,
      reviews: 85
    },
    {
      id: 2,
      name: "LSD Tab - Holy Family 250ug (Best Seller)",
      price: "€10.00",
      image: "/imgs/product2.jpg",
      description: "Our classic product, perfect for both research and personal exploration.",
      rating: 4.8,
      reviews: 89
    },
    {
      id: 3,
      name: "LSD Tab - Cosmic Journey 300ug",
      price: "€12.00",
      image: "/imgs/product3.jpg",
      description: "High-purity compound for neuroplasticity research.",
      rating: 5.0,
      reviews: 201
    }
  ];

  const allProducts = [
    ...featuredItems,
    {
      id: 4,
      name: "LSD Tab - Ocean of Love 400ug",
      price: "€13.00",
      image: "/imgs/product4.jpg",
      description: "Premium-grade material ideal for experienced researchers and psychonauts looking for deep exploration.",
      rating: 4.7,
      reviews: 156
    },
    {
      id: 5,
      name: "LSD Tab - Rick and Morty 500ug (Limited Edition)",
      price: "€14.00",
      image: "/imgs/product5.jpg",
      description: "Ultra-pure material for consciousness studies and creative exploration. Limited edition with unique artwork.",
      rating: 4.9,
      reviews: 98
    },
    {
      id: 6,
      name: "LSD Tab - Perception Prism 550ug",
      price: "€15.00",
      image: "/imgs/product6.jpg",
      description: "Research-grade material for advanced studies in perception and cognition. Ideal for academic and clinical research.",
      rating: 4.6,
      reviews: 20
    }
  ];

  // Function to add item to cart
  const researchStats = [
    { icon: Users, value: '800+', label: 'Contributors and Researchers' },
    { icon: Globe, value: '15+', label: 'Countries Reached and Counting' },
    { icon: Award, value: '99.9%', label: 'Purity Guarantee Testing Kit Provided' },
    { icon: Zap, value: '24/6', label: 'Customer Support Team Availability (Except Sunday)' }
  ];

  // handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to add item to cart
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // RESEARCH SECTION
  const substances = [
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
        {
          year: "1938",
          title: "Synthesis of LSD",
          icon: "🧪",
          desc: "Albert Hofmann first synthesizes LSD at Sandoz Laboratories."
        },
        {
          year: "1943",
          title: "Discovery of Effects",
          icon: "🚴",
          desc: "Hofmann discovers LSD's psychoactive effects (Bicycle Day)."
        },
        {
          year: "1950s",
          title: "Therapeutic Research",
          icon: "🧠",
          desc: "LSD used in psychotherapy and research for mental health."
        },
        {
          year: "1971",
          title: "Regulation",
          icon: "🚫",
          desc: "LSD classified as Schedule I, research slows dramatically."
        },
        {
          year: "2000s",
          title: "Research Revival",
          icon: "🔬",
          desc: "Modern clinical trials explore LSD for anxiety, PTSD, and creativity."
        }
      ],

      // Details for LSD 
      details: {
        dosages: [
          { label: "Threshold", value: "10-20 µg" },
          { label: "Light", value: "20-75 µg" },
          { label: "Common", value: "75-150 µg" },
          { label: "Strong", value: "150-300 µg" },
          { label: "Heroic", value: "300+ µg" }
        ],
        tolerance: "Tolerance builds rapidly and dissipates after ~2 weeks. Cross-tolerance with other psychedelics (e.g., psilocybin).",
        criticalInfo: [
          "Effects last 8-14 hours.",
          "Set and setting are crucial for safety.",
          "Not physically addictive, but can be psychologically challenging.",
          "Avoid mixing with SSRIs, MAOIs, or other serotonergic substances."
        ],
        suggestions: [
          "Start with a low dose for first-time research.",
          "Have a trusted sitter present.",
          "Ensure a safe, comfortable environment.",
          "Stay hydrated and avoid driving or operating machinery."
        ]
      }
    },
    {
      // Psilocybin
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
        {
          year: "1957",
          title: "Discovery in Mushrooms",
          icon: "🍄",
          desc: "Psilocybin identified as the active compound in magic mushrooms by Albert Hofmann."
        },
        {
          year: "1960",
          title: "Harvard Psilocybin Project",
          icon: "🏫",
          desc: "Timothy Leary and Richard Alpert begin psilocybin research at Harvard."
        },
        {
          year: "1971",
          title: "Regulation",
          icon: "🚫",
          desc: "Psilocybin classified as Schedule I, research halts."
        },
        {
          year: "2006",
          title: "Modern Clinical Trials",
          icon: "🔬",
          desc: "Johns Hopkins publishes landmark study on psilocybin and mystical experience."
        },
        {
          year: "2019",
          title: "Breakthrough Therapy",
          icon: "🌟",
          desc: "FDA designates psilocybin as 'breakthrough therapy' for depression."
        }
      ],
      // Details for Psilocybin
      details: {
        dosages: [
          { label: "Threshold", value: "0.2-0.5 g (dried)" },
          { label: "Light", value: "0.5-1.5 g" },
          { label: "Common", value: "1.5-3.5 g" },
          { label: "Strong", value: "3.5-5 g" },
          { label: "Heroic", value: "5+ g" }
        ],
        tolerance: "Tolerance develops quickly, returns to baseline after ~2 weeks. Cross-tolerance with LSD and other tryptamines.",
        criticalInfo: [
          "Duration: 4-8 hours.",
          "Effects vary by species and individual metabolism.",
          "Not physically addictive.",
          "Risk of nausea; consider fasting beforehand."
        ],
        suggestions: [
          "Weigh doses carefully.",
          "Use in a safe, supportive environment.",
          "Have a sober sitter if inexperienced.",
          "Avoid combining with other substances."
        ]
      }
    },
    // DMT Details
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
        {
          year: "1931",
          title: "First Synthesis",
          icon: "🧪",
          desc: "DMT first synthesized by Richard Manske."
        },
        {
          year: "1956",
          title: "Psychoactive Effects",
          icon: "🧠",
          desc: "Stephen Szára describes DMT's psychoactive properties."
        },
        {
          year: "1960s",
          title: "Ayahuasca Research",
          icon: "🌿",
          desc: "DMT studied as a key component of ayahuasca in South America."
        },
        {
          year: "1990s",
          title: "Consciousness Studies",
          icon: "🌌",
          desc: "Rick Strassman leads clinical research on DMT and consciousness."
        },
        {
          year: "2020s",
          title: "Therapeutic Potential",
          icon: "🔬",
          desc: "Ongoing studies into DMT for depression and neuroplasticity."
        }
      ],
      details: {
        dosages: [
          { label: "Threshold", value: "5-10 mg (vaporized)" },
          { label: "Light", value: "10-20 mg" },
          { label: "Common", value: "20-40 mg" },
          { label: "Strong", value: "40-60 mg" }
        ],
        tolerance: "No significant tolerance with occasional use. Rapid tolerance with repeated dosing.",
        criticalInfo: [
          "Effects last 5-20 minutes (vaporized).",
          "Very intense and immersive.",
          "Not physically addictive.",
          "Should be used sitting or lying down."
        ],
        suggestions: [
          "Have a sober sitter present.",
          "Use a precise scale for dosing.",
          "Start with a low dose.",
          "Avoid if prone to anxiety or psychosis."
        ]
      }
    },
    {
      // MDMA Details
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
        {
          year: "1912",
          title: "Synthesis of MDMA",
          icon: "🧪",
          desc: "Anton Köllisch first synthesizes MDMA at Merck."
        },
        {
          year: "1976",
          title: "Psychoactive Properties",
          icon: "💊",
          desc: "Alexander Shulgin explores MDMA's psychoactive effects."
        },
        {
          year: "1985",
          title: "Regulation",
          icon: "🚫",
          desc: "MDMA classified as Schedule I in the US."
        },
        {
          year: "2000s",
          title: "Therapeutic Research",
          icon: "🧠",
          desc: "MAPS initiates clinical trials for PTSD treatment."
        },
        {
          year: "2021",
          title: "Breakthrough Therapy",
          icon: "🌟",
          desc: "Phase 3 trials show MDMA-assisted therapy highly effective for PTSD."
        }
      ],
      details: {
        dosages: [
          { label: "Threshold", value: "40-70 mg" },
          { label: "Light", value: "70-100 mg" },
          { label: "Common", value: "100-150 mg" },
          { label: "Strong", value: "150-200 mg" }
        ],
        tolerance: "Rapid tolerance; wait at least 4-6 weeks between sessions to avoid neurotoxicity.",
        criticalInfo: [
          "Duration: 4-6 hours.",
          "Risk of dehydration and overheating.",
          "Potential for serotonin depletion and low mood after use.",
          "Do not mix with MAOIs, SSRIs, or other stimulants."
        ],
        suggestions: [
          "Stay hydrated, but do not overhydrate.",
          "Take breaks from dancing or physical activity.",
          "Consider supplementing with antioxidants (e.g., vitamin C).",
          "Test substance purity with a reagent kit."
        ]
      }
    }
  ];

  // Add/update cart item handler
  const handleAddToCart = (product: Product, quantity: number, pricePer: number) => {
    setCartItems(prev => {
      const priceStr = `€${pricePer.toFixed(2)}`;
      const existing = prev.find(item => item.id === product.id && parseFloat(item.price.replace(/[^\d.]/g, '')) === pricePer);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && parseFloat(item.price.replace(/[^\d.]/g, '')) === pricePer
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: priceStr,
            image: product.image,
            quantity,
          },
        ];
      }
    });
    setCartOpen(true);
  };

  // Cart handlers
  const handleQuantityChange = (id: number, delta: number, newPriceStr?: string) => {
    setCartItems(prev => prev.map(item =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(1, item.quantity + delta),
            price: newPriceStr ? newPriceStr : item.price
          }
        : item
    ));
  };

  // This function will remove the item from the cart based on its ID
  const handleRemove = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout');
      setTimeout(() => setCartOpen(false), 300); // Close after navigation
    } else {
      setNotification('You cannot access checkout with an empty cart.');
      setCartOpen(false);
    }
  };

  // This function will handle the checkout process, such as navigating to the checkout page or showing a notification
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f8ff] to-[#e0c3fc] dark:from-[#0a001a] dark:to-[#3a0ca3] font-[Inter,sans-serif] tracking-wide transition-colors duration-300">
      <ScrollProgress />
      {/* Navigation */}
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        cartItems={cartItems}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
      />
      {notification && (
        <Notification message={notification} onClose={() => setNotification("")} />
      )}
      {/* Main Content with Routes */}
      <main className="relative mt-16 z-10">
        <Routes>
          <Route path="/" element={<HomeSection featuredItems={featuredItems} researchStats={researchStats} handleAddToCart={handleAddToCart} setActiveSection={function (): void {
            throw new Error('Function not implemented.');
          } } />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/shop" element={<ShopSection allProducts={allProducts} handleAddToCart={handleAddToCart} />} />
          <Route path="/research" element={<ResearchSection activeSubstance={activeSubstance} setActiveSubstance={setActiveSubstance} substances={substances} />} />
          <Route path="/checkout" element={
            <CheckoutGuard cartItems={cartItems} setNotification={setNotification}>
              <CheckoutSection cartItems={cartItems} onBack={() => {}} />
            </CheckoutGuard>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40"
        >
          <ChevronUp className="w-6 h-6 mx-auto" />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1a0036] to-[#ff6ec4] dark:from-[#0a001a] dark:to-[#3a0ca3] text-white py-16 shadow-[0_0_32px_8px_#ff6ec4]/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-2xl font-bold">Lucid Garden</span>
          </div>
          <p className="text-white/80 mb-4">
            Advancing consciousness research through scientific excellence and ethical practices
          </p>
          <p className="text-white/60 text-sm">
            © 2025 Lucid Garden. All rights reserved. For research purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Router>
            <AppContent />
          </Router>
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
export default App;