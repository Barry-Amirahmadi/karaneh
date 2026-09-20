import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Noto_Kufi_Arabic } from "next/font/google";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { organizationSchema } from "@/content/schema";
import { siteRoot } from "@/lib/seo";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

/**
 * Both faces are fetched at build time and served from this origin — next/font
 * self-hosts rather than linking to Google. That matters for a site aimed at
 * Iranian users: no third-party font request to be slow or blocked, and no
 * layout shift while a webfont negotiates.
 *
 * Noto Kufi Arabic     — geometric Kufi. Display only. Chosen because this
 *                        trade draws straight lines for a living and a
 *                        calligraphic Naskh would argue with its own subject.
 * IBM Plex Sans Arabic  — neutral Persian sans with a technical register.
 *                        Everything else.
 *
 * **Both subsets on both faces. Do not "optimise" the display face down to
 * `arabic`.** Nothing on this site sets Latin in the display face — the Latin
 * half of the wordmark and every micro-label are `.t-label`, which is
 * `--font-body` — so dropping the subset looks free. It is not: Google splits
 * these faces by unicode range, and the `arabic` subset does not contain
 * `U+0020`. The space character, the em-dash and the rest of general
 * punctuation live in `latin`, and every Persian heading on the site has
 * spaces in it, so the browser downloads that file either way. Dropping the
 * subset only removes its `<link rel="preload">`, turning an early parallel
 * fetch into one discovered after layout — the same bytes, arriving late
 * enough to swap the largest type on the page.
 *
 * The body face has no variable axis on Google Fonts, so its weights are
 * requested explicitly. 400 and 500 are the only two the stylesheets use;
 * asking for the full 100–700 range would ship five families nothing sets.
 */
const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-kufi",
  display: "swap",
});

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

/**
 * Site-wide defaults only. Every route composes its own title, description,
 * canonical and social card through `pageMetadata` — see `src/lib/seo.ts` for
 * why that is centralised rather than written per page.
 *
 * `metadataBase` carries the base path, unlike the bare origin the deploy
 * workflow supplies, so any relative URL Next resolves for itself lands inside
 * the deployed site rather than at the root of the host.
 */
export const metadata: Metadata = {
  metadataBase: new URL(`${siteRoot}/`),
  title: {
    default: site.seo.title,
    template: site.seo.titleTemplate,
  },
  description: site.seo.description,

  /**
   * This deployment is a demonstration shown to one prospective client at a
   * time, not a studio's website. Its copy describes a studio that does not
   * exist, at an address that is not theirs, and having it rank for the
   * brand's name — or, worse, for «معماری داخلی تهران» — would put invented
   * text in front of people looking for a real one.
   *
   * `noindex` here, on every page, is the half that works: `robots.txt` on a
   * GitHub Pages project site is served under the repository path where no
   * crawler looks for it, so the meta tag is what actually carries the
   * instruction. Remove both when a real client takes the site over.
   */
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#efefed",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${plex.variable} ${kufi.variable}`}
      /* The inline script below stamps data-js before React hydrates; that is
         the point of it, so the resulting attribute difference is expected. */
      suppressHydrationWarning
    >
      <body>
        {/* Marks the document as scripted before first paint. Scroll reveals
            are hidden only under [data-js="on"], so a failed or blocked bundle
            leaves a fully readable page instead of a blank one. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute("data-js","on")`,
          }}
        />

        <a href="#main" className="skip-link">
          {ui.skipToContent}
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />

        {/* Brand-level structured data, on every page because the organisation
            is a property of the site rather than of any one route. */}
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
