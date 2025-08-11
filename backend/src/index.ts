import dotenv from 'dotenv';
import { createServer } from 'http';
import app from './server/app.js';
import { logger } from './server/utils/logger.js';

dotenv.config();

const port = Number(process.env.PORT || 4000);
const server = createServer(app);

server.listen(port, () => {
  logger.info(`API listening on http://localhost:${port}`);
});