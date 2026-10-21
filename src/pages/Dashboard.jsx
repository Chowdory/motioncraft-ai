import { useStore, STYLES } from "../store.js";

export default function Dashboard() {
  const { state } = useStore();
  const clips = state.clips;
  const byStyle = STYLES.map((s) => ({ ...s, n: clips.filter((c) => c.style === s.id).length }));
  const maxN = Math.max(1, ...byStyle.map((b) => b.n));
  const spent = clips.reduce((a, c) => a + c.cost, 0);
  const week = clips.filter((c) => Date.now() - c.createdAt < 7 * 864e5).length;

  return (
    <div className="page wrap">
      <div className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p>Your creative activity at a glance.</p>
        </div>
      </div>

      <div className="stat-tiles">
        <div className="stat"><div className="label">Clips created</div><div className="value">{clips.length}</div></div>
        <div className="stat"><div className="label">This week</div><div className="value">{week}</div></div>
        <div className="stat"><div className="label">Credits spent</div><div className="value">{spent}</div></div>
        <div className="stat"><div className="label">Credits left</div><div className="value">{state.credits}</div></div>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <h2>Clips by style</h2>
        {byStyle.map((b) => (
          <div className="bar-row" key={b.id}>
            <span className="name">{b.emoji} {b.name}</span>
            <div className="bar"><div className="fill" style={{ width: `${(b.n / maxN) * 100}%` }} /></div>
            <span className="n">{b.n}</span>
          </div>
        ))}
      </div>

      <div className="panel">
        <h2>Recent activity</h2>
        {clips.length === 0 ? (
          <p style={{ color: "var(--dim)", fontSize: "0.9rem" }}>Nothing yet — generate your first clip.</p>
        ) : (
          <table className="table">
            <thead><tr><th>Clip</th><th>Style</th><th>Motion</th><th>Cost</th><th>Created</th></tr></thead>
            <tbody>
              {clips.slice(0, 8).map((c) => (
                <tr key={c.id}>
                  <td>{c.title}</td>
                  <td><span className="pill pro">{c.style}</span></td>
                  <td>{c.motion}</td>
                  <td>{c.cost}</td>
                  <td>{new Date(c.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
