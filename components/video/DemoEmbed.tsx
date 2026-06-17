interface DemoEmbedProps {
  /** Loom share URL (e.g. https://www.loom.com/share/abc123) */
  loomUrl?: string;
  /** Fallback MP4 path (relative to /public) */
  mp4Src?: string;
  title?: string;
}

/**
 * Embeds a Loom video or falls back to an HTML5 <video> if mp4Src is provided.
 * If neither is provided, renders a placeholder.
 *
 * Usage:
 *   <DemoEmbed loomUrl="https://www.loom.com/share/abc123" />
 *   <DemoEmbed mp4Src="/demo.mp4" />
 */
export default function DemoEmbed({
  loomUrl,
  mp4Src,
  title = "Demo {PRODUTO}",
}: DemoEmbedProps) {
  // Convert Loom share URL to embed URL
  const loomEmbedUrl = loomUrl
    ? loomUrl.replace("www.loom.com/share/", "www.loom.com/embed/")
    : null;

  if (loomEmbedUrl) {
    return (
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-zinc-900"
        style={{ paddingBottom: "56.25%" }} // 16:9 aspect ratio
      >
        <iframe
          src={loomEmbedUrl}
          title={title}
          className="absolute inset-0 h-full w-full"
          allowFullScreen
          allow="autoplay; fullscreen"
          loading="lazy"
        />
      </div>
    );
  }

  if (mp4Src) {
    return (
      <video
        controls
        preload="metadata"
        className="w-full rounded-2xl"
        title={title}
        aria-label={title}
      >
        <source src={mp4Src} type="video/mp4" />
        <p className="sr-only">
          Seu browser não suporta vídeos HTML5. Acesse a demo em{" "}
          <a href={mp4Src}>link direto</a>.
        </p>
      </video>
    );
  }

  // Placeholder
  return (
    <div
      className="flex aspect-video w-full items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-100"
      aria-label="Vídeo demo — em breve"
    >
      <div className="text-center text-zinc-400">
        <svg
          className="mx-auto mb-2 h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z"
          />
        </svg>
        <p className="text-sm font-medium">Demo em breve</p>
        <p className="text-xs">90 segundos, sem narrador</p>
      </div>
    </div>
  );
}
