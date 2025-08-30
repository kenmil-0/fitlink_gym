import { api } from '../utils/api';

export interface CheckInData {
  member_id: string; // UUID or member ID from QR code
  gym_id?: number;
}

export interface CheckInResponse {
  success: boolean;
  member: {
    id: number;
    name: string;
    subscription_status: 'active' | 'expired' | 'none';
    subscription_end_date?: string;
  };
  message: string;
  timestamp: string;
}

export const checkinAPI = {
  checkIn: async (data: CheckInData) => {
    try {
      const response = await api.post('/check-in', data);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Check-in failed'
      };
    }
  },

  // Mock check-in for development
  mockCheckIn: async (memberId: string): Promise<CheckInResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response based on member ID
    const isActive = memberId.includes('active') || Math.random() > 0.3;
    
    return {
      success: true,
      member: {
        id: parseInt(memberId.replace(/\D/g, '')) || 1,
        name: 'John Doe',
        subscription_status: isActive ? 'active' : 'expired',
        subscription_end_date: isActive ? '2025-12-31' : '2024-01-01',
      },
      message: isActive ? 'Check-in successful' : 'Subscription expired',
      timestamp: new Date().toISOString(),
    };
  },

  getCheckInHistory: async (memberId?: string) => {
    try {
      const params = memberId ? `?member_id=${memberId}` : '';
      const response = await api.get(`/check-in/history${params}`);
      return { success: true, history: response.data.data || response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch check-in history',
        history: []
      };
    }
  },
};
