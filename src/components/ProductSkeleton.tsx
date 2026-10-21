// Same classes as ProductCard, so every placeholder line has the height of
// the real line it stands in for.
export function ProductSkeleton() {
  return (
    <article className="card" aria-hidden="true">
      <div className="card-media bone" />
      <div className="card-body">
        <h2 className="card-title bone" style={{ width: '70%' }}>&nbsp;</h2>
        <p className="card-blurb bone">&nbsp;</p>
        <p className="card-price bone" style={{ width: '30%' }}>&nbsp;</p>
      </div>
    </article>
  );
}
