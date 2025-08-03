import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const router = express.Router();
const db = new Low(new JSONFile('db.json'));
await db.read();

router.get('/', (req, res) => {
  const { user, date } = req.query;
  const logs = db.data.logs[user]?.[date] || { food: [], steps: 0 };
  res.json(logs);
});

export default router;
