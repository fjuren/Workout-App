import cors from 'cors';
import dotenv from 'dotenv';
import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import workoutRoutes from './routes/workouts';
import { AppError } from './types/errors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/workouts', workoutRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// error middleware to handle AppErrors
app.use((
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
      details: err.details
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message
    });
  }

  // when none of the pre-handled errors are defined/identifies, this is the 500 fallback
  res.status(500).json({
    error: 'Internal server error',
    message: String(err)
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
