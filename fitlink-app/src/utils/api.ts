import axios, { AxiosError, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

// Base API configuration
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshToken = await SecureStore.getItemAsync('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/refresh`, {}, {
            headers: {
              'Authorization': `Bearer ${refreshToken}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          });

          const { token } = response.data;
          await SecureStore.setItemAsync('auth_token', token);

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear storage and redirect to login
        await SecureStore.deleteItemAsync('auth_token');
        await SecureStore.deleteItemAsync('refresh_token');
        await SecureStore.deleteItemAsync('user_data');
        // TODO: Navigate to login screen
        console.error('Token refresh failed:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Test API connection
export const testAPI = async () => {
  try {
    const response = await api.get('/test');
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to connect to API'
    };
  }
};

// Auth API endpoints - moved to separate file
// This is kept for backward compatibility
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response.data;
      
      // Store tokens and user data
      await SecureStore.setItemAsync('auth_token', token);
      await SecureStore.setItemAsync('refresh_token', token); // Laravel Sanctum uses same token for refresh
      await SecureStore.setItemAsync('user_data', JSON.stringify(user));
      
      return { success: true, user, token };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
  }) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { user, token } = response.data;
      
      // Store tokens and user data
      await SecureStore.setItemAsync('auth_token', token);
      await SecureStore.setItemAsync('refresh_token', token);
      await SecureStore.setItemAsync('user_data', JSON.stringify(user));
      
      return { success: true, user, token };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
      await SecureStore.deleteItemAsync('auth_token');
      await SecureStore.deleteItemAsync('refresh_token');
      await SecureStore.deleteItemAsync('user_data');
      return { success: true };
    } catch (error: any) {
      // Even if logout fails, clear local storage
      await SecureStore.deleteItemAsync('auth_token');
      await SecureStore.deleteItemAsync('refresh_token');
      await SecureStore.deleteItemAsync('user_data');
      return { success: true };
    }
  },

  me: async () => {
    try {
      const response = await api.get('/auth/profile');
      return { success: true, user: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to get user data' 
      };
    }
  },

  refreshToken: async () => {
    try {
      const response = await api.post('/refresh');
      const { token } = response.data;
      await SecureStore.setItemAsync('auth_token', token);
      return { success: true, token };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Token refresh failed' 
      };
    }
  },
};

// Member API endpoints
export const memberAPI = {
  getSubscription: async () => {
    try {
      const response = await api.get('/member/subscription');
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch subscription' 
      };
    }
  },

  getWorkouts: async () => {
    try {
      const response = await api.get('/member/workouts');
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch workouts' 
      };
    }
  },

  getProgress: async () => {
    try {
      const response = await api.get('/member/progress');
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch progress' 
      };
    }
  },
};

// Trainer API endpoints
export const trainerAPI = {
  getClients: async () => {
    try {
      const response = await api.get('/trainer/clients');
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch clients' 
      };
    }
  },

  getRoutines: async () => {
    try {
      const response = await api.get('/trainer/routines');
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch routines' 
      };
    }
  },

  createRoutine: async (routineData: any) => {
    try {
      const response = await api.post('/trainer/routines', routineData);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create routine' 
      };
    }
  },
};

// Gym Owner API endpoints
export const gymOwnerAPI = {
  getMembers: async () => {
    try {
      const response = await api.get('/gym-owner/members');
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch members' 
      };
    }
  },

  getRevenue: async () => {
    try {
      const response = await api.get('/gym-owner/revenue');
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch revenue' 
      };
    }
  },

  getSubscriptions: async () => {
    try {
      const response = await api.get('/gym-owner/subscriptions');
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch subscriptions' 
      };
    }
  },
};

// Utility functions
export const checkAuthStatus = async () => {
  try {
    const token = await SecureStore.getItemAsync('auth_token');
    const userData = await SecureStore.getItemAsync('user_data');
    
    if (token && userData) {
      // Verify token is still valid
      const meResult = await authAPI.me();
      if (meResult.success) {
        return { isAuthenticated: true, user: meResult.user };
      } else {
        // Token invalid, clear storage
        await SecureStore.deleteItemAsync('auth_token');
        await SecureStore.deleteItemAsync('refresh_token');
        await SecureStore.deleteItemAsync('user_data');
        return { isAuthenticated: false, user: null };
      }
    }
    
    return { isAuthenticated: false, user: null };
  } catch (error) {
    console.error('Error checking auth status:', error);
    return { isAuthenticated: false, user: null };
  }
};

export default api;
