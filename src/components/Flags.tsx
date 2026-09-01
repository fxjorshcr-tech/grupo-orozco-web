/**
 * Banderas dibujadas como SVG en vez de emoji: los emoji de bandera no se
 * renderizan en Windows, donde el usuario vería sólo las letras "CR" o "US".
 */

export function BanderaCR({ className = "h-3.5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 30 18"
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="30" height="18" fill="#002B7F" />
      <rect y="3" width="30" height="12" fill="#fff" />
      <rect y="6" width="30" height="6" fill="#CE1126" />
    </svg>
  );
}

export function BanderaUS({ className = "h-3.5 w-5" }: { className?: string }) {
  const alto = 18 / 13;
  return (
    <svg
      className={className}
      viewBox="0 0 30 18"
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="30" height="18" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={i * alto} width="30" height={alto} fill="#B22234" />
      ))}
      <rect width="13" height={alto * 7} fill="#3C3B6E" />
      {[0, 1, 2].map((fila) =>
        [0, 1, 2, 3].map((col) => (
          <circle
            key={`${fila}-${col}`}
            cx={2 + col * 3}
            cy={1.6 + fila * 3}
            r="0.72"
            fill="#fff"
          />
        )),
      )}
    </svg>
  );
}

export const BANDERAS = { es: BanderaCR, en: BanderaUS } as const;
