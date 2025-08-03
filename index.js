// index.js (server)

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 4000;

// These lines are needed to use __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbPath = path.join(__dirname, 'db.json');

// Read from JSON file
function readDB() {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
}

// Write to JSON file
function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Endpoints
app.get('/api/food', (req, res) => {
  const db = readDB();
  res.json(db.food || []);
});

app.post('/api/food', (req, res) => {
  const db = readDB();
  db.food = db.food || [];
  db.food.push(req.body);
  writeDB(db);
  res.status(201).json({ success: true });
});
app.get('/', (req, res) => {
  res.send('CalorieCare API is running!');
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
