// supabase mock
jest.mock('../config/supabase', () => ({
  supabase: {
    from: jest.fn(),
    auth: {
      getUser: jest.fn(),
    },
  },
}));
let mockUser: any = { id: 'user-123', email: 'test@example.com' };

// auth middleware mock
jest.mock('../middleware/auth', () => ({
  authenticate: (req: any, res: any, next: any) => {
    // return fake user
    req.user = mockUser;
    next();
  },
}));

import express from 'express';
import request from 'supertest';
import { ErrorCode } from '../../../shared/types/errors';
import { AppError } from '../types/errors';
import aiPlansRoutes from './ai-plans';

// fake express app
const app = express();
app.use(express.json());
app.use('/api/ai-plans/generate-workout', aiPlansRoutes);

// error handler from index.tsx
app.use((err: unknown, req: any, res: any, next: any) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
      details: err.details,
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }

  res.status(500).json({
    error: 'Internal server error',
    message: String(err),
  });
});

describe('POST /api/ai-plans/generate-workout/single', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUser = { id: 'user-123', email: 'test@example.com' };
  });

  it('should create a single AI workout plan', async () => {
    const mockRequestData = {
      workoutValueSelections: {
        focus: 'strength',
        type: 'push',
        skill: 'intermediate',
        intensity: 'moderate',
        duration: 60,
        notes: 'Focus on upper body',
      },
      userProfileMetaData: {
        age: 30,
        weight: 180,
        experience: '2 years',
      },
    };

    const mockResponse = {
      plan_id: 'plan-123',
      workout: {
        /* workout data */
      },
    };

    jest
      .spyOn(require('../services/ai-plansService'), 'single')
      .mockResolvedValue(mockResponse);

    const response = await request(app)
      .post('/api/ai-plans/generate-workout/single')
      .send(mockRequestData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockResponse);
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app)
      .post('/api/ai-plans/generate-workout/single')
      .send({
        workoutValueSelections: {
          focus: 'strength',
          // TODO more fields
        },
      });

    expect(response.status).toBe(400);
    expect(response.body.code).toBe(ErrorCode.VALIDATION_ERROR);
  });

  it('should return 400 if notes exceed 120 characters', async () => {
    const response = await request(app)
      .post('/api/ai-plans/generate-workout/single')
      .send({
        workoutValueSelections: {
          focus: 'strength',
          type: 'push',
          skill: 'intermediate',
          intensity: 'moderate',
          duration: 60,
          notes: 'a'.repeat(121), // validates up to 120 words to limit length
        },
        userProfileMetaData: { age: 30 },
      });

    expect(response.status).toBe(400);
    expect(response.body.code).toBe(ErrorCode.VALIDATION_ERROR);
  });

  it('should return 401 if user is not authenticated', async () => {
    mockUser = undefined;

    const response = await request(app)
      .post('/api/ai-plans/generate-workout/single')
      .send({
        workoutValueSelections: {
          focus: 'strength',
          type: 'push',
          skill: 'intermediate',
          intensity: 'moderate',
          duration: 60,
          notes: '',
        },
        userProfileMetaData: { age: 30 },
      });

    expect(response.status).toBe(401);
    expect(response.body.code).toBe(ErrorCode.UNAUTHORIZED);
  });
});
