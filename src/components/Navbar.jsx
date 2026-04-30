export default function Navbar({ search, setSearch, onShuffle }) {
  return (
    <div className="navbar">
      <h2 className="logo-text">Learn</h2>

      <input
        type="text"
        placeholder="Search videos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button className="shuffle-btn" onClick={onShuffle}>
        🎲
      </button>
    </div>
  );
}