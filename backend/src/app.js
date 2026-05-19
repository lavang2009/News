import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middleware/error.js';
import { generalLimiter } from './middleware/security.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createApp = () => {
  const app = express();
  app.use(helmet({
    contentSecurityPolicy: false
  }));
  app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
  }));
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(generalLimiter);

  app.use('/uploads', express.static(path.join(__dirname, '../..', process.env.UPLOAD_DIR || 'uploads')));
  app.use('/api', routes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
};
