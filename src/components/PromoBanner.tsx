import type { Promo } from '../api';

// The slot is always on the page and always the same height, so a promo
// that arrives late fills space that was already kept for it.
export function PromoBanner({ promo }: { promo: Promo | null }) {
  return <div className="promo-slot">{promo && <p className="promo">{promo.text}</p>}</div>;
}
