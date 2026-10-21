import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStore, STYLES, MOTIONS, DURATIONS, ASPECTS, clipCost } from "../store.js";
import { useT } from "../i18n.js";

export default function Generator() {
  const { state, set } = useStore();
  const { t } = useT();
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [drag, setDrag] = useState(false);
  const [style, setStyle] = useState(state.prefs.style);
  const [motion, setMotion] = useState(state.prefs.motion);
  const [duration, setDuration] = useState(state.prefs.duration);
  const [aspect, setAspect] = useState(state.prefs.aspect);
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(-1);
  const [toast, setToast] = useState(null);
  const cost = clipCost(duration);

  function pickFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      if (!title) setTitle(file.name.replace(/\.[^.]+$/, ""));
    };
    reader.readAsDataURL(file);
  }

  function generate() {
    if (!image) return;
    if (state.credits < cost) {
      setToast({ msg: t("gen.noCredits"), kind: "warn" });
      setTimeout(() => setToast(null), 2600);
      return;
    }
    setProgress(0);
    const started = Date.now();
    const total = 2200;
    const tick = setInterval(() => {
      const pct = Math.min(98, Math.round(((Date.now() - started) / total) * 100));
      setProgress(pct);
    }, 120);
    setTimeout(() => {
      clearInterval(tick);
      setProgress(100);
      set((s) => ({
        ...s,
        credits: s.credits - cost,
        prefs: { ...s.prefs, style, motion, duration, aspect },
        clips: [
          {
            id: crypto.randomUUID(),
            title: title.trim() || "Untitled clip",
            image,
            style,
            motion,
            duration,
            aspect,
            createdAt: Date.now(),
            cost,
          },
          ...s.clips,
        ],
      }));
      setTimeout(() => {
        setProgress(-1);
        setToast({ msg: t("gen.doneToast"), kind: "ok" });
        setTimeout(() => setToast(null), 2600);
      }, 350);
    }, total);
  }

  return (
    <div className="page wrap">
      <div className="page-head">
        <div>
          <h1>{t("gen.head")}</h1>
          <p>{t("gen.headSub")}</p>
        </div>
        <Link to="/library" className="btn small">{t("gen.toLibrary")}</Link>
      </div>

      <div className="gen-layout">
        <div className="panel">
          <h2>{t("gen.step1")}</h2>
          <div
            className={`dropzone${drag ? " drag" : ""}`}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); pickFile(e.dataTransfer.files[0]); }}
          >
            {image ? (
              <img className="preview-img" src={image} alt="Selected" style={{ marginTop: 0 }} />
            ) : (
              <div>
                <div className="big">🖼️</div>
                <b>{t("gen.drop")}</b>
                <p>{t("gen.browse")}</p>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => pickFile(e.target.files[0])} />

          <div className="field">
            <label>{t("gen.clipTitle")}</label>
            <input className="input" value={title} placeholder={t("gen.titlePh")} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="field">
            <label>{t("gen.duration", { d: duration })}</label>
            <div className="chips">
              {DURATIONS.map((d) => (
                <button key={d} className={`chip${duration === d ? " on" : ""}`} onClick={() => setDuration(d)}>{d}s</button>
              ))}
            </div>
            <div className="hint">{t("gen.costs", { n: cost })}</div>
          </div>

          <div className="field">
            <label>{t("gen.aspect")}</label>
            <div className="chips">
              {ASPECTS.map((a) => (
                <button key={a} className={`chip${aspect === a ? " on" : ""}`} onClick={() => setAspect(a)}>{a}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="panel">
          <h2>{t("gen.step2")}</h2>
          <div className="grid-3" style={{ marginTop: 6 }}>
            {STYLES.map((s) => (
              <div
                key={s.id}
                className="card"
                style={style === s.id ? { borderColor: "rgba(139,92,246,0.6)", background: "rgba(139,92,246,0.09)" } : { padding: 18 }}
                onClick={() => setStyle(s.id)}
                role="button"
              >
                <div className="icon">{s.emoji}</div>
                <h3>{t(`style.${s.id}`)}</h3>
                <p>{t(`styleDesc.${s.id}`)}</p>
              </div>
            ))}
          </div>

          <div className="field">
            <label>{t("gen.motionPreset")}</label>
            <div className="chips">
              {MOTIONS.map((m) => (
                <button
                  key={m.id}
                  className={`chip${motion === m.id ? " on" : ""}`}
                  title={t(`motionDesc.${m.id}`)}
                  onClick={() => setMotion(m.id)}
                >
                  {t(`motion.${m.id}`)}
                </button>
              ))}
            </div>
            <div className="hint">{t(`motionDesc.${motion}`)}</div>
          </div>

          <h2 style={{ marginTop: 26, marginBottom: 14 }}>{t("gen.step3")}</h2>
          <button className="btn primary" style={{ width: "100%" }} disabled={!image || progress >= 0} onClick={generate}>
            {progress >= 0 ? t("gen.rendering") : t("gen.generate", { n: cost })}
          </button>

          <div className={`progress-wrap${progress >= 0 ? " show" : ""}`}>
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.max(progress, 3)}%` }} /></div>
            <div className="progress-label">
              <span>{progress === 100 ? t("gen.done") : t("gen.progress", { style: t(`style.${style}`), motion: t(`motion.${motion}`) })}</span>
              <span>{progress >= 100 ? "100" : progress < 0 ? 0 : progress}%</span>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="toast">
          {toast.kind === "ok" ? "✅ " : "⚠️ "}{toast.msg}
        </div>
      )}
    </div>
  );
}
