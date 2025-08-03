import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const router = express.Router();
const db = new Low(new JSONFile('db.json'));
await db.read();

router.post('/', async (req, res) => {
  const { user, steps, date } = req.body;
  const logDate = date || new Date().toISOString().split('T')[0];
  db.data.logs[user] = db.data.logs[user] || {};
  db.data.logs[user][logDate] = db.data.logs[user][logDate] || {
    food: [],
    steps: 0,
  };

  db.data.logs[user][logDate].steps += steps;
  await db.write();
  res.json({ success: true });
});

export default router;
