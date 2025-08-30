import { api } from '../utils/api';
import * as SecureStore from 'expo-secure-store';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: 'member' | 'gym_owner' | 'instructor';
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'member' | 'gym_owner' | 'instructor';
  uuid?: string;
  default_gym_id?: number;
  subscription_status?: 'active' | 'expired' | 'none';
}

export const authAPI = {
  login: async (data: LoginData) => {
    try {
      const response = await api.post('/auth/login', data);
      const { user, token } = response.data;
      
      // Store tokens and user data
      await SecureStore.setItemAsync('auth_token', token);
      await SecureStore.setItemAsync('refresh_token', token); // Laravel Sanctum uses same token
      await SecureStore.setItemAsync('user_data', JSON.stringify(user));
      
      return { success: true, user, token };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  },

  register: async (data: RegisterData) => {
    try {
      const response = await api.post('/auth/register', data);
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

  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return { success: true, user: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to get profile' 
      };
    }
  },

  updateProfile: async (data: Partial<User>) => {
    try {
      const response = await api.put('/auth/profile', data);
      return { success: true, user: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update profile' 
      };
    }
  },

  registerDeviceToken: async (deviceToken: string) => {
    try {
      await api.post('/auth/device-token', { device_token: deviceToken });
      return { success: true };
    } catch (error: any) {
      console.error('Failed to register device token:', error);
      return { success: false };
    }
  },
};
