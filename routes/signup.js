import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const router = express.Router();
const db = new Low(new JSONFile('db.json'));
await db.read();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const exists = db.data.users.find((u) => u.username === username);
  if (exists)
    return res.status(400).json({ success: false, message: 'User exists' });

  db.data.users.push({
    username,
    password,
    calorieGoal: 2000,
    stepGoal: 10000,
  });
  await db.write();
  res.json({ success: true });
});

export default router;
