import React, { useEffect, useRef, useState } from 'react';
import { api } from '../services/api';

export default function Journal() {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState<any[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    api.get('/api/journal').then(r => setEntries(r.data));
  }, []);

  async function saveText() {
    const { data } = await api.post('/api/journal', { text });
    setEntries(e => [data, ...e]);
    setText('');
  }

  async function toggleRecord() {
    if (recording) {
      mediaRecorderRef.current?.stop();
      setRecording(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (e) => chunksRef.current.push(e.data);
      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(blob);
        const { data } = await api.post('/api/journal', { audioUrl });
        setEntries(e => [data, ...e]);
      };
      mr.start();
      setRecording(true);
    }
  }

  return (
    <div className="card">
      <h3 className="text-xl mb-2 font-semibold">Journal</h3>
      <textarea className="w-full bg-neutral-700 rounded p-2" rows={3} placeholder="How are you feeling today?" value={text} onChange={e => setText(e.target.value)} />
      <div className="flex gap-2 mt-2">
        <button className="button-red" onClick={saveText} disabled={!text}>Save Text</button>
        <button className={`px-4 py-2 rounded font-semibold ${recording ? 'bg-yellow-500' : 'button-red'}`} onClick={toggleRecord}>
          {recording ? 'Stop Recording' : 'Voice Entry'}
        </button>
      </div>
      <ul className="mt-3 space-y-2">
        {entries.map(e => (
          <li key={e.id} className="bg-neutral-700 rounded p-2">
            <div className="text-sm text-neutral-300">{new Date(e.timestamp).toLocaleString()}</div>
            {e.text && <div className="mt-1">{e.text}</div>}
            {e.summary && <div className="mt-1 text-neutral-300">Summary: {e.summary}</div>}
            {e.audioUrl && <audio className="mt-1 w-full" controls src={e.audioUrl} />}
          </li>
        ))}
      </ul>
    </div>
  );
}