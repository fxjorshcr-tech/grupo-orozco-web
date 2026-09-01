/** Encabezado de sección con numeración editorial y filete dorado. */
export default function SectionHeading({
  numero,
  eyebrow,
  titulo,
  descripcion,
  align = "left",
}: {
  numero: string;
  eyebrow: string;
  titulo: React.ReactNode;
  descripcion?: string;
  align?: "left" | "center";
}) {
  const centrado = align === "center";

  return (
    <div className={centrado ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div
        className={`mb-6 flex items-center gap-4 ${centrado ? "justify-center" : ""}`}
      >
        <span className="tabular text-xs font-semibold text-gold">{numero}</span>
        <span className="h-px w-10 rule-gold" aria-hidden="true" />
        <span className="eyebrow text-white/45">{eyebrow}</span>
      </div>

      <h2 className="font-display text-4xl text-white sm:text-5xl lg:text-[3.5rem] text-balance">
        {titulo}
      </h2>

      {descripcion && (
        <p
          className={`mt-6 text-lg leading-relaxed text-white/55 text-pretty ${
            centrado ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {descripcion}
        </p>
      )}
    </div>
  );
}
