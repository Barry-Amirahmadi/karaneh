/**
 * Open Graph card generator.
 *
 * **No social crawler renders an SVG `og:image`**, so the share card is a
 * raster: `public/media/og-card.jpg`, 1200×630, at most 200 KB.
 *
 * The left half is a photograph — `hero-main.jpg` — filling a full-height 600×630
 * panel, cropped to cover from its centre. The right half is the card as it
 * was before the photographs existed, still drawn below exactly as it was, then
 * cut to the 600px around the mark: the mark keeps its scale and sits centred
 * in its half. **Nothing is drawn over the photograph**, so no contrast pair
 * depends on its pixels.
 *
 * The first card came out of a hand-written PNG encoder in plain Node. Node
 * cannot decode a JPEG and this project has exactly three runtime
 * dependencies, so the card is now composed on a canvas inside the Chromium
 * that Playwright already installs for the smoke suite — the same route as
 * `import-media.mjs`. Quality is walked down from 0.9 until the file fits.
 * The script then decodes its own output and measures it: the pixel size, the
 * bytes, and how far the right half drifted from the card it was cut from.
 *
 * The card is the same art direction as `generate-media.mjs` — a wall plane, a
 * floor plane, and a shaft of light falling from the top-right, which is the RTL
 * reading origin — with the brand mark from `src/app/icon.svg` over it. It
 * carries no type: rendering Persian into a generated raster needs a font
 * pipeline this project does not have, and a Latin-only card for a Persian
 * brand would read worse than a clean mark.
 *
 *   node scripts/generate-og.mjs
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "public", "media");
mkdirSync(outDir, { recursive: true });

/** Open Graph's expected card size. 1.91:1, which is what every consumer crops to. */
const W = 1200;
const H = 630;

/** Kept in sync with src/app/tokens.css and scripts/generate-media.mjs. */
const ZOGHAL = [0x12, 0x13, 0x14];
const TONE = [0x8c, 0x7a, 0x63];
const NOOR = [0xe8, 0xe8, 0xe6];
const AAJOR = [0x9e, 0x5b, 0x3e];

/* -------------------------------------------------------------------------- */
/*  The card                                                                  */
/* -------------------------------------------------------------------------- */

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const mix = (a, b, t) => a + (b - a) * t;

/** Smooth 0→1 ramp, used for every soft edge so nothing on the card is aliased. */
function smoothstep(edge0, edge1, x) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** Source-over composite of a straight colour at `alpha` onto `dst`. */
function over(dst, colour, alpha) {
  if (alpha <= 0) return;
  for (let i = 0; i < 3; i++) dst[i] = mix(dst[i], colour[i], alpha);
}

/**
 * Coverage of an axis-aligned rectangle, antialiased across one pixel.
 *
 * The mark only. Its second plane recedes, so its top and bottom edges move
 * with x — which is why this takes four edges rather than a position and a
 * size: the caller passes the edges it has computed for *this* column.
 */
function band(x, y, x0, x1, y0, y1) {
  return (
    smoothstep(x0 - 1, x0 + 1, x) *
    (1 - smoothstep(x1 - 1, x1 + 1, x)) *
    smoothstep(y0 - 1, y0 + 1, y) *
    (1 - smoothstep(y1 - 1, y1 + 1, y))
  );
}

/**
 * A defocused mass: gaussian falloff from a centre.
 *
 * Deliberately *not* a wide smoothstep, which is what the first version of this
 * card used. A smoothstep reaches exactly zero at a finite radius, and at 8 bits
 * per channel that last contour is a visible ring — this card had one arcing
 * from the top-left corner down to the right edge, from a highlight whose
 * falloff happened to end on screen. A gaussian only ever approaches zero, so
 * there is no radius for the eye to find.
 */
function glow(x, y, cx, cy, sigma) {
  const d2 = (x - cx) ** 2 + (y - cy) ** 2;
  return Math.exp(-d2 / (2 * sigma * sigma));
}

