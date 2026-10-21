import { useEffect, useState } from "react";

/* ===== Local-storage backed store (demo mode: no backend) ===== */

const KEY = "motioncraft:v1";

const defaults = {
  user: { name: "Creator", email: "you@example.com", plan: "Free", role: "admin" },
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
  { id: "cinematic", name: "Cinematic", emoji: "🎬", desc: "Film-grade look with dramatic depth" },
  { id: "anime", name: "Anime", emoji: "🌸", desc: "Vibrant Japanese animation aesthetic" },
  { id: "ugc", name: "UGC", emoji: "📱", desc: "Authentic creator-style phone footage" },
  { id: "neon", name: "Neon", emoji: "⚡", desc: "High-energy cyberpunk color grade" },
];

export const MOTIONS = [
  { id: "ken-burns", name: "Ken Burns", desc: "Classic slow documentary drift" },
  { id: "zoom-in", name: "Zoom In", desc: "Push toward the subject" },
  { id: "zoom-out", name: "Zoom Out", desc: "Reveal the wider scene" },
  { id: "pan-left", name: "Pan Left", desc: "Smooth lateral move left" },
  { id: "pan-right", name: "Pan Right", desc: "Smooth lateral move right" },
  { id: "orbit", name: "Orbit", desc: "Subtle arc around the center" },
  { id: "parallax", name: "Parallax", desc: "Handheld float with depth" },
];

export const DURATIONS = [5, 8, 10];
export const ASPECTS = ["16:9", "9:16", "1:1"];

export function clipCost(duration) {
  return duration <= 5 ? 2 : duration <= 8 ? 3 : 4;
}

export function styleById(id) { return STYLES.find((s) => s.id === id); }
export function motionById(id) { return MOTIONS.find((m) => m.id === id); }
