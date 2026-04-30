import { useEffect } from "react";
import NotesPanel from "./NotesPanel";

export default function VideoModal({
  videos,
  index,
  onClose,
  next,
  prev,
  setMiniPlayer,
  notes,
  setNotes,
}) {
  if (index === null) return null;

  const video = videos[index];

  const getId = (url) => {
    if (!url) return "";

    const reg =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&?/]+)/;

    const match = url.match(reg);
    return match ? match[1] : "";
  };

  const id = getId(video?.videolink);

  if (!id) return null;

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          allowFullScreen
          title={video.title}
        />

        <div className="modal-info">
          <h3>{video.title}</h3>

          <div className="controls">
            <button onClick={prev}>◀</button>
            <button onClick={next}>▶</button>

            <button
              onClick={() => {
                setMiniPlayer(video);
                onClose();
              }}
            >
              ⬇
            </button>

            <button onClick={onClose}>✕</button>
          </div>
        </div>

        <NotesPanel video={video} notes={notes} setNotes={setNotes} />
      </div>
    </div>
  );
}