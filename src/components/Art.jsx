// Ilustraciones vectoriales hechas a mano para Fresita

export function Minion({ className = '', mood = 'happy', waving = false }) {
  return (
    <svg className={`minion ${className}`} viewBox="0 0 140 190" aria-hidden="true">
      {/* Pelitos */}
      <g stroke="#1b1b1b" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M62 16 Q58 4 52 2" />
        <path d="M70 14 Q70 2 72 0" />
        <path d="M78 16 Q84 4 90 3" />
      </g>
      {/* Brazo que saluda */}
      <g className={waving ? 'minion-wave' : ''} style={{ transformOrigin: '116px 112px' }}>
        <path d="M116 112 Q132 96 128 76" stroke="#ffd84d" strokeWidth="9" strokeLinecap="round" fill="none" />
        <circle cx="128" cy="72" r="7" fill="#1b1b1b" />
      </g>
      <path d="M24 112 Q10 128 16 146" stroke="#ffd84d" strokeWidth="9" strokeLinecap="round" fill="none" />
      <circle cx="16" cy="150" r="7" fill="#1b1b1b" />
      {/* Cuerpo */}
      <rect x="24" y="14" width="92" height="160" rx="46" fill="#ffd84d" />
      <path d="M30 40 Q34 24 52 18" stroke="#fff3b0" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".7" />
      {/* Overol azul marino */}
      <path d="M24 122 H116 V128 Q116 174 70 174 Q24 174 24 128 Z" fill="#1d3a6e" />
      <rect x="44" y="112" width="52" height="34" rx="8" fill="#1d3a6e" />
      <path d="M24 106 L48 118 M116 106 L92 118" stroke="#1d3a6e" strokeWidth="6" strokeLinecap="round" />
      <circle cx="48" cy="118" r="3.5" fill="#0b1730" />
      <circle cx="92" cy="118" r="3.5" fill="#0b1730" />
      <rect x="58" y="122" width="24" height="16" rx="5" fill="#16305c" />
      {/* Fresita en el bolsillo */}
      <path d="M70 136 C64 134 62 128 64 125 C66 123 74 123 76 125 C78 128 76 134 70 136Z" fill="#e8344e" />
      <path d="M65 125 Q70 120 75 125" stroke="#3fa34d" strokeWidth="2.5" fill="none" />
      {/* Pies */}
      <path d="M48 174 V182 H34 Q32 176 40 174Z M92 174 V182 H106 Q108 176 100 174Z" fill="#1b1b1b" />
      {/* Gogle */}
      <rect x="22" y="54" width="96" height="10" fill="#2a2a2a" />
      <circle cx="70" cy="60" r="27" fill="#c8ced8" stroke="#8a93a3" strokeWidth="4" />
      <circle cx="70" cy="60" r="20" fill="#fff" />
      <g className="minion-eye">
        <circle cx="70" cy="61" r="9" fill="#7a4a1e" />
        <circle cx="70" cy="61" r="4.5" fill="#1b1b1b" />
        <circle cx="73" cy="57" r="2.2" fill="#fff" />
      </g>
      <ellipse className="minion-lid" cx="70" cy="60" rx="20" ry="20" fill="#ffd84d" />
      {/* Boca */}
      {mood === 'happy' && <path d="M54 96 Q70 112 86 96 Q70 104 54 96Z" fill="#5a2a1a" />}
      {mood === 'wow' && <ellipse cx="70" cy="100" rx="8" ry="10" fill="#5a2a1a" />}
      {mood === 'love' && <path d="M52 94 Q70 116 88 94 Q70 102 52 94Z" fill="#5a2a1a" />}
      {mood !== 'wow' && <path d="M60 99 H80" stroke="#fff" strokeWidth="3" opacity=".9" />}
      {/* Cachetes */}
      <circle cx="44" cy="92" r="6" fill="#ff8a9b" opacity=".45" />
      <circle cx="96" cy="92" r="6" fill="#ff8a9b" opacity=".45" />
    </svg>
  );
}

export function Gerbera({ color = '#ff6fa3', size = 60, className = '' }) {
  const petals = Array.from({ length: 18 }, (_, i) => i * 20);
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <g transform="translate(50 50)">
        {petals.map((a) => (
          <ellipse key={a} cx="0" cy="-30" rx="6.5" ry="18" fill={color} transform={`rotate(${a})`} />
        ))}
        {petals.map((a) => (
          <ellipse key={`i${a}`} cx="0" cy="-22" rx="4" ry="11" fill="#fff" opacity=".22" transform={`rotate(${a + 10})`} />
        ))}
        <circle r="14" fill="#f2b33d" />
        <circle r="9" fill="#5b3a1a" />
        <circle r="4" fill="#2e1c0c" />
      </g>
    </svg>
  );
}

export function Strawberry({ size = 40, className = '', picked = false }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 58C16 52 8 38 10 26c1-8 9-12 22-12s21 4 22 12c2 12-6 26-22 32Z" fill={picked ? '#ff8a9b' : '#e8344e'} />
      <path d="M18 24c2-4 6-6 10-6" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".35" fill="none" />
      <g fill="#ffe9a8">
        <circle cx="22" cy="28" r="1.6" /><circle cx="32" cy="26" r="1.6" /><circle cx="42" cy="28" r="1.6" />
        <circle cx="26" cy="38" r="1.6" /><circle cx="38" cy="38" r="1.6" /><circle cx="32" cy="48" r="1.6" />
        <circle cx="18" cy="36" r="1.4" /><circle cx="46" cy="36" r="1.4" />
      </g>
      <path d="M20 15c4-6 8-7 12-3 4-4 8-3 12 3-5 1-9 3-12 6-3-3-7-5-12-6Z" fill="#3fa34d" />
      <path d="M32 12 Q33 6 36 4" stroke="#2e7d3a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Banana({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M10 18c4 22 22 36 44 30-2 5-8 8-16 8C20 56 8 40 6 20Z" fill="#ffd84d" stroke="#c99a1a" strokeWidth="2" />
      <path d="M6 20 4 14l5-1 1 5" fill="#6b4a1a" />
    </svg>
  );
}

export function Maki({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="#132a1f" />
      <circle cx="32" cy="32" r="22" fill="#fffaf0" />
      <circle cx="32" cy="32" r="10" fill="#ff8c69" />
      <circle cx="28" cy="29" r="4" fill="#7dc36b" />
    </svg>
  );
}

export function Nigiri({ size = 70 }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" aria-hidden="true">
      <rect x="12" y="26" width="76" height="28" rx="14" fill="#fffaf0" stroke="#e7dcc4" strokeWidth="2" />
      <path d="M6 28 Q50 2 94 24 Q96 34 84 34 Q50 26 14 38 Q4 36 6 28Z" fill="#ff8c69" />
      <g stroke="#ffd2c2" strokeWidth="3" strokeLinecap="round">
        <path d="M24 26 Q30 20 38 20" /><path d="M44 22 Q52 16 60 17" /><path d="M66 20 Q74 17 82 20" />
      </g>
      <rect x="44" y="20" width="10" height="36" fill="#132a1f" opacity=".9" />
    </svg>
  );
}
