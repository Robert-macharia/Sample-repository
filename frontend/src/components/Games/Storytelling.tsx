import React, { useState } from 'react';

const prompts = [
  'Tell me about your favorite holiday.',
  'What is a song that brings back memories? Why?',
  'Describe a memorable walk you took.',
];

export default function Storytelling() {
  const [i, setI] = useState(0);
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold">Storytelling</h3>
        <button className="button-red" onClick={() => setI((i + 1) % prompts.length)}>New Prompt</button>
      </div>
      <div className="text-neutral-200">{prompts[i]}</div>
    </div>
  );
}