import { useEffect, useState } from "react";
import { series, episodes, type Episode } from "../data/quietParts";

export function QuietPartsPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
      setProgress(pct);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 font-serif text-zinc-200 antialiased">
      <div
        className="fixed inset-x-0 top-0 z-20 h-0.5 origin-left bg-cyan-400"
        style={{ transform: `scaleX(${progress / 100})` }}
        aria-hidden
      />

      <header className="sticky top-0 z-10 border-b border-zinc-900/80 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <a
            href="/"
            className="font-mono text-sm text-zinc-400 transition hover:text-cyan-400"
          >
            ← skillcraft.codes
          </a>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">
            Video Series
          </span>
        </div>
      </header>

      <Hero />
      <Pattern />

      <section className="px-6 py-8">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-cyan-400">
            The episodes
          </p>
          <ul className="mt-8 flex flex-col gap-6">
            {episodes.map((ep) => (
              <EpisodeCard key={ep.slug} episode={ep} />
            ))}
          </ul>
        </div>
      </section>

      <Closer />

      <footer className="border-t border-zinc-900 px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-zinc-500">
            About the series
          </p>
          <p className="mt-3 text-base leading-relaxed text-zinc-400">
            {series.title} adapts four long-form essays into produced video.
            Every empirical claim is sourced on screen; every episode concedes
            the strongest version of the opposing case before pressing its own.
          </p>
          <p className="mt-8 font-mono text-xs text-zinc-600">
            <a href="/" className="text-zinc-400 transition hover:text-cyan-400">
              ← Back to skillcraft.codes
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function Hero() {
  return (
    <section className="border-b border-zinc-900 px-6 pb-16 pt-24 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">
          A four-part essay series
        </p>
        <h1 className="mt-6 font-serif text-5xl font-medium leading-[1.02] tracking-tight text-zinc-50 sm:text-7xl md:text-8xl">
          The Quiet{" "}
          <span className="italic text-cyan-300">Parts</span>
        </h1>
        <p className="mt-8 max-w-2xl font-serif text-xl leading-relaxed text-zinc-300 sm:text-2xl">
          {series.tagline}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          <span className="text-zinc-300">By Arrington Walters</span>
          <span className="text-zinc-700">·</span>
          <span className="rounded-full border border-rose-400/30 px-3 py-1 text-rose-300">
            {series.releaseNote}
          </span>
        </div>
      </div>
    </section>
  );
}

function Pattern() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        {series.intro.map((para, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "font-serif text-lg leading-[1.7] text-zinc-200 first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:font-medium first-letter:leading-[0.85] first-letter:text-cyan-300 sm:text-xl"
                : "font-serif text-lg leading-[1.7] text-zinc-300 sm:text-xl"
            }
          >
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}

interface EpisodeCardProps {
  readonly episode: Episode;
}

function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <li className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40 transition hover:border-cyan-400/40 hover:bg-zinc-900/60">
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-cyan-400">
            EP {episode.number} · {episode.kicker}
          </span>
          <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-zinc-500">
            {episode.runtime}
          </span>
        </div>

        <h2 className="font-serif text-2xl font-medium leading-tight text-zinc-100 sm:text-3xl">
          {episode.title}
        </h2>

        <p className="font-serif text-base leading-relaxed text-zinc-400 sm:text-lg">
          {episode.dek}
        </p>

        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 sm:grid-cols-3">
          {episode.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 bg-zinc-950 px-4 py-3"
            >
              <dt className="font-serif text-2xl font-medium text-cyan-200">
                {stat.value}
              </dt>
              <dd className="font-serif text-sm leading-snug text-zinc-400">
                {stat.label}
              </dd>
              <dd className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-zinc-600">
                {stat.source}
              </dd>
            </div>
          ))}
        </dl>

        <blockquote className="border-l-2 border-rose-400/70 pl-5 font-serif text-lg italic leading-snug text-zinc-200 sm:text-xl">
          {episode.quietPart}
        </blockquote>

        <div className="flex items-center justify-between gap-4 pt-1">
          <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-zinc-500">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
            {episode.status}
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-zinc-600">
            Watch — coming soon
          </span>
        </div>
      </div>
    </li>
  );
}

function Closer() {
  return (
    <section className="border-t border-zinc-900 px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-cyan-400">
          What all four share
        </p>
        <p className="mt-6 font-serif text-2xl font-medium leading-snug text-zinc-100 sm:text-3xl">
          An institution protected a narrative instead of updating on the
          evidence — and the update arrived anyway.
        </p>
        <p className="mt-6 font-serif text-lg leading-relaxed text-zinc-400">
          The fix was never to hand anyone the keys. It was to treat these as
          questions with answers rather than loyalty tests — and to follow the
          evidence even when it embarrasses your own side.
        </p>
      </div>
    </section>
  );
}
