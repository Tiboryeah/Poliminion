import { useState } from 'react';
import { Flower2 } from 'lucide-react';
import Card from '../Card';
import { GerberaShape } from '../Art';
import { playPop, sfx } from '../../utils/audio';

const BOUQUET = [
  { color: '#ff8c42', note: 'Por tu risa, que es de las más bonitas del mundo.' },
  { color: '#ff6fa3', note: 'Por lo bonita que eres, por dentro y por fuera.' },
  { color: '#ffd84d', note: 'Amarilla pastel, como tu color favorito.' },
  { color: '#e8344e', note: 'Roja como las fresas que tanto te gustan.' },
  { color: '#ffb3c7', note: 'Por todas las desveladas haciendo maquetas.' },
  { color: '#ff9f68', note: 'Por cada partida de Fortnite contigo.' },
  { color: '#f7e27a', note: 'Por tus 19 años, que te quedan increíbles.' },
  { color: '#ff7aa8', note: 'Por la arquitecta que ya eres y la que vas a ser.' },
  { color: '#ffc04d', note: 'Y esta, sin razón. Solo porque te mereces flores.' },
];

// Cabeza de cada flor (x, y, escala) en un abanico sobre el florero; el florero está en x=160
const SPOTS = [
  [160, 52, 0.52], [112, 74, 0.48], [208, 74, 0.48],
  [70, 108, 0.44], [250, 108, 0.44], [136, 112, 0.46],
  [184, 112, 0.46], [96, 150, 0.42], [224, 150, 0.42],
];
const MOUTH_Y = 196;

// Tallo curvo desde la boca del florero hasta la flor
const stem = ([x, y]) => {
  const baseX = 160 + (x - 160) * 0.18;
  return `M${baseX} ${MOUTH_Y + 10} Q${baseX + (x - 160) * 0.35} ${(MOUTH_Y + y) / 2} ${x} ${y}`;
};

export default function GerberasCard() {
  const [planted, setPlanted] = useState(0);
  const [open, setOpen] = useState(null);
  const flowers = BOUQUET.slice(0, planted);

  const add = () => {
    if (planted >= BOUQUET.length) return;
    playPop();
    setOpen(planted);
    setPlanted((p) => p + 1);
    if (planted + 1 === BOUQUET.length) sfx('tada', { volume: 0.6, duckMusic: true });
  };

  return (
    <Card
      index={2}
      icon={<Flower2 size={20} />}
      title="Un ramo de gerberas"
      desc="Las flores que nunca se marchitan. Arma el ramo una por una, cada gerbera trae su razón."
    >
      <svg className="bouquet" viewBox="0 0 320 290" role="img" aria-label={`Ramo con ${planted} gerberas`}>
        {flowers.map((_, i) => (
          <path key={`s${i}`} className="bq-stem" d={stem(SPOTS[i])} />
        ))}
        {flowers.map((_, i) => i % 2 === 0 && (
          <ellipse
            key={`l${i}`}
            className="bq-leaf"
            cx={(SPOTS[i][0] + 160) / 2}
            cy={(SPOTS[i][1] + MOUTH_Y) / 2 + 14}
            rx="12" ry="5"
            transform={`rotate(${SPOTS[i][0] < 160 ? 30 : -30} ${(SPOTS[i][0] + 160) / 2} ${(SPOTS[i][1] + MOUTH_Y) / 2 + 14})`}
          />
        ))}
        {flowers.map((f, i) => {
          const [x, y, s] = SPOTS[i];
          return (
            <g key={`f${i}`} transform={`translate(${x} ${y}) scale(${s})`}>
              <g
                className={`bq-flower ${open === i ? 'active' : ''}`}
                onClick={() => { playPop(); setOpen(i); }}
                role="button"
                aria-label={`Gerbera ${i + 1}`}
              >
                <GerberaShape color={f.color} />
              </g>
            </g>
          );
        })}
        {/* Florero al frente, tapa los tallos */}
        <path d="M100 190 H220 L210 262 Q160 286 110 262 Z" fill="#1d3a6e" />
        <path d="M110 262 Q160 286 210 262 L208 276 Q160 298 112 276 Z" fill="#0f2244" />
        <rect x="92" y="182" width="136" height="18" rx="9" fill="#2a4c86" />
        <text x="160" y="240" textAnchor="middle" className="bq-name">Fresita</text>
      </svg>
      <p className="flower-note" aria-live="polite">
        {open === null ? 'El florero está esperando su primera flor…' : BOUQUET[open].note}
      </p>
      <button type="button" className="btn" onClick={add} disabled={planted >= BOUQUET.length}>
        {planted >= BOUQUET.length ? 'Ramo completo' : `Agregar gerbera (${planted}/${BOUQUET.length})`}
      </button>
    </Card>
  );
}
