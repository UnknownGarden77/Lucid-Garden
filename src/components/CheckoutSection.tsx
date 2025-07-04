import React, { useState } from 'react';
import { useXmrPrice } from '../hooks/useXmrPrice';
import { CartItem } from './CartDropdown';

interface CheckoutSectionProps {
  cartItems: CartItem[];
  onBack: () => void;
}

// Fallback XMR rates
const FALLBACK_XMR_EUR = 262.51;

// Example tracker data (last 3 days fallback + today live)

// Real XMR addresses (randomly select one on each order confirmation)
const XMR_ADDRESSES = [
  '82qH51mZHisD1ojMhxYtMtAA8viZqAXKAaqv9cVG5yDY9SuigtyXUpE5ygpDck41Q7KFoBPzczyLM4aeXHKjSiE861WYdHz',
  '837h2VC1XhnbF96LstRxw4aDFtr6P7eTSRGiJfdjSPgGLN3vqmjNkxuBGYWGiSJf42NenPkdiNP6xFcWc6xwhMx65m6xStR',
  '8ByCmdHgTxvAFF572ubHaZ1KkjQUkVpV5dGgBdjx6zVo6oiuRs6L3r6bcJmkfHmREgaj6tMiCGqdK8jpe7psQ7hn1yNs3SZ',
  '86N4S9biqzqDokv1rqjL7b3UbyVGTVHkrZY3T7X8woPXZyYPnpcqyxB7bUvMcfTJy4gVVwfSq3eEagRrS44KoNwuPPY2xxq',
  '86c8AW1QqsfRvhKGPA1kvF9a9HKFRoph3hdYkAUWaS7h4rwcZygNcZFamRJdQb1hQLUFgDcG7hsNbHBVQDpkiB9P4X1KAnd',
  '83B9BhA7tNqNCenp5NQxEfaVpSa6hQ77X5tz66XYSSGAdxQJ7NkuWwG5LXDurhKw9RDgSjP8rdEB7ghy5y9cZPDj3KvY9Lv',
];

