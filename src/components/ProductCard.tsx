import type { Product } from '../api';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card">
      <div className="card-media">
        <img src={`/img/${product.id}.svg`} alt={product.name} width={800} height={600} />
      </div>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="card-blurb">{product.blurb}</p>
        <p className="card-price">${product.price}</p>
      </div>
    </article>
  );
}
