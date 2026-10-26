import { useState } from 'react';
import { Ruler, PenLine } from 'lucide-react';
import Card from '../Card';
import { playChime, playSwoosh } from '../../utils/audio';

const ROOMS = [
  { x: 24, y: 24, w: 150, h: 100, label: 'Estudio de la Arq.', sub: 'mesa de dibujo + maquetas' },
  { x: 174, y: 24, w: 122, h: 100, label: 'Cuarto gamer', sub: 'Fortnite a dúo' },
  { x: 24, y: 124, w: 110, h: 92, label: 'Cocina', sub: 'noches de sushi' },
  { x: 134, y: 124, w: 162, h: 92, label: 'Sala de risas', sub: 'la tuya, de fondo' },
];

export default function ArquitectaCard() {
  const [drawn, setDrawn] = useState(false);
  const [signed, setSigned] = useState(false);

  const draw = () => {
    playSwoosh();
    setDrawn(true);
  };

  const sign = () => {
    playChime();
    setSigned(true);
  };

  return (
    <Card
      index={6}
      icon={<Ruler size={20} />}
      title="Plano: nuestra casa"
      desc="Estás estudiando arquitectura y estoy seguro de que serás la mejor. Por eso este proyecto ya tiene arquitecta asignada."
      tone="navy"
      wide
    >
      <div className={`blueprint ${drawn ? 'drawn' : ''}`}>
        <svg viewBox="0 0 320 300" role="img" aria-label="Plano de la casa diseñada por Fresita">
          <defs>
            <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M16 0H0V16" fill="none" stroke="rgba(255,233,168,.12)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="320" height="300" fill="url(#grid)" />

          {/* Muros */}
          <rect className="bp-line" x="24" y="24" width="272" height="192" pathLength="1" />
          {ROOMS.map((r) => (
            <rect key={r.label} className="bp-line thin" x={r.x} y={r.y} width={r.w} height={r.h} pathLength="1" />
          ))}
          {/* Puertas (arcos) */}
          <path className="bp-line thin" d="M134 170 A20 20 0 0 1 154 150" pathLength="1" />
          <path className="bp-line thin" d="M174 80 A18 18 0 0 0 192 62" pathLength="1" />
          <path className="bp-line thin" d="M200 216 A22 22 0 0 1 222 194" pathLength="1" />

          {/* Jardín de gerberas y huerto de fresas */}
          <rect className="bp-line dashed" x="24" y="230" width="150" height="50" pathLength="1" />
          <rect className="bp-line dashed" x="186" y="230" width="110" height="50" pathLength="1" />
          {[48, 78, 108, 138].map((cx) => <circle key={cx} className="bp-dot flower" cx={cx} cy="255" r="7" />)}
          {[210, 240, 270].map((cx) => <circle key={cx} className="bp-dot berry" cx={cx} cy="255" r="6" />)}

          {ROOMS.map((r) => (
            <g key={`t${r.label}`} className="bp-text">
              <text x={r.x + r.w / 2} y={r.y + r.h / 2 - 2} textAnchor="middle">{r.label}</text>
              <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 12} textAnchor="middle" className="sub">{r.sub}</text>
            </g>
          ))}
          <g className="bp-text">
            <text x="99" y="292" textAnchor="middle" className="sub">jardín de gerberas</text>
            <text x="241" y="292" textAnchor="middle" className="sub">huerto de fresas</text>
          </g>
        </svg>

        <div className="title-block">
          <div><span>Proyecto</span><strong>Casa Poliminion</strong></div>
          <div><span>Escala</span><strong>1 : para siempre</strong></div>
          <div className="sign-cell">
            <span>Arquitecta</span>
            {signed ? <strong className="signature">Arq. Fresita</strong> : <strong className="pending">pendiente de firma</strong>}
          </div>
        </div>
      </div>

      <div className="btn-row">
        <button type="button" className="btn btn-light" onClick={draw} disabled={drawn}>
          <Ruler size={16} /> {drawn ? 'Plano trazado' : 'Trazar el plano'}
        </button>
        <button type="button" className="btn" onClick={sign} disabled={!drawn || signed}>
          <PenLine size={16} /> {signed ? 'Proyecto aprobado' : 'Firmar como arquitecta'}
        </button>
      </div>
      {signed && (
        <p className="tiny-note light">
          Confío muchísimo en ti. Cuando te toque hacer este plano de verdad, va a ser el lugar más bonito del mundo.
        </p>
      )}
    </Card>
  );
}
