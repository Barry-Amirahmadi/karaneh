import type { Product } from "@/types/content";
import { resolveProducts } from "./resolveProducts";

/**
 * PLACEHOLDER CONTENT.
 *
 * KARANEH is a fictional studio. Every project below is named for the place it
 * sits in rather than for a client, and the copy describes space, material and
 * decision — what was kept, what was removed, where the light comes from. That
 * is what a studio can honestly say about its own work.
 *
 * What is deliberately absent: no client names, no budgets, no awards, no
 * publication credits, no "founded in", no floor-area figure the studio did
 * not itself state. `details` restates only what the project's own copy says,
 * and where a project never named a year, that row is simply missing rather
 * than filled in to make the ledger look complete (§44.1).
 *
 * `tone` is the one field doing design work — it is the light of the space,
 * and it drives the ambient wash behind the showcase. Every project sets it,
 * and `layout`, explicitly; both are optional in the type so a CMS editor can
 * omit them, and resolveProducts() fills the gap.
 *
 * **Catalogue images share one ratio — `4/3` — and only the `feature` project
 * departs from it, at `16/9`.** Inherited from the template, where four
 * different ratios were read as the photographs being mismatched rather than
 * as editorial variety. It matters more here, not less: architectural
 * photography is shot to a standard, and a template demanding several frames
 * would force a studio to crop one consistent set of images several ways.
 * Variety belongs to how much of the row a project takes, never to the shape
 * of its frame. The placeholder files under `public/media/` are generated onto
 * one 1440×1080 canvas with one subject geometry to match; each keeps only its
 * own tone and grain seed.
 */
