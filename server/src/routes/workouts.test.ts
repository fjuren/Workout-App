// supabase mock
jest.mock('../config/supabase', () => ({
  supabase: {
    from: jest.fn(),
    auth: {
      getUser: jest.fn(),
    },
  },
}));

// auth middleware mock
jest.mock('../middleware/auth', () => ({
  authenticate: (req: any, res: any, next: any) => {
    // return fake user
    req.user = { id: 'user-123', email: 'test@example.com' };
    next();
  },
}));

import express from 'express';
import request from 'supertest';
import { mockAiApiResponse } from '../../../shared/mockData';
import { ErrorCode } from '../../../shared/types/errors';
import { supabase } from '../config/supabase';
import { AppError } from '../types/errors';
import workoutRoutes from './workouts';

// fake express app
const app = express();
app.use(express.json());
app.use('/api/workouts', workoutRoutes);

// error handler from index.tsx
app.use((err: unknown, req: any, res: any, next: any) => {
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
  
  res.status(500).json({
    error: 'Internal server error',
    message: String(err)
  });
});

describe('GET /api/workouts/quick-workouts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all workouts for authenticated user', async () => {

    const mockWorkouts = [
      {
        id: '1',
        user_id: 'user-123',
        name: 'Leg Day',
        exercises: ['squats', 'lunges'],
        total_time: 45,
        complete: false,
      },
      {
        id: '2',
        user_id: 'user-123',
        name: 'Upper Body',
        exercises: ['bench press', 'rows'],
        total_time: 60,
        complete: true,
      },
    ];

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({
          data: mockWorkouts,
          error: null,
        }),
      }),
    });

    const response = await request(app).get('/api/workouts/quick-workouts');    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({all_quick_workouts: mockWorkouts});
  });

  it('should throw a database 500 error if supabase returns an error', async () => {

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({
          data: '',
          error: {message: 'error message received'},
        }),
      }),
    });

    const response = await request(app).get('/api/workouts/quick-workouts');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
        code: ErrorCode.DATABASE_ERROR,
        details: {
            original: "error message received"
        },
        error: 'Failed to fetch user quick workouts',
    });
  })

});

  // create constance of the full api resonse and of the single mocked week
  const mockFullPlan = mockAiApiResponse; 
  const mockWeek = mockAiApiResponse.plan_json.weeks[0];

  // What the database returns after inserting
  const mockInsertedWorkout = {
    id: '1',
    user_id: 'user-123',
    ...mockWeek, 
    created_at: new Date().toISOString(),
  };

describe('POST /api/workouts/accept-workout', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Should create a new workout for an authenticated user', async () => {

    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: mockInsertedWorkout,
            error: null
          })
        })
      })
    });

    const response = await request(app)
      .post('/api/workouts/accept-workout')
      .send({
        aiGeneratedPlan: mockFullPlan,
        generatedWorkout: mockWeek,
      });


    expect(response.status).toBe(201);
})

    it('Should thow a database 500 error if supabase throws an error', async () => {

    (supabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
                single: jest.fn().mockResolvedValue({
                    data: null,
                    error: {message: 'error creating data sorry'}
                })
            })
        })
    })

    const response = await request(app).post('/api/workouts/accept-workout').send({
        aiGeneratedPlan: mockFullPlan,
        generatedWorkout: mockWeek,
    })

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
        error: 'Failed to add the AI plan to the db',
        code: ErrorCode.DATABASE_ERROR,
        details: {
            original: "error creating data sorry"
        }
    });
})
})