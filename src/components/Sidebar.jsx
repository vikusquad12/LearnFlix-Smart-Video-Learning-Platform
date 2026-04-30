export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Code Learner</h2>

      <button onClick={() => window.scrollTo(0, 0)}>🏠 Home</button>

      <button
        onClick={() =>
          document
            .querySelector(".playlist")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        📚 Playlists
      </button>
    </div>
  );
}