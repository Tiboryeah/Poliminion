import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import Card from '../Card';
import { Nigiri } from '../Art';
import { playChime, playClick } from '../../utils/audio';

const MENU = [
  'Philadelphia roll',
  'Roll de salmón',
  'Tempura roll',
  'Nigiri de salmón',
  'Kushiage',
  'Edamames',
  'Gyozas',
  'Mochi de fresa',
];

export default function SushitoCard({ onRain }) {
  const [order, setOrder] = useState([]);
  const [ticket, setTicket] = useState(false);

  const toggle = (item) => {
    playClick();
    setOrder((o) => (o.includes(item) ? o.filter((x) => x !== item) : o.length < 4 ? [...o, item] : o));
  };

  const confirm = () => {
    playChime();
    setTicket(true);
    onRain('maki');
  };

  return (
    <Card
      index={4}
      icon={<UtensilsCrossed size={20} />}
      title="Mesa para dos en Sushito"
      desc="Tu restaurante favorito. Arma tu orden (hasta 4 cosas) y canjea tu vale."
    >
      {!ticket ? (
        <>
          <div className="sushi-hero"><Nigiri size={96} /></div>
          <div className="chips">
            {MENU.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip ${order.includes(item) ? 'on' : ''}`}
                onClick={() => toggle(item)}
                aria-pressed={order.includes(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <button type="button" className="btn" onClick={confirm} disabled={order.length === 0}>
            {order.length === 0 ? 'Elige algo rico' : `Pedir (${order.length})`}
          </button>
        </>
      ) : (
        <div className="ticket">
          <div className="ticket-head">
            <strong>SUSHITO</strong>
            <span>Orden #19 · 26/10/2026</span>
          </div>
          <ul>
            {order.map((item) => <li key={item}><span>1×</span>{item}</li>)}
          </ul>
          <div className="ticket-total">
            <span>Total</span><strong>Invita Tibo</strong>
          </div>
          <p className="ticket-foot">Vale por una salida a Sushito. Válido cuando tú quieras, sin fecha de vencimiento.</p>
          <button type="button" className="link-btn" onClick={() => { setTicket(false); setOrder([]); }}>
            Cambiar mi orden
          </button>
        </div>
      )}
    </Card>
  );
}
