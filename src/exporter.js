/**
 * Export Studio — renders a clip's motion preset onto a canvas in real time
 * and records it with MediaRecorder into a real, downloadable .webm video.
 *
 * The motion math (motionFrame) is pure so it can be unit-tested in Node;
 * everything browser-specific lives inside the exported functions.
 */

export const CANVAS_SIZES = {
  "16:9": [1280, 720],
  "9:16": [720, 1280],
  "1:1": [960, 960],
};

const easeInOut = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

/** Triangle wave 0→1→0 so every export loops seamlessly (CSS `alternate`). */
const tri = (t) => (t < 0.5 ? t * 2 : 2 - t * 2);

const lerp = (a, b, p) => a + (b - a) * p;

/** Piecewise keyframe interpolation: stops = [t, scale, tx, ty, rot]. */
function keyframe(stops, p) {
  for (let i = 1; i < stops.length; i++) {
    const [t0, s0, x0, y0, r0] = stops[i - 1];
    const [t1, s1, x1, y1, r1] = stops[i];
    if (p <= t1) {
      const local = (p - t0) / (t1 - t0);
      return { scale: lerp(s0, s1, local), tx: lerp(x0, x1, local), ty: lerp(y0, y1, local), rot: lerp(r0, r1, local) };
    }
  }
  const last = stops[stops.length - 1];
  return { scale: last[1], tx: last[2], ty: last[3], rot: last[4] };
}

/**
 * Transform for a motion preset at time t ∈ [0, 1] across the whole clip.
 * Mirrors the CSS keyframes in index.css: tx/ty are fractions of canvas size,
 * rot is degrees. Returns { scale, tx, ty, rot }.
 */
export function motionFrame(motion, t) {
  const p = easeInOut(tri(Math.min(1, Math.max(0, t))));
  switch (motion) {
    case "zoom-in":
      return { scale: lerp(1, 1.22, p), tx: 0, ty: 0, rot: 0 };
    case "zoom-out":
      return { scale: lerp(1.22, 1, p), tx: 0, ty: 0, rot: 0 };
    case "pan-left":
      return { scale: 1.15, tx: lerp(0.04, -0.04, p), ty: 0, rot: 0 };
    case "pan-right":
      return { scale: 1.15, tx: lerp(-0.04, 0.04, p), ty: 0, rot: 0 };
    case "ken-burns":
      // CSS 0% (1, 0,0) → 50% (1.15, -2%,-2%) → 100% (1.05, 2%,1%), played out and back.
      return keyframe(
        [
          [0, 1, 0, 0, 0],
          [0.5, 1.15, -0.02, -0.02, 0],
          [1, 1.05, 0.02, 0.01, 0],
        ],
        p
      );
    case "orbit":
      return { scale: lerp(1.2, 1.28, p), tx: lerp(0.02, -0.02, p), ty: 0, rot: lerp(0.5, -0.8, p) };
    case "parallax":
      return keyframe(
        [
          [0, 1.12, 0, 0, 0],
          [0.25, 1.12, 0, -0.02, 0],
          [0.5, 1.12, 0, 0.015, 0],
          [0.75, 1.12, 0, -0.01, 0],
          [1, 1.12, 0, 0, 0],
        ],
        p
      );
    default:
      return { scale: 1, tx: 0, ty: 0, rot: 0 };
  }
}

/** Cover-fit the image on the canvas, then apply the motion transform. */
export function drawFrame(ctx, img, frame, w, h) {
  const iw = img.naturalWidth ?? img.width;
  const ih = img.naturalHeight ?? img.height;
  const cover = Math.max(w / iw, h / ih) * frame.scale;
  const dw = iw * cover;
  const dh = ih * cover;

  ctx.save();
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  ctx.translate(w / 2 + frame.tx * w, h / 2 + frame.ty * h);
  ctx.rotate((frame.rot * Math.PI) / 180);
  ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
  ctx.restore();
}

function pickMime() {
  for (const m of ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"]) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(m)) return m;
  }
  return "video/webm";
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Render + record the clip in real time. onProgress receives t ∈ [0, 1].
 * Resolves with a webm Blob. Requires a browser (canvas + MediaRecorder).
 */
export async function exportClip(clip, onProgress) {
  const img = await loadImage(clip.image);
  const [w, h] = CANVAS_SIZES[clip.aspect] ?? CANVAS_SIZES["16:9"];
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  const mime = pickMime();
  const stream = canvas.captureStream(30);
  const recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 6_000_000 });
  const chunks = [];
  recorder.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
  const stopped = new Promise((res) => { recorder.onstop = res; });
  recorder.start(200);

  const total = clip.duration * 1000;
  const t0 = performance.now();
  await new Promise((resolve) => {
    const loop = () => {
      const t = Math.min(1, (performance.now() - t0) / total);
      drawFrame(ctx, img, motionFrame(clip.motion, t), w, h);
      onProgress?.(t);
      if (t >= 1) resolve();
      else requestAnimationFrame(loop);
    };
    loop();
  });

  recorder.stop();
  await stopped;
  return new Blob(chunks, { type: mime });
}

/** Trigger a browser download for a generated blob. */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
