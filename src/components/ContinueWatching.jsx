export default function ContinueWatching({
  videos,
  history,
  onSelect,
}) {
  if (!history?.length) return null;

  const last = videos.find(
    (v) => v.videolink === history[0]?.videolink
  );

  if (!last) return null;

  return (
    <div className="continue">
      <h2>Continue Watching</h2>

      <div className="continue-card" onClick={() => onSelect(last)}>
        {last.title}
      </div>
    </div>
  );
}