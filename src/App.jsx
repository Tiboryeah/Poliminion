import { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import FloatingBackground from './components/FloatingBackground';
import Landing from './components/Landing';
import Header from './components/Header';
import Rain, { makeDrops } from './components/Rain';
import { Gerbera, Minion, Strawberry } from './components/Art';
import MinionCard from './components/cards/MinionCard';
import GerberasCard from './components/cards/GerberasCard';
import FresasCard from './components/cards/FresasCard';
import ArquitectaCard from './components/cards/ArquitectaCard';
import SushitoCard from './components/cards/SushitoCard';
import FortniteCard from './components/cards/FortniteCard';
import OkOkCard from './components/cards/OkOkCard';
import CakeCard from './components/cards/CakeCard';
import { playChime } from './utils/audio';

// Pon el mp3 en public/music/ok-ok.mp3 y sonará solito al entrar
const SONG = {
  title: 'OK OK',
  artist: 'Kanye West',
  url: `${import.meta.env.BASE_URL}music/ok-ok.mp3`,
  fallback: 'https://www.youtube.com/results?search_query=Kanye+West+OK+OK',
};

export default function App() {
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [missing, setMissing] = useState(false);
  const [volume, setVolume] = useState(40);
  const [drops, setDrops] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.4;
  }, []);

  const play = () => {
    const audio = audioRef.current;
    if (!audio || missing) return;
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  const togglePlay = () => {
    if (missing) {
      window.open(SONG.fallback, '_blank', 'noopener');
      return;
    }
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      play();
    }
  };

  const changeVolume = (v) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v / 100;
  };

  const rain = (kind = 'mix') => {
    const batch = makeDrops(kind);
    setDrops((d) => [...d, ...batch]);
    setTimeout(() => {
      const ids = new Set(batch.map((b) => b.id));
      setDrops((d) => d.filter((x) => !ids.has(x.id)));
    }, 6500);
  };

  const celebrate = () => {
    playChime();
    rain('mix');
  };

  const start = () => {
    setStarted(true);
    play();
    setTimeout(() => rain('mix'), 450);
  };

  return (
    <>
      <FloatingBackground />

      {!started && <Landing onStart={start} />}

      {started && (
        <div className="page">
          <Header
            song={SONG}
            isPlaying={isPlaying}
            volume={volume}
            missing={missing}
            onTogglePlay={togglePlay}
            onVolume={changeVolume}
            onCelebrate={celebrate}
          />

          <main className="container">
            <section className="hero">
              <div className="hero-copy">
                <span className="kicker"><Sparkles size={14} /> 26 de octubre · 19 años</span>
                <h1>
                  Hoy cumple años<br />la chica más <em>bonita</em><br />del mundo.
                </h1>
                <p>
                  Fresita, Poliminion, futura arquitecta: hice este rincón para ti, con todo lo que te gusta
                  y algunas cosas que quería decirte. Recórrelo con calma y toca todo, casi todo hace algo.
                </p>
              </div>
              <div className="hero-art" aria-hidden="true">
                <span className="hero-sun" />
                <Gerbera className="hero-flower hf-1" color="#ff8c42" size={92} />
                <Gerbera className="hero-flower hf-2" color="#ff6fa3" size={70} />
                <Strawberry className="hero-flower hf-3" size={50} />
                <div className="hero-minion"><Minion mood="love" waving /></div>
                <span className="hero-19">19</span>
              </div>
            </section>

            <section className="letter">
              <span className="letter-tape" aria-hidden="true" />
              <p className="letter-hi">Querida Fresita:</p>
              <p>
                Diecinueve años y sigues siendo la persona que más me hace sonreír sin intentarlo. Me encanta
                cómo te emocionan los minions, cómo eliges gerberas antes que cualquier otra flor, que tu color sea el
                amarillo pastel y que el azul marino te quede tan bien.
              </p>
              <p>
                Me encanta jugar Fortnite contigo, aunque la verdad lo que más me gusta es escucharte reír. Tu risa es
                de las más bonitas del mundo y no lo digo por decir.
              </p>
              <p>
                Estás estudiando arquitectura y estoy seguro de que vas a ser la mejor arquitecta del mundo. Tanto,
                que ya te asigné un proyecto: <strong>nuestra casa</strong>. Confío muchísimo en ti.
              </p>
              <p className="letter-sign">Feliz cumpleaños. — Tibo</p>
            </section>

            <div className="section-head">
              <span className="kicker">Colección · 01 — 08</span>
              <h2>El mundo de <em>Poliminion</em></h2>
              <p>Ocho rincones interactivos. Algunos tienen sorpresas al final.</p>
            </div>

            <div className="grid">
              <MinionCard onRain={rain} />
              <GerberasCard />
              <FresasCard onRain={rain} />
              <SushitoCard onRain={rain} />
              <FortniteCard onRain={rain} />
              <ArquitectaCard />
              <OkOkCard song={SONG} isPlaying={isPlaying} missing={missing} onTogglePlay={togglePlay} />
              <CakeCard onRain={rain} />
            </div>

            <aside className="certainty">
              <span className="kicker">Una certeza para guardar</span>
              <p>
                “Vas a ser la mejor arquitecta del mundo. Y la casa que diseñes va a ser mi lugar favorito,
                aunque lo mejor de esa casa vas a ser tú.”
              </p>
              <span className="certainty-sign">— Tibo</span>
            </aside>

            <footer className="footer">
              <div className="footer-flowers" aria-hidden="true">
                <Gerbera color="#ff8c42" size={40} />
                <Strawberry size={32} />
                <Gerbera color="#ff6fa3" size={40} />
              </div>
              <p>Hecho a mano para <strong>Fresita</strong>, con muchísimo cariño de <strong>Tibo</strong>.</p>
              <span>26 · 10 · 2026 · Edición 19</span>
            </footer>
          </main>
        </div>
      )}

      <audio
        ref={audioRef}
        src={SONG.url}
        preload="auto"
        loop
        onError={() => { setMissing(true); setIsPlaying(false); }}
      />

      <Rain drops={drops} />
    </>
  );
}
