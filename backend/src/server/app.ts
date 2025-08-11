import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from './middleware/errorHandler.js';
import { authenticateUserFromJwt } from './middleware/auth.js';
import foodRouter from './routes/food.js';
import exerciseRouter from './routes/exercise.js';
import weatherRouter from './routes/weather.js';
import notificationsRouter from './routes/notifications.js';
import medicationRouter from './routes/medication.js';
import journalRouter from './routes/journal.js';
import familyRouter from './routes/family.js';
import metricsRouter from './routes/metrics.js';
import authRouter from './routes/auth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static uploads (if needed)
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Health
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'dementia-wellness-api' });
});

// Auth and current user
app.use('/api/auth', authRouter);
app.use(authenticateUserFromJwt);

// Feature routes
app.use('/api/food', foodRouter);
app.use('/api/exercise', exerciseRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/medication', medicationRouter);
app.use('/api/journal', journalRouter);
app.use('/api/family', familyRouter);
app.use('/api/metrics', metricsRouter);

// Error handler
app.use(errorHandler);

export default app;