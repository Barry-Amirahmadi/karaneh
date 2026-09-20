"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryItem, ResolvedProduct } from "@/types/content";
import { ui } from "@/content/ui";
import { toFa } from "@/lib/digits";
import { withBasePath } from "@/lib/basePath";
import { fillTemplate } from "@/lib/whatsapp";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";

/**
 * The additional views of one project.
 *
 * A cosmetic product is one object photographed once. A room is not
 * comprehensible from a single frame — which is why `views` exists on the
 * content model at all, and why this strip is the one component this site adds
 * to the template it derives from.
 *
 * Two things it deliberately does not do:
 *
 * **It does not re-implement the enlarged view.** `GalleryLightbox` already
 * solves the modal semantics, the focus trap, the inert background, Escape,
 * and RTL arrow keys, all of it tested. A second implementation would be a
 * second thing to get wrong, so the views are projected into the `GalleryItem`
 * shape that component already consumes rather than the component being
 * generalised to take two shapes.
 *
 * **It does not drop the primary image from the enlarged set.** The strip shows
 * only the *additional* views, because the primary is already full size
 * directly above it and a thumbnail of it would be a control that goes where
 * the reader already is. But once the lightbox is open the reader is paging
 * through the project, so the primary belongs in that set — and including it
 * is what makes the counter honest: «۲ از ۳» for the first thumbnail, because
 * it genuinely is the second image of three.
 */
export function ProjectViews({ product }: { product: ResolvedProduct }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const views = product.views ?? [];

  /**
   * Nothing at all when a project has no extra views. `views` is optional on
   * the type precisely so an editor can publish a project with one photograph,
   * and an empty strip under a heading looks broken in a way an absent section
   * does not.
   */
  if (views.length === 0) return null;

  /** The enlarged set: primary first, then the strip, in reading order. */
  const items: GalleryItem[] = [product.image, ...views].map((media, i) => ({
    id: `${product.id}-view-${i}`,
    title: product.name,
    category: product.category,
    caption: media.alt,
    image: media,
    order: i,
  }));

  return (
    <>
      <ul aria-label={ui.views.label} className="view-strip">
        {views.map((media, i) => (
          <li key={media.src}>
            <button
              type="button"
              /* +1: index 0 of the enlarged set is the primary image, which
                 this strip does not show. */
              onClick={() => setOpenIndex(i + 1)}
              className="view-thumb"
              aria-label={fillTemplate(ui.views.open, { n: toFa(i + 2) })}
            >
              <Image
                src={withBasePath(media.src)}
                alt=""
                fill
                sizes="(max-width: 768px) 30vw, 12vw"
                unoptimized={media.src.endsWith(".svg")}
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      <GalleryLightbox
        items={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
