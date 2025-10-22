import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import aiPlansRoutes from './routes/ai-plans';
import workoutRoutes from './routes/workouts';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

// Middleware
// see /src/middleware for others
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      // allows requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(errorHandler);

// Routes
console.log('🚀 setting up routes');
app.use('/api/workouts', workoutRoutes);
app.use('/api/ai-plans/generate-workout', aiPlansRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
