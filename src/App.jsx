import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Playlist from "./components/Playlist";
import VideoModal from "./components/VideoModal";
import ContinueWatching from "./components/ContinueWatching";
import MiniPlayer from "./components/MiniPlayer";
import MobileNav from "./components/MobileNav";
import Footer from "./components/Footer"; // ✅ ADDED
import "./styles.css";

export default function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(true);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [miniPlayer, setMiniPlayer] = useState(null);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  const [watched, setWatched] = useState(
    JSON.parse(localStorage.getItem("watched") || "[]")
  );

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history") || "[]")
  );

  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes") || "{}")
  );

  const [progress, setProgress] = useState(
    JSON.parse(localStorage.getItem("progress") || "{}")
  );

  /* ================= THEME ================= */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved !== null) setDark(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", dark);
  }, [dark]);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data?.sheet1) ? data.sheet1 : [];
        setVideos(list);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  /* ================= SAVE ================= */
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(progress));
  }, [progress]);

  /* ================= AUTO MARK WATCHED ================= */
  useEffect(() => {
    const entries = Object.entries(progress);

    const completed = entries
      .filter(([_, value]) => value >= 0.9)
      .map(([videolink]) => videolink);

    if (!completed.length) return;

    setWatched((prev) => {
      const updated = new Set(prev);
      completed.forEach((v) => updated.add(v));
      return Array.from(updated);
    });
  }, [progress]);

  /* ================= GROUP ================= */
  const grouped = useMemo(() => {
    if (!videos.length) return {};
    return videos.reduce((acc, item) => {
      if (!item?.playlist) return acc;
      if (!acc[item.playlist]) acc[item.playlist] = [];
      acc[item.playlist].push(item);
      return acc;
    }, {});
  }, [videos]);

  /* ================= SEARCH ================= */
  const filterVideos = (list) =>
    list.filter((v) =>
      ((v?.title || "") + (v?.playlist || ""))
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  /* ================= FAVORITES ================= */
  const favoriteVideos = videos.filter((v) =>
    favorites.includes(v?.videolink)
  );

  /* ================= SELECT ================= */
  const handleSelect = (video) => {
    if (!video) return;

    const index = videos.findIndex(
      (v) => v.videolink === video.videolink
    );

    if (index === -1) return;

    setSelectedIndex(index);

    setHistory((prev) => [
      { videolink: video.videolink },
      ...prev.filter((h) => h.videolink !== video.videolink),
    ]);
  };

  /* ================= SHUFFLE ================= */
  const handleShuffle = () => {
    if (!videos.length) return;

    const unwatched = videos.filter(
      (v) => !watched.includes(v.videolink)
    );

    const pool = unwatched.length ? unwatched : videos;

    const pick = pool[Math.floor(Math.random() * pool.length)];

    if (pick) handleSelect(pick);
  };

  /* ================= KEYBOARD ================= */
  useEffect(() => {
    const keyHandler = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowRight") {
        setSelectedIndex((p) =>
          p < videos.length - 1 ? p + 1 : p
        );
      }

      if (e.key === "ArrowLeft") {
        setSelectedIndex((p) => (p > 0 ? p - 1 : p));
      }

      if (e.key === "Escape") {
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", keyHandler);
    return () =>
      window.removeEventListener("keydown", keyHandler);
  }, [selectedIndex, videos]);

  /* ================= ANALYTICS ================= */
  const stats = {
    total: videos.length,
    watched: watched.length,
    percent: videos.length
      ? Math.round((watched.length / videos.length) * 100)
      : 0,
  };

  /* ================= STATES ================= */
  if (loading) return <h2 className="status">Loading...</h2>;
  if (error) return <h2 className="status">Failed to load data</h2>;

  return (
    <div className={dark ? "app" : "app light"}>
      <Sidebar />

      <div className="main">
        <Navbar
          search={search}
          setSearch={setSearch}
          onShuffle={handleShuffle}
        />

        <Hero />

        {/* ANALYTICS */}
        <div className="stats">
          <p>Total: {stats.total}</p>
          <p>Watched: {stats.watched}</p>
          <p>{stats.percent}% completed</p>
        </div>

        <ContinueWatching
          videos={videos}
          history={history}
          onSelect={handleSelect}
        />

        {favoriteVideos.length > 0 && (
          <Playlist
            title="⭐ Favorites"
            videos={favoriteVideos}
            favorites={favorites}
            setFavorites={setFavorites}
            watched={watched}
            handleSelect={handleSelect}
          />
        )}

        {Object.keys(grouped).map((playlist, i) => {
          const filtered = filterVideos(grouped[playlist]);
          if (!filtered.length) return null;

          return (
            <Playlist
              key={i}
              title={playlist}
              videos={filtered}
              favorites={favorites}
              setFavorites={setFavorites}
              watched={watched}
              handleSelect={handleSelect}
            />
          );
        })}

        {/* ✅ FOOTER HERE (PERFECT POSITION) */}
        <Footer />
      </div>

      {/* MODAL */}
      <VideoModal
        videos={videos}
        index={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        setMiniPlayer={setMiniPlayer}
        next={() =>
          setSelectedIndex((p) =>
            p < videos.length - 1 ? p + 1 : p
          )
        }
        prev={() =>
          setSelectedIndex((p) => (p > 0 ? p - 1 : p))
        }
        notes={notes}
        setNotes={setNotes}
        progress={progress}
        setProgress={setProgress}
      />

      {/* MINI PLAYER */}
      <MiniPlayer
        video={miniPlayer}
        onOpen={() => {
          const index = videos.findIndex(
            (v) => v.videolink === miniPlayer?.videolink
          );
          if (index !== -1) setSelectedIndex(index);
        }}
      />

      <MobileNav />

      <button
        className="theme-toggle"
        onClick={() => setDark(!dark)}
      >
        {dark ? "☀" : "🌙"}
      </button>
    </div>
  );
}