import React, { useState } from 'react';
import { api } from '../services/api';

export default function SmsReminderPanel() {
  const [to, setTo] = useState('');
  const [water, setWater] = useState(true);
  const [sleep, setSleep] = useState(false);
  const [meds, setMeds] = useState(true);
  const [status, setStatus] = useState('');

  async function sendTest() {
    try {
      const body = `Reminders: ${[water && 'water', sleep && 'sleep', meds && 'meds'].filter(Boolean).join(', ') || 'none'}`;
      const res = await api.post('/api/notifications/sms', { to, body });
      setStatus(`Sent (sid: ${res.data.sid})`);
    } catch (e: any) {
      setStatus(e?.response?.data?.error || 'Failed to send');
    }
  }

  return (
    <div className="card">
      <h3 className="text-xl mb-2 font-semibold">SMS Reminders</h3>
      <div className="flex flex-col gap-2">
        <input className="bg-neutral-700 rounded p-2" placeholder="Recipient phone" value={to} onChange={e => setTo(e.target.value)} />
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2"><input type="checkbox" checked={water} onChange={e => setWater(e.target.checked)} /> Water</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={sleep} onChange={e => setSleep(e.target.checked)} /> Sleep</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={meds} onChange={e => setMeds(e.target.checked)} /> Meds</label>
        </div>
        <button className="button-red w-40" onClick={sendTest}>Send Test</button>
        {status && <div className="text-sm text-neutral-300">{status}</div>}
      </div>
    </div>
  );
}