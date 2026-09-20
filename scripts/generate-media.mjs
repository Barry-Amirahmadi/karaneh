/**
 * Placeholder art direction generator.
 *
 * There is no client photography, and pulling unrelated stock would be a claim
 * about work this studio has not done. Every image slot is filled instead with
 * a generated *spatial study*: an abstracted interior — a wall plane, a floor
 * plane, an opening, and the light that falls out of it — in the KARANEH
 * palette, with grain and a vignette so the set reads as one shoot.
 *
 * This is deliberately not the treatment the template it derives from used.
 * That one drew a defocused object floating on a backdrop, which is what a
 * cosmetic still life looks like. A room is not an object on a backdrop, and a
 * portfolio of nine blurred blobs would tell a visiting architect, correctly,
 * that nobody looked at the pictures.
 *
 * Each file maps 1:1 onto a real photograph later — same path, same ratio.
 *
 *   node scripts/generate-media.mjs
 *
 * CANVAS RULE: the pixel size of a file is derived from the `ratio` declared
 * for it in `src/content/`, through the table below — never typed per slot.
 * The template this derives from carried hand-written per-slot sizes that had
 * drifted out of agreement with its own content layer, so re-running its
 * generator silently reverted a layout fix. A derived size cannot drift.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "public", "media");
mkdirSync(outDir, { recursive: true });

/** Ratio → canvas. The only place a pixel dimension is written. */
const CANVAS = {
  "4/3": [1440, 1080],
  "1/1": [1080, 1080],
  "3/4": [1080, 1440],
  "16/9": [1920, 1080],
};

/** Brand grounds — kept in sync with src/app/tokens.css */
const GROUND = {
  gach: "#EFEFED",
  gachDeep: "#E1E1DE",
  zoghal: "#1B1C1E",
  zoghalDeep: "#121314",
};

/* ---- colour ------------------------------------------------------------- */

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const hex = (c) =>
  "#" + c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
const mix = (a, b, t) => hex(rgb(a).map((v, i) => v + (rgb(b)[i] - v) * t));
const shade = (c, t) => mix(c, "#000000", t);
const tint = (c, t) => mix(c, "#FFFFFF", t);
/** Rec. 709 luma, good enough to decide which way a plane should be pushed. */
const dark = (h) => {
  const [r, g, b] = rgb(h);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.42;
};

/**
 * The planes of one study, derived from the slot's tone and the ground it will
 * sit on. Derived rather than listed so an image never fights the band it is
 * placed in: a bright room cut into the dark showcase reads as a hole.
 */
function planes(tone, ground) {
  const night = dark(ground);
  return {
    wall: night ? mix(ground, tone, 0.2) : mix(ground, tone, 0.12),
    floor: night ? shade(mix(ground, tone, 0.42), 0.08) : shade(mix(ground, tone, 0.5), 0.12),
    mass: night ? shade(mix(ground, tone, 0.6), 0.18) : shade(mix(ground, tone, 0.62), 0.2),
    tone,
    deep: night ? shade(ground, 0.45) : shade(mix(ground, tone, 0.5), 0.42),
    glow: night ? tint(tone, 0.72) : tint(tone, 0.86),
  };
}

/* ---- deterministic jitter ----------------------------------------------- */

/**
 * One study must not be a copy of the next, and must be byte-identical between
 * runs — a generator whose output changes on every invocation turns every
 * rebuild into a diff nobody can read.
 */
