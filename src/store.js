import { useEffect, useState } from "react";

/* ===== Local-storage backed store (demo mode: no backend) ===== */

const KEY = "motioncraft:v1";

const defaults = {
  lang: "de",
  user: { name: "Creator", email: "du@beispiel.de", plan: "free", role: "admin" },
  credits: 24,
  clips: [],
  prefs: { style: "cinematic", motion: "ken-burns", duration: 8, aspect: "16:9", loop: true },
};

const PLAN_ALIASES = { Free: "free", Kostenlos: "free", free: "free", Pro: "pro", pro: "pro", Studio: "studio", studio: "studio" };

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    const state = raw ? { ...defaults, ...JSON.parse(raw) } : { ...defaults };
    // normalize legacy plan labels to language-neutral ids
    state.user = { ...state.user, plan: PLAN_ALIASES[state.user?.plan] ?? "free" };
    return state;
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
  { id: "cinematic", emoji: "🎬" },
  { id: "anime", emoji: "🌸" },
  { id: "ugc", emoji: "📱" },
  { id: "neon", emoji: "⚡" },
];

export const MOTIONS = [
  { id: "ken-burns" },
  { id: "zoom-in" },
  { id: "zoom-out" },
  { id: "pan-left" },
  { id: "pan-right" },
  { id: "orbit" },
  { id: "parallax" },
];

export const DURATIONS = [5, 8, 10];
export const ASPECTS = ["16:9", "9:16", "1:1"];

export function clipCost(duration) {
  return duration <= 5 ? 2 : duration <= 8 ? 3 : 4;
}

export function styleById(id) { return STYLES.find((s) => s.id === id); }
export function motionById(id) { return MOTIONS.find((m) => m.id === id); }

/** Every key used by store + i18n that must survive across languages. */
export const PLAN_KEYS = { free: "plan.free", pro: "plan.pro", studio: "plan.studio" };
