import { useState } from 'react';
import { Minion, Gerbera, Strawberry } from './Art';
import { playPop, minionSay } from '../utils/audio';

export default function Landing({ onStart }) {
  const [leaving, setLeaving] = useState(false);

  const open = () => {
    playPop();
    minionSay('bello');
    setLeaving(true);
    setTimeout(onStart, 750);
  };

  return (
    <section id="landing" className={leaving ? 'leaving' : ''}>
      <div className="landing-card">
        <Gerbera className="landing-flower lf-1" color="#ff8c42" size={78} />
        <Gerbera className="landing-flower lf-2" color="#ff6fa3" size={62} />
        <Strawberry className="landing-flower lf-3" size={46} />

        <div className="landing-topline">
          <span>26 · 10 · 2026</span>
          <span>Edición 19</span>
        </div>

        <div className="landing-minion">
          <Minion waving />
        </div>

        <span className="landing-pill">Para Poliminion, con mucho cariño</span>

        <h1 className="landing-title">
          ¡Feliz cumpleaños,<br /><span>Fresita!</span>
        </h1>

        <p className="landing-subtitle">
          Minions, gerberas, fresas, sushi, planos de una casa y una canción que dice "ok, ok".
          Todo lo que te gusta, escondido en un solo lugar.
        </p>

        <button type="button" className="goggle-btn" onClick={open} aria-label="Abrir el regalo de Fresita">
          <span className="goggle-ring"><span className="goggle-eye" /></span>
        </button>
        <span className="landing-hint">Toca el gogle para entrar</span>

        <span className="landing-from">De <strong>Tibo</strong> · sube el volumen</span>
      </div>
    </section>
  );
}
