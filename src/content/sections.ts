import type {
  AboutContent,
  BrandContent,
  CollectionContent,
  ContactContent,
  CtaContent,
  GalleryContent,
  GalleryPageContent,
  HeroContent,
  InquiryContent,
  NotFoundContent,
  ProductPageContent,
  ShowcaseContent,
  StatementContent,
  ValueItem,
} from "@/types/content";

/**
 * PLACEHOLDER CONTENT.
 *
 * Every line below is a *studio position* an editor can rewrite, not a factual
 * claim. Nothing states a founding year, a client, an award, a publication or
 * a number, because none was supplied. Read this file as the copy deck.
 *
 * TYPING RULE: every export is annotated with an interface from
 * `@/types/content`, never left to inference. An inferred type describes the
 * literal that happens to be written here; a declared one describes what any
 * source — this file, or a CMS response — has to provide. Only the second is a
 * contract, and the second is the whole claim of the content layer.
 *
 * LINK RULE: every `href` here is written from the site root — a route as
 * `/products/`, an in-page target as `/#contact`. Bare `#contact` worked while
 * the site was a single page and silently resolves to nothing the moment the
 * same component renders on `/products/`. `next/link` applies the deployment
 * base path to a root-relative href, so this form is also the only one that
 * survives being served from a GitHub Pages project subpath.
 */

export const hero: HeroContent = {
  eyebrow: "استودیوی معماری داخلی",
  heading: "فضا را از چیزی می‌سازیم که هست",
  lead: "کرانه روی بناهای موجود کار می‌کند. پیش از افزودن، می‌پرسیم چه چیزی را می‌شود برداشت؛ و نقشه معمولاً از همان جواب بیرون می‌آید.",
  primary: { label: "دیدن پروژه‌ها", href: "/#products" },
  secondary: { label: "دربارهٔ کرانه", href: "/#brand" },
  scrollHint: "پیمایش کنید",
  image: {
    src: "/media/hero-main.jpg",
    alt: "نشیمنی رو به حیاط در نور بعدازظهر، از پروژه‌های کرانه",
    ratio: "4/3",
  },
  inset: {
    src: "/media/hero-inset.jpg",
    alt: "نمای نزدیک از اتصال چوب به جدارهٔ گچی",
    ratio: "1/1",
  },
  insetCaption: "اتصال چوب به گچ، خانهٔ دروازه",
};

export const statement: StatementContent = {
  text: "هر پروژه با یک بازدید شروع می‌شود و با یک فهرست از چیزهایی که باید برداشته شوند ادامه پیدا می‌کند.",
  attribution: "کرانه",
};

export const showcase: ShowcaseContent = {
  eyebrow: "پروژه‌ها",
  heading: "نُه فضا، سه نوع کاربری",
  lead: "مسکونی، تجاری، و کافه و رستوران. هر پروژه شرح کوتاهی از تصمیمی دارد که شکل فضا را تعیین کرده است.",
  linkLabel: "دیدن پروژه",
  /** The homepage showcase is the narrative cut of the catalogue; this is the
   *  way out of it into the full list. */
  allLabel: "صفحهٔ پروژه‌ها",
  allHref: "/products/",
};

/**
 * Projects page — the full list.
 *
 * Deliberately a different voice from `showcase` above. The homepage sequences
 * the work as an argument about how the studio thinks; this page is the
 * register of what exists, so it opens by describing the body of work rather
 * than by arguing for it. Nothing here counts the projects in prose — the
 * count is rendered from the data, so it cannot go stale.
 */
export const collection: CollectionContent = {
  eyebrow: "پروژه‌ها",
  heading: "همهٔ پروژه‌ها، کنار هم",
  lead: "کارهای اجرا شده و در دست اجرا، به ترتیب کاربری. برای دیدن جزئیات هر کدام، وارد صفحهٔ آن شوید.",
  /** Accessible name of the category index; it is a navigation landmark. */
  indexLabel: "دسته‌بندی پروژه‌ها",
  /** Accessible name of the list the index points into. */
  listLabel: "پروژه‌ها",
  /** Follows the project count, e.g. «۹ پروژه». */
  countLabel: "پروژه",
  seo: {
    title: "پروژه‌ها",
    description: "فهرست کامل پروژه‌های کرانه، به تفکیک کاربری مسکونی، تجاری و کافه و رستوران.",
  },
};

