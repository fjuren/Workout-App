import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
// import workoutRoutes from './routes/workouts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/workouts', workoutRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
