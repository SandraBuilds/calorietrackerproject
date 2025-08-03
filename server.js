import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import foodRoutes from './routes/food.js';
import stepRoutes from './routes/steps.js';
import todayRoutes from './routes/today.js';
import historyRoutes from './routes/history.js';
import loginRoutes from './routes/login.js';
import signupRoutes from './routes/signup.js';
import goalRoutes from './routes/goals.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/food', foodRoutes);
app.use('/api/steps', stepRoutes);
app.use('/api/today', todayRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/goals', goalRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
