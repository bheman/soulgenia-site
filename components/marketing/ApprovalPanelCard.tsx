/**
 * Static UI card echoing the hero's "Aprovar resposta?" approval panel.
 * Dark glass card with cyan glow border; fully decorative (no real buttons).
 */
export default function ApprovalPanelCard({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--v3-aprova-glow)_34%,transparent)] bg-[#060912] p-6 shadow-[0_24px_80px_-48px_rgba(13,170,191,0.75)] ${className ?? ""}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--v3-aprova-glow) 18%, transparent), transparent)",
        }}
      />

      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--v3-aprova-glow)]">
        Revisão humana
      </p>
      <p className="mt-3 font-display text-2xl leading-snug text-white">
        Aprovar resposta?
      </p>

      <div className="mt-4 rounded-2xl rounded-tl-md border border-white/12 bg-white/[0.07] px-4 py-3">
        <p className="text-sm leading-6 text-white/82">
          Consigo sim. Te confirmo o horário ainda hoje, pode deixar comigo.
        </p>
      </div>

      <div aria-hidden="true" className="mt-5 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-primary-light px-4 py-1.5 text-xs font-bold text-white">
          Aprovar e enviar
        </span>
        <span className="rounded-full border border-white/28 px-4 py-1.5 text-xs font-semibold text-white/78">
          Editar resposta
        </span>
      </div>

      <p className="mt-4 text-xs leading-5 text-white/55">
        Nada sai sem esse toque final. A decisão é sempre sua.
      </p>
    </div>
  );
}
