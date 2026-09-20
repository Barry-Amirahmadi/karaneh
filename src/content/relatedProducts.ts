import type { ResolvedProduct } from "@/types/content";

/**
 * What to show at the bottom of a project page.
 *
 * Nine projects across three categories, so unlike the template this came from
 * — five products in five distinct categories, where the category preference
 * was inert — the rule genuinely fires: every project has two siblings, and
 * every page fills both slots from its own category. The heading says
 * «پروژه‌های هم‌دسته», which is exactly what the rule delivers and no more.
 *
 * The rule, in order:
 *
 * 1. Start reading from the project *after* this one and wrap around, so each
 *    page shows a different pair rather than the first two of the list.
 * 2. Prefer the same category, then fall back to sequence so the block is
 *    never short even if an editor leaves a category with a single member.
 */
export function relatedProducts(
  product: ResolvedProduct,
  all: readonly ResolvedProduct[],
  count = 2,
): ResolvedProduct[] {
  const position = all.findIndex((candidate) => candidate.id === product.id);
  if (position === -1) return all.slice(0, count);

  const following = [...all.slice(position + 1), ...all.slice(0, position)];

  return [
    ...following.filter((candidate) => candidate.category === product.category),
    ...following.filter((candidate) => candidate.category !== product.category),
  ].slice(0, count);
}
