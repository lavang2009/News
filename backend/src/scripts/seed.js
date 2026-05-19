import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createDefaultData } from '../data/defaultData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../data/db.json');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });
fs.writeFileSync(dbPath, JSON.stringify(createDefaultData(), null, 2), 'utf-8');
console.log('Seeded db.json successfully.');
