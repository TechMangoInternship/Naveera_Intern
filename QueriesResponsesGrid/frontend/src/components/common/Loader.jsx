/**
 * Loader — skeleton loading state matching the grid layout.
 */
export default function Loader() {
  const skeletonRows = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="loader">
      {/* Toolbar skeleton */}
      <div className="loader__toolbar">
        <div className="loader__skeleton loader__skeleton--search" />
        <div className="loader__skeleton loader__skeleton--button" />
      </div>

      {/* Header skeleton */}
      <div className="loader__header">
        <div className="loader__skeleton loader__skeleton--num" />
        <div className="loader__skeleton loader__skeleton--cell" />
        <div className="loader__skeleton loader__skeleton--cell" />
        <div className="loader__skeleton loader__skeleton--action" />
      </div>

      {/* Row skeletons */}
      {skeletonRows.map((i) => (
        <div className="loader__row" key={i} style={{ animationDelay: `${i * 80}ms` }}>
          <div className="loader__skeleton loader__skeleton--num" />
          <div className="loader__skeleton loader__skeleton--cell" />
          <div className="loader__skeleton loader__skeleton--cell" />
          <div className="loader__skeleton loader__skeleton--action" />
        </div>
      ))}
    </div>
  );
}
