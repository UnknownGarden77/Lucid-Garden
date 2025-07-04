import React from 'react';
import { useTheme } from './useTheme';
import { Sparkles, Moon, Sun, Menu, X, ShoppingCart } from 'lucide-react';
import { CartDropdown, CartItem } from './CartDropdown';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  cartItems: CartItem[];
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onQuantityChange: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

interface CartButtonProps {
  cartItems: CartItem[];
}

const navigation = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'shop', label: 'Shop', path: '/shop' },
  { id: 'research', label: 'Research', path: '/research' }
];



export const Navigation: React.FC<NavigationProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  cartItems,
  cartOpen,
  setCartOpen,
  onQuantityChange,
  onRemove,
  onCheckout
}) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navRef = React.useRef<HTMLDivElement>(null);
  const cartDropdownRef = React.useRef<HTMLDivElement>(null);

  // Close cart dropdown on route change
  React.useEffect(() => { setCartOpen(false); }, [location.pathname, setCartOpen]);

  // Position cart dropdown just below nav bar
  const [, setCartDropdownPos] = React.useState<{top: number, right: number}>({top: 80, right: 24});
  React.useLayoutEffect(() => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setCartDropdownPos({
        top: rect.bottom + window.scrollY,
        right: window.innerWidth - rect.right + 24 // 24px padding
      });
    }
  }, [cartOpen, isMenuOpen]);

  // Ensure only one menu open at a time (mobile)
  const handleCartButtonClick = () => {
    if (!cartOpen) setIsMenuOpen(false); // opening cart closes nav
    setCartOpen((v) => !v);
  };
  const handleMenuButtonClick = () => {
    if (!isMenuOpen) setCartOpen(false); // opening nav closes cart
    setIsMenuOpen(!isMenuOpen);
  };

  const CartButton: React.FC<CartButtonProps> = ({ cartItems }) => (
    <button
      className={`relative ml-4 p-2 rounded-full bg-transparent transition-all duration-300 shadow-[0_0_8px_2px_#ff6ec4]/20 ${theme === 'light' ? 'hover:bg-white/80' : 'dark:hover:bg-gray-700'}`}
      onClick={handleCartButtonClick}
      aria-label="Open cart"
    >
      <ShoppingCart className={`w-6 h-6 ${theme === 'light' ? 'text-black' : 'text-[#ff6ec4]'}`} />
      {cartItems.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
          {cartItems.length}
        </span>
      )}
    </button>
  );
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 dark:bg-gray-900/70 backdrop-blur-2xl border-b border-purple-100 dark:border-gray-800 shadow-[0_2px_32px_0px_#ff6ec4]/20 font-[Inter,sans-serif] tracking-wide">
      <div className="max-w-7xl mx-auto px-6" ref={navRef}>
        <div className="flex items-center justify-between h-20">
          {/* Logo/Home Link */}
          <Link to="/" className="flex items-center space-x-2 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_12px_2px_#ff6ec4]/40 hidden xs:flex">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text text-transparent tracking-tight drop-shadow-[0_2px_12px_#ff6ec4]/30">
              Lucid Garden
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navigation.map((item) => {
              const isActive =
                (item.path === '/' && location.pathname === '/') ||
                (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`nav-link text-lg font-semibold tracking-wide transition-all duration-300 relative px-2 ${
                    isActive
                      ? 'text-[#ff6ec4] dark:text-[#ff6ec4]'
                      : `${theme === 'light' ? 'text-[#ffb3de]' : 'text-gray-600 dark:text-[#bdb2ff]'} hover:text-[#ff6ec4] dark:hover:text-[#ff6ec4]`
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] shadow-[0_0_8px_2px_#ff6ec4]/50 animate-pulse" />
                  )}
                </Link>
              );
            })}
            {/* Cart and Theme Toggle */}
            <div className="flex items-center space-x-4 relative">
              <CartButton cartItems={cartItems} />
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full bg-transparent transition-all duration-300 shadow-[0_0_8px_2px_#ff6ec4]/20 ${theme === 'light' ? 'text-black hover:bg-gray-100/60 hover:text-[#ff6ec4]' : 'text-gray-300 dark:hover:bg-gray-800/60 dark:hover:text-[#ff6ec4]'}`}
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              {/* Cart Dropdown (desktop) */}
              {cartOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    right: 0,
                    zIndex: 60
                  }}
                >
                  <CartDropdown
                    items={cartItems}
                    onQuantityChange={onQuantityChange}
                    onRemove={onRemove}
                    onCheckout={onCheckout}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button and Cart */}
          <div className="md:hidden flex items-center space-x-2 relative">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full bg-transparent transition-all duration-300 shadow-[0_0_8px_2px_#ff6ec4]/20 ${theme === 'light' ? 'text-black hover:bg-gray-100/60 hover:text-[#ff6ec4]' : 'text-gray-300 dark:hover:bg-gray-800/60 dark:hover:text-[#ff6ec4]'}`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <CartButton cartItems={cartItems} />
            <button
              className="p-2 text-white dark:text-gray-300 hover:text-[#ff6ec4] dark:hover:text-[#ff6ec4] transition-colors duration-300"
              onClick={handleMenuButtonClick}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            {/* Cart Dropdown (mobile) */}
            {cartOpen && (
              <div
                ref={cartDropdownRef}
                data-cart-dropdown="true"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  right: 0,
                  zIndex: 60
                }}
              >
                <CartDropdown
                  items={cartItems}
                  onQuantityChange={onQuantityChange}
                  onRemove={onRemove}
                  onCheckout={onCheckout}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-t border-purple-100 dark:border-gray-800 shadow-[0_2px_24px_0px_#ff6ec4]/10">
          <div className="px-6 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive =
                (item.path === '/' && location.pathname === '/') ||
                (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`nav-link block w-full text-left text-lg font-semibold py-2 transition-all duration-300 ${
                    isActive
                      ? 'text-[#ff6ec4] dark:text-[#ff6ec4]'
                      : `${theme === 'light' ? 'text-[#ffb3de]' : 'text-gray-600 dark:text-[#bdb2ff]'} hover:text-[#ff6ec4] dark:hover:text-[#ff6ec4]`
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};