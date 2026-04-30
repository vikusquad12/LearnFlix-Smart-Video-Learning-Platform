import VideoCard from "./VideoCard";

export default function Playlist({
  title,
  videos,
  favorites,
  setFavorites,
  watched,
  handleSelect,
}) {
  const total = videos.length;

  const watchedCount = videos.filter((v) =>
    watched.includes(v?.videolink)
  ).length;

  const percent = total ? (watchedCount / total) * 100 : 0;

  return (
    <div className="playlist">
      <h2>{title}</h2>

      <div className="progress-bar">
        <div style={{ width: percent + "%" }}></div>
      </div>

      <p className="progress-text">
        {watchedCount} / {total} completed
      </p>

      <div className="grid">
        {videos.map((video, i) => (
          <VideoCard
            key={i}
            video={video}
            favorites={favorites}
            setFavorites={setFavorites}
            watched={watched}
            handleSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}