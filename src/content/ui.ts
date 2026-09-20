import type { UiStrings } from "@/types/content";

/**
 * Interface strings — accessible names, and the few words the UI says on its
 * own behalf rather than the studio's.
 *
 * Separate from `sections.ts` because the two are edited by different people
 * for different reasons: that file is the copy deck a brand rewrites, this one
 * is what the interface is called. Neither belongs inside a component.
 *
 * Most of these are read only by a screen reader. That is not a reason to leave
 * them in the markup: §28 has no exception for text a sighted reader never sees,
 * and a hardcoded string is one no editor and no translator can reach.
 */
export const ui: UiStrings = {
  skipToContent: "پرش به محتوای اصلی",

  nav: {
    primary: "پیمایش اصلی",
    footer: "پیمایش پانوشت",
    /** Follows the studio name: «کرانه — صفحهٔ اصلی». */
    home: "صفحهٔ اصلی",
    openMenu: "گشودن فهرست",
    closeMenu: "بستن فهرست",
    menuDialog: "فهرست اصلی",
  },

  views: {
    label: "نماهای دیگر این پروژه",
    /** `{n}` is the view's position, rendered in Persian digits. */
    open: "نمای {n}",
  },

  gallery: {
    lightbox: "نمای بزرگ تصویر",
    close: "بستن نمای بزرگ",
    previous: "تصویر قبلی",
    next: "تصویر بعدی",
    /** Between position and total: «۳ از ۸». */
    counterJoin: "از",
  },
};
