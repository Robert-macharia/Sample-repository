import { Router } from 'express';
import { requireRole } from '../middleware/rbac.js';

export type FamilyCall = {
  id: string;
  contactName: string;
  phone: string;
  scheduledAt: number; // epoch ms
  triggered?: boolean;
};

const calls: FamilyCall[] = [];

const router = Router();

router.get('/', requireRole(['patient', 'caregiver']), (_req, res) => {
  res.json(calls);
});

router.post('/', requireRole(['caregiver']), (req, res) => {
  const { contactName, phone, scheduledAt } = req.body || {};
  const call: FamilyCall = {
    id: Math.random().toString(36).slice(2),
    contactName,
    phone,
    scheduledAt: Number(scheduledAt || Date.now() + 3600_000),
  };
  calls.push(call);
  res.status(201).json(call);
});

router.post('/trigger', requireRole(['caregiver']), (req, res) => {
  const { id } = req.body || {};
  const call = calls.find(c => c.id === id);
  if (!call) return res.status(404).json({ error: 'Call not found' });
  call.triggered = true;
  res.json({ ok: true, call });
});

export default router;