/**
 * Ordered dither, not film grain.
 *
 * A wide gradient at 8 bits per channel bands: a 0.14-alpha white spread over
 * 300px gets about 36 levels, so each one occupies ten pixels and the eye reads
 * the contours as edges. Something has to break that up.
 *
 * The studies use random film grain, and measured here that costs 401 KB at the
 * faintest visible amplitude and 541 KB at theirs, against 95 KB smooth —
 * per-pixel noise is precisely what deflate cannot compress. A 4×4 Bayer matrix
 * does the same job for a fraction of that, because it repeats and deflate is
 * very good at things that repeat.
 */
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const rgb = Buffer.alloc(W * H * 3);
const px = [0, 0, 0];

/** Where the wall plane meets the floor plane. */
const FLOOR_Y = 424;

// The brand mark, from src/app/icon.svg: a 32-unit box scaled up and centred
// slightly left of middle, so the shaft of light passes behind it rather than
// through it. Every consumer crops this card differently, so it stays near
// enough to the centre to survive a square crop.
const MARK = { size: 320, cx: 560, cy: 300 };
const scale = MARK.size / 32;
const originX = MARK.cx - MARK.size / 2;
const originY = MARK.cy - MARK.size / 2;
const markX = (u) => originX + u * scale;
const markY = (v) => originY + v * scale;

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    px[0] = ZOGHAL[0];
    px[1] = ZOGHAL[1];
    px[2] = ZOGHAL[2];

    // 1 — the two planes. The floor takes more of the tone, which is what
    // separates it from the wall without drawing a line to say so.
    const onFloor = smoothstep(FLOOR_Y - 1, FLOOR_Y + 1, y);
    over(px, TONE, mix(0.17, 0.36, onFloor));

    // 2 — the tonal fall, top-right to bottom-left.
    const fall = clamp01((x / W) * 0.55 + (1 - y / H) * 0.45);
    over(px, TONE, mix(0.02, 0.3, fall));

    // 3 — the shaft. Its centre walks left as it descends and it widens as it
    // goes, which is what a real one does; a constant-width diagonal reads as
    // a painted stripe.
    const shaftX = 980 + (y / H) * (300 - 980);
    const shaftW = 150 + (y / H) * 170;
    over(px, [255, 255, 255], 0.17 * Math.exp(-(((x - shaftX) / shaftW) ** 2)));
    over(px, [0, 0, 0], 0.22 * glow(x, y, 90, 620, 300));

    // 4 — the seam where the planes meet: a hairline, not an edge.
    over(px, [0, 0, 0], 0.26 * Math.exp(-(((y - FLOOR_Y) / 2.4) ** 2)));

    // 5 — the mark, the one crisp thing on the card. Its second plane recedes,
    // so its edges are computed for this column rather than fixed.
    const mu = (x - originX) / scale;
    over(px, NOOR, band(x, y, markX(5), markX(15), markY(6), markY(26)) * 0.95);
    over(
      px,
      AAJOR,
      band(x, y, markX(18), markX(27), markY(9 - (mu - 18) / 3), markY(23 + (mu - 18) / 3)),
    );

    // 4 — the light source at 78% / 18%, and the vignette that closes it.
    // Both smooth for the same reason as the masses above: the earlier version
    // ramped white to 52% and then black from 52%, and that kink in the slope
    // is another contour the eye can pick out.
    const u = x / W - 0.78;
    const v = y / H - 0.18;
    const t = Math.hypot(u, v) / 0.88;
    over(px, [255, 255, 255], 0.18 * Math.exp(-((t / 0.42) ** 2)));
    over(px, [0, 0, 0], 0.22 * smoothstep(0.45, 1.2, t));

    const d = (BAYER[y & 3][x & 3] / 16 - 0.5) * 1.6;

    const o = (y * W + x) * 3;
    rgb[o] = clamp01((px[0] + d) / 255) * 255;
    rgb[o + 1] = clamp01((px[1] + d) / 255) * 255;
    rgb[o + 2] = clamp01((px[2] + d) / 255) * 255;
  }
}

/* -------------------------------------------------------------------------- */
/*  Composition: the photograph beside the card                               */
/* -------------------------------------------------------------------------- */

