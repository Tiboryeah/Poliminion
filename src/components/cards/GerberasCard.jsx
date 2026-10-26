import { useState } from 'react';
import { Flower2 } from 'lucide-react';
import Card from '../Card';
import { Gerbera } from '../Art';
import { playChime, playPop } from '../../utils/audio';

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

// Posiciones del ramo (en % dentro del florero)
const SPOTS = [
  [50, 8], [30, 18], [70, 18], [16, 34], [84, 34], [40, 30], [60, 30], [28, 46], [72, 46],
];

export default function GerberasCard() {
  const [planted, setPlanted] = useState(0);
  const [open, setOpen] = useState(null);

  const add = () => {
    if (planted >= BOUQUET.length) return;
    playPop();
    setOpen(planted);
    setPlanted((p) => p + 1);
    if (planted + 1 === BOUQUET.length) playChime();
  };

  return (
    <Card
      index={2}
      icon={<Flower2 size={20} />}
      title="Un ramo de gerberas"
      desc="Las flores que nunca se marchitan. Arma el ramo una por una, cada gerbera trae su razón."
    >
      <div className="bouquet">
        {BOUQUET.slice(0, planted).map((f, i) => (
          <button
            key={i}
            type="button"
            className={`bouquet-flower ${open === i ? 'active' : ''}`}
            style={{ left: `${SPOTS[i][0]}%`, top: `${SPOTS[i][1]}%` }}
            onClick={() => { playPop(); setOpen(i); }}
            aria-label={`Gerbera ${i + 1}`}
          >
            <span className="stem" />
            <Gerbera color={f.color} size={64} />
          </button>
        ))}
        <div className="vase"><span>Fresita</span></div>
      </div>
      <p className="flower-note" aria-live="polite">
        {open === null ? 'El florero está esperando su primera flor…' : BOUQUET[open].note}
      </p>
      <button type="button" className="btn" onClick={add} disabled={planted >= BOUQUET.length}>
        {planted >= BOUQUET.length ? 'Ramo completo' : `Agregar gerbera (${planted}/${BOUQUET.length})`}
      </button>
    </Card>
  );
}
