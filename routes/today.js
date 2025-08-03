import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const router = express.Router();
const db = new Low(new JSONFile('db.json'));
await db.read();

router.get('/', (req, res) => {
  const { user } = req.query;
  const date = new Date().toISOString().split('T')[0];
  const logs = db.data.logs[user]?.[date] || { food: [], steps: 0 };
  const userInfo = db.data.users.find((u) => u.username === user);
  const totalCalories = logs.food.reduce((sum, f) => sum + f.calories, 0);

  res.json({
    totalCalories,
    steps: logs.steps,
    remainingCalories: userInfo ? userInfo.calorieGoal - totalCalories : 0,
    calorieGoal: userInfo?.calorieGoal || 2000,
    stepGoal: userInfo?.stepGoal || 10000,
  });
});

export default router;
