import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const router = express.Router();
const db = new Low(new JSONFile('db.json'));
await db.read();

router.post('/', async (req, res) => {
  const { user, calorieGoal, stepGoal } = req.body;
  const u = db.data.users.find((u) => u.username === user);
  if (u) {
    u.calorieGoal = calorieGoal;
    u.stepGoal = stepGoal;
    await db.write();
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false });
  }
});

export default router;
