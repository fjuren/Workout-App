import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleApiError } from '../utils/errorHandler';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

// Helper function to make authenticated requests
export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  try {
    // Get auth token
    const token = await AsyncStorage.getItem('access_token');

    // Build headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add auth token if exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Make request
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Parse response
    const data = await response.json();

    // Handle errors
    if (!response.ok) {
      const apiError = handleApiError({ response: { data } });
      throw apiError;
    }

    return data;
  } catch (error) {
    // Network errors or other issues
    const apiError = handleApiError(error);
    throw apiError;
  }
};

// Convenience methods
export const api = {
  get: (endpoint: string) => fetchApi(endpoint, { method: 'GET' }),

  post: (endpoint: string, body: any) =>
    fetchApi(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  patch: (endpoint: string, body: any) =>
    fetchApi(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: (endpoint: string) => fetchApi(endpoint, { method: 'DELETE' }),
};

console.log(`Mobile app connected to: ${API_URL}`);

export default api;
