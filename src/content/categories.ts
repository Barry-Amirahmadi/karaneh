import type { ResolvedProduct } from "@/types/content";

/**
 * Category taxonomy, derived rather than authored.
 *
 * `category` already exists on every product as free Persian text, and that is
 * deliberately left alone here: inventing a parallel `categorySlug` field, a
 * category registry, or category landing routes would be building a taxonomy
 * system for a nine-project catalogue across three categories (MASTER-HANDOFF
 * §40, §35). What the collection page actually needs is an *index* — which
 * categories exist, how many projects are in each, and where each one starts —
 * and all three of those can be read off the project list itself.
 *
 * The shape this returns is the same shape a real category system would expose,
 * so growing into one later is an implementation change behind these functions,
 * not a redesign of the page that consumes them.
 */

export interface CategoryEntry {
  /** The Persian label exactly as an editor wrote it on the product. */
  name: string;
  count: number;
  /**
   * Element id of the first product in this category's run, so an index entry
   * can jump to where the category begins.
   */
  anchor: string;
}

/** The one place a product's on-page element id is spelled. */
export function productAnchor(slug: string): string {
  return `product-${slug}`;
}

/**
 * Categories in the order the editor's own sequence introduces them — never
 * alphabetical.
 *
 * The list is not re-sorted into category blocks, because project order is an
 * editorial decision (§28, §48.2): the sequence carries the showcase rhythm,
 * and re-grouping it here would mean the same project got a different
 * arrangement on the homepage than on the projects page whenever an editor left
 * `layout` unset. The seed data is already authored in category runs — three
 * residential, three commercial, three hospitality — so the index and the page
 * agree without the page having to sort anything.
 */
export function collectCategories(list: readonly ResolvedProduct[]): CategoryEntry[] {
  const entries = new Map<string, CategoryEntry>();

  for (const product of list) {
    const existing = entries.get(product.category);
    if (existing) {
      existing.count += 1;
      continue;
    }
    entries.set(product.category, {
      name: product.category,
      count: 1,
      anchor: productAnchor(product.slug),
    });
  }

  return [...entries.values()];
}
