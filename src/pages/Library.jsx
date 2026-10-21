import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore, STYLES, motionById, styleById } from "../store.js";
import { exportClip, downloadBlob } from "../exporter.js";

const aspectClass = { "16:9": "16 / 9", "9:16": "9 / 16", "1:1": "1 / 1" };

export default function Library() {
  const { state, set } = useStore();
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);
  const [exporting, setExporting] = useState(null); // { progress } while rendering

  const clips = state.clips.filter((c) => filter === "all" || c.style === filter);
  const clip = state.clips.find((c) => c.id === open);

  return (
    <div className="page wrap">
      <div className="page-head">
        <div>
          <h1>Bibliothek</h1>
          <p>{state.clips.length === 1 ? "1 Clip" : `${state.clips.length} Clips`} gespeichert · mit der Maus über eine Karte fahren, um die Bewegung zu sehen</p>
        </div>
        <div className="chips">
          <button className={`chip${filter === "all" ? " on" : ""}`} onClick={() => setFilter("all")}>Alle</button>
          {STYLES.map((s) => (
            <button key={s.id} className={`chip${filter === s.id ? " on" : ""}`} onClick={() => setFilter(s.id)}>{s.emoji} {s.name}</button>
          ))}
        </div>
      </div>

      {clips.length === 0 ? (
        <div className="empty panel">
          <div className="big">🎞️</div>
          <p>Noch keine Clips{filter !== "all" ? " in diesem Stil" : ""}.</p>
          <Link className="btn primary" to="/generator" style={{ marginTop: 16 }}>Ersten Clip erstellen</Link>
        </div>
      ) : (
        <div className="clips-grid">
          {clips.map((c) => (
            <div className="clip-card" key={c.id}>
              <div className="clip-view" style={{ aspectRatio: aspectClass[c.aspect] ?? "16 / 9" }} onClick={() => setOpen(c.id)}>
                <img
                  className={`clip-anim ${c.motion}`}
                  style={{ "--dur": `${c.duration}s` }}
                  src={c.image}
                  alt={c.title}
                />
              </div>
              <div className="clip-meta">
                <div style={{ minWidth: 0 }}>
                  <div className="t">{c.title}</div>
                  <div className="s">{motionById(c.motion)?.name} · {c.duration}s · {new Date(c.createdAt).toLocaleDateString()}</div>
                </div>
                <span className="style-badge">{styleById(c.style)?.name}</span>
                <button
                  className="btn small danger"
                  onClick={() => set((s) => ({ ...s, clips: s.clips.filter((x) => x.id !== c.id) }))}
                  title="Clip löschen"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {clip && (
        <div className="modal-bg" onClick={() => setOpen(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="stage">
              <img className={`clip-anim ${clip.motion}`} style={{ "--dur": `${clip.duration}s` }} src={clip.image} alt={clip.title} />
            </div>
            <div className="bar">
              <div>
                <b>{clip.title}</b>
                <div style={{ color: "var(--dim)", fontSize: "0.82rem", marginTop: 3 }}>
                  {styleById(clip.style)?.name} · {motionById(clip.motion)?.name} · {clip.duration}s · {clip.aspect}
                </div>
              </div>
              {exporting ? (
                <button className="btn small" disabled title="Der Export läuft direkt in deinem Browser">
                  Rendern… {Math.round(exporting.progress * 100)}%
                </button>
              ) : (
                <button
                  className="btn small primary"
                  title="Render this clip to a real .webm video, right in your browser"
                  onClick={async () => {
                    setExporting({ progress: 0 });
                    try {
                      const blob = await exportClip(clip, (t) => setExporting({ progress: t }));
                      downloadBlob(blob, `${clip.title.replace(/[^\w-]+/g, "_")}.webm`);
                    } finally {
                      setExporting(null);
                    }
                  }}
                >
                  ⬇ Video exportieren
                </button>
              )}
              <button className="btn small" onClick={() => setOpen(null)}>Schließen</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