/** The photograph, and its panel: the left half, full height. */
const PHOTO = "hero-main.jpg";
const PANEL = 600;
/** The old card's 600px around the mark becomes the right half — the mark at
 *  its old scale, re-centred in its half, on its own ground. */
const WINDOW_X = Math.round(MARK.cx) - PANEL / 2;
const MAX_BYTES = 200 * 1024;

const half = Buffer.alloc(PANEL * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < PANEL; x++) {
    const from = (y * W + WINDOW_X + x) * 3;
    const to = (y * PANEL + x) * 4;
    half[to] = rgb[from];
    half[to + 1] = rgb[from + 1];
    half[to + 2] = rgb[from + 2];
    half[to + 3] = 255;
  }
}

const photo = readFileSync(join(outDir, PHOTO));
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("about:blank");

const out = await page.evaluate(
  async ({ photoUrl, halfB64, W, H, PANEL, MAX_BYTES }) => {
    const bitmap = await createImageBitmap(await (await fetch(photoUrl)).blob());
    const raw = Uint8ClampedArray.from(atob(halfB64), (c) => c.charCodeAt(0));

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Photograph: cover the panel, cropped from the centre.
    const s = Math.max(PANEL / bitmap.width, H / bitmap.height);
    const sw = PANEL / s;
    const sh = H / s;
    const sx = (bitmap.width - sw) / 2;
    const sy = (bitmap.height - sh) / 2;
    ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, PANEL, H);

    // The old card, pixel for pixel, in the right half.
    ctx.putImageData(new ImageData(raw, PANEL, H), PANEL, 0);

    let url = "";
    let q = 0.9;
    for (; q >= 0.55; q -= 0.04) {
      url = canvas.toDataURL("image/jpeg", q);
      if (Math.floor((url.length - url.indexOf(",") - 1) * 0.75) <= MAX_BYTES) break;
    }

    // Measure the encoded file, not the canvas: decode it again and compare.
    const back = await createImageBitmap(await (await fetch(url)).blob());
    const c2 = document.createElement("canvas");
    c2.width = back.width;
    c2.height = back.height;
    const x2 = c2.getContext("2d");
    x2.drawImage(back, 0, 0);
    const got = x2.getImageData(PANEL, 0, PANEL, H).data;
    let sum = 0;
    let n = 0;
    for (let i = 0; i < got.length; i += 4) {
      for (let k = 0; k < 3; k++) {
        sum += Math.abs(got[i + k] - raw[i + k]);
        n++;
      }
    }
    return {
      url,
      q: Number(q.toFixed(2)),
      crop: { sx: Math.round(sx), sy: Math.round(sy), sw: Math.round(sw), sh: Math.round(sh), src: `${bitmap.width}x${bitmap.height}` },
      size: { w: back.width, h: back.height },
      drift: sum / n,
    };
  },
  { photoUrl: `data:image/jpeg;base64,${photo.toString("base64")}`, halfB64: half.toString("base64"), W, H, PANEL, MAX_BYTES },
);
await browser.close();

const bytes = Buffer.from(out.url.split(",")[1], "base64");
writeFileSync(join(outDir, "og-card.jpg"), bytes);

console.log(`generated og-card.jpg  ${out.size.w}×${out.size.h}  ${bytes.length} B  q${out.q} → public/media/`);
console.log(`photo ${PHOTO} ${out.crop.src}, centre crop ${out.crop.sw}×${out.crop.sh} at ${out.crop.sx},${out.crop.sy} → ${PANEL}×${H} panel`);
console.log(`right half: the old card from x=${WINDOW_X}, mean drift ${out.drift.toFixed(2)} per channel after encoding`);

const problems = [];
if (out.size.w !== W || out.size.h !== H) problems.push(`written at ${out.size.w}×${out.size.h}`);
if (bytes.length > MAX_BYTES) problems.push(`${bytes.length} B, over ${MAX_BYTES} B`);
if (out.drift > 3) problems.push(`right half drifts ${out.drift.toFixed(2)} from the old card`);
if (problems.length) {
  console.log(`FAIL — ${problems.join("; ")}`);
  process.exit(1);
}
console.log("CLEAN");
