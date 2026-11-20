import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

export type Etape = { nom: string; href?: string };

/**
 * Fil d'Ariane visible, doublé du balisage BreadcrumbList que Google affiche
 * à la place de l'URL dans ses résultats. La dernière étape est la page
 * courante : pas de lien. Les `href` arrivent déjà dans la bonne langue.
 */
export function FilAriane({
  etapes,
  className,
  locale = "fr",
}: {
  etapes: readonly Etape[];
  className?: string;
  locale?: Locale;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: etapes.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.nom,
      ...(e.href ? { item: `${SITE_URL}${e.href === "/" ? "" : e.href}` } : {}),
    })),
  };

  return (
    <nav
      aria-label={locale === "es" ? "Ruta de navegación" : "Fil d'Ariane"}
      className={className}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-foreground/50">
        {etapes.map((e, i) => (
          <li key={e.nom} className="inline-flex items-center gap-1.5">
            {i > 0 && <ChevronRight aria-hidden className="h-3.5 w-3.5 text-foreground/30" />}
            {e.href ? (
              <Link href={e.href} className="transition-colors hover:text-pink">
                {e.nom}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground/75">
                {e.nom}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
