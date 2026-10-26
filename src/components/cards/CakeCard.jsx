import { useState } from 'react';
import { Cake, Wind } from 'lucide-react';
import Card from '../Card';
import { minionSay, sfx } from '../../utils/audio';

const CANDLES = 19;

// Velas acomodadas en un arco sobre el pastel
const candleX = (i) => 60 + (i * 200) / (CANDLES - 1);
const candleY = (i) => 92 - Math.sin((i / (CANDLES - 1)) * Math.PI) * 10;

export default function CakeCard({ onRain }) {
  const [out, setOut] = useState([]);
  const allOut = out.length === CANDLES;

  const finish = () => {
    sfx('blow', { volume: 0.8 });
    minionSay('happy-birthday');
    onRain('mix');
  };

  const blowOne = (i) => {
    if (out.includes(i)) return;
    sfx('blow', { volume: 0.45 });
    const next = [...out, i];
    setOut(next);
    if (next.length === CANDLES) finish();
  };

  const blowAll = () => {
    setOut(Array.from({ length: CANDLES }, (_, i) => i));
    finish();
  };

  return (
    <Card
      index={8}
      icon={<Cake size={20} />}
      title="19 velitas"
      desc="Pide un deseo y sopla. Puedes apagarlas una por una o todas de golpe."

    >
      <div className="cake-stage">
        <svg viewBox="0 0 320 210" role="img" aria-label="Pastel de fresas con 19 velas">
          <ellipse cx="160" cy="192" rx="140" ry="14" fill="#0f2244" opacity=".18" />
          <ellipse cx="160" cy="186" rx="132" ry="14" fill="#fff" stroke="#e7dcc4" strokeWidth="2" />
          {/* Piso de abajo: amarillo pastel */}
          <path d="M40 130 V176 Q160 196 280 176 V130 Z" fill="#ffe9a8" />
          <ellipse cx="160" cy="130" rx="120" ry="16" fill="#fff3c4" />
          <path d="M40 132 Q52 150 64 136 Q78 154 92 138 Q106 156 120 140 Q134 158 148 141 Q162 158 176 141 Q190 156 204 140 Q218 154 232 138 Q246 152 260 136 Q270 148 280 132" fill="none" stroke="#ff8a9b" strokeWidth="7" strokeLinecap="round" />
          {/* Piso de arriba: azul marino */}
          <path d="M60 96 V132 Q160 148 260 132 V96 Z" fill="#1d3a6e" />
          <ellipse cx="160" cy="96" rx="100" ry="13" fill="#2a4c86" />
          {/* Fresas encima */}
          {[78, 120, 200, 242].map((x) => (
            <g key={x} transform={`translate(${x - 9} ${x === 120 || x === 200 ? 98 : 94})`}>
              <path d="M9 18C3 16 0 10 1 6c0-3 3-4 8-4s8 1 8 4c1 4-2 10-8 12Z" fill="#e8344e" />
              <path d="M4 3 Q9 -1 14 3" stroke="#3fa34d" strokeWidth="2.5" fill="none" />
            </g>
          ))}
          <text x="160" y="122" textAnchor="middle" className="cake-text">Fresita</text>

          {Array.from({ length: CANDLES }, (_, i) => {
            const x = candleX(i);
            const y = candleY(i);
            const lit = !out.includes(i);
            return (
              <g key={i} className="candle" onClick={() => blowOne(i)}>
                <rect x={x - 6} y={y - 56} width="12" height="58" fill="transparent" />
                <rect x={x - 2.5} y={y - 26} width="5" height="26" rx="1.5" fill={i % 2 ? '#ffe9a8' : '#ff8a9b'} />
                <line x1={x} y1={y - 26} x2={x} y2={y - 30} stroke="#3a2a1a" strokeWidth="1.2" />
                {lit ? (
                  <g className="flame" style={{ animationDelay: `${(i % 5) * 0.12}s`, transformOrigin: `${x}px ${y - 30}px` }}>
                    <circle cx={x} cy={y - 37} r="8" fill="#ffd84d" opacity=".25" />
                    <path d={`M${x} ${y - 30} C${x - 4} ${y - 35} ${x - 2} ${y - 41} ${x} ${y - 46} C${x + 2} ${y - 41} ${x + 4} ${y - 35} ${x} ${y - 30}Z`} fill="#ffb02e" />
                    <path d={`M${x} ${y - 31} C${x - 1.6} ${y - 34} ${x - 1} ${y - 38} ${x} ${y - 40} C${x + 1} ${y - 38} ${x + 1.6} ${y - 34} ${x} ${y - 31}Z`} fill="#fff6d6" />
                  </g>
                ) : (
                  <path className="smoke" d={`M${x} ${y - 30} q4 -8 -2 -14 t2 -14`} stroke="rgba(15,34,68,.35)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {allOut ? (
        <div className="wish">
          <strong>Deseo guardado</strong>
          <p>Que estos 19 te traigan todo lo que sueñas: planos que se vuelven casas, fresas, sushi, gerberas y muchas razones para seguir riéndote así de bonito.</p>
          <button type="button" className="link-btn" onClick={() => setOut([])}>Volver a encenderlas</button>
        </div>
      ) : (
        <div className="btn-row">
          <span className="tiny-note">{CANDLES - out.length} velas encendidas</span>
          <button type="button" className="btn" onClick={blowAll}><Wind size={16} /> Soplar todas</button>
        </div>
      )}
    </Card>
  );
}
