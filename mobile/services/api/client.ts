import { supabase } from '@/config/supabase';
import { getUserErrorMessage } from '@/utils/errorMessages';
import { ErrorCode } from '@shared/types/errors';
import { ApiError } from './ApiError';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

async function getAuthToken(): Promise<string> {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session?.access_token) {
    throw new ApiError(
      ErrorCode.TOKEN_EXPIRED,
      401,
      'Your session has expired. Please log in again.' // TODO import client-facing messaging
    );
  }

  return data.session.access_token;
}

// calls api with athentication
export async function apiAuthedCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  console.log('OPTIONS', options);
  try {
    // Get auth token to ensure authenticated request
    const authToken = await getAuthToken();

    // BELOW SERVER ERROR LIKELY BROKE THIS FETCH. WHY DIDN'T IT CATCH PROPERLY?? DIALOG IS SHOWING 'WE'RE HAVING TROUBLE CONNECTING TO OUR SERVICES' WHICH IS WRONG
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
        ...options?.headers,
      },
      ...options,
    });

    const responseData = await response.json();
    // console.log(responseData.code);
    console.log(response);

    if (!response.ok) {
      // fyi backend usually returns: { error: { code, message, details } }
      // optionally just: { code, message, details }
      const errorData = responseData.error || responseData;
      console.log(errorData);

      throw new ApiError(
        errorData.code || ErrorCode.INTERNAL_SERVER_ERROR,
        response.status,
        errorData.message ||
          getUserErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR),
        errorData.details
      );
    }

    return responseData;
  } catch (error) {
    // If it's already an ApiError, rethrow it
    if (error instanceof ApiError) {
      throw error;
    }

    // error maybe due to network or something else unexpected
    throw new ApiError(
      ErrorCode.EXTERNAL_API_ERROR,
      0,
      getUserErrorMessage(ErrorCode.EXTERNAL_API_ERROR)
    );
  }
}
