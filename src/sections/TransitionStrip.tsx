const WORDS = ["DESIGN", "TECNOLOGIA", "ESTRATÉGIA", "PERFORMANCE"];

export function TransitionStrip() {
  const track = [...WORDS, ...WORDS, ...WORDS, ...WORDS];

  return (
    <div className="relative border-y border-line-soft bg-charcoal py-6 overflow-hidden">
      <div className="flex w-max animate-marquee gap-10 will-change-transform">
        {track.map((word, i) => (
          <div key={i} className="flex items-center gap-10 shrink-0">
            <span className="font-display text-2xl font-bold tracking-tight text-mist-dim sm:text-3xl">
              {word}
            </span>
            <span className="size-1.5 rounded-full bg-signal/70" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
