import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function WeatherWidget() {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      api.get(`/api/weather?lat=${lat}&lon=${lon}`).then(r => setData(r.data));
    }, () => {
      api.get('/api/weather').then(r => setData(r.data));
    });
  }, []);

  return (
    <div className="card flex flex-col gap-2">
      <h3 className="text-xl font-semibold">Weather</h3>
      {!data ? (
        <div>Loading…</div>
      ) : (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-netflix-red animate-pulse shadow-glow" aria-hidden />
          <div>
            <div className="text-lg">{data.tempC}°C • {data.description}</div>
            <div className={data.suggestWalk ? 'text-green-400' : 'text-yellow-400'}>
              {data.suggestWalk ? 'Good time for a short walk' : 'Better to stay indoors for now'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}