import type { Promo } from '../api';

export function PromoBanner({ promo }: { promo: Promo | null }) {
  if (!promo) return null;
  return <p className="promo">{promo.text}</p>;
}
