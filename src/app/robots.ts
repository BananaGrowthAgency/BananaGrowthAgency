import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * robots.txt — servi à la racine du domaine.
 *
 * /remerciements (et /es/gracias en espagnol) est la page d'après-conversion : elle porte déjà
 * `robots: { index: false }` dans ses métadonnées, on l'exclut aussi du
 * crawl pour qu'elle ne consomme pas de budget d'exploration.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/remerciements", "/es/gracias"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