export const CheckoutSection: React.FC<CheckoutSectionProps> = ({ cartItems, onBack }) => {
  const { price: xmrPrice, loading: xmrLoading, error: xmrError } = useXmrPrice();
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const totalEUR = cartItems.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity, 0);
  const xmrEur = xmrPrice?.eur || FALLBACK_XMR_EUR;
  const totalXMR = totalEUR / xmrEur;

  const handleConfirmOrder = () => {
    // Pick a random address on each confirmation
    const idx = Math.floor(Math.random() * XMR_ADDRESSES.length);
    setSelectedAddress(XMR_ADDRESSES[idx]);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleCopyAddress = () => {
    if (selectedAddress) {
      navigator.clipboard.writeText(selectedAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#f8f8ff] to-[#e0c3fc] dark:from-[#1a0036] dark:to-[#3a0ca3] overflow-hidden px-2 xs:px-4 sm:px-6 md:px-8 pt-20 sm:pt-28 pb-10 sm:pb-16 max-w-full">
      {/* Glassmorphic/gradient animated background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-purple-400/5 to-pink-400/5 dark:from-[#1a0036]/40 dark:to-[#3a0ca3]/40" />
        <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-[#ff6ec4]/10 via-transparent to-[#7873f5]/10" />
        {/* Subtle SVG constellation accent */}
        <svg className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-20 animate-fade-in-slow" viewBox="0 0 900 300" fill="none">
          <g stroke="#bdb2ff" strokeWidth="1.2" opacity="0.5">
            <circle cx="120" cy="80" r="2.5"/>
            <circle cx="200" cy="200" r="2.5"/>
            <circle cx="400" cy="100" r="2.5"/>
            <circle cx="600" cy="180" r="2.5"/>
            <circle cx="700" cy="60" r="2.5"/>
            <polyline points="120,80 200,200 400,100 600,180 700,60" />
          </g>
          <g stroke="#ff6ec4" strokeWidth="0.8" opacity="0.3">
            <circle cx="180" cy="250" r="1.5"/>
            <circle cx="80" cy="250" r="1.5"/>
            <polyline points="180,250 80,250 120,80" />
          </g>
        </svg>
      </div>
      <div
        className="relative z-10 bg-white/80 dark:bg-[#18102a]/90 rounded-xl xs:rounded-2xl sm:rounded-4xl shadow-[0_0_64px_16px_#ff6ec4]/30 border-2 border-purple-100 dark:border-[#7873f5]/60 p-2 xs:p-4 sm:p-6 w-full max-w-[99vw] xs:max-w-[98vw] sm:max-w-xl md:max-w-2xl mx-auto animate-fade-in font-[Inter,sans-serif] overflow-hidden backdrop-blur-2xl mb-8 sm:mb-14"
        style={{
          fontFeatureSettings: "'ss01' on, 'ss02' on",
          fontVariationSettings: "'wght' 600",
        }}
      >
        {/* Top neon accent bar */}
        <div className="absolute -top-2 left-8 right-8 h-1 rounded-full bg-[#ff6ec4] blur-md opacity-80 pointer-events-none" />
        {/* Section badge/header */}
        <div className="w-full flex flex-col items-center pt-6 xs:pt-8 sm:pt-12 pb-2 xs:pb-3 sm:pb-4 px-3 xs:px-6 sm:px-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-2xl rounded-full px-7 py-2 text-[#ff6ec4] border border-white/20 shadow font-mono tracking-widest uppercase mb-6 animate-fade-in">
            <span className="inline-block w-5 h-5 bg-gradient-to-br from-[#ff6ec4] to-[#7873f5] rounded-full flex items-center justify-center shadow-[0_0_12px_2px_#ff6ec4]/40 text-white text-lg">🛒</span>
            <span className="text-sm">Checkout</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-[0_2px_24px_#ff6ec4]/30 text-center animate-gradient-x font-[Inter,sans-serif]">
            Review & Confirm Order
          </h2>
          <p className="font-normal font-sans tracking-wide text-[#3a0ca3] dark:text-[#bdb2ff]/80 font-[Inter,sans-serif]">
            Review your order and see the current Monero (XMR) rates before payment.
          </p>
        </div>
        {/* Main content */}
        <div className="px-2 xs:px-3 sm:px-5 md:px-6 py-2 xs:py-3 sm:py-5 mt-1 xs:mt-2">
          {/* Screenshot notice before confirmation */}
          <div className="mb-3 sm:mb-4 text-center text-[#ff6ec4] dark:text-[#bdb2ff] text-xs xs:text-sm font-semibold tracking-wide font-sans">
            <span className="font-bold font-sans">Before confirming your order:</span>
            <span className="font-normal font-sans">
              {' '}Please take a <span className="underline">screenshot of this order review</span> (including all items and quantities).<br />
              You will need to send this screenshot along with your payment details to our Instagram page for smooth processing and to avoid any shipping issues.
            </span>
          </div>
          <div className="mb-3 xs:mb-4 sm:mb-6 px-1 xs:px-2">
            {cartItems.length === 0 ? (
              <div className="text-center text-[#7873f5] dark:text-[#ff6ec4]/80 font-semibold tracking-wide font-mono text-base font-[Inter,sans-serif]">Your cart is empty.</div>
            ) : (
              <div className="overflow-x-auto w-full">
                <div className="min-w-[180px] xs:min-w-[220px] max-w-full">
                <table className="w-full table-fixed text-left mb-1 xs:mb-1 sm:mb-3 border-separate border-spacing-y-1 font-[Inter,sans-serif] text-[12px] xs:text-xs sm:text-base">
                    <colgroup>
                      <col style={{ width: '40%' }} />
                      <col style={{ width: '15%' }} />
                      <col style={{ width: '20%' }} />
                    </colgroup>
                    <thead>
                      <tr className="text-[#3a0ca3] dark:text-[#bdb2ff] border-b">
                        <th className="py-2 font-semibold text-sm uppercase tracking-widest font-mono pr-6 truncate text-center">Product</th>
                        <th className="py-2 font-semibold text-sm uppercase tracking-widest font-mono px-4 truncate text-center">Qty</th>
                        <th className="py-2 font-semibold text-sm uppercase tracking-widest font-mono px-4 truncate text-center">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, idx) => (
                        <tr key={item.id} className={`border-b last:border-b-0 group transition ${idx % 2 === 0 ? 'bg-white/60 dark:bg-[#232042]/40' : 'bg-[#ff6ec4]/5 dark:bg-[#bdb2ff]/5'} hover:bg-[#ff6ec4]/10 dark:hover:bg-[#e0c3fc]/10`}>
                          <td className="py-2 flex items-center gap-2 min-w-0 pr-4 xs:pr-6 truncate text-center">
                            <img src={item.image} alt={item.name} className="w-8 h-8 rounded-xl object-cover shadow-[0_0_12px_2px_#ff6ec4]/30 border-2 border-[#e0c3fc] dark:border-[#3a0ca3] flex-shrink-0" style={{ background: '#232042', opacity: 0.97 }} />
                            <span className="font-semibold text-sm text-[#3a0ca3] dark:text-[#bdb2ff] truncate tracking-wide font-sans break-words">{item.name}</span>
                          </td>
                          <td className="py-2 font-mono text-[#7873f5] dark:text-[#ff6ec4] text-sm font-semibold px-2 xs:px-4 text-center font-sans truncate">{item.quantity}</td>
                          <td className="py-2 text-xs text-[#3a0ca3] dark:text-[#ff6ec4]/80 font-mono px-2 xs:px-4 text-center font-sans truncate">{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
{/* Totals Section - single row, styled like SubstanceDetails */}
          <div className="flex flex-row flex-wrap justify-end items-center mb-3 xs:mb-4 sm:mb-6 gap-3 xs:gap-4 sm:gap-8 px-1 xs:px-2">
            <div className="flex flex-col items-center">
              <span className="text-xs sm:text-sm md:text-base uppercase tracking-widest text-[#7873f5] dark:text-[#bdb2ff] font-mono mb-1 font-sans">Total (EUR)</span>
              <span className="font-extrabold text-sm xs:text-base sm:text-lg md:text-xl bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text text-transparent drop-shadow-[0_2px_8px_#ff6ec4]/40 font-sans">€{totalEUR.toFixed(2)}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs sm:text-sm md:text-base uppercase tracking-widest text-[#7873f5] dark:text-[#bdb2ff] font-mono mb-1 font-sans">Total (XMR)</span>
              <span className="font-extrabold text-sm xs:text-base sm:text-xl md:text-2xl bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] bg-clip-text text-transparent drop-shadow-[0_2px_12px_#ff6ec4]/60 font-sans animate-pulse">{totalXMR.toFixed(6)}</span>
              {xmrLoading && <span className="text-xs text-[#7873f5] dark:text-[#bdb2ff]">Updating XMR price...</span>}
              {xmrError && <span className="text-xs text-red-500">XMR price unavailable (using fallback)</span>}
            </div>
          </div>
          {/* XMR Tracker Section */}
          <div className="mb-3 xs:mb-4 sm:mb-6 w-full px-1 xs:px-2">
            <div className="mb-2 text-sm font-semibold text-[#3a0ca3] dark:text-[#bdb2ff] tracking-wide flex items-center gap-2 font-mono font-sans">
              <span className="inline-block w-2 h-2 rounded-full bg-[#ff6ec4] animate-pulse"></span>
              XMR Price Tracker (EUR)
            </div>
            <div className="overflow-x-auto w-full">
              <div className="min-w-full max-w-full">
                <table className="w-full table-fixed text-xs border-separate border-spacing-y-1 font-mono font-sans">
                  <colgroup>
                    <col style={{ width: '50%' }} />
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '25%' }} />
                  </colgroup>
                  <thead>
                    <tr className="text-[#7873f5] dark:text-[#bdb2ff]">
                      <th className="py-1 font-semibold uppercase tracking-widest truncate text-left">Date</th>
                      <th className="py-1 font-semibold uppercase tracking-widest truncate text-left">XMR/EUR</th>
                      <th className="py-1 font-semibold uppercase tracking-widest truncate text-left">XMR/USD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-[#ff6ec4]/10 dark:bg-[#e0c3fc]/10 font-bold">
                      <td className="py-1 px-2 rounded-l-xl text-[#3a0ca3] dark:text-[#bdb2ff] font-semibold truncate text-left">{new Date().toISOString().slice(0, 10)}</td>
                      <td className="py-1 px-2 text-[#ff6ec4] dark:text-[#ffb6ff] font-bold truncate text-left">€{xmrEur.toFixed(2)}</td>
                      <td className="py-1 px-2 rounded-r-xl text-[#7873f5] dark:text-[#bdb2ff] font-bold truncate text-left">€{xmrEur.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-2 text-xs text-[#7873f5] dark:text-[#bdb2ff]/90 font-mono font-[Inter,sans-serif]">
              Current XMR: <span className="font-bold text-[#ff6ec4]">€{xmrEur.toFixed(2)}</span>
            </div>
          </div>
          {/* Payment instructions above buttons */}
          <div className="mb-3 sm:mb-4 text-center text-[#3a0ca3] dark:text-[#bdb2ff]/90 text-xs xs:text-sm font-light tracking-wide font-sans px-2 xs:px-4">
            Payment instructions will be provided after order confirmation.
          </div>
          {/* Action buttons - centered */}
          <div className="flex flex-row flex-wrap justify-center items-center gap-3 xs:gap-4 mt-3 xs:mt-4 border-t border-[#bdb2ff]/30 dark:border-[#7873f5]/30 pt-4 px-1 xs:px-2">
            <button
              onClick={() => {
                if (typeof onBack === 'function') onBack();
                setTimeout(() => {
                  window.location.assign('/shop');
                }, 30);
              }}
              className="px-4 xs:px-5 py-2 rounded-xl bg-gradient-to-r from-[#bdb2ff] to-[#7873f5] text-[#18102a] dark:text-[#bdb2ff] font-bold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-[#ff6ec4]/60 tracking-wider text-xs xs:text-sm md:text-base font-normal font-sans"
            >
              ← Back to Shop
            </button>
            <button
              onClick={handleConfirmOrder}
              className="px-5 xs:px-6 py-2 rounded-xl bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white font-extrabold shadow-lg hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-[#bdb2ff]/60 tracking-wider text-xs xs:text-sm md:text-base font-normal font-sans"
            >
              Confirm Order
            </button>
          </div>
        </div>
        {/* Bottom neon accent */}
        <div className="absolute left-1/2 -bottom-4 xs:-bottom-6 sm:-bottom-8 -translate-x-1/2 w-20 xs:w-28 sm:w-40 h-6 xs:h-8 sm:h-10 bg-[#ff6ec4]/40 rounded-full blur-2xl opacity-60 pointer-events-none" />
      </div>
      {/* Modal for payment instructions */}
      {showModal && selectedAddress && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm px-1 xs:px-2 sm:px-6"
          aria-modal="true"
          role="dialog"
          style={{ minHeight: '100dvh' }}
        >
          <div
            className="relative bg-white dark:bg-[#18102a] rounded-2xl xs:rounded-3xl sm:rounded-4xl shadow-2xl border-2 border-[#ff6ec4]/40 w-full max-w-[97vw] xs:max-w-[92vw] sm:max-w-md mx-auto px-3 xs:px-5 sm:px-8 py-3 xs:py-5 sm:py-7 font-[Inter,sans-serif] animate-fade-in"
            style={{
              fontSize: 'clamp(0.90rem, 2.7vw, 1.08rem)',
              lineHeight: 1.32,
              maxHeight: '80vh',
              overflowY: 'auto',
              boxSizing: 'border-box',
              marginTop: 0,
              marginBottom: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Accessibility live region for modal */}
            <div aria-live="polite" className="sr-only">
              Payment instructions modal opened.
            </div>
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 xs:top-3 xs:right-3 text-[#ff6ec4] hover:text-[#7873f5] font-bold focus:outline-none p-0.5 xs:p-1 rounded-full bg-white/60 dark:bg-[#232042]/60 shadow-md"
              aria-label="Close"
              style={{
                lineHeight: 1,
                width: 'clamp(1.3em, 4vw, 1.7em)',
                height: 'clamp(1.3em, 4vw, 1.7em)',
                minWidth: 22,
                minHeight: 22,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(1.1rem, 3vw, 1.5rem)'
              }}
            >
              ×
            </button>
            <div className="flex flex-col items-center gap-2 xs:gap-2.5 sm:gap-3">
              <div className="w-9 h-9 xs:w-11 xs:h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-[#ff6ec4] to-[#7873f5] rounded-full flex items-center justify-center shadow-[0_0_12px_2px_#ff6ec4]/30 mb-1 xs:mb-2">
                <span className="text-white text-xl xs:text-2xl">🪙</span>
              </div>
              <h2 className="text-lg xs:text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] bg-clip-text text-transparent mb-1 xs:mb-2 tracking-tight text-center">
                Payment Instructions
              </h2>
              <p className="text-xs xs:text-sm sm:text-base text-[#3a0ca3] dark:text-[#bdb2ff] text-center mb-1 xs:mb-2">
                Please send the exact amount to the Monero (XMR) address below:
              </p>
              <div className="mb-1 xs:mb-2 text-[11px] xs:text-xs text-center text-[#ff6ec4] dark:text-[#bdb2ff] font-semibold">
                If you did <span className="underline">not take a screenshot</span> of your order before confirming, please click <span className="font-bold">Close</span>, take a screenshot of the order review, and then confirm the order again.
              </div>
              {/* Copy button above address */}
              <button
                onClick={handleCopyAddress}
                className="mb-1 xs:mb-2 px-3 xs:px-4 py-1 rounded bg-[#ff6ec4]/10 text-[#ff6ec4] text-xs font-semibold hover:bg-[#ff6ec4]/20 transition w-full max-w-[220px]"
                aria-label="Copy address"
                type="button"
              >
                {copied ? "Copied!" : "Copy Address"}
              </button>
              <div className="relative w-full bg-[#f8f8ff] dark:bg-[#232042] rounded-lg xs:rounded-xl px-2 xs:px-4 py-2 xs:py-3 mb-1 xs:mb-2 border border-[#bdb2ff]/30 text-center break-all font-mono text-[11px] xs:text-xs text-[#3a0ca3] dark:text-[#ff6ec4] select-all max-w-full">
                {selectedAddress}
              </div>
              <div className="flex flex-col gap-0.5 xs:gap-1 w-full mb-1 xs:mb-2">
                <div className="flex justify-between text-xs xs:text-sm">
                  <span className="font-semibold text-[#7873f5]">Amount (XMR):</span>
                  <span className="font-bold text-[#ff6ec4]">{totalXMR.toFixed(6)}</span>
                </div>
                <div className="flex justify-between text-xs xs:text-sm">
                  <span className="font-semibold text-[#7873f5]">Amount (EUR):</span>
                  <span className="font-bold text-[#3a0ca3]">€{totalEUR.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-2 xs:mt-3 text-[11px] xs:text-xs text-[#7873f5] dark:text-[#bdb2ff]/80 text-center">
                <span className="block mb-1 xs:mb-2 font-semibold text-[#ff6ec4]">Important steps to complete your order:</span>
                <ul className="list-disc list-inside text-left mb-1 xs:mb-2 space-y-0.5 xs:space-y-1">
                  <li className="pl-0"><span className="font-semibold text-[#ff6ec4]">Take a screenshot</span> of this order confirmation and payment instructions.</li>
                  <li className="pl-0"><span className="font-semibold text-[#ff6ec4]">Send the screenshot</span> and your payment transaction details to our Instagram page: <span className="font-semibold">@_lucid_garden</span></li>
                  <li className="pl-0"><span className="font-semibold text-[#ff6ec4]">Do not send your shipping address immediately.</span> After you contact us, we will provide further instructions on how to securely provide your address.</li>
                  <li className="pl-0">Once your payment is processed and funds have arrived, your package will be prepared for shipment.</li>
                  <li className="pl-0"><span className="font-semibold text-[#ff6ec4]">We do not ship to Australia or Russia.</span></li>
                </ul>
                <span className="block mt-1 xs:mt-2">Thank you for supporting privacy and research!</span>
              </div>
              <button
                onClick={handleCloseModal}
                className="mt-3 xs:mt-4 px-4 xs:px-6 py-2 rounded-xl bg-gradient-to-r from-[#bdb2ff] to-[#7873f5] text-[#18102a] dark:text-[#bdb2ff] font-bold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-[#ff6ec4]/60 tracking-wider text-xs xs:text-sm sm:text-base w-full max-w-[220px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );}