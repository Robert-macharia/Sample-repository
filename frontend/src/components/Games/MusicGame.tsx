import React, { useState } from 'react';

export default function MusicGame() {
  const [playing, setPlaying] = useState(false);
  const samples = [
    'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg',
    'https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg'
  ];

  function playRandom() {
    const audio = new Audio(samples[Math.floor(Math.random() * samples.length)]);
    setPlaying(true);
    audio.onended = () => setPlaying(false);
    audio.play();
  }

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-2">Music Activity</h3>
      <p className="text-sm text-neutral-300 mb-2">Listen to a short sound and describe what it reminds you of.</p>
      <button className="button-red" onClick={playRandom} disabled={playing}>{playing ? 'Playing…' : 'Play Sound'}</button>
    </div>
  );
}