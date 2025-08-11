import { Router } from 'express';
import { sendSms } from '../services/sms/twilioService.js';
import { requireRole } from '../middleware/rbac.js';

const router = Router();

router.post('/sms', requireRole(['caregiver']), async (req, res, next) => {
  try {
    const { to, body } = req.body || {};
    if (!to || !body) return res.status(400).json({ error: 'to and body required' });
    const result = await sendSms(String(to), String(body));
    res.json(result);
  } catch (e) {
    next(e);
  }
});

export default router;