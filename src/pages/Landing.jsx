import { Link } from "react-router-dom";

const FEATURES = [
  { emoji: "🎬", title: "Vier Signatur-Stile", text: "Cinematic, Anime, UGC und Neon — jeder Look mit eigener Farbwissenschaft." },
  { emoji: "🎯", title: "Fortgeschrittene Bewegungssteuerung", text: "Sieben Bewegungs-Presets von Ken Burns bis Orbitalbogen, plus Dauer- und Format-Kontrolle." },
  { emoji: "📚", title: "Sortierte Bibliothek", text: "Jeder Clip wird mit Stil, Bewegung und Einstellungen gespeichert — jederzeit abspielbar." },
  { emoji: "📊", title: "Creator-Dashboard", text: "Verfolge Generierungen, Credit-Verbrauch und welche Stile du am liebsten nutzt." },
  { emoji: "⚡", title: "Schneller Preview-Loop", text: "Vom Standbild zur animierten Vorschau in Sekunden — iterieren ohne Wartezeit." },
  { emoji: "📱", title: "Jedes Seitenverhältnis", text: "Querformat, Hochformat und Quadrat — passend für jede Plattform." },
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
        <div className="hero-badge"><span className="dot" /> Bild zu Bewegung, in Sekunden</div>
        <h1>Verwandle deine Bilder in <span>beeindruckende animierte Clips</span></h1>
        <p className="sub">
          MotionCraft AI macht aus einem einzelnen Standbild einen lebendigen, loopenden Clip.
          Stil aussuchen, Bewegung wählen, exportieren — cinematic, anime oder UGC, ganz mühelos.
        </p>
        <div className="hero-actions">
          <Link className="btn primary" to="/generator">Jetzt erstellen →</Link>
          <a className="btn" href="#features">Features ansehen</a>
        </div>
        <div className="hero-demo">
          <div className="demo-strip">
            {["Cinematic · Ken Burns", "Anime · Schwenk", "UGC · Parallax"].map((cap, i) => (
              <div className="demo-tile" key={cap}>
                <div className="layer" style={{ background: GRADS[i % GRADS.length] }} />
                <span className="demo-caption">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap" id="features">
        <h2 className="section-title">Alles, was du für Bewegung brauchst</h2>
        <p className="section-sub">Ein fokussiertes Toolkit für Creator, die jeden Tag veröffentlichen.</p>
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
        <h2 className="section-title">So funktioniert's</h2>
        <div className="steps">
          <div className="step"><h3>Bild hochladen</h3><p>Zieh ein beliebiges Foto rein — Porträt, Produkt oder Landschaft.</p></div>
          <div className="step"><h3>Stil & Bewegung wählen</h3><p>Wähle einen Look und eines von sieben Bewegungs-Presets. Stelle Dauer und Format ein.</p></div>
          <div className="step"><h3>Generieren & speichern</h3><p>Dein Clip rendert in Sekunden und landet in deiner Bibliothek, bereit zum Abspielen.</p></div>
        </div>
      </section>

      <section className="section wrap" id="pricing">
        <h2 className="section-title">Einfache Preise</h2>
        <p className="section-sub">Kostenlos starten. Upgraden, wenn deine Ideen die Credits übersteigen.</p>
        <div className="plans">
          <div className="plan">
            <h3>Kostenlos</h3>
            <div className="price">0 €<small>/Monat</small></div>
            <ul>
              <li>24 Start-Credits</li>
              <li>720p-Vorschauen</li>
              <li>Alle 4 Stile</li>
              <li>Lokale Bibliothek</li>
            </ul>
            <Link className="btn" to="/generator">Kostenlos starten</Link>
          </div>
          <div className="plan featured">
            <span className="tag">Am beliebtesten</span>
            <h3>Pro</h3>
            <div className="price">19 €<small>/Monat</small></div>
            <ul>
              <li>1.200 Credits / Monat</li>
              <li>Alle Bewegungs-Presets</li>
              <li>Priorisierte Render-Warteschlange</li>
              <li>Nutzungs-Statistiken</li>
            </ul>
            <Link className="btn primary" to="/thank-you">Pro holen</Link>
          </div>
          <div className="plan">
            <h3>Studio</h3>
            <div className="price">79 €<small>/Monat</small></div>
            <ul>
              <li>6.000 Credits / Monat</li>
              <li>Team-Bibliothek</li>
              <li>Admin-Steuerung</li>
              <li>Priorisierter Support</li>
            </ul>
            <Link className="btn" to="/thank-you">Kontakt aufnehmen</Link>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <h2 className="section-title">Häufige Fragen</h2>
        <div className="faq">
          <details><summary>Wie funktioniert die Generierung?</summary><p>MotionCraft animiert dein Standbild mit stilabhängigen Bewegungs-Presets. Diese Demo läuft komplett in deinem Browser — deine Bilder verlassen dein Gerät nie.</p></details>
          <details><summary>Was sind Credits?</summary><p>Jeder Clip kostet Credits je nach Dauer: 2 für 5 s, 3 für 8 s und 4 für 10 s. Kostenlose Konten starten mit 24 Credits und können sie auf der Profilseite aufladen.</p></details>
          <details><summary>Welche Formate kann ich nutzen?</summary><p>Jedes gängige Bildformat (JPG, PNG, WebP) funktioniert. Hoch-, Quer- und quadratische Bilder werden unterstützt.</p></details>
          <details><summary>Brauche ich ein Konto?</summary><p>Nein — die Demo speichert deine Bibliothek lokal im Browser. Öffne einfach den Generator und leg los.</p></details>
        </div>
      </section>
    </>
  );
}