/**
 * Project detail page — labels and the inquiry message.
 *
 * «پروژه‌های هم‌دسته» is honest in a way «پروژه‌های مرتبط» would not be: the
 * rule that picks them prefers the same category and falls back to sequence,
 * and the heading says exactly that much and no more.
 */
export const productPage: ProductPageContent = {
  detailsHeading: "مشخصات",
  relatedEyebrow: "ادامه",
  relatedHeading: "پروژه‌های هم‌دسته",
  backLabel: "بازگشت به پروژه‌ها",
  breadcrumbHome: "صفحهٔ اصلی",
  breadcrumbCollection: "پروژه‌ها",
  breadcrumbLabel: "مسیر صفحه",
};

export const inquiry: InquiryContent = {
  label: "پرسش دربارهٔ این پروژه",
  /** `{product}` is replaced with the project name at render time. */
  message: "سلام. دربارهٔ پروژهٔ «{product}» سؤال داشتم.",
  /** The same channel without a project in hand — used on the about page. */
  generalLabel: "نوشتن در واتساپ",
  generalMessage: "سلام. برای یک پروژهٔ معماری داخلی سؤال داشتم.",
  /** Appended for screen readers to any link that leaves the site. */
  newWindow: "در پنجرهٔ تازه باز می‌شود",
};

export const brand: BrandContent = {
  eyebrow: "دربارهٔ کرانه",
  heading: "روش کار ما",
  lead: "چهار اصلی که در هر پروژه، از بازدید اول تا تحویل، به آن برمی‌گردیم.",
  image: {
    src: "/media/values-texture.jpg",
    alt: "نمای نزدیک از جدارهٔ گچی و لبهٔ چوبی در یکی از پروژه‌ها",
    ratio: "3/4",
  },
};

export const values: ValueItem[] = [
  {
    id: "v-1",
    title: "اول برداشتن، بعد افزودن",
    body: "هر نقشه با فهرست حذف شروع می‌شود. بیشتر فضاها بیش از آنکه کم داشته باشند، اضافه دارند.",
  },
  {
    id: "v-2",
    title: "نور پیش از رنگ",
    body: "جهت و ساعت نور هر فضا را پیش از انتخاب مصالح اندازه می‌گیریم. رنگ بعد از آن تصمیم می‌گیرد.",
  },
  {
    id: "v-3",
    title: "مرز قدیم و جدید معلوم",
    body: "آنچه اضافه می‌شود خودش را جای بنای قدیمی جا نمی‌زند. تفاوت جنس و لبه، عمدی است.",
  },
  {
    id: "v-4",
    title: "نقشه‌ای که اجرا می‌شود",
    body: "جزئیات را با همان کسی می‌بندیم که قرار است بسازد؛ نقشه‌ای که در کارگاه بازنویسی شود، نقشه نیست.",
  },
];

export const gallery: GalleryContent = {
  eyebrow: "گالری",
  heading: "جزئیات و مصالح",
  lead: "اتصال‌ها، سایه‌ها و نمونه‌های مصالح — تکه‌هایی که در قاب کامل پروژه گم می‌شوند.",
  viewLabel: "بزرگ‌نمایی",
  /** The way out of the homepage band and into the full gallery. */
  allLabel: "صفحهٔ گالری",
  allHref: "/gallery/",
};

/**
 * Gallery page.
 *
 * Same eight images as the homepage band, and the difference is scale rather
 * than content: the homepage shows them as a wall of tiles, this shows them as
 * plates. The copy says so plainly instead of pretending there is more here.
 */
export const galleryPage: GalleryPageContent = {
  eyebrow: "گالری",
  heading: "نگاه نزدیک",
  lead: "همان تصویرها، بزرگ‌تر از آنچه در صفحهٔ اصلی جا می‌شود. برای تمام‌صفحه، روی هر کدام بزنید.",
  seo: {
    title: "گالری",
    description: "جزئیات اجرایی، نور و مصالح در پروژه‌های کرانه.",
  },
};

