import { Router } from 'express';
import { requireRole } from '../middleware/rbac.js';

const router = Router();

router.get('/', requireRole(['patient', 'caregiver']), (_req, res) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = days.map((d, i) => ({
    day: d,
    steps: 3000 + i * 1200,
    hydration: 5 + (i % 3),
    sleep: 6 + (i % 4) * 0.5,
    heartRate: 65 + (i % 5) * 3,
  }));
  res.json(data);
});

export default router;