export const products: Product[] = [
  {
    id: "p-darvazeh",
    slug: "darvazeh",
    name: "خانهٔ دروازه",
    latin: "DARVAZEH",
    category: "مسکونی",
    description: "بازسازی یک خانهٔ حیاط‌دار. دیوار میانی برداشته شد تا حیاط به نشیمن برسد.",
    statement: "حیاط از قبل آنجا بود؛ فقط کسی آن را نمی‌دید.",
    body: [
      "خانه یک حیاط داشت که سال‌ها پشت دیوار آشپزخانه مانده بود. اولین تصمیم برداشتن همان دیوار بود و بقیهٔ نقشه از دل آن درآمد: نشیمن به سمت حیاط چرخید، آشپزخانه به جدارهٔ شمالی رفت، و پلکان که وسط پلان ایستاده بود به لبه منتقل شد.",
      "کف سرتاسری اجرا شد تا مرز داخل و حیاط را نرم کند. جنس یکی است و تنها بافتش بیرون درشت‌تر می‌شود، آن‌قدر که زیر باران لغزنده نباشد.",
      "چیزی به خانه اضافه نشد جز نور. متراژ همان است که بود.",
    ],
    details: [
      { label: "نوع فضا", value: "خانهٔ حیاط‌دار" },
      { label: "متراژ", value: "۱۹۰ متر مربع" },
      { label: "موقعیت", value: "تهران" },
      { label: "سال", value: "۱۴۰۳" },
      { label: "وضعیت", value: "اجرا شده" },
    ],
    tone: "#8C7A63",
    image: {
      src: "/media/project-darvazeh.jpg",
      alt: "نشیمن خانهٔ دروازه، رو به حیاط، در نور بعدازظهر",
      ratio: "4/3",
    },
    layout: "tall",
    status: "published",
  },
  {
    id: "p-sepid",
    slug: "sepid",
    name: "آپارتمان سپید",
    latin: "SEPID",
    category: "مسکونی",
    description: "یک واحد شمالی. همه چیز روشن نگه داشته شد تا نور کم، کمتر به چشم بیاید.",
    statement: "در خانه‌ای که نور مستقیم ندارد، رنگ روشن یک تصمیم فنی است.",
    body: [
      "واحد رو به شمال است و آفتاب مستقیم نمی‌گیرد. هر سطحی که می‌شد روشن بماند روشن ماند، و سقف یک پرده روشن‌تر از دیوارها اجرا شد تا نور بازتابیده پایین بیاید.",
      "کمدها تا سقف رفتند و هم‌رنگ دیوار شدند. یک واحد کوچک بیشتر با دیده‌نشدنِ انبارش بزرگ می‌شود تا با جابه‌جایی دیوارهایش.",
      "تنها سطح تیرهٔ خانه کف است، و همان است که به فضا ته‌نشین می‌دهد.",
    ],
    details: [
      { label: "نوع فضا", value: "آپارتمان مسکونی" },
      { label: "متراژ", value: "۸۶ متر مربع" },
      { label: "موقعیت", value: "تهران" },
      { label: "سال", value: "۱۴۰۴" },
      { label: "وضعیت", value: "اجرا شده" },
    ],
    tone: "#B7B4AC",
    image: {
      src: "/media/project-sepid.jpg",
      alt: "نشیمن آپارتمان سپید با کمدهای تا سقف هم‌رنگ دیوار",
      ratio: "4/3",
    },
    layout: "wide",
    status: "published",
  },
  {
    id: "p-baam",
    slug: "baam",
    name: "بازسازی بام",
    latin: "BAAM",
    category: "مسکونی",
    description: "طبقهٔ آخر یک ساختمان قدیمی. سقف شیب‌دار باز شد و همان‌طور رها ماند.",
    statement: "سازه‌ای که قرار بود پوشانده شود، خودش فضا را ساخت.",
    body: [
      "زیر سقف کاذب یک خرپای چوبی سالم بود. تصمیم گرفتیم بازش کنیم، و ارتفاعی که به دست آمد نقشه را عوض کرد: نشیمن زیر بلندترین نقطه نشست و بقیهٔ کاربری‌ها به لبه‌های کوتاه رفتند.",
      "چوب تمیز شد و رنگ نخورد. هر چه تازه اضافه شد — جداره‌ها، کابینت، پلهٔ نیم‌طبقه — عمداً صاف و بی‌بافت است تا مرز قدیم و جدید معلوم بماند.",
      "پنجرهٔ سقفی تنها عنصر تازه در پوشش است و جای آن از روی مسیر آفتاب بعدازظهر انتخاب شد.",
    ],
    details: [
      { label: "نوع فضا", value: "طبقهٔ آخر با سقف شیب‌دار" },
      { label: "متراژ", value: "۱۱۲ متر مربع" },
      { label: "موقعیت", value: "اصفهان" },
      { label: "سال", value: "۱۴۰۳" },
      { label: "وضعیت", value: "اجرا شده" },
    ],
    tone: "#6E5B47",
    image: {
      src: "/media/project-baam.jpg",
      alt: "نشیمن زیر خرپای چوبی باز، با پنجرهٔ سقفی",
      ratio: "4/3",
    },
    layout: "tall",
    status: "published",
  },
  {
    id: "p-daftar",
    slug: "daftar",
    name: "دفتر کار ستون",
    latin: "SOTOON",
    category: "تجاری",
    description: "یک طبقهٔ اداری باز. ستون‌های موجود مبنای تقسیم فضا شدند.",
    statement: "به‌جای کشیدن دیوار تازه، از چیزی که سازه تحمیل کرده بود استفاده کردیم.",
    body: [
      "پلان یک شبکهٔ ستون داشت که در هر نقشه‌ای مزاحم بود. نقشه را روی همان شبکه بستیم: هر دهانه یک واحد کاری شد و هیچ دیوار تمام‌قدی کشیده نشد.",
      "جداسازی با ارتفاع انجام می‌شود نه با دیوار. قفسه‌های کم‌ارتفاع، تغییر جنس کف، و یک سقف آکوستیک که فقط روی نشیمن‌های گفت‌وگو پایین می‌آید.",
      "اتاق‌های بسته به سه جلسه محدود شدند و هر سه در جدارهٔ بی‌پنجره قرار گرفتند، چون نور روز چیزی است که کار روزمره بیشتر از جلسه به آن نیاز دارد.",
    ],
    details: [
      { label: "نوع فضا", value: "دفتر کار" },
      { label: "متراژ", value: "۴۴۰ متر مربع" },
      { label: "موقعیت", value: "تهران" },
      { label: "سال", value: "۱۴۰۴" },
      { label: "وضعیت", value: "اجرا شده" },
    ],
    tone: "#6B7378",
    image: {
      src: "/media/project-daftar.jpg",
      alt: "فضای کار باز میان ستون‌های بتنی، با قفسه‌های کم‌ارتفاع",
      ratio: "4/3",
    },
    layout: "compact",
    status: "published",
  },
  {
    id: "p-showroom",
    slug: "showroom",
    name: "نمایشگاه سنگ",
    latin: "SANG",
    category: "تجاری",
    description: "فضای نمایش مصالح. جداره‌ها خنثی ماندند تا خود سنگ دیده شود.",
    statement: "وقتی کالا خودش سطح است، فضا باید ساکت باشد.",
    body: [
      "نمایشگاهی که کارش نشان‌دادن سنگ است نمی‌تواند خودش پر از سطح جالب باشد. همهٔ جداره‌ها یک رنگ مات اجرا شد و هیچ بافتی روی آن‌ها نیامد.",
      "نور تنها ابزار طراحی است. ریل‌ها عمود بر جدارهٔ نمایش نصب شدند تا نور با زاویه بتابد و بافت سنگ سایه بیندازد؛ نور روبه‌رو بافت را صاف نشان می‌دهد.",
      "قاب‌های نمایش روی چرخ‌اند. چیدمان قرار است هر بار که محموله عوض می‌شود تغییر کند، و فضا برای همین ساخته شد.",
    ],
    details: [
      { label: "نوع فضا", value: "نمایشگاه مصالح" },
      { label: "متراژ", value: "۳۲۰ متر مربع" },
      { label: "موقعیت", value: "کرج" },
      { label: "سال", value: "۱۴۰۳" },
      { label: "وضعیت", value: "اجرا شده" },
    ],
    tone: "#8F8A80",
    image: {
      src: "/media/project-showroom.jpg",
      alt: "جدارهٔ نمایش سنگ زیر نور زاویه‌دار ریل سقفی",
      ratio: "4/3",
    },
    layout: "tall",
    status: "published",
  },
  {
    id: "p-kelinik",
    slug: "kelinik",
    name: "مطب دندان‌پزشکی",
    latin: "MATAB",
    category: "تجاری",
    description: "سه یونیت و یک سالن انتظار. مسیر بیمار از مسیر کادر جدا شد.",
    statement: "کسی که منتظر است نباید مسیر کار را ببیند.",
    body: [
      "پلان دو مسیر جدا دارد. بیمار از انتظار مستقیم وارد اتاق می‌شود و کادر از پشت، و این دو تنها در درگاه اتاق به هم می‌رسند.",
      "سالن انتظار رو به پنجره چیده شد و صندلی‌ها پشت به در. نشستن روبه‌روی دری که هر بار باز می‌شود، خودش بخشی از اضطراب انتظار است.",
      "همهٔ سطوح تا ارتفاع یک‌ونیم متر بی‌درز اجرا شدند. این یک تصمیم نظافتی است و شکل فضا را هم تعیین کرده است.",
    ],
    details: [
      { label: "نوع فضا", value: "مطب" },
      { label: "متراژ", value: "۱۴۵ متر مربع" },
      { label: "موقعیت", value: "شیراز" },
      { label: "وضعیت", value: "در دست اجرا" },
    ],
    tone: "#7E8C88",
    image: {
      src: "/media/project-kelinik.jpg",
      alt: "سالن انتظار مطب، صندلی‌ها رو به پنجره",
      ratio: "4/3",
    },
    layout: "wide",
    status: "published",
  },
  {
    id: "p-kafe",
    slug: "kafe",
    name: "کافهٔ آجر",
    latin: "AAJOR",
    category: "کافه و رستوران",
    description: "یک مغازهٔ باریک و بلند. جدارهٔ آجری زیر گچ پیدا شد و نگه داشته شد.",
    statement: "دیوار قبلاً آنجا بود. فقط کسی سال‌ها رویش گچ کشیده بود.",
    body: [
      "پشت گچ یک جدارهٔ آجری سالم درآمد. تمیز شد، بندکشی مرمت شد و بی‌پوشش ماند، و تمام رنگ فضا از همان یک سطح می‌آید.",
      "مغازه باریک است و عمق زیاد. پیشخوان در میانهٔ طول قرار گرفت نه در انتها، تا نیمهٔ دوم فضا مرده نشود.",
      "نشیمن دو نوع است: میزهای بلند کنار جدارهٔ آجری برای ماندن کوتاه، و میزهای پایین انتهایی برای ماندن طولانی.",
    ],
    details: [
      { label: "نوع فضا", value: "کافه" },
      { label: "متراژ", value: "۷۸ متر مربع" },
      { label: "موقعیت", value: "تهران" },
      { label: "سال", value: "۱۴۰۴" },
      { label: "وضعیت", value: "اجرا شده" },
    ],
    tone: "#9E5B3E",
    image: {
      src: "/media/project-kafe.jpg",
      alt: "جدارهٔ آجری بی‌پوشش کافه در امتداد میزهای بلند",
      ratio: "4/3",
    },
    layout: "tall",
    status: "published",
  },
  {
    id: "p-restoran",
    slug: "restoran",
    name: "رستوران چوب و مس",
    latin: "MES",
    category: "کافه و رستوران",
    description: "سالن غذاخوری در یک بنای قدیمی. سقف بلند با چراغ‌های پایین‌آمده شکسته شد.",
    statement: "سقف بلند برای یک بنا خوب است و برای یک میز شام نه.",
    body: [
      "بنا سقف پنج‌متری دارد. صدای سالن در آن ارتفاع می‌پیچید و هر میز بلندتر از خودش شنیده می‌شد، پس بالای هر میز یک چراغ پایین آمد و با آن یک سقف صوتی کوچک ساخته شد.",
      "چوب برای هر چیزی که دست به آن می‌خورد و مس برای هر چیزی که نور به آن می‌خورد. این تقسیم در کل سالن بدون استثنا رعایت شد.",
      "آشپزخانه نیمه‌باز است. یک بازشو در ارتفاع چشم، نه بیشتر: دیدن کار خوب است، شنیدنش نه.",
    ],
    details: [
      { label: "نوع فضا", value: "رستوران" },
      { label: "متراژ", value: "۲۶۰ متر مربع" },
      { label: "موقعیت", value: "تبریز" },
      { label: "سال", value: "۱۴۰۳" },
      { label: "وضعیت", value: "اجرا شده" },
    ],
    tone: "#A9704A",
    image: {
      src: "/media/project-restoran.jpg",
      alt: "سالن رستوران با چراغ‌های پایین‌آمده بالای هر میز",
      ratio: "4/3",
    },
    layout: "compact",
    status: "published",
  },
  {
    id: "p-haiat",
    slug: "haiat",
    name: "حیاط غذاخوری",
    latin: "HAIAT",
    category: "کافه و رستوران",
    description: "توسعهٔ یک رستوران به حیاط پشتی. سایه‌بان از خود بنا جدا نگه داشته شد.",
    statement: "سازهٔ تازه به بنای قدیمی تکیه نمی‌دهد. کنارش می‌ایستد.",
    body: [
      "حیاط پشتی انبار بود. خالی شد و به سالن اضافه شد، ولی سایه‌بان روی پایه‌های مستقل خودش نشست و هیچ‌جا به دیوار قدیمی وصل نشد.",
      "فاصلهٔ ده سانتی میان سازهٔ تازه و بنا عمدی است و از داخل هم دیده می‌شود. مرمت بعدی، هر زمان که برسد، به این سازه کاری ندارد.",
      "کف حیاط همان آجر فرش قدیمی است؛ فقط آنچه شکسته بود با آجر دست‌دوم هم‌اندازه جایگزین شد.",
    ],
    details: [
      { label: "نوع فضا", value: "حیاط غذاخوری" },
      { label: "متراژ", value: "۱۳۰ متر مربع" },
      { label: "موقعیت", value: "تبریز" },
      { label: "وضعیت", value: "در دست اجرا" },
    ],
    tone: "#7C6A52",
    image: {
      src: "/media/project-haiat.jpg",
      alt: "حیاط غذاخوری زیر سایه‌بان مستقل، کف آجر فرش",
      ratio: "16/9",
    },
    layout: "feature",
    status: "published",
  },
];

/**
 * What the showcase renders: drafts filtered out, exactly as a CMS would, then
 * resolved so every project has a `tone` and a `layout`.
 *
 * Filter before resolve, never after — the `layout` fallback is positional, so
 * resolving a list that still contains drafts would shift the arrangements of
 * everything after the first hidden project.
 */
export const publishedProducts = resolveProducts(
  products.filter((p) => p.status === "published"),
);
