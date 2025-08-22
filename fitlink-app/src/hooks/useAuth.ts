import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI, checkAuthStatus } from '../utils/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'member' | 'trainer' | 'gym_owner';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  userRole: string;
  token: string | null;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    userRole: '',
    token: null,
    isLoading: true,
  });

  useEffect(() => {
    // Check for stored authentication on app start
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      const { isAuthenticated, user } = await checkAuthStatus();
      
      if (isAuthenticated && user) {
        const token = await AsyncStorage.getItem('auth_token');
        setAuthState({
          isAuthenticated: true,
          user,
          userRole: user.role,
          token,
          isLoading: false,
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
          userRole: '',
          token: null,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      setAuthState({
        isAuthenticated: false,
        user: null,
        userRole: '',
        token: null,
        isLoading: false,
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await authAPI.login(email, password);
      
      if (result.success && result.user) {
        setAuthState({
          isAuthenticated: true,
          user: result.user,
          userRole: result.user.role,
          token: result.token,
          isLoading: false,
        });
      }
      
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    try {
      const result = await authAPI.register({
        name,
        email,
        password,
        password_confirmation: password,
        role,
      });
      
      if (result.success && result.user) {
        setAuthState({
          isAuthenticated: true,
          user: result.user,
          userRole: result.user.role,
          token: result.token,
          isLoading: false,
        });
      }
      
      return result;
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setAuthState({
        isAuthenticated: false,
        user: null,
        userRole: '',
        token: null,
        isLoading: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local state
      setAuthState({
        isAuthenticated: false,
        user: null,
        userRole: '',
        token: null,
        isLoading: false,
      });
    }
  };

  const refreshUserData = async () => {
    try {
      const result = await authAPI.me();
      if (result.success && result.user) {
        setAuthState(prev => ({
          ...prev,
          user: result.user,
          userRole: result.user.role,
        }));
        // Update stored user data
        await AsyncStorage.setItem('user_data', JSON.stringify(result.user));
      }
      return result;
    } catch (error) {
      console.error('Error refreshing user data:', error);
      return { success: false, error: 'Failed to refresh user data' };
    }
  };

  return {
    ...authState,
    login,
    register,
    logout,
    refreshUserData,
  };
}
