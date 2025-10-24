// supabase mock
jest.mock('../config/supabase', () => ({
  supabase: {
    from: jest.fn(),
    auth: {
      getUser: jest.fn(),
    },
  },
}));

let mockUser: any = { id: 'user-123', email: 'test@example.com' }; // doing this approach for 401 error test; mocks can't be modified after routes are imported
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
import { supabase } from '../config/supabase';
import userRoutes from '../routes/user';
import { AppError } from '../types/errors';

// fake express app
const app = express();
app.use(express.json());
app.use('/api/user', userRoutes);

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

describe('POST /api/user/profile-settings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // reseting to default user to support 401 test
    mockUser = { id: 'user-123', email: 'test@example.com' };
  });

  it('should save user profile settings', async () => {
    const mockProfileData = {
      units: 'metric',
      equipment: [
        { name: 'barbell', oneRM: 225 },
        { name: 'dumbbells', oneRM: 50 }
      ],
      goals: ['strength', 'muscle gain'],
      constraints: ['lower back injury', 'limited time']
    };

    const mockResponse = {
      message: 'Success',
      data: null
    };

    (supabase.from as jest.Mock).mockReturnValue({
      upsert: jest.fn().mockResolvedValue({
        data: null,
        error: null,
      }),
    });

    const response = await request(app)
      .post('/api/user/profile-settings')
      .send({ profileData: mockProfileData });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockResponse);
    expect(supabase.from).toHaveBeenCalledWith('profile_settings');
  });

  it('should return 400 if profileData is missing', async () => {
    const response = await request(app)
      .post('/api/user/profile-settings')
      .send({});  // No profileData

    expect(response.status).toBe(400);
    expect(response.body.code).toBe(ErrorCode.VALIDATION_ERROR);
  });

  it('should return 401 if user is not authenticated', async () => {
    // need to clear our original auth mock near top of page
    mockUser = undefined
    // authMock.authenticate = jest.fn((req: any, res: any, next: any) => {
    //   req.user = undefined;  // to set it as undefined
    //   next();
    // });

    const response = await request(app)
      .post('/api/user/profile-settings')
      .send({ profileData: { units: 'metric' } });

    expect(response.status).toBe(401);
    expect(response.body.code).toBe(ErrorCode.UNAUTHORIZED);
    
  })

  it('should handle database errors', async () => {
    const mockProfileData = {
      units: 'metric',
      equipment: [],
      goals: [],
      constraints: []
    };

    (supabase.from as jest.Mock).mockReturnValue({
      upsert: jest.fn().mockResolvedValue({
        data: null,
        error: {
          message: 'Database connection failed',
          details: 'Connection timeout'
        },
      }),
    });

    const response = await request(app)
      .post('/api/user/profile-settings')
      .send({ profileData: mockProfileData });

    expect(response.status).toBe(500);
    expect(response.body.code).toBe(ErrorCode.DATABASE_ERROR);
  });
});