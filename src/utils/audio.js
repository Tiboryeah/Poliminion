// Efectos y voces reales en public/sounds (nada sintetizado)
const url = (name) => `${import.meta.env.BASE_URL}sounds/${name}.mp3`;
const cache = {};

function load(name) {
  if (!cache[name]) {
    cache[name] = new Audio(url(name));
    cache[name].preload = 'auto';
  }
  return cache[name];
}

// Precarga los efectos cortos para que suenen al instante
export function preloadSounds() {
  ['click', 'pop', 'sparkle', 'blow', 'party', 'bello'].forEach(load);
  ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5'].forEach((n) => load(`cajita/${n}`));
}

// Baja la música mientras suena una voz o un efecto largo, y la regresa al terminar
let ducked = 0;
function duck(audio) {
  const music = document.getElementById('bg-music');
  if (!music || music.paused) return;
  if (ducked === 0) music.dataset.volume = music.volume;
  ducked += 1;
  music.volume = Number(music.dataset.volume) * 0.25;
  const restore = () => {
    ducked = Math.max(0, ducked - 1);
    if (ducked === 0) music.volume = Number(music.dataset.volume);
    audio.removeEventListener('ended', restore);
    audio.removeEventListener('pause', restore);
  };
  audio.addEventListener('ended', restore);
  audio.addEventListener('pause', restore);
}

export function sfx(name, { volume = 0.7, duckMusic = false } = {}) {
  // Un clon por reproducción: permite que el mismo sonido se encime (varias fresas seguidas)
  const audio = load(name).cloneNode();
  audio.volume = volume;
  if (duckMusic) duck(audio);
  audio.play().catch(() => {});
  return audio;
}

export const playClick = () => sfx('click', { volume: 0.5 });
export const playPop = () => sfx('pop', { volume: 0.6 });
export const playSparkle = () => sfx('sparkle', { volume: 0.55 });

// Caja musical (FluidR3, licencia MIT): las 19 fresas tocan "Happy Birthday" nota por nota
export const BIRTHDAY_TUNE = [
  'G4', 'G4', 'A4', 'G4', 'C5', 'B4',
  'G4', 'G4', 'A4', 'G4', 'D5', 'C5',
  'G4', 'G4', 'G5', 'E5', 'C5', 'B4', 'A4',
];
// Último verso ("happy birthday to you"): nota y segundo en que entra
const TUNE_FINALE = [['F5', 0], ['F5', 0.3], ['E5', 0.6], ['C5', 1.05], ['D5', 1.5], ['C5', 1.95]];

export const playNote = (note, volume = 0.55) => sfx(`cajita/${note}`, { volume, duckMusic: true });

export function playTuneFinale() {
  TUNE_FINALE.forEach(([note, at]) => setTimeout(() => playNote(note, 0.6), at * 1000));
}

// Voces originales de los minions; solo suena una a la vez
let minionVoice;
export function minionSay(clip) {
  minionVoice?.pause();
  minionVoice = sfx(clip, { volume: 0.35, duckMusic: true });
}
