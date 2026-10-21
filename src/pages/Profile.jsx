import { useStore, STYLES, MOTIONS } from "../store.js";

export default function Profile() {
  const { state, set } = useStore();
  const u = state.user;

  return (
    <div className="page wrap">
      <div className="page-head">
        <div>
          <h1>Profile</h1>
          <p>Your identity, plan, and default generator settings.</p>
        </div>
        <span className="pill pro">{u.plan} plan</span>
      </div>

      <div className="panel">
        <h2>Identity</h2>
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
              placeholder="Display name"
              onChange={(e) => set((s) => ({ ...s, user: { ...s.user, name: e.target.value } }))}
            />
            <input
              className="input"
              value={u.email}
              placeholder="Email"
              onChange={(e) => set((s) => ({ ...s, user: { ...s.user, email: e.target.value } }))}
            />
          </div>
        </div>
      </div>

      <div className="panel">
        <h2>Credits</h2>
        <p style={{ color: "var(--dim)", fontSize: "0.9rem" }}>
          {state.credits} credits remaining · each clip costs 2–4 depending on duration.
        </p>
        <button
          className="btn"
          style={{ marginTop: 14 }}
          onClick={() => {
            set((s) => ({ ...s, credits: s.credits + 24 }));
          }}
        >
          +24 demo credits
        </button>
      </div>

      <div className="panel">
        <h2>Default generator settings</h2>
        <div className="field">
          <label>Style</label>
          <div className="chips">
            {STYLES.map((s) => (
              <button
                key={s.id}
                className={`chip${state.prefs.style === s.id ? " on" : ""}`}
                onClick={() => set((st) => ({ ...st, prefs: { ...st.prefs, style: s.id } }))}
              >
                {s.emoji} {s.name}
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <label>Motion</label>
          <div className="chips">
            {MOTIONS.map((m) => (
              <button
                key={m.id}
                className={`chip${state.prefs.motion === m.id ? " on" : ""}`}
                onClick={() => set((st) => ({ ...st, prefs: { ...st.prefs, motion: m.id } }))}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
