import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    userRole: '',
    token: null,
  });

  useEffect(() => {
    // Check for stored authentication on app start
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const userData = await AsyncStorage.getItem('user_data');
      
      if (token && userData) {
        const user = JSON.parse(userData);
        setAuthState({
          isAuthenticated: true,
          user,
          userRole: user.role,
          token,
        });
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // TODO: Replace with actual API call
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email,
        role: 'member' as const,
      };
      const mockToken = 'mock_jwt_token';

      await AsyncStorage.setItem('auth_token', mockToken);
      await AsyncStorage.setItem('user_data', JSON.stringify(mockUser));

      setAuthState({
        isAuthenticated: true,
        user: mockUser,
        userRole: mockUser.role,
        token: mockToken,
      });

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    try {
      // TODO: Replace with actual API call
      const mockUser = {
        id: 1,
        name,
        email,
        role: role as 'member' | 'trainer' | 'gym_owner',
      };
      const mockToken = 'mock_jwt_token';

      await AsyncStorage.setItem('auth_token', mockToken);
      await AsyncStorage.setItem('user_data', JSON.stringify(mockUser));

      setAuthState({
        isAuthenticated: true,
        user: mockUser,
        userRole: mockUser.role,
        token: mockToken,
      });

      return { success: true };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user_data');

      setAuthState({
        isAuthenticated: false,
        user: null,
        userRole: '',
        token: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    ...authState,
    login,
    register,
    logout,
  };
}
