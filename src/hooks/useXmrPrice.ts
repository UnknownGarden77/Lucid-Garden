import { useState, useEffect, useRef } from 'react';

// CoinGecko API endpoint for XMR/EUR
const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=eur';

// Helper: get the next 12AM or 12PM timestamp (local time)
function getNextSlot(now: Date) {
  const next = new Date(now);
  if (now.getHours() < 12) {
    // Next slot is today at 12:00 PM
    next.setHours(12, 0, 0, 0);
  } else {
    // Next slot is tomorrow at 12:00 AM
    next.setDate(now.getDate() + 1);
    next.setHours(0, 0, 0, 0);
  }
  return next.getTime();
}

// Helper: get the current slot string ("AM" or "PM")
function getCurrentSlot(now: Date) {
  return now.getHours() < 12 ? 'AM' : 'PM';
}

export function useXmrPrice() {
  const [price, setPrice] = useState<{ eur: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchPrice = async () => {
      setLoading(true);
      setError(null);
      try {
        const cached = localStorage.getItem('xmr_price');
        const cachedSlot = localStorage.getItem('xmr_price_slot');
        const cachedDate = localStorage.getItem('xmr_price_date');
        const now = new Date();
        const today = now.toISOString().slice(0, 10);
        const currentSlot = getCurrentSlot(now);
        // Only use cache if same day and same slot (AM/PM)
        if (cached && cachedDate === today && cachedSlot === currentSlot) {
          setPrice(JSON.parse(cached));
          setLoading(false);
          return;
        }
        const res = await fetch(COINGECKO_URL);
        if (!res.ok) throw new Error('Failed to fetch XMR price');
        const data = await res.json();
        const priceObj = { eur: data.monero.eur };
        setPrice(priceObj);
        localStorage.setItem('xmr_price', JSON.stringify(priceObj));
        localStorage.setItem('xmr_price_date', today);
        localStorage.setItem('xmr_price_slot', currentSlot);
      } catch (e: unknown) {
        if (e && typeof e === 'object' && 'message' in e) {
          setError((e as { message: string }).message);
        } else {
          setError('Error fetching XMR price');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();

    // Set timer for next slot (if user keeps page open)
    const now = new Date();
    const nextSlotTime = getNextSlot(now);
    const msUntilNextSlot = nextSlotTime - now.getTime();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      if (!cancelled) fetchPrice();
    }, msUntilNextSlot + 1000); // +1s buffer

    return () => {
      cancelled = true;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { price, loading, error };
}
