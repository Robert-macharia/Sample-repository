import React, { useEffect, useMemo, useState } from 'react';

function hoursRange() {
  return Array.from({ length: 24 }, (_, i) => i);
}

export default function ActivityTimeline() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const currentHour = now.getHours();

  const activities = useMemo(() => ({
    7: 'Wake up & hydration',
    8: 'Medication',
    9: 'Walk outside',
    12: 'Lunch',
    15: 'Memory game',
    18: 'Dinner',
    20: 'Medication',
  }), []);

  return (
    <div className="card">
      <h3 className="text-xl mb-2 font-semibold">Today</h3>
      <div className="max-h-64 overflow-y-auto pr-2">
        {hoursRange().map(h => {
          const label = activities[h as keyof typeof activities];
          const isCurrent = h === currentHour;
          return (
            <div key={h} className={`flex items-center gap-3 py-2 ${isCurrent ? 'bg-neutral-700 rounded' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-netflix-red shadow-glow' : 'bg-neutral-600'}`} />
              <div className="w-16 text-neutral-300">{String(h).padStart(2, '0')}:00</div>
              <div className="flex-1">{label || '—'}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}