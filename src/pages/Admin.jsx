import { useStore } from "../store.js";

const SEED_USERS = [
  { name: "Mara Kim", email: "mara@studio.io", plan: "Studio", clips: 41, status: "aktiv" },
  { name: "Dev Patel", email: "dev@creator.co", plan: "Pro", clips: 18, status: "aktiv" },
  { name: "Lena Ort", email: "lena@madeby.org", plan: "Kostenlos", clips: 3, status: "Testphase" },
  { name: "Tom Reyes", email: "tom@shots.tv", plan: "Pro", clips: 27, status: "aktiv" },
];

export default function Admin() {
  const { state } = useStore();
  const totalClips = SEED_USERS.reduce((a, u) => a + u.clips, 0) + state.clips.length;

  return (
    <div className="page wrap">
      <div className="page-head">
        <div>
          <h1>Admin</h1>
          <p>Arbeitsbereich-Übersicht · angemeldet als <b>{state.user.name}</b> ({state.user.role}).</p>
        </div>
      </div>

      <div className="stat-tiles">
        <div className="stat"><div className="label">Nutzer</div><div className="value">{SEED_USERS.length + 1}</div></div>
        <div className="stat"><div className="label">Clips gesamt</div><div className="value">{totalClips}</div></div>
        <div className="stat"><div className="label">Pro / Studio</div><div className="value">4</div></div>
        <div className="stat"><div className="label">Freie Plätze</div><div className="value">12</div></div>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <h2>Nutzer</h2>
        <table className="table">
          <thead><tr><th>Name</th><th>Email</th><th>Plan</th><th>Clips</th><th>Status</th></tr></thead>
          <tbody>
            <tr>
              <td><b>{state.user.name}</b> (du)</td>
              <td>{state.user.email}</td>
              <td><span className="pill pro">{state.user.plan}</span></td>
              <td>{state.clips.length}</td>
              <td><span className="pill ok">active</span></td>
            </tr>
            {SEED_USERS.map((u) => (
              <tr key={u.email}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><span className={u.plan === "Kostenlos" ? "pill" : "pill pro"}>{u.plan}</span></td>
                <td>{u.clips}</td>
                <td><span className={u.status === "aktiv" ? "pill ok" : "pill warn"}>{u.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ color: "var(--dim)", fontSize: "0.78rem", marginTop: 14 }}>
          Demo-Daten — in Produktion liest diese Tabelle deine Nutzerdatenbank.
        </p>
      </div>
    </div>
  );
}
