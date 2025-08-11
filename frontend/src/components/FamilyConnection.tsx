import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function FamilyConnection() {
  const [calls, setCalls] = useState<any[]>([]);
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState(() => new Date(Date.now() + 3600_000).toISOString().slice(0, 16));

  useEffect(() => {
    api.get('/api/family').then(r => setCalls(r.data));
  }, []);

  async function schedule() {
    const scheduledAt = new Date(time).getTime();
    const { data } = await api.post('/api/family', { contactName, phone, scheduledAt });
    setCalls(c => [data, ...c]);
    setContactName('');
    setPhone('');
  }

  async function trigger(id: string) {
    await api.post('/api/family/trigger', { id });
    api.get('/api/family').then(r => setCalls(r.data));
  }

  return (
    <div className="card">
      <h3 className="text-xl mb-2 font-semibold">Family Connection</h3>
      <div className="flex flex-col gap-2">
        <input className="bg-neutral-700 rounded p-2" placeholder="Contact name" value={contactName} onChange={e => setContactName(e.target.value)} />
        <input className="bg-neutral-700 rounded p-2" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <input className="bg-neutral-700 rounded p-2" type="datetime-local" value={time} onChange={e => setTime(e.target.value)} />
        <button className="button-red w-40" onClick={schedule}>Schedule Call</button>
      </div>
      <ul className="mt-3 space-y-2">
        {calls.map(c => (
          <li key={c.id} className="bg-neutral-700 rounded p-2 flex items-center justify-between">
            <div>
              <div className="font-semibold">{c.contactName} • {c.phone}</div>
              <div className="text-sm text-neutral-300">{new Date(c.scheduledAt).toLocaleString()} {c.triggered ? '(triggered)' : ''}</div>
            </div>
            {!c.triggered && <button className="button-red" onClick={() => trigger(c.id)}>Trigger</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}