import React, { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import ActivityTimeline from './components/ActivityTimeline';
import FoodHealthChecker from './components/FoodHealthChecker';
import WeatherWidget from './components/WeatherWidget';
import SmsReminderPanel from './components/SmsReminderPanel';
import MemoryGame from './components/Games/MemoryGame';
import MusicGame from './components/Games/MusicGame';
import Storytelling from './components/Games/Storytelling';
import MedicationTracker from './components/MedicationTracker';
import Journal from './components/Journal';
import FamilyConnection from './components/FamilyConnection';
import EntertainmentScheduler from './components/EntertainmentScheduler';
import MetricsChart from './components/Charts/MetricsChart';
import { api, setAuthToken } from './services/api';

function useOnline() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    update();
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);
  return online;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<'patient' | 'caregiver'>('patient');
  const online = useOnline();

  useEffect(() => {
    // Auto-login based on selected role for demo
    api.post('/api/auth/login', { name: 'Demo', role }).then(r => {
      setToken(r.data.token);
      setAuthToken(r.data.token);
    }).finally(() => setLoading(false));
  }, [role]);

  if (loading) return <LoadingScreen />;

  return (
    <div>
      {!online && (
        <div className="bg-yellow-600 text-black text-center py-2">You are offline. Some features may be unavailable.</div>
      )}

      <header className="sticky top-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-netflix-red">Wellness</div>
        <div className="flex items-center gap-2 text-sm text-neutral-300">
          <span>Role:</span>
          <select value={role} onChange={e => setRole(e.target.value as any)} className="bg-neutral-800 rounded px-2 py-1">
            <option value="patient">patient</option>
            <option value="caregiver">caregiver</option>
          </select>
        </div>
      </header>

      <main className="p-4 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <ActivityTimeline />
        <WeatherWidget />
        <FoodHealthChecker />
        <SmsReminderPanel />
        <MedicationTracker />
        <Journal />
        <FamilyConnection />
        <EntertainmentScheduler />
        <MetricsChart />
        <div className="col-span-full grid gap-4 md:grid-cols-3">
          <MemoryGame />
          <MusicGame />
          <Storytelling />
        </div>
      </main>

      <footer className="p-4 text-center text-neutral-400">© {new Date().getFullYear()} Dementia Wellness</footer>
    </div>
  );
}