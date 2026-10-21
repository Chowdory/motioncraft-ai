import { Link } from "react-router-dom";
import { useStore } from "../store.js";
import { useT } from "../i18n.js";

export default function ThankYou() {
  const { set } = useStore();
  const { t } = useT();
  return (
    <div className="page wrap" style={{ textAlign: "center", paddingTop: 90 }}>
      <div style={{ fontSize: "3.4rem", marginBottom: 8 }}>🎉</div>
      <h1 style={{ fontSize: "2.2rem" }}>{t("ty.title")}</h1>
      <p style={{ color: "var(--dim)", maxWidth: 460, margin: "16px auto 0", lineHeight: 1.6 }}>
        {t("ty.body")}
      </p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 30 }}>
        <button
          className="btn primary"
          onClick={() => {
            set((s) => ({ ...s, user: { ...s.user, plan: "pro" }, credits: s.credits + 1200 }));
          }}
        >
          {t("ty.activate")}
        </button>
        <Link className="btn" to="/generator">{t("ty.start")}</Link>
      </div>
      <p style={{ color: "var(--dim)", fontSize: "0.8rem", marginTop: 22 }}>
        {t("ty.demoNote")}
      </p>
    </div>
  );
}
