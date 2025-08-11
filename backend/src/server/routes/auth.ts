import { Router } from 'express';
import { signJwt } from '../middleware/auth.js';

const router = Router();

router.post('/login', (req, res) => {
  const { name = 'User', role = 'patient' } = req.body || {};
  const id = `${Math.random().toString(36).slice(2, 10)}`;
  const token = signJwt({ id, name, role });
  res.json({ token, user: { id, name, role } });
});

router.post('/logout', (_req, res) => {
  res.json({ ok: true });
});

export default router;