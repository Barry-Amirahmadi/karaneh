import type { GalleryItem } from "@/types/content";

/**
 * PLACEHOLDER CONTENT.
 *
 * The gallery is not a second catalogue. Where a project page shows a space
 * whole, these are the fragments a studio actually keeps: a junction, a
 * shadow, a sample laid on a floor. `category` is the axis a future gallery
 * filter would use, so the values stay a small controlled vocabulary rather
 * than free text.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "g-01",
    title: "اتصال چوب به گچ",
    category: "جزئیات",
    caption: "خانهٔ دروازه",
    image: {
      src: "/media/gallery-01.jpg",
      alt: "نمای نزدیک از اتصال قاب چوبی به جدارهٔ گچی",
      ratio: "4/3",
    },
    order: 1,
  },
  {
    id: "g-02",
    title: "سایهٔ نیم‌روز",
    category: "نور",
    image: {
      src: "/media/gallery-02.jpg",
      alt: "سایهٔ ستون روی کف در نور نیم‌روز",
      ratio: "4/3",
    },
    order: 2,
  },
  {
    id: "g-03",
    title: "بندکشی مرمت‌شده",
    category: "مصالح",
    caption: "کافهٔ آجر",
    image: {
      src: "/media/gallery-03.jpg",
      alt: "بندکشی تازه میان آجرهای قدیمی",
      ratio: "4/3",
    },
    order: 3,
  },
  {
    id: "g-04",
    title: "میز کار دفتر",
    category: "کارگاه",
    image: {
      src: "/media/gallery-04.jpg",
      alt: "ماکت و نقشه روی میز کار دفتر",
      ratio: "4/3",
    },
    order: 4,
  },
  {
    id: "g-05",
    title: "نمونهٔ سنگ روی کف",
    category: "مصالح",
    caption: "نمایشگاه سنگ",
    image: {
      src: "/media/gallery-05.jpg",
      alt: "نمونهٔ سنگ کنار نمونهٔ چوب روی کف بتنی",
      ratio: "4/3",
    },
    order: 5,
  },
  {
    id: "g-06",
    title: "پلهٔ نیم‌طبقه",
    category: "جزئیات",
    image: {
      src: "/media/gallery-06.jpg",
      alt: "پاخور پلهٔ نیم‌طبقه و لبهٔ فلزی آن",
      ratio: "4/3",
    },
    order: 6,
  },
  {
    id: "g-07",
    title: "نور از پنجرهٔ سقفی",
    category: "نور",
    caption: "بازسازی بام",
    image: {
      src: "/media/gallery-07.jpg",
      alt: "ستون نور پنجرهٔ سقفی روی کف چوبی",
      ratio: "4/3",
    },
    order: 7,
  },
  {
    id: "g-08",
    title: "ماکت کارگاهی",
    category: "کارگاه",
    image: {
      src: "/media/gallery-08.jpg",
      alt: "ماکت مقوایی یک پلان در نور میز کار",
      ratio: "4/3",
    },
    order: 8,
  },
];

export const sortedGallery = [...galleryItems].sort((a, b) => a.order - b.order);
