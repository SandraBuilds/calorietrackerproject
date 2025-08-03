import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const router = express.Router();
const db = new Low(new JSONFile('db.json'));
await db.read();

router.post('/', (req, res) => {
  const { username, password } = req.body;
  const user = db.data.users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

export default router;
