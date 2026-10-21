import { useStore, STYLES, MOTIONS } from "../store.js";

export default function Profile() {
  const { state, set } = useStore();
  const u = state.user;

  return (
    <div className="page wrap">
      <div className="page-head">
        <div>
          <h1>Profile</h1>
          <p>Deine Identität, dein Plan und die Standard-Einstellungen des Generators.</p>
        </div>
        <span className="pill pro">{u.plan}-Plan</span>
      </div>

      <div className="panel">
        <h2>Identität</h2>
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
              placeholder="Anzeigename"
              onChange={(e) => set((s) => ({ ...s, user: { ...s.user, name: e.target.value } }))}
            />
            <input
              className="input"
              value={u.email}
              placeholder="E-Mail"
              onChange={(e) => set((s) => ({ ...s, user: { ...s.user, email: e.target.value } }))}
            />
          </div>
        </div>
      </div>

      <div className="panel">
        <h2>Credits</h2>
        <p style={{ color: "var(--dim)", fontSize: "0.9rem" }}>
          {state.credits} Credits übrig · jeder Clip kostet je nach Dauer 2–4.
        </p>
        <button
          className="btn"
          style={{ marginTop: 14 }}
          onClick={() => {
            set((s) => ({ ...s, credits: s.credits + 24 }));
          }}
        >
          +24 Demo-Credits
        </button>
      </div>

      <div className="panel">
        <h2>Standard-Einstellungen des Generators</h2>
        <div className="field">
          <label>Stil</label>
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
          <label>Bewegung</label>
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
