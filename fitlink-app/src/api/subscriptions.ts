import { api } from '../utils/api';

export interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  duration: number; // in days
  features: string[];
}

export interface CreateSubscriptionData {
  gym_id: number;
  plan_id: number;
  duration: number;
}

export interface Subscription {
  id: number;
  user_id: number;
  gym_id: number;
  plan_id: number;
  status: 'active' | 'expired' | 'cancelled';
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export const subscriptionsAPI = {
  createSubscription: async (data: CreateSubscriptionData) => {
    try {
      const response = await api.post('/subscriptions', data);
      return { success: true, subscription: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create subscription'
      };
    }
  },

  getUserSubscriptions: async () => {
    try {
      const response = await api.get('/subscriptions');
      return { success: true, subscriptions: response.data.data || response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch subscriptions',
        subscriptions: [] as Subscription[]
      };
    }
  },

  getSubscription: async (id: number) => {
    try {
      const response = await api.get(`/subscriptions/${id}`);
      return { success: true, subscription: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch subscription'
      };
    }
  },

  cancelSubscription: async (id: number) => {
    try {
      const response = await api.put(`/subscriptions/${id}/cancel`);
      return { success: true, subscription: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to cancel subscription'
      };
    }
  },

  // Mock payment confirmation for now
  confirmPayment: async (subscriptionId: number, paymentData: any) => {
    try {
      // TODO: Replace with actual payment confirmation endpoint
      const response = await api.post(`/subscriptions/${subscriptionId}/confirm-payment`, paymentData);
      return { success: true, payment: response.data };
    } catch (error: any) {
      // For now, simulate successful payment
      return { success: true, payment: { status: 'completed', id: Date.now() } };
    }
  },
};
