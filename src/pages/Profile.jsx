import { useStore, STYLES, MOTIONS } from "../store.js";
import { useT } from "../i18n.js";

export default function Profile() {
  const { state, set } = useStore();
  const { t } = useT();
  const u = state.user;

  return (
    <div className="page wrap">
      <div className="page-head">
        <div>
          <h1>{t("prof.head")}</h1>
          <p>{t("prof.headSub")}</p>
        </div>
        <span className="pill pro">{t(`plan.${u.plan}`)}{t("planSuffix")}</span>
      </div>

      <div className="panel">
        <h2>{t("prof.identity")}</h2>
        <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
          <div
            style={{
              width: 64, height: 64, borderRadius: 18, background: "var(--grad)",
              display: "grid", placeItems: "center", fontSize: "1.5rem", fontWeight: 700,
            }}
          >
            {(u.name || "C").slice(0, 1).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 240, display: "grid", gap: 12 }}>
            <input
              className="input"
              value={u.name}
              placeholder={t("prof.displayName")}
              onChange={(e) => set((s) => ({ ...s, user: { ...s.user, name: e.target.value } }))}
            />
            <input
              className="input"
              value={u.email}
              placeholder={t("prof.email")}
              onChange={(e) => set((s) => ({ ...s, user: { ...s.user, email: e.target.value } }))}
            />
          </div>
        </div>
      </div>

      <div className="panel">
        <h2>{t("prof.credits")}</h2>
        <p style={{ color: "var(--dim)", fontSize: "0.9rem" }}>
          {t("prof.creditsText", { n: state.credits })}
        </p>
        <button
          className="btn"
          style={{ marginTop: 14 }}
          onClick={() => {
            set((s) => ({ ...s, credits: s.credits + 24 }));
          }}
        >
          {t("prof.refill")}
        </button>
      </div>

      <div className="panel">
        <h2>{t("prof.defaults")}</h2>
        <div className="field">
          <label>{t("prof.style")}</label>
          <div className="chips">
            {STYLES.map((s) => (
              <button
                key={s.id}
                className={`chip${state.prefs.style === s.id ? " on" : ""}`}
                onClick={() => set((st) => ({ ...st, prefs: { ...st.prefs, style: s.id } }))}
              >
                {s.emoji} {t(`style.${s.id}`)}
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <label>{t("prof.motion")}</label>
          <div className="chips">
            {MOTIONS.map((m) => (
              <button
                key={m.id}
                className={`chip${state.prefs.motion === m.id ? " on" : ""}`}
                onClick={() => set((st) => ({ ...st, prefs: { ...st.prefs, motion: m.id } }))}
              >
                {t(`motion.${m.id}`)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
