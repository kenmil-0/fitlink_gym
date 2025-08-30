import { create } from 'zustand';

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'subscription' | 'routine' | 'booking' | 'general';
  is_read: boolean;
  created_at: string;
  data?: any;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  setNotifications: (notifications: Notification[]) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Notification) => void;
  setLoading: (loading: boolean) => void;
  clearNotifications: () => void;
}

export const useNotifStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  setNotifications: (notifications) => {
    const unreadCount = notifications.filter(n => !n.is_read).length;
    set({ notifications, unreadCount });
  },

  markAsRead: (id) => {
    const { notifications } = get();
    const updatedNotifications = notifications.map(n => 
      n.id === id ? { ...n, is_read: true } : n
    );
    const unreadCount = updatedNotifications.filter(n => !n.is_read).length;
    set({ notifications: updatedNotifications, unreadCount });
  },

  markAllAsRead: () => {
    const { notifications } = get();
    const updatedNotifications = notifications.map(n => ({ ...n, is_read: true }));
    set({ notifications: updatedNotifications, unreadCount: 0 });
  },

  addNotification: (notification) => {
    const { notifications } = get();
    const updatedNotifications = [notification, ...notifications];
    const unreadCount = updatedNotifications.filter(n => !n.is_read).length;
    set({ notifications: updatedNotifications, unreadCount });
  },

  setLoading: (loading) => set({ isLoading: loading }),
  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
}));
