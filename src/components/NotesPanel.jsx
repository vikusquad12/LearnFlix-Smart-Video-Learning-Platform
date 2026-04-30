export default function NotesPanel({ video, notes, setNotes }) {
  if (!video) return null;

  return (
    <textarea
      className="notes"
      placeholder="Write notes..."
      value={notes[video.videolink] || ""}
      onChange={(e) =>
        setNotes({
          ...notes,
          [video.videolink]: e.target.value,
        })
      }
    />
  );
}