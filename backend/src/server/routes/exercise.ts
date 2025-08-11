import { Router } from 'express';
import { requireRole } from '../middleware/rbac.js';

type ExerciseEntry = {
  id: string;
  timestamp: number;
  type: string; // walk, stretch, game, etc.
  durationMin: number;
  notes?: string;
};

const entries: ExerciseEntry[] = [];

const router = Router();

router.get('/log', requireRole(['patient', 'caregiver']), (req, res) => {
  res.json(entries);
});

router.post('/log', requireRole(['patient', 'caregiver']), (req, res) => {
  const { type, durationMin, notes } = req.body || {};
  const entry: ExerciseEntry = {
    id: Math.random().toString(36).slice(2),
    timestamp: Date.now(),
    type: String(type || 'walk'),
    durationMin: Number(durationMin || 15),
    notes: notes ? String(notes) : undefined,
  };
  entries.push(entry);
  res.status(201).json(entry);
});

export default router;