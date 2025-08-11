import { Router } from 'express';
import { requireRole } from '../middleware/rbac.js';
import { summarizeJournalText } from '../services/ai/geminiService.js';

type JournalEntry = {
  id: string;
  timestamp: number;
  text?: string;
  audioUrl?: string;
  summary?: string;
};

const entries: JournalEntry[] = [];

const router = Router();

router.get('/', requireRole(['patient', 'caregiver']), (_req, res) => {
  res.json(entries);
});

router.post('/', requireRole(['patient', 'caregiver']), async (req, res, next) => {
  try {
    const { text, audioUrl } = req.body || {};
    const entry: JournalEntry = {
      id: Math.random().toString(36).slice(2),
      timestamp: Date.now(),
      text: text ? String(text) : undefined,
      audioUrl: audioUrl ? String(audioUrl) : undefined,
    };
    if (entry.text) {
      entry.summary = await summarizeJournalText(entry.text);
    }
    entries.push(entry);
    res.status(201).json(entry);
  } catch (e) {
    next(e);
  }
});

export default router;