function jitter(seed) {
  let s = (seed * 9301 + 49297) % 233280;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const n = (v) => v.toFixed(1);

/* ---- compositions -------------------------------------------------------- */

/** A room read from inside: back wall, tall opening, floor, a low mass. */
function room(w, h, c, r) {
  const hy = h * (0.62 + r() * 0.06);
  const ox0 = w * (0.56 + r() * 0.05);
  const ox1 = ox0 + w * (0.24 + r() * 0.05);
  const oy = h * (0.07 + r() * 0.05);
  const colX = w * (0.24 + r() * 0.09);
  const colW = w * 0.04;
  const by = hy - h * (0.08 + r() * 0.04);

  return `
    <rect width="${n(w)}" height="${n(hy)}" fill="${c.wall}"/>
    <rect y="${n(hy)}" width="${n(w)}" height="${n(h - hy)}" fill="${c.floor}"/>
    <rect width="${n(w)}" height="${n(h * 0.07)}" fill="${c.deep}" opacity="0.5"/>

    <rect x="${n(ox0)}" y="${n(oy)}" width="${n(ox1 - ox0)}" height="${n(hy - oy)}" fill="url(#open)"/>
    <rect x="${n(ox0)}" y="${n(oy)}" width="${n(w * 0.008)}" height="${n(hy - oy)}" fill="${c.deep}" opacity="0.7"/>

    <g filter="url(#soft)">
      <polygon points="${n(ox0)},${n(hy)} ${n(ox1)},${n(hy)} ${n(ox1 - w * 0.3)},${n(h)} ${n(ox0 - w * 0.44)},${n(h)}"
               fill="#FFFFFF" opacity="0.15"/>
    </g>

    <rect x="${n(colX)}" width="${n(colW)}" height="${n(hy)}" fill="${c.mass}"/>
    <polygon points="${n(colX)},${n(hy)} ${n(colX + colW)},${n(hy)} ${n(colX + colW - w * 0.11)},${n(h)} ${n(colX - w * 0.15)},${n(h)}"
             fill="${c.deep}" opacity="0.32" filter="url(#soft)"/>

    <rect x="${n(w * 0.06)}" y="${n(by)}" width="${n(w * 0.34)}" height="${n(hy - by)}" fill="${c.tone}"/>
    <rect x="${n(w * 0.06)}" y="${n(by)}" width="${n(w * 0.34)}" height="${n(h * 0.012)}" fill="#FFFFFF" opacity="0.2"/>`;
}

/** Light from a high horizontal band, over a long counter. */
function clerestory(w, h, c, r) {
  const hy = h * (0.74 + r() * 0.04);
  const by0 = h * (0.09 + r() * 0.04);
  const by1 = by0 + h * (0.12 + r() * 0.03);
  const cy = hy - h * (0.15 + r() * 0.04);

  return `
    <rect width="${n(w)}" height="${n(hy)}" fill="${c.wall}"/>
    <rect y="${n(hy)}" width="${n(w)}" height="${n(h - hy)}" fill="${c.floor}"/>

    <rect x="${n(w * 0.08)}" y="${n(by0)}" width="${n(w * 0.86)}" height="${n(by1 - by0)}" fill="url(#open)"/>
    <g filter="url(#soft)">
      <polygon points="${n(w * 0.08)},${n(by1)} ${n(w * 0.94)},${n(by1)} ${n(w * 0.62)},${n(h)} ${n(-w * 0.1)},${n(h)}"
               fill="#FFFFFF" opacity="0.12"/>
    </g>

    ${[0.3, 0.44, 0.58]
      .map(
        (x) =>
          `<rect x="${n(w * x)}" y="${n(by1 + h * 0.03)}" width="${n(w * 0.004)}" height="${n(hy - by1 - h * 0.03)}" fill="${c.deep}" opacity="0.4"/>`,
      )
      .join("\n    ")}

    <rect x="${n(w * 0.04)}" y="${n(cy)}" width="${n(w * 0.68)}" height="${n(hy - cy)}" fill="${c.tone}"/>
    <rect x="${n(w * 0.04)}" y="${n(cy)}" width="${n(w * 0.68)}" height="${n(h * 0.014)}" fill="#FFFFFF" opacity="0.22"/>
    <rect x="${n(w * 0.04)}" y="${n(hy - h * 0.02)}" width="${n(w * 0.68)}" height="${n(h * 0.02)}" fill="${c.deep}" opacity="0.38"/>`;
}

/** Overhead light landing on an empty floor. Mostly floor, on purpose. */
function shaft(w, h, c, r) {
  const hy = h * (0.38 + r() * 0.06);
  const sx = w * (0.56 + r() * 0.06);
  const sw = w * (0.16 + r() * 0.04);
  const colX = w * (0.68 + r() * 0.08);

  return `
    <rect width="${n(w)}" height="${n(hy)}" fill="${c.wall}"/>
    <rect y="${n(hy)}" width="${n(w)}" height="${n(h - hy)}" fill="${c.floor}"/>

    <rect x="${n(sx)}" width="${n(sw)}" height="${n(h * 0.045)}" fill="url(#open)"/>
    <g filter="url(#soft)">
      <polygon points="${n(sx)},0 ${n(sx + sw)},0 ${n(sx + sw - w * 0.42)},${n(h)} ${n(sx - w * 0.6)},${n(h)}"
               fill="#FFFFFF" opacity="0.2"/>
    </g>

    <rect x="${n(colX)}" width="${n(w * 0.035)}" height="${n(hy)}" fill="${c.mass}"/>
    <polygon points="${n(colX)},${n(hy)} ${n(colX + w * 0.035)},${n(hy)} ${n(colX - w * 0.2)},${n(h)} ${n(colX - w * 0.27)},${n(h)}"
             fill="${c.deep}" opacity="0.34" filter="url(#soft)"/>

    <rect y="${n(hy)}" width="${n(w)}" height="${n(h * 0.004)}" fill="${c.deep}" opacity="0.45"/>
    <rect y="${n(hy + (h - hy) * 0.46)}" width="${n(w)}" height="${n(h * 0.003)}" fill="${c.deep}" opacity="0.22"/>`;
}

/** Two materials meeting at a reveal — the close-up a studio actually keeps. */
function junction(w, h, c, r) {
  const seam = w * (0.42 + r() * 0.1);
  const gap = w * 0.016;
  const courses = 5 + Math.floor(r() * 3);

  return `
    <rect width="${n(seam)}" height="${n(h)}" fill="${tint(c.wall, 0.06)}"/>
    <rect x="${n(seam)}" width="${n(w - seam)}" height="${n(h)}" fill="${c.tone}"/>

    <rect x="${n(seam - gap)}" width="${n(gap * 2)}" height="${n(h)}" fill="${c.deep}" opacity="0.85"/>
    <rect x="${n(seam + gap)}" width="${n(w * 0.005)}" height="${n(h)}" fill="#FFFFFF" opacity="0.28"/>

    ${Array.from({ length: courses }, (_, i) => {
      const y = (h / courses) * (i + 1);
      return `<rect x="${n(seam + gap * 2)}" y="${n(y)}" width="${n(w - seam - gap * 2)}" height="${n(h * 0.0035)}" fill="${c.deep}" opacity="0.3"/>`;
    }).join("\n    ")}

    <g filter="url(#soft)">
      <polygon points="${n(w)},0 ${n(w)},${n(h * 0.5)} ${n(w * 0.1)},${n(h)} ${n(-w * 0.2)},${n(h)} ${n(-w * 0.2)},0"
               fill="#FFFFFF" opacity="0.1"/>
    </g>
    <rect y="${n(h * 0.88)}" width="${n(w)}" height="${n(h * 0.12)}" fill="${c.deep}" opacity="0.22" filter="url(#soft)"/>`;
}

const COMPOSITION = { room, clerestory, shaft, junction };

/* ---- slots --------------------------------------------------------------- */

/**
 * A slot = one image on the page. `tone` matches the project's `tone` in
 * `src/content/products.ts`, so a project's three frames read as one space seen
 * three ways rather than as three unrelated rooms.
 */
const P = {
  darvazeh: "#8C7A63",
  sepid: "#B7B4AC",
  baam: "#6E5B47",
  daftar: "#6B7378",
  showroom: "#8F8A80",
  kelinik: "#7E8C88",
  kafe: "#9E5B3E",
  restoran: "#A9704A",
  haiat: "#7C6A52",
};

/** The three frames of one project: the wide view, then two closer ones. */
const project = (slug, ratio, order, seed) => [
  { name: `project-${slug}`, ratio, tone: P[slug], ground: GROUND.zoghal, variant: order[0], seed },
  { name: `project-${slug}-02`, ratio, tone: P[slug], ground: GROUND.zoghal, variant: order[1], seed: seed + 1 },
  { name: `project-${slug}-03`, ratio, tone: P[slug], ground: GROUND.zoghal, variant: order[2], seed: seed + 2 },
];

const slots = [
  // — Hero, on the light ground —
  { name: "hero-main", ratio: "4/3", tone: "#8C7A63", ground: GROUND.gach, variant: "room", seed: 3 },
  { name: "hero-inset", ratio: "1/1", tone: "#8C7A63", ground: GROUND.gach, variant: "junction", seed: 11 },

  // — The nine projects, on the dark showcase ground —
  ...project("darvazeh", "4/3", ["room", "junction", "shaft"], 5),
  ...project("sepid", "4/3", ["clerestory", "room", "junction"], 13),
  ...project("baam", "4/3", ["shaft", "room", "junction"], 19),
  ...project("daftar", "4/3", ["clerestory", "junction", "room"], 29),
  ...project("showroom", "4/3", ["room", "shaft", "junction"], 37),
  ...project("kelinik", "4/3", ["clerestory", "room", "shaft"], 43),
  ...project("kafe", "4/3", ["room", "junction", "clerestory"], 53),
  ...project("restoran", "4/3", ["clerestory", "junction", "shaft"], 61),
  ...project("haiat", "16/9", ["room", "shaft", "clerestory"], 71),

  // — Brand / values, on the light ground —
  { name: "values-texture", ratio: "3/4", tone: "#8F8A80", ground: GROUND.gach, variant: "junction", seed: 79 },

  // — Gallery: fragments, so mostly junctions and light, never a whole room —
  { name: "gallery-01", ratio: "4/3", tone: "#8C7A63", ground: GROUND.gachDeep, variant: "junction", seed: 83 },
  { name: "gallery-02", ratio: "4/3", tone: "#8F8A80", ground: GROUND.gachDeep, variant: "shaft", seed: 89 },
  { name: "gallery-03", ratio: "4/3", tone: "#9E5B3E", ground: GROUND.gachDeep, variant: "junction", seed: 97 },
  { name: "gallery-04", ratio: "4/3", tone: "#6B7378", ground: GROUND.gachDeep, variant: "clerestory", seed: 101 },
  { name: "gallery-05", ratio: "4/3", tone: "#B7B4AC", ground: GROUND.gachDeep, variant: "junction", seed: 103 },
  { name: "gallery-06", ratio: "4/3", tone: "#7C6A52", ground: GROUND.gachDeep, variant: "room", seed: 107 },
  { name: "gallery-07", ratio: "4/3", tone: "#6E5B47", ground: GROUND.gachDeep, variant: "shaft", seed: 109 },
  { name: "gallery-08", ratio: "4/3", tone: "#7E8C88", ground: GROUND.gachDeep, variant: "clerestory", seed: 113 },

  // — Closing CTA, on the darkest ground —
  { name: "cta-field", ratio: "16/9", tone: "#8C7A63", ground: GROUND.zoghalDeep, variant: "shaft", seed: 127 },
];

/* ---- render -------------------------------------------------------------- */

function svg({ ratio, tone, ground, variant, seed }) {
  const [w, h] = CANVAS[ratio];
  const c = planes(tone, ground);
  const r = jitter(seed);
  const blur = Math.min(w, h) * 0.045;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
  <defs>
    <linearGradient id="open" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="${c.glow}" stop-opacity="0.96"/>
      <stop offset="100%" stop-color="${c.glow}" stop-opacity="0.55"/>
    </linearGradient>
    <radialGradient id="vig" cx="74%" cy="18%" r="96%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.16"/>
      <stop offset="55%" stop-color="#FFFFFF" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.24"/>
    </radialGradient>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="${blur.toFixed(1)}"/>
    </filter>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="${seed}" result="n"/>
      <feColorMatrix type="saturate" values="0" in="n" result="g"/>
      <feComponentTransfer in="g" result="gt">
        <feFuncA type="linear" slope="0.38"/>
      </feComponentTransfer>
      <feBlend in="SourceGraphic" in2="gt" mode="overlay"/>
    </filter>
  </defs>

  <g filter="url(#grain)">
    <rect width="${w}" height="${h}" fill="${ground}"/>
${COMPOSITION[variant](w, h, c, r)}
    <rect width="${w}" height="${h}" fill="url(#vig)"/>
  </g>
</svg>
`;
}

let count = 0;
for (const slot of slots) {
  writeFileSync(join(outDir, `${slot.name}.svg`), svg(slot), "utf8");
  count += 1;
}
console.log(`generated ${count} spatial studies → public/media/`);
