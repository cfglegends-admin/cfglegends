import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-pattern relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(212, 175, 55, 0.22) 0%, rgba(212, 175, 55, 0.08) 35%, rgba(10, 10, 10, 0) 70%)",
        }}
      />

      <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center gap-8 px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
        <h1 className="sr-only">CFG Legends — Das Kartenspiel für die große Pause</h1>

        <Image
          src="/assets/logo.png"
          alt="CFG Legends Wappen"
          width={512}
          height={512}
          priority
          quality={90}
          sizes="(max-width: 768px) 288px, (max-width: 1024px) 384px, 448px"
          className="h-auto w-72 md:w-96 lg:w-[28rem]"
        />

        <p className="font-body text-muted-foreground text-lg md:text-xl">
          Das Kartenspiel für die große Pause
        </p>

        <Link
          href="/regeln"
          className="bg-gold text-background hover:bg-gold-bright font-display rounded-md px-8 py-3 text-base font-semibold tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
        >
          Regeln entdecken
        </Link>
      </div>
    </section>
  );
}
