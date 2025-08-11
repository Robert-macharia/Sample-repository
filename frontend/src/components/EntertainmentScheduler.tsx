import React, { useEffect, useState } from 'react';

export default function EntertainmentScheduler() {
  const [items, setItems] = useState<{ id: string; title: string; time: string }[]>(() => {
    const saved = localStorage.getItem('entertainment');
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState('');
  const [time, setTime] = useState(() => new Date(Date.now() + 3600_000).toISOString().slice(0, 16));

  useEffect(() => {
    localStorage.setItem('entertainment', JSON.stringify(items));
  }, [items]);

  function add() {
    setItems(prev => [{ id: Math.random().toString(36).slice(2), title, time }, ...prev]);
    setTitle('');
  }

  return (
    <div className="card">
      <h3 className="text-xl mb-2 font-semibold">Entertainment Reminders</h3>
      <div className="flex flex-col gap-2">
        <input className="bg-neutral-700 rounded p-2" placeholder="TV show / Radio program" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="bg-neutral-700 rounded p-2" type="datetime-local" value={time} onChange={e => setTime(e.target.value)} />
        <button className="button-red w-40" onClick={add}>Add Reminder</button>
      </div>
      <ul className="mt-3 space-y-2">
        {items.map(i => (
          <li key={i.id} className="bg-neutral-700 rounded p-2">
            <div className="font-semibold">{i.title}</div>
            <div className="text-sm text-neutral-300">{new Date(i.time).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}