/**
 * About page.
 *
 * Short on purpose. There is no founding year, no founder, no team size, no
 * client list — none of that has been supplied, and a demo that invents a
 * studio history to fill an about page is making the §44.1 mistake in prose
 * instead of in data. What is written here is *position*: how the studio takes
 * a project on, which is something a studio can assert about itself.
 *
 * It is also not a restatement of the four principles on the homepage. Those
 * say what the studio holds to; this says what working with it is like.
 */
export const about: AboutContent = {
  eyebrow: "دربارهٔ ما",
  heading: "کار روی بنای موجود",
  lead: "کرانه تقریباً همیشه روی چیزی کار می‌کند که از قبل ساخته شده است. این انتخاب، نه محدودیت.",
  body: [
    "بنای موجود قیدهایی دارد که یک زمین خالی ندارد: ستونی که جابه‌جا نمی‌شود، پنجره‌ای که در جای نامناسبی باز شده، سقفی که کوتاه است. تجربهٔ ما این است که همین قیدها معمولاً نقشهٔ بهتری می‌سازند تا یک صفحهٔ سفید.",
    "هر پروژه با یک بازدید طولانی شروع می‌شود، در ساعتی که فضا بیشترین استفاده را دارد. تا وقتی ندانیم نور کی و از کجا می‌آید و مسیرها کجا به هم می‌خورند، چیزی نمی‌کشیم.",
    "بعد از آن، نقشه با اجراکننده بسته می‌شود نه بدون او. جزئیاتی که در کارگاه دوباره نوشته شود، از اول درست طراحی نشده بود.",
  ],
  image: {
    src: "/media/gallery-04.jpg",
    alt: "ماکت و نقشه روی میز کار دفتر کرانه",
    ratio: "4/3",
  },
  seo: {
    title: "دربارهٔ ما",
    description: "چطور کرانه روی بناهای موجود کار می‌کند، و چطور می‌توانید با ما تماس بگیرید.",
  },
};

/**
 * Contact block — the inquiry architecture of §42, in full.
 *
 * WhatsApp first, Instagram second, then the direct details. No form: a form
 * needs a third-party backend to post to, and wiring a real hosted endpoint is
 * outside what a presented template needs (§51). The mechanism that exists is
 * the one the project pages already use.
 */
export const contact: ContactContent = {
  eyebrow: "تماس",
  heading: "با یک عکس از فضا شروع کنید",
  lead: "برای شروع، یک عکس از فضا و متراژ تقریبی‌اش را در واتساپ بفرستید. جواب اولیه همان‌جا داده می‌شود.",
  instagramLabel: "اینستاگرام",
  labels: {
    city: "شهر",
    phone: "تلفن",
    email: "ایمیل",
  },
};

export const cta: CtaContent = {
  eyebrow: "شروع",
  heading: "فضایی دارید که جواب نمی‌دهد؟",
  body: "لازم نیست از قبل بدانید مشکل کجاست. یک بازدید و یک گفت‌وگوی کوتاه معمولاً کافی است تا معلوم شود کار از کجا شروع می‌شود.",
  primary: { label: "شروع یک پروژه", href: "/about/#contact" },
  secondary: { label: "دیدن پروژه‌ها", href: "/products/" },
  image: {
    src: "/media/cta-field.svg",
    alt: "",
    ratio: "16/9",
  },
};

/**
 * The 404 page.
 *
 * Copy, like every other page's — it was written into the component itself and
 * is the last page on the site whose words a CMS could not have reached. A
 * reader arrives here having already gone wrong, so the page says what happened
 * and offers exactly one way out rather than a menu of guesses.
 */
export const notFound: NotFoundContent = {
  eyebrow: "صفحه پیدا نشد",
  heading: "این نشانی وجود ندارد",
  lead: "ممکن است نشانی تغییر کرده باشد. از صفحهٔ اصلی می‌توانید پروژه‌ها و گالری را ببینید.",
  action: { label: "بازگشت به صفحهٔ اصلی", href: "/" },
};
