import Image from "next/image";

export type ChatMockupMessage = {
  from: "genia" | "user";
  text: string;
  meta?: string;
};

/**
 * Decorative chat mockup in the site's dark-panel language (not a WhatsApp
 * green clone). Server component, no interactivity: the approval pills are
 * purely visual.
 */
export default function WhatsAppChatMockup({
  messages,
  approval,
  className,
}: {
  messages: ChatMockupMessage[];
  approval?: { question: string };
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-2xl bg-[#060912] p-3.5 shadow-[0_18px_60px_-40px_rgba(13,170,191,0.6)] ${className ?? ""}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <Image
          src="/images/soul-genia-profile-mark.png"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 rounded-md"
        />
        <span className="text-[11px] font-semibold tracking-wide text-[var(--v3-aprova-glow)]">
          Soul Genia
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.from === "genia"
                ? "max-w-[88%] rounded-2xl rounded-tl-md border border-[color-mix(in_srgb,var(--v3-aprova-glow)_18%,transparent)] bg-white/[0.08] px-3 py-2"
                : "ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-primary-light/20 px-3 py-2"
            }
          >
            <p
              className={`text-xs leading-5 ${
                message.from === "genia" ? "text-white/85" : "text-white/90"
              }`}
            >
              {message.text}
            </p>
            {message.meta ? (
              <p className="mt-1 text-right text-[10px] font-medium text-white/40">
                {message.meta}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      {approval ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[color-mix(in_srgb,var(--v3-aprova-glow)_24%,transparent)] bg-white/[0.05] px-3 py-2.5">
          <p className="text-[11px] font-semibold text-white/80">
            {approval.question}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-primary-light px-3 py-1 text-[10px] font-bold text-white">
              Aprovar
            </span>
            <span className="rounded-full border border-white/25 px-3 py-1 text-[10px] font-semibold text-white/75">
              Editar
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
