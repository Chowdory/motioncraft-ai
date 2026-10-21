import { useStore } from "../store.js";

const SEED_USERS = [
  { name: "Mara Kim", email: "mara@studio.io", plan: "Studio", clips: 41, status: "active" },
  { name: "Dev Patel", email: "dev@creator.co", plan: "Pro", clips: 18, status: "active" },
  { name: "Lena Ort", email: "lena@madeby.org", plan: "Free", clips: 3, status: "trial" },
  { name: "Tom Reyes", email: "tom@shots.tv", plan: "Pro", clips: 27, status: "active" },
];

export default function Admin() {
  const { state } = useStore();
  const totalClips = SEED_USERS.reduce((a, u) => a + u.clips, 0) + state.clips.length;

  return (
    <div className="page wrap">
      <div className="page-head">
        <div>
          <h1>Admin</h1>
          <p>Workspace overview · you are signed in as <b>{state.user.name}</b> ({state.user.role}).</p>
        </div>
      </div>

      <div className="stat-tiles">
        <div className="stat"><div className="label">Users</div><div className="value">{SEED_USERS.length + 1}</div></div>
        <div className="stat"><div className="label">Total clips</div><div className="value">{totalClips}</div></div>
        <div className="stat"><div className="label">Pro / Studio</div><div className="value">4</div></div>
        <div className="stat"><div className="label">Open seats</div><div className="value">12</div></div>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <h2>Users</h2>
        <table className="table">
          <thead><tr><th>Name</th><th>Email</th><th>Plan</th><th>Clips</th><th>Status</th></tr></thead>
          <tbody>
            <tr>
              <td><b>{state.user.name}</b> (you)</td>
              <td>{state.user.email}</td>
              <td><span className="pill pro">{state.user.plan}</span></td>
              <td>{state.clips.length}</td>
              <td><span className="pill ok">active</span></td>
            </tr>
            {SEED_USERS.map((u) => (
              <tr key={u.email}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><span className={u.plan === "Free" ? "pill" : "pill pro"}>{u.plan}</span></td>
                <td>{u.clips}</td>
                <td><span className={u.status === "active" ? "pill ok" : "pill warn"}>{u.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ color: "var(--dim)", fontSize: "0.78rem", marginTop: 14 }}>
          Demo data — in production this table reads from your user database.
        </p>
      </div>
    </div>
  );
}
