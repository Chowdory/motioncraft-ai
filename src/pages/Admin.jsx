import { useStore } from "../store.js";
import { useT } from "../i18n.js";

const SEED_USERS = [
  { name: "Mara Kim", email: "mara@studio.io", plan: "studio", clips: 41, status: "active" },
  { name: "Dev Patel", email: "dev@creator.co", plan: "pro", clips: 18, status: "active" },
  { name: "Lena Ort", email: "lena@madeby.org", plan: "free", clips: 3, status: "trial" },
  { name: "Tom Reyes", email: "tom@shots.tv", plan: "pro", clips: 27, status: "active" },
];

export default function Admin() {
  const { state } = useStore();
  const { t } = useT();
  const totalClips = SEED_USERS.reduce((a, u) => a + u.clips, 0) + state.clips.length;

  return (
    <div className="page wrap">
      <div className="page-head">
        <div>
          <h1>Admin</h1>
          <p>{t("admin.head", { name: state.user.name, role: state.user.role })}</p>
        </div>
      </div>

      <div className="stat-tiles">
        <div className="stat"><div className="label">{t("admin.users")}</div><div className="value">{SEED_USERS.length + 1}</div></div>
        <div className="stat"><div className="label">{t("admin.totalClips")}</div><div className="value">{totalClips}</div></div>
        <div className="stat"><div className="label">Pro / Studio</div><div className="value">4</div></div>
        <div className="stat"><div className="label">{t("admin.openSeats")}</div><div className="value">12</div></div>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <h2>{t("admin.users")}</h2>
        <table className="table">
          <thead><tr><th>{t("admin.thName")}</th><th>{t("admin.thEmail")}</th><th>{t("admin.thPlan")}</th><th>{t("admin.thClips")}</th><th>{t("admin.thStatus")}</th></tr></thead>
          <tbody>
            <tr>
              <td><b>{state.user.name}</b> {t("admin.you")}</td>
              <td>{state.user.email}</td>
              <td><span className="pill pro">{t(`plan.${state.user.plan}`)}</span></td>
              <td>{state.clips.length}</td>
              <td><span className="pill ok">{t("admin.active")}</span></td>
            </tr>
            {SEED_USERS.map((u) => (
              <tr key={u.email}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><span className={u.plan === "free" ? "pill" : "pill pro"}>{t(`plan.${u.plan}`)}</span></td>
                <td>{u.clips}</td>
                <td><span className={u.status === "active" ? "pill ok" : "pill warn"}>{u.status === "active" ? t("admin.active") : t("admin.trial")}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ color: "var(--dim)", fontSize: "0.78rem", marginTop: 14 }}>
          {t("admin.demoNote")}
        </p>
      </div>
    </div>
  );
}
