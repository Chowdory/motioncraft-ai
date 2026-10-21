import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore, STYLES } from "../store.js";
import { useT } from "../i18n.js";
import { exportClip, downloadBlob } from "../exporter.js";

const aspectClass = { "16:9": "16 / 9", "9:16": "9 / 16", "1:1": "1 / 1" };

export default function Library() {
  const { state, set } = useStore();
  const { t, lang } = useT();
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);
  const [exporting, setExporting] = useState(null); // { progress } while rendering

  const clips = state.clips.filter((c) => filter === "all" || c.style === filter);
  const clip = state.clips.find((c) => c.id === open);
  const locale = lang === "de" ? "de-DE" : "en-US";

  return (
    <div className="page wrap">
      <div className="page-head">
        <div>
          <h1>{t("lib.title")}</h1>
          <p>{t(state.clips.length === 1 ? "lib.countOne" : "lib.count", { n: state.clips.length })}</p>
        </div>
        <div className="chips">
          <button className={`chip${filter === "all" ? " on" : ""}`} onClick={() => setFilter("all")}>{t("lib.all")}</button>
          {STYLES.map((s) => (
            <button key={s.id} className={`chip${filter === s.id ? " on" : ""}`} onClick={() => setFilter(s.id)}>{s.emoji} {t(`style.${s.id}`)}</button>
          ))}
        </div>
      </div>

      {clips.length === 0 ? (
        <div className="empty panel">
          <div className="big">🎞️</div>
          <p>{t("lib.empty", { in: filter !== "all" ? t("lib.emptyIn") : "" })}</p>
          <Link className="btn primary" to="/generator" style={{ marginTop: 16 }}>{t("lib.createFirst")}</Link>
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
                  <div className="s">{t(`motion.${c.motion}`)} · {c.duration}s · {new Date(c.createdAt).toLocaleDateString(locale)}</div>
                </div>
                <span className="style-badge">{t(`style.${c.style}`)}</span>
                <button
                  className="btn small danger"
                  onClick={() => set((s) => ({ ...s, clips: s.clips.filter((x) => x.id !== c.id) }))}
                  title={t("lib.delete")}
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
                  {t(`style.${clip.style}`)} · {t(`motion.${clip.motion}`)} · {clip.duration}s · {clip.aspect}
                </div>
              </div>
              {exporting ? (
                <button className="btn small" disabled title={t("lib.exportHint")}>
                  {t("lib.rendering", { n: Math.round(exporting.progress * 100) })}
                </button>
              ) : (
                <button
                  className="btn small primary"
                  title={t("lib.exportHint")}
                  onClick={async () => {
                    setExporting({ progress: 0 });
                    try {
                      const blob = await exportClip(clip, (p) => setExporting({ progress: p }));
                      downloadBlob(blob, `${clip.title.replace(/[^\w-]+/g, "_")}.webm`);
                    } finally {
                      setExporting(null);
                    }
                  }}
                >
                  {t("lib.export")}
                </button>
              )}
              <button className="btn small" onClick={() => setOpen(null)}>{t("lib.close")}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
