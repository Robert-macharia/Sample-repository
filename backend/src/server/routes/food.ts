import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { analyzeFoodImage } from '../services/ai/geminiService.js';
import { requireRole } from '../middleware/rbac.js';

const router = Router();
const uploadDir = path.join(process.cwd(), 'backend', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });
const upload = multer({ dest: uploadDir });

router.post('/analyze', requireRole(['patient', 'caregiver']), upload.single('image'), async (req, res, next) => {
  try {
    const hint: string | undefined = req.body?.hint;
    let buffer: Buffer | null = null;
    if (req.file) {
      buffer = fs.readFileSync(req.file.path);
      fs.unlink(req.file.path, () => {});
    }
    const result = await analyzeFoodImage(buffer, hint);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

export default router;