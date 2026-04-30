export default function VideoCard({
  video,
  favorites,
  setFavorites,
  watched,
  handleSelect,
}) {
  const getId = (url) => {
    if (!url) return "";

    const reg =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&?/]+)/;

    const match = url.match(reg);
    return match ? match[1] : "";
  };

  const id = getId(video?.videolink);

  if (!id) return null;

  const thumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  const isFav = favorites.includes(video.videolink);
  const isWatched = watched.includes(video.videolink);
  const isShort = video?.type === "short";

  const toggleFav = (e) => {
    e.stopPropagation();

    if (isFav) {
      setFavorites(favorites.filter((f) => f !== video.videolink));
    } else {
      setFavorites([...favorites, video.videolink]);
    }
  };

  return (
    <div className="card" onClick={() => handleSelect(video)}>
      <div className="img-wrapper">
        <img src={thumbnail} loading="lazy" alt={video.title} />

        <div className="play-overlay">▶</div>

        <button className="fav-btn" onClick={toggleFav}>
          {isFav ? "★" : "☆"}
        </button>

        {isWatched && <div className="watched">✔</div>}

        {isShort && <div className="short-badge">Short</div>}
      </div>

      <h3>{video.title}</h3>
    </div>
  );
}