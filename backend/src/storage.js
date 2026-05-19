import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createDefaultData } from './data/defaultData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../data');
const dbPath = path.join(dataDir, 'db.json');

const ensure = () => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(createDefaultData(), null, 2), 'utf-8');
  }
};

ensure();

export const loadDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
export const saveDB = (db) => fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');

export const nextId = (items = []) => items.reduce((m, item) => Math.max(m, Number(item.id) || 0), 0) + 1;

export const findById = (items = [], id) => items.find((item) => String(item.id) === String(id));

export const findBySlug = (items = [], slug) => items.find((item) => item.slug === slug);

export const normalizePagination = ({ page = 1, limit = 10 }) => {
  const p = Math.max(1, Number(page) || 1);
  const l = Math.max(1, Math.min(50, Number(limit) || 10));
  return { page: p, limit: l, offset: (p - 1) * l };
};
