import { useEffect, useState } from "react";

/* ===== Local-storage backed store (demo mode: no backend) ===== */

const KEY = "motioncraft:v1";

const defaults = {
  user: { name: "Creator", email: "du@beispiel.de", plan: "Kostenlos", role: "admin" },
  credits: 24,
  clips: [],
  prefs: { style: "cinematic", motion: "ken-burns", duration: 8, aspect: "16:9", loop: true },
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : { ...defaults };
  } catch {
    return { ...defaults };
  }
}

function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage full: images are heavy */ }
}

let listeners = [];
let state = undefined;

export function useStore() {
  if (state === undefined) state = load();
  const [, force] = useState(0);
  useEffect(() => {
    const fn = () => force((n) => n + 1);
    listeners.push(fn);
    return () => { listeners = listeners.filter((l) => l !== fn); };
  }, []);
  return {
    state,
    set(updater) {
      state = typeof updater === "function" ? updater(state) : updater;
      save(state);
      listeners.forEach((l) => l());
    },
  };
}

/* ===== Domain ===== */

export const STYLES = [
  { id: "cinematic", name: "Cinematic", emoji: "🎬", desc: "Filmreifer Look mit dramatischer Tiefe" },
  { id: "anime", name: "Anime", emoji: "🌸", desc: "Leuchtende japanische Anime-Ästhetik" },
  { id: "ugc", name: "UGC", emoji: "📱", desc: "Authentischer Creator-Look, wie vom Handy" },
  { id: "neon", name: "Neon", emoji: "⚡", desc: "Energievoller Cyberpunk-Look" },
];

export const MOTIONS = [
  { id: "ken-burns", name: "Ken Burns", desc: "Klassischer langsamer Dokumentar-Drift" },
  { id: "zoom-in", name: "Zoom-In", desc: "Langsame Fahrt aufs Motiv" },
  { id: "zoom-out", name: "Zoom-Out", desc: "Die Szene öffnet sich" },
  { id: "pan-left", name: "Schwenk links", desc: "Sanfte Bewegung nach links" },
  { id: "pan-right", name: "Schwenk rechts", desc: "Sanfte Bewegung nach rechts" },
  { id: "orbit", name: "Orbit", desc: "Leichter Bogen um die Bildmitte" },
  { id: "parallax", name: "Parallax", desc: "Handheld-Schweben mit Tiefe" },
];

export const DURATIONS = [5, 8, 10];
export const ASPECTS = ["16:9", "9:16", "1:1"];

export function clipCost(duration) {
  return duration <= 5 ? 2 : duration <= 8 ? 3 : 4;
}

export function styleById(id) { return STYLES.find((s) => s.id === id); }
export function motionById(id) { return MOTIONS.find((m) => m.id === id); }
