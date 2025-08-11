import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function MedicationTracker() {
  const [meds, setMeds] = useState<any[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get('/api/medication').then(r => setMeds(r.data));
  }, []);

  async function confirm(id: string) {
    await api.post('/api/medication/confirm', { id });
    setStatus('Confirmed intake');
    api.get('/api/medication').then(r => setMeds(r.data));
  }

  return (
    <div className="card">
      <h3 className="text-xl mb-2 font-semibold">Medication</h3>
      <ul className="space-y-2">
        {meds.map(m => (
          <li key={m.id} className="flex items-center justify-between bg-neutral-700 rounded p-2">
            <div>
              <div className="font-semibold">{m.name} • {m.dosage}</div>
              <div className="text-sm text-neutral-300">Time: {m.schedule} {m.lastConfirmedAt ? `(last confirmed ${new Date(m.lastConfirmedAt).toLocaleString()})` : ''}</div>
            </div>
            <button className="button-red" onClick={() => confirm(m.id)}>Confirm</button>
          </li>
        ))}
      </ul>
      {status && <div className="text-sm text-neutral-300 mt-2">{status}</div>}
    </div>
  );
}