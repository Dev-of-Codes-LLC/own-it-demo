import { useEffect, useState } from 'react';
import { getProducts, getPromo, type Product, type Promo } from './api';
import { ProductCard } from './components/ProductCard';
import { ProductSkeleton } from './components/ProductSkeleton';
import { PromoBanner } from './components/PromoBanner';

const SKELETON_COUNT = 4;

export function App() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [promo, setPromo] = useState<Promo | null>(null);

  useEffect(() => {
    getProducts().then(setProducts);
    getPromo().then(setPromo);
  }, []);

  return (
    <>
      <header className="site-header">
        <span className="logo">Acme Supply</span>
      </header>
      <main data-state={products ? 'loaded' : 'loading'}>
        <PromoBanner promo={promo} />
        <h1>Gear for the weekend</h1>
        <div className="grid">
          {products
            ? products.map((p) => <ProductCard key={p.id} product={p} />)
            : Array.from({ length: SKELETON_COUNT }, (_, i) => <ProductSkeleton key={i} />)}
        </div>
      </main>
      <footer className="site-footer">
        <h2>Trail notes</h2>
        <p>One email a month: new gear, repair guides and a route worth a weekend.</p>
        <a href="#signup">Sign up</a>
      </footer>
    </>
  );
}
