export default function MiniPlayer({ video, onOpen }) {
  if (!video) return null;

  return (
    <div className="mini-player" onClick={onOpen}>
      <p>{video.title}</p>
      <span>▶</span>
    </div>
  );
}