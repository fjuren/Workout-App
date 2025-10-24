import { AuthRequest } from '../middleware/auth';
import * as userService from '../services/userService';
import { UnauthorizedError, ValidationError } from '../types/errors';

// Get user profile settings for authenticated user
// export const getProfileSettings = async (
//   req: AuthRequest,
//   res: any,
//   next: any
// ) => {
//   try {
//     const userId = req.user?.id;

//     if (!userId) {
//       return next(new AuthorizationError('User not authorized'));
//     }

//     const result = await userService.getProfileSettings(userId);

//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// Save profile settings
export const saveProfileSettings = async (
  req: AuthRequest,
  res: any,
  next: any
) => {
  try {
    const { profileData } = req.body;

    if (!profileData) {
      return next(
        new ValidationError(
          'Soemthing went wrong with the user profile settings submission'
        )
      );
    }

    const userId = req.user?.id;

    if (!userId) {
      return next(new UnauthorizedError('User not authorized'));
    }

    const result = await userService.saveProfileSettings(userId, profileData);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
