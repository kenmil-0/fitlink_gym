import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { authAPI } from '../utils/api';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'member' | 'gym_owner' | 'instructor';
  uuid?: string;
  default_gym_id?: number;
  subscription_status?: 'active' | 'expired' | 'none';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  register: (userData: { name: string; email: string; password: string; password_confirmation: string; role: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hydrate: () => Promise<void>;
  updateUser: (user: User) => void;
}

const secureStorage = {
  getItem: async (name: string) => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string) => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string, rememberMe = false) => {
        set({ isLoading: true });
        try {
          const result = await authAPI.login(email, password);
          if (result.success && result.user && result.token) {
            set({
              user: result.user,
              token: result.token,
              isAuthenticated: true,
              isLoading: false,
            });
            return { success: true };
          } else {
            set({ isLoading: false });
            return { success: false, error: result.error || 'Login failed' };
          }
        } catch (error: any) {
          set({ isLoading: false });
          return { success: false, error: error.message || 'Login failed' };
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          const result = await authAPI.register(userData);
          if (result.success && result.user && result.token) {
            set({
              user: result.user,
              token: result.token,
              isAuthenticated: true,
              isLoading: false,
            });
            return { success: true };
          } else {
            set({ isLoading: false });
            return { success: false, error: result.error || 'Registration failed' };
          }
        } catch (error: any) {
          set({ isLoading: false });
          return { success: false, error: error.message || 'Registration failed' };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      hydrate: async () => {
        set({ isLoading: true });
        try {
          const token = await SecureStore.getItemAsync('auth_token');
          const userData = await SecureStore.getItemAsync('user_data');
          
          if (token && userData) {
            const user = JSON.parse(userData);
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('Hydration error:', error);
          set({ isLoading: false });
        }
      },

      updateUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
