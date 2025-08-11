import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';

export default function MetricsChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    api.get('/api/metrics').then(r => setData(r.data)).catch(() => setData([]));
  }, []);

  return (
    <div className="card">
      <h3 className="text-xl mb-2 font-semibold">Weekly Metrics</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="steps" stroke="#E50914" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="heartRate" stroke="#58a6ff" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="h-64 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="day" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Legend />
            <Bar dataKey="hydration" fill="#22c55e" />
            <Bar dataKey="sleep" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}