import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { seedData } from '../src/utils/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'db.json');

// Write seed data to db.json
fs.writeFileSync(dbPath, JSON.stringify(seedData, null, 2));
console.log('Database seeded successfully!'); 