import React, { useEffect, useState } from 'react';

const emojis = ['🍎','🍌','🍇','🍊','🍉','🍒'];
const deck = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

type Card = { id: number; emoji: string; flipped: boolean; matched: boolean };

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(deck.map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false })));
  const [selection, setSelection] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (selection.length === 2) {
      const [a, b] = selection;
      setMoves(m => m + 1);
      setTimeout(() => {
        setCards(prev => {
          const ca = prev[a];
          const cb = prev[b];
          if (ca.emoji === cb.emoji) {
            const next = prev.map(c => c.id === ca.id || c.id === cb.id ? { ...c, matched: true } : c);
            return next;
          }
          return prev.map(c => c.id === ca.id || c.id === cb.id ? { ...c, flipped: false } : c);
        });
        setSelection([]);
      }, 700);
    }
  }, [selection]);

  function flip(i: number) {
    setCards(prev => prev.map((c, idx) => idx === i && !c.flipped && !c.matched ? { ...c, flipped: true } : c));
    setSelection(sel => sel.length < 2 ? [...sel, i] : sel);
  }

  const won = cards.every(c => c.matched);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold">Memory Game</h3>
        <div className="text-sm text-neutral-300">Moves: {moves}</div>
      </div>
      {won ? (
        <div className="text-green-400">Great job! You matched all cards.</div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {cards.map((c, i) => (
            <button key={c.id} className={`h-16 rounded flex items-center justify-center text-2xl ${c.flipped || c.matched ? 'bg-neutral-600' : 'bg-neutral-800'}`} onClick={() => flip(i)} aria-label={c.flipped ? c.emoji : 'Face down card'}>
              {(c.flipped || c.matched) ? c.emoji : '❓'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}