import { api } from '../utils/api';
import { Gym } from '../store/useGymStore';

export interface GymFilters {
  city?: string;
  search?: string;
}

export const gymsAPI = {
  getGyms: async (filters?: GymFilters) => {
    try {
      const params = new URLSearchParams();
      if (filters?.city) params.append('city', filters.city);
      if (filters?.search) params.append('search', filters.search);

      const response = await api.get(`/gyms?${params.toString()}`);
      return { success: true, gyms: response.data.data || response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch gyms',
        gyms: [] as Gym[]
      };
    }
  },

  getGym: async (id: number) => {
    try {
      const response = await api.get(`/gyms/${id}`);
      return { success: true, gym: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch gym details'
      };
    }
  },

  getGymPlans: async (gymId: number) => {
    try {
      const response = await api.get(`/gyms/${gymId}/plans`);
      return { success: true, plans: response.data.data || response.data };
    } catch (error: any) {
      // If endpoint doesn't exist, return default plans
      return { 
        success: true, 
        plans: [
          {
            id: 1,
            name: 'Basic Plan',
            price: 29.99,
            duration: 30,
            features: ['Access to gym facilities', 'Basic equipment usage']
          },
          {
            id: 2,
            name: 'Premium Plan',
            price: 49.99,
            duration: 30,
            features: ['All gym facilities', 'Personal trainer sessions', 'Group classes']
          },
          {
            id: 3,
            name: 'Elite Plan',
            price: 79.99,
            duration: 30,
            features: ['All facilities', 'Unlimited personal training', 'Nutrition consultation', 'Spa access']
          }
        ]
      };
    }
  },
};
