import { Router } from 'express';
import { getWeather } from '../services/weather/weatherService.js';
import { requireRole } from '../middleware/rbac.js';

const router = Router();

router.get('/', requireRole(['patient', 'caregiver']), async (req, res, next) => {
  try {
    const lat = Number(req.query.lat ?? '37.7749');
    const lon = Number(req.query.lon ?? '-122.4194');
    const result = await getWeather(lat, lon);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

export default router;