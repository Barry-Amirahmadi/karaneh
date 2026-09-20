import type { Product, ProductLayout, ResolvedProduct } from "@/types/content";

/**
 * Fills in the presentation fields a CMS editor can leave empty.
 *
 * Both `tone` and `layout` do real design work — one drives the ambient shade
 * wash, the other the showcase rhythm — but neither is something a content
 * editor should be *required* to think about. The moment a CMS lets someone
 * save a product without them, an undefined value would either blank the
 * page's atmosphere or crash the arrangement lookup.
 *
 * Every product reaching a component goes through here, so the rules live in
 * one place and the components stay free of `?? fallback` noise.
 */

/**
 * Cycle order for an unset `layout`.
 *
 * MASTER-HANDOFF §48.2 prescribes `tall → wide → compact → feature`, and that
 * order is not used verbatim for two reasons.
 *
 * The first is inherited: `wide` and `compact` both sit on the left of the
 * grid, so placing them adjacently produces two left-hand images in a row —
 * the rhythm defect §36.8 forbids reintroducing. Interleaving `tall`, which
 * sits on the right, is what keeps every neighbouring pair alternating,
 * including across the wrap from the last item back to the first:
 *
 *   tall(right) → wide(left) → tall(right) → compact(left) → tall(right) …
 *
 * The second is this catalogue's own size. The template held five products and
 * could afford `feature` inside a four-step cycle; nine projects cannot — a
 * full-width row every fourth item would put two or three of them on one page
 * and the emphasis would stop meaning anything. `feature` is an editorial
 * decision about *one* project, so it stays something an editor sets by hand
 * and the fallback never manufactures.
 *
 * The intent of §48.2 is a deterministic spread; this delivers that without
 * breaking §36.8 and without inventing emphasis nobody asked for.
 */
const LAYOUT_CYCLE: readonly ProductLayout[] = ["tall", "wide", "tall", "compact"];

/**
 * Ambient light for a project with no `tone`.
 *
 * Deliberately a near-neutral step off the dark ground rather than an invented
 * colour: a project whose light nobody chose should read as having no
 * particular atmosphere, not as having the wrong one. It is close enough to
 * `--color-zoghal` that it cannot meaningfully reduce text contrast over it.
 *
 * Kept in sync with the `@property --shade` initial-value in tokens.css.
 */
export const FALLBACK_TONE = "#2C2E32";

export function resolveProduct(product: Product, index: number): ResolvedProduct {
  return {
    ...product,
    tone: product.tone ?? FALLBACK_TONE,
    layout: product.layout ?? LAYOUT_CYCLE[index % LAYOUT_CYCLE.length],
  };
}

/**
 * Position matters: `layout` falls back by index, so the list handed in must be
 * the one that actually renders, in render order. Resolving a filtered list and
 * an unfiltered one would assign different arrangements to the same product.
 */
export function resolveProducts(list: readonly Product[]): ResolvedProduct[] {
  return list.map(resolveProduct);
}
