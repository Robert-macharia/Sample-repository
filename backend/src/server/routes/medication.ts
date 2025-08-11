import { Router } from 'express';
import { requireRole } from '../middleware/rbac.js';

type MedicationItem = {
  id: string;
  name: string;
  dosage: string;
  schedule: string; // e.g. '08:00', '20:00'
  lastConfirmedAt?: number;
};

const meds: MedicationItem[] = [
  { id: 'm1', name: 'Donepezil', dosage: '5mg', schedule: '08:00' },
  { id: 'm2', name: 'Memantine', dosage: '10mg', schedule: '20:00' },
];

const router = Router();

router.get('/', requireRole(['patient', 'caregiver']), (_req, res) => {
  res.json(meds);
});

router.post('/', requireRole(['caregiver']), (req, res) => {
  const { name, dosage, schedule } = req.body || {};
  const item: MedicationItem = { id: Math.random().toString(36).slice(2), name, dosage, schedule };
  meds.push(item);
  res.status(201).json(item);
});

router.post('/confirm', requireRole(['patient', 'caregiver']), (req, res) => {
  const { id } = req.body || {};
  const med = meds.find(m => m.id === id);
  if (!med) return res.status(404).json({ error: 'Medication not found' });
  med.lastConfirmedAt = Date.now();
  res.json({ ok: true, med });
});

export default router;