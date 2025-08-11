import React, { useState } from 'react';
import { api } from '../services/api';

export default function FoodHealthChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [hint, setHint] = useState('');
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    if (!file && !hint) return;
    setLoading(true);
    setResult(null);
    const form = new FormData();
    if (file) form.append('image', file);
    if (hint) form.append('hint', hint);
    try {
      const { data } = await api.post('/api/food/analyze', form);
      setResult(data);
    } catch (e) {
      setResult({ error: 'Analysis failed' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h3 className="text-xl mb-2 font-semibold">Food Health Checker</h3>
      <div className="flex flex-col gap-3">
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
        <input className="bg-neutral-700 rounded p-2" placeholder="Describe food (optional)" value={hint} onChange={e => setHint(e.target.value)} />
        <button onClick={analyze} className="button-red w-40" disabled={loading}>
          {loading ? 'Analyzing…' : 'Analyze'}
        </button>
        {result && !result.error && (
          <div className="mt-2 text-sm">
            <div>Calories est.: <b>{result.caloriesEstimate}</b></div>
            <div>Overall score: <b>{result.overallScore}</b>/100</div>
            <div className="mt-1">Sugar: {result.sugar} | Salt: {result.salt} | Fiber: {result.fiber} | Protein: {result.protein}</div>
            <ul className="list-disc ml-5 mt-2 text-neutral-300">
              {(result.notes || []).map((n: string, i: number) => (<li key={i}>{n}</li>))}
            </ul>
          </div>
        )}
        {result && result.error && <div className="text-red-400">{result.error}</div>}
      </div>
    </div>
  );
}