import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNotifStore } from '../../store/useNotifStore';
import { notificationsAPI } from '../../api/notifications';
import Button from '../../components/Button';

const NotificationCenter = ({ navigation }: any) => {
  const { notifications, markAsRead, markAllAsRead, setNotifications } = useNotifStore();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const result = await notificationsAPI.getNotifications();
    if (result.success) {
      setNotifications(result.notifications);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    const result = await notificationsAPI.markAsRead(id);
    if (result.success) {
      markAsRead(id);
    }
  };

  const handleMarkAllAsRead = async () => {
    const result = await notificationsAPI.markAllAsRead();
    if (result.success) {
      markAllAsRead();
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'subscription':
        return { name: 'card', color: '#8b5cf6' };
      case 'routine':
        return { name: 'fitness', color: '#3b82f6' };
      case 'booking':
        return { name: 'calendar', color: '#f97316' };
      default:
        return { name: 'notifications', color: '#6b7280' };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="flex-row justify-between items-center mt-4 mb-6">
          <Text className="text-3xl font-bold text-gray-800">Notifications</Text>
          {notifications.length > 0 && (
            <TouchableOpacity onPress={handleMarkAllAsRead}>
              <Text className="text-green-500 font-medium">Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Notifications List */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {notifications.length === 0 ? (
            <View className="flex-1 justify-center items-center py-12">
              <View className="w-24 h-24 bg-gray-100 rounded-full justify-center items-center mb-6">
                <Ionicons name="notifications-off" size={40} color="#9ca3af" />
              </View>
              <Text className="text-xl font-bold text-gray-800 mb-2 text-center">
                No Notifications
              </Text>
              <Text className="text-gray-600 text-center mb-8 leading-6">
                You're all caught up! New notifications will appear here.
              </Text>
            </View>
          ) : (
            notifications.map((notification) => {
              const icon = getNotificationIcon(notification.type);
              return (
                <TouchableOpacity
                  key={notification.id}
                  className={`border-l-4 rounded-2xl p-4 mb-3 ${
                    notification.is_read
                      ? 'bg-gray-50 border-gray-200'
                      : 'bg-white border-green-500 shadow-sm'
                  }`}
                  onPress={() => handleMarkAsRead(notification.id)}
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-start">
                    <View 
                      className="w-10 h-10 rounded-full justify-center items-center mr-3"
                      style={{ backgroundColor: `${icon.color}20` }}
                    >
                      <Ionicons name={icon.name as any} size={20} color={icon.color} />
                    </View>
                    <View className="flex-1">
                      <View className="flex-row justify-between items-start mb-1">
                        <Text className="font-semibold text-gray-800 flex-1">
                          {notification.title}
                        </Text>
                        {!notification.is_read && (
                          <View className="w-2 h-2 bg-green-500 rounded-full ml-2" />
                        )}
                      </View>
                      <Text className="text-gray-600 text-sm leading-5 mb-2">
                        {notification.message}
                      </Text>
                      <Text className="text-gray-400 text-xs">
                        {formatDate(notification.created_at)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NotificationCenter;
