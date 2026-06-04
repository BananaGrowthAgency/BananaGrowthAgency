import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, FOOTER_TAGLINE } from "@/lib/site";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 9h2.5V6H14c-2.2 0-3.5 1.4-3.5 3.6V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.6c0-.4.2-.6.6-.6Z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.4h3.27V21H3.3V8.4Zm5.1 0h3.13v1.72h.05c.44-.83 1.5-1.7 3.1-1.7 3.32 0 3.93 2.18 3.93 5v6.58h-3.27v-5.83c0-1.39-.02-3.18-1.94-3.18-1.94 0-2.24 1.51-2.24 3.07V21H8.4V8.4Z" />
    </svg>
  );
}

const socials = [
  { Icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { Icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { Icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-4 py-12">
      {/* Fond noir dégradé */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-soft via-ink to-black" />
      {/* Glows néon multicolores */}
      <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-60" />
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[60%] -translate-x-1/2 rounded-full bg-pink/20 blur-[100px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Link href="#top" className="flex items-center">
            <Image
              src="/logo/logoRow.png"
              alt="Banana Growth Agency"
              width={170}
              height={58}
              className="h-9 w-auto"
            />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-foreground/45">
            {FOOTER_TAGLINE}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-2">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-foreground/55 transition-colors hover:text-pink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#"
            className="text-sm text-foreground/55 transition-colors hover:text-pink"
          >
            Politique de confidentialité
          </Link>
          <Link
            href="#"
            className="text-sm text-foreground/55 transition-colors hover:text-pink"
          >
            Mentions Légales
          </Link>
        </nav>

        <div className="flex gap-3">
          {socials.map(({ Icon, href, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-pink/20 text-foreground/60 transition-all hover:border-pink/50 hover:text-pink"
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-center text-xs text-foreground/35">
        © {new Date().getFullYear()} Banana Growth Agency. Tous droits réservés.
      </div>
    </footer>
  );
}
