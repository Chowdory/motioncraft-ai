import { Link } from "react-router-dom";
import { useT } from "../i18n.js";

const GRADS = [
  "linear-gradient(135deg,#312e81,#8b5cf6)",
  "linear-gradient(135deg,#701a75,#d946ef)",
  "linear-gradient(135deg,#164e63,#22d3ee)",
];

const FEATURE_KEYS = ["f1", "f2", "f3", "f4", "f5", "f6"];
const FEATURE_EMOJIS = ["🎬", "🎯", "📚", "📊", "⚡", "📱"];
const STEP_KEYS = ["s1", "s2", "s3"];
const FREE_ITEMS = ["free1", "free2", "free3", "free4"];
const PRO_ITEMS = ["pro1", "pro2", "pro3", "pro4"];
const STUDIO_ITEMS = ["studio1", "studio2", "studio3", "studio4"];

export default function Landing() {
  const { t } = useT();
  return (
    <>
      <section className="hero wrap">
        <div className="hero-badge"><span className="dot" /> {t("landing.badge")}</div>
        <h1>{t("landing.h1a")} <span>{t("landing.h1b")}</span></h1>
        <p className="sub">{t("landing.sub")}</p>
        <div className="hero-actions">
          <Link className="btn primary" to="/generator">{t("landing.cta")}</Link>
          <a className="btn" href="#features">{t("landing.cta2")}</a>
        </div>
        <div className="hero-demo">
          <div className="demo-strip">
            {[t("landing.tile1"), t("landing.tile2"), t("landing.tile3")].map((cap, i) => (
              <div className="demo-tile" key={cap}>
                <div className="layer" style={{ background: GRADS[i % GRADS.length] }} />
                <span className="demo-caption">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap" id="features">
        <h2 className="section-title">{t("landing.featuresTitle")}</h2>
        <p className="section-sub">{t("landing.featuresSub")}</p>
        <div className="grid-3">
          {FEATURE_KEYS.map((k, i) => (
            <div className="card" key={k}>
              <div className="icon">{FEATURE_EMOJIS[i]}</div>
              <h3>{t(`landing.${k}t`)}</h3>
              <p>{t(`landing.${k}d`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <h2 className="section-title">{t("landing.stepsTitle")}</h2>
        <div className="steps">
          {STEP_KEYS.map((k) => (
            <div className="step" key={k}>
              <h3>{t(`landing.${k}t`)}</h3>
              <p>{t(`landing.${k}d`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section wrap" id="pricing">
        <h2 className="section-title">{t("landing.pricingTitle")}</h2>
        <p className="section-sub">{t("landing.pricingSub")}</p>
        <div className="plans">
          <div className="plan">
            <h3>{t("landing.planFree")}</h3>
            <div className="price">{t("landing.freePrice")}<small>{t("landing.perMonth")}</small></div>
            <ul>{FREE_ITEMS.map((k) => <li key={k}>{t(`landing.${k}`)}</li>)}</ul>
            <Link className="btn" to="/generator">{t("landing.freeCta")}</Link>
          </div>
          <div className="plan featured">
            <span className="tag">{t("landing.tag")}</span>
            <h3>{t("landing.planPro")}</h3>
            <div className="price">{t("landing.proPrice")}<small>{t("landing.perMonth")}</small></div>
            <ul>{PRO_ITEMS.map((k) => <li key={k}>{t(`landing.${k}`)}</li>)}</ul>
            <Link className="btn primary" to="/thank-you">{t("landing.proCta")}</Link>
          </div>
          <div className="plan">
            <h3>{t("landing.planStudio")}</h3>
            <div className="price">{t("landing.studioPrice")}<small>{t("landing.perMonth")}</small></div>
            <ul>{STUDIO_ITEMS.map((k) => <li key={k}>{t(`landing.${k}`)}</li>)}</ul>
            <Link className="btn" to="/thank-you">{t("landing.studioCta")}</Link>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <h2 className="section-title">{t("landing.faqTitle")}</h2>
        <div className="faq">
          {[1, 2, 3, 4].map((n) => (
            <details key={n}>
              <summary>{t(`landing.q${n}`)}</summary>
              <p>{t(`landing.a${n}`)}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
