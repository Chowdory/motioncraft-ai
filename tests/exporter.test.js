import { test } from "node:test";
import assert from "node:assert/strict";
import { motionFrame, CANVAS_SIZES } from "../src/exporter.js";

const PRESETS = ["zoom-in", "zoom-out", "pan-left", "pan-right", "ken-burns", "orbit", "parallax"];

test("every preset stays within sane scale bounds", () => {
  for (const m of PRESETS) {
    for (let i = 0; i <= 20; i++) {
      const f = motionFrame(m, i / 20);
      assert.ok(f.scale >= 1 && f.scale <= 1.35, `${m} scale out of bounds: ${f.scale}`);
      assert.ok(Math.abs(f.tx) <= 0.06 && Math.abs(f.ty) <= 0.04, `${m} translate out of bounds`);
      assert.ok(Math.abs(f.rot) <= 1.5, `${m} rotation out of bounds`);
    }
  }
});

test("loops are seamless: start and end transforms match", () => {
  for (const m of PRESETS) {
    const a = motionFrame(m, 0);
    const b = motionFrame(m, 1);
    assert.ok(Math.abs(a.scale - b.scale) < 1e-9, `${m} scale does not loop`);
    assert.ok(Math.abs(a.tx - b.tx) < 1e-9, `${m} tx does not loop`);
    assert.ok(Math.abs(a.ty - b.ty) < 1e-9, `${m} ty does not loop`);
    assert.ok(Math.abs(a.rot - b.rot) < 1e-9, `${m} rot does not loop`);
  }
});

test("motions move in their declared direction", () => {
  assert.ok(motionFrame("zoom-in", 0.25).scale > 1, "zoom-in should grow");
  assert.ok(motionFrame("zoom-out", 0.25).scale < 1.22, "zoom-out should shrink");
  assert.ok(motionFrame("pan-left", 0.25).tx < motionFrame("pan-left", 0.1).tx, "pan-left should move left");
  assert.ok(motionFrame("pan-right", 0.25).tx > motionFrame("pan-right", 0.1).tx, "pan-right should move right");
});

test("unknown presets degrade gracefully", () => {
  assert.deepEqual(motionFrame("nope", 0.5), { scale: 1, tx: 0, ty: 0, rot: 0 });
});

test("canvas sizes cover all supported aspects", () => {
  for (const a of ["16:9", "9:16", "1:1"]) assert.ok(CANVAS_SIZES[a], `missing size for ${a}`);
});
