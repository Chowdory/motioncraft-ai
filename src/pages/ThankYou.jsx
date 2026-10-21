import { Link } from "react-router-dom";
import { useStore } from "../store.js";

export default function ThankYou() {
  const { set } = useStore();
  return (
    <div className="page wrap" style={{ textAlign: "center", paddingTop: 90 }}>
      <div style={{ fontSize: "3.4rem", marginBottom: 8 }}>🎉</div>
      <h1 style={{ fontSize: "2.2rem" }}>Danke — Pro freigeschaltet!</h1>
      <p style={{ color: "var(--dim)", maxWidth: 460, margin: "16px auto 0", lineHeight: 1.6 }}>
        Dein Plan ist jetzt aktiv. 1.200 Credits wurden deinem Konto gutgeschrieben und jedes
        Bewegungs-Preset steht dir im Generator bereit.
      </p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 30 }}>
        <button
          className="btn primary"
          onClick={() => {
            set((s) => ({ ...s, user: { ...s.user, plan: "Pro" }, credits: s.credits + 1200 }));
          }}
        >
          Pro aktivieren
        </button>
        <Link className="btn" to="/generator">Loslegen →</Link>
      </div>
      <p style={{ color: "var(--dim)", fontSize: "0.8rem", marginTop: 22 }}>
        (Demo-Kauf — es wurde nichts abgebucht.)
      </p>
    </div>
  );
}
