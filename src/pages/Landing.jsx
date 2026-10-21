import { Link } from "react-router-dom";

const FEATURES = [
  { emoji: "🎬", title: "Four signature styles", text: "Cinematic, Anime, UGC, and Neon looks, each with its own color science and grain." },
  { emoji: "🎯", title: "Advanced motion controls", text: "Seven motion presets from Ken Burns to orbital arcs, with duration and aspect control." },
  { emoji: "📚", title: "Organized library", text: "Every clip is saved with its style, motion, and settings — replayable anytime." },
  { emoji: "📊", title: "Creator dashboard", text: "Track generations, credit spend, and which styles you lean on most." },
  { emoji: "⚡", title: "Fast preview loop", text: "Go from still image to animated preview in seconds and iterate without waiting." },
  { emoji: "📱", title: "Every aspect ratio", text: "Landscape, vertical, and square exports sized for every platform." },
];

const GRADS = [
  "linear-gradient(135deg,#312e81,#8b5cf6)",
  "linear-gradient(135deg,#701a75,#d946ef)",
  "linear-gradient(135deg,#164e63,#22d3ee)",
];

export default function Landing() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-badge"><span className="dot" /> Image-to-motion, in seconds</div>
        <h1>Transform your images into <span>stunning animated clips</span></h1>
        <p className="sub">
          MotionCraft AI turns a single still image into a living, looping clip.
          Pick a style, choose your motion, and export — cinematic, anime, or UGC, effortlessly.
        </p>
        <div className="hero-actions">
          <Link className="btn primary" to="/generator">Start creating →</Link>
          <a className="btn" href="#features">Explore features</a>
        </div>
        <div className="hero-demo">
          <div className="demo-strip">
            {["Cinematic · Ken Burns", "Anime · Pan", "UGC · Parallax"].map((cap, i) => (
              <div className="demo-tile" key={cap}>
                <div className="layer" style={{ background: GRADS[i % GRADS.length] }} />
                <span className="demo-caption">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap" id="features">
        <h2 className="section-title">Everything you need to craft motion</h2>
        <p className="section-sub">A focused toolkit for creators who ship content every day.</p>
        <div className="grid-3">
          {FEATURES.map((f) => (
            <div className="card" key={f.title}>
              <div className="icon">{f.emoji}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <h2 className="section-title">How it works</h2>
        <div className="steps">
          <div className="step"><h3>Upload an image</h3><p>Drop in any photo — a portrait, product shot, or landscape.</p></div>
          <div className="step"><h3>Choose style & motion</h3><p>Pick a look and one of seven motion presets. Set duration and aspect.</p></div>
          <div className="step"><h3>Generate & save</h3><p>Your clip renders in seconds and lands in your library, ready to replay.</p></div>
        </div>
      </section>

      <section className="section wrap" id="pricing">
        <h2 className="section-title">Simple pricing</h2>
        <p className="section-sub">Start free. Upgrade when your ideas outgrow your credits.</p>
        <div className="plans">
          <div className="plan">
            <h3>Free</h3>
            <div className="price">$0<small>/mo</small></div>
            <ul>
              <li>24 starter credits</li>
              <li>720p previews</li>
              <li>All 4 styles</li>
              <li>Local library</li>
            </ul>
            <Link className="btn" to="/generator">Start free</Link>
          </div>
          <div className="plan featured">
            <span className="tag">Most popular</span>
            <h3>Pro</h3>
            <div className="price">$19<small>/mo</small></div>
            <ul>
              <li>1,200 credits / month</li>
              <li>All motion presets</li>
              <li>Priority rendering queue</li>
              <li>Usage analytics</li>
            </ul>
            <Link className="btn primary" to="/thank-you">Get Pro</Link>
          </div>
          <div className="plan">
            <h3>Studio</h3>
            <div className="price">$79<small>/mo</small></div>
            <ul>
              <li>6,000 credits / month</li>
              <li>Team library</li>
              <li>Admin controls</li>
              <li>Priority support</li>
            </ul>
            <Link className="btn" to="/thank-you">Contact us</Link>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <h2 className="section-title">Frequently asked</h2>
        <div className="faq">
          <details><summary>How does the generation work?</summary><p>MotionCraft animates your still image using style-aware motion presets. This demo build runs entirely in your browser — your images never leave your device.</p></details>
          <details><summary>What are credits?</summary><p>Each clip costs credits based on duration: 2 for 5s, 3 for 8s, and 4 for 10s. Free accounts start with 24 credits and can refill them from the Profile page.</p></details>
          <details><summary>Which formats can I use?</summary><p>Any standard image format (JPG, PNG, WebP) works. Vertical, square, and landscape images are all supported.</p></details>
          <details><summary>Do I need an account?</summary><p>No — the demo stores your library locally in your browser. Just open the Generator and start creating.</p></details>
        </div>
      </section>
    </>
  );
}
