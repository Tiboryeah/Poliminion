import { useState } from 'react';
import { Gamepad2, Crown } from 'lucide-react';
import Card from '../Card';
import { playFanfare, playSwoosh } from '../../utils/audio';

export default function FortniteCard({ onRain }) {
  const [phase, setPhase] = useState('bus'); // bus → falling → victory

  const jump = () => {
    playSwoosh();
    setPhase('falling');
    setTimeout(() => {
      playFanfare();
      setPhase('victory');
      onRain('star');
    }, 1600);
  };

  return (
    <Card
      index={5}
      icon={<Gamepad2 size={20} />}
      title="Squad de dos"
      desc="Las partidas de Fortnite contigo son de mis cosas favoritas, sobre todo por cómo te ríes."
      tone="navy"
    >
      <div className={`fn-stage ${phase}`}>
        {phase !== 'victory' && (
          <>
            <div className="bus" aria-hidden="true">
              <span className="bus-body" />
              <span className="balloon" />
            </div>
            <div className="glider" aria-hidden="true">
              <span className="glider-wing" />
              <span className="glider-pilot">F</span>
            </div>
          </>
        )}
        {phase === 'victory' && (
          <div className="victory">
            <Crown size={30} />
            <span className="victory-num">#1</span>
            <strong>VICTORIA MAGISTRAL</strong>
            <div className="stats">
              <div><span>Squad</span><b>Fresita + Tibo</b></div>
              <div><span>MVP</span><b>Tu risa</b></div>
              <div><span>Nivel</span><b>19</b></div>
            </div>
          </div>
        )}
      </div>
      {phase === 'bus' && (
        <button type="button" className="btn btn-light" onClick={jump}>Saltar del autobús</button>
      )}
      {phase === 'victory' && (
        <>
          <p className="tiny-note light">
            Ganemos o perdamos, tu risa en el chat de voz es de las más bonitas del mundo.
          </p>
          <button type="button" className="link-btn light" onClick={() => setPhase('bus')}>Otra partida</button>
        </>
      )}
    </Card>
  );
}
