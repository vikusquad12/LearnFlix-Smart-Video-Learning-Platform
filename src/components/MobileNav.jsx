export default function MobileNav() {
  return (
    <div className="mobile-nav">
      <button onClick={() => window.scrollTo(0, 0)}>🏠</button>
      <button>⭐</button>
      <button>🔍</button>
      <button>⚙</button>
    </div>
  );
}