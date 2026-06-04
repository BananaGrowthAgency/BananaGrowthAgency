import { CONTACT } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export function Contact() {
  return (
    <section id="contact" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <Reveal className="text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-pink/80">
            Contact
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {CONTACT.title}
          </h2>
          <p className="mt-3 text-foreground/60">{CONTACT.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="mt-10 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Nom"
                className="w-full rounded-xl border border-white/10 bg-ink-soft/70 px-4 py-3 text-sm text-foreground placeholder:text-foreground/35 outline-none transition-colors focus:border-pink/50"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full rounded-xl border border-white/10 bg-ink-soft/70 px-4 py-3 text-sm text-foreground placeholder:text-foreground/35 outline-none transition-colors focus:border-pink/50"
              />
            </div>
            <textarea
              name="message"
              rows={5}
              placeholder="Votre message"
              className="w-full resize-none rounded-xl border border-white/10 bg-ink-soft/70 px-4 py-3 text-sm text-foreground placeholder:text-foreground/35 outline-none transition-colors focus:border-pink/50"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-spectrum px-6 py-3 text-sm font-semibold text-ink neon-ring-strong transition-all hover:brightness-110 active:scale-[0.99]"
            >
              Envoyer
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
