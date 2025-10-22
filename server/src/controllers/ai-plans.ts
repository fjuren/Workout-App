import { AuthRequest } from '../middleware/auth';
import * as aiPlansService from '../services/ai-plans';
import { AuthorizationError, ValidationError } from '../types/errors';

// Request a single workout from openAI with relevant parameters
export const single = async (req: AuthRequest, res: any, next: any) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(new AuthorizationError('User not authorized'));
    }
    console.log(req.body);
    // get data from FE
    const { workoutValueSelections, userProfileMetaData } = req.body;

    if (
      !workoutValueSelections.focus ||
      !workoutValueSelections.type ||
      !workoutValueSelections.skill ||
      !workoutValueSelections.intensity ||
      !workoutValueSelections.duration
      // !userProfileMetaData.userProfileMetaData
    ) {
      return next(
        new ValidationError(
          'Missing required fields: focus, type, skill, intensity, duration, userProfileMetaData'
        )
      );
    }

    if (workoutValueSelections.notes.length > 120) {
      return next(
        new ValidationError('Notes must be fewer than 120 characters long')
      );
    }

    const result = await aiPlansService.single(
      userId,
      workoutValueSelections.focus,
      workoutValueSelections.type,
      workoutValueSelections.skill,
      workoutValueSelections.intensity,
      workoutValueSelections.duration,
      workoutValueSelections.notes,
      userProfileMetaData.userProfileMetaData
    );

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
