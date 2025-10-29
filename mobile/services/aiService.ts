import { AiPlan } from '@shared/index';
import { apiEndpoints } from './api/apiEndpoints';
import { apiAuthedCall } from './api/client';

export const aiWorkoutData = async (options: RequestInit): Promise<AiPlan> => {
  const data = await apiAuthedCall<AiPlan>(
    apiEndpoints.aiPlans.generateSingle,
    options
  );
  return data;
};
