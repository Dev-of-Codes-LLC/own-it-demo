// A fake API. It answers from local data after a delay, so the page can be
// tested at real-world latency. Set the delay with ?delay=<ms> in the URL.
import products from './products.json';

export type Product = (typeof products)[number];

export type Promo = { text: string };

const params = new URLSearchParams(window.location.search);
const delayMs = Number(params.get('delay') ?? 1500);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProducts(): Promise<Product[]> {
  await wait(delayMs);
  return products;
}

// The promo arrives after the products, like a separate marketing service.
export async function getPromo(): Promise<Promo> {
  await wait(delayMs + 800);
  return { text: 'Free shipping on orders over $50 this week.' };
}
