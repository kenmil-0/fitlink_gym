import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base API configuration
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user_data');
      // TODO: Navigate to login screen
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
  }) => api.post('/auth/register', userData),
  
  logout: () => api.post('/auth/logout'),
  
  me: () => api.get('/auth/me'),
};

// Workouts API endpoints
export const workoutsAPI = {
  getAll: () => api.get('/workouts'),
  getById: (id: number) => api.get(`/workouts/${id}`),
  create: (workoutData: any) => api.post('/workouts', workoutData),
  update: (id: number, workoutData: any) => api.put(`/workouts/${id}`, workoutData),
  delete: (id: number) => api.delete(`/workouts/${id}`),
};

// Members API endpoints
export const membersAPI = {
  getAll: () => api.get('/members'),
  getById: (id: number) => api.get(`/members/${id}`),
  create: (memberData: any) => api.post('/members', memberData),
  update: (id: number, memberData: any) => api.put(`/members/${id}`, memberData),
  delete: (id: number) => api.delete(`/members/${id}`),
};

// Trainers API endpoints
export const trainersAPI = {
  getAll: () => api.get('/trainers'),
  getById: (id: number) => api.get(`/trainers/${id}`),
  getClients: (trainerId: number) => api.get(`/trainers/${trainerId}/clients`),
  createRoutine: (trainerId: number, routineData: any) =>
    api.post(`/trainers/${trainerId}/routines`, routineData),
};

// Subscriptions API endpoints
export const subscriptionsAPI = {
  getAll: () => api.get('/subscriptions'),
  getById: (id: number) => api.get(`/subscriptions/${id}`),
  create: (subscriptionData: any) => api.post('/subscriptions', subscriptionData),
  update: (id: number, subscriptionData: any) =>
    api.put(`/subscriptions/${id}`, subscriptionData),
  cancel: (id: number) => api.post(`/subscriptions/${id}/cancel`),
};

export default api;
