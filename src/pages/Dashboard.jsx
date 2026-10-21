import { useStore, STYLES } from "../store.js";
import { useT } from "../i18n.js";

export default function Dashboard() {
  const { state } = useStore();
  const { t, lang } = useT();
  const locale = lang === "de" ? "de-DE" : "en-US";
  const clips = state.clips;
  const byStyle = STYLES.map((s) => ({ ...s, n: clips.filter((c) => c.style === s.id).length }));
  const maxN = Math.max(1, ...byStyle.map((b) => b.n));
  const spent = clips.reduce((a, c) => a + c.cost, 0);
  const week = clips.filter((c) => Date.now() - c.createdAt < 7 * 864e5).length;

  return (
    <div className="page wrap">
      <div className="page-head">
        <div>
          <h1>{t("dash.head")}</h1>
          <p>{t("dash.headSub")}</p>
        </div>
      </div>

      <div className="stat-tiles">
        <div className="stat"><div className="label">{t("dash.clips")}</div><div className="value">{clips.length}</div></div>
        <div className="stat"><div className="label">{t("dash.week")}</div><div className="value">{week}</div></div>
        <div className="stat"><div className="label">{t("dash.spent")}</div><div className="value">{spent}</div></div>
        <div className="stat"><div className="label">{t("dash.left")}</div><div className="value">{state.credits}</div></div>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <h2>{t("dash.byStyle")}</h2>
        {byStyle.map((b) => (
          <div className="bar-row" key={b.id}>
            <span className="name">{b.emoji} {t(`style.${b.id}`)}</span>
            <div className="bar"><div className="fill" style={{ width: `${(b.n / maxN) * 100}%` }} /></div>
            <span className="n">{b.n}</span>
          </div>
        ))}
      </div>

      <div className="panel">
        <h2>{t("dash.recent")}</h2>
        {clips.length === 0 ? (
          <p style={{ color: "var(--dim)", fontSize: "0.9rem" }}>{t("dash.nothing")}</p>
        ) : (
          <table className="table">
            <thead><tr><th>{t("dash.thClip")}</th><th>{t("dash.thStyle")}</th><th>{t("dash.thMotion")}</th><th>{t("dash.thCost")}</th><th>{t("dash.thCreated")}</th></tr></thead>
            <tbody>
              {clips.slice(0, 8).map((c) => (
                <tr key={c.id}>
                  <td>{c.title}</td>
                  <td><span className="pill pro">{t(`style.${c.style}`)}</span></td>
                  <td>{t(`motion.${c.motion}`)}</td>
                  <td>{c.cost}</td>
                  <td>{new Date(c.createdAt).toLocaleString(locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
