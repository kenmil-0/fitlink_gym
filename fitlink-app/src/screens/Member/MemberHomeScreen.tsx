import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore';
import { useGymStore } from '../../store/useGymStore';
import { useNotifStore } from '../../store/useNotifStore';
import { notificationsAPI } from '../../api/notifications';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';

const MemberHomeScreen = ({ navigation }: any) => {
  const { user } = useAuthStore();
  const { selectedGym } = useGymStore();
  const { unreadCount, setNotifications } = useNotifStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const result = await notificationsAPI.getNotifications();
    if (result.success) {
      setNotifications(result.notifications);
    }
  };

  const handleShowQR = () => {
    // Navigate to QR modal or screen
    navigation.navigate('QRModal');
  };

  const handleManageSubscription = () => {
    if (!user?.default_gym_id) {
      navigation.navigate('GymDiscovery');
    } else {
      navigation.navigate('SubscriptionManagement');
    }
  };

  const quickActions = [
    {
      id: 'qr',
      title: 'Show My QR',
      description: 'Display your check-in QR code',
      icon: 'qr-code',
      color: '#22c55e',
      onPress: handleShowQR,
    },
    {
      id: 'routines',
      title: 'My Routines',
      description: 'View and track your workouts',
      icon: 'fitness',
      color: '#3b82f6',
      onPress: () => navigation.navigate('Routines'),
    },
    {
      id: 'diet',
      title: 'My Diet',
      description: 'Track your nutrition and meals',
      icon: 'nutrition',
      color: '#f97316',
      onPress: () => navigation.navigate('Diet'),
    },
    {
      id: 'subscription',
      title: 'Manage Subscription',
      description: 'Renew or change your plan',
      icon: 'card',
      color: '#8b5cf6',
      onPress: handleManageSubscription,
    },
  ];

  // Check if user needs to select a gym or has subscription issues
  if (!user?.default_gym_id) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 px-6 justify-center items-center">
          <View className="w-24 h-24 bg-green-100 rounded-full justify-center items-center mb-6">
            <Ionicons name="fitness" size={40} color="#22c55e" />
          </View>
          <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Welcome to Fitlink!
          </Text>
          <Text className="text-gray-600 text-center mb-8 leading-6">
            To get started, you need to select a gym and choose a subscription plan.
          </Text>
          <Button
            title="Find a Gym"
            onPress={() => navigation.navigate('GymDiscovery')}
            className="w-full"
          />
        </View>
      </SafeAreaView>
    );
  }

  if (user.subscription_status === 'expired' || user.subscription_status === 'none') {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 px-6 justify-center items-center">
          <View className="w-24 h-24 bg-red-100 rounded-full justify-center items-center mb-6">
            <Ionicons name="warning" size={40} color="#ef4444" />
          </View>
          <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Subscription Required
          </Text>
          <Text className="text-gray-600 text-center mb-8 leading-6">
            Your subscription has expired. Please renew to continue accessing the gym.
          </Text>
          <Button
            title="Renew Subscription"
            onPress={() => navigation.navigate('SubscriptionPlans')}
            className="w-full"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Header with Notifications */}
        <View className="flex-row justify-between items-center mt-4 mb-6">
          <View>
            <Text className="text-2xl font-bold text-gray-800">
              Welcome back, {user?.name?.split(' ')[0]}!
            </Text>
            <Text className="text-gray-600">
              Ready for your workout today?
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationCenter')}
            className="relative"
          >
            <Ionicons name="notifications" size={28} color="#6b7280" />
            {unreadCount > 0 && (
              <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full justify-center items-center">
                <Text className="text-white text-xs font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Gym Status */}
        {selectedGym && (
          <View className="bg-green-50 rounded-2xl p-4 mb-6">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-green-100 rounded-full justify-center items-center mr-3">
                  <Ionicons name="fitness" size={20} color="#22c55e" />
                </View>
                <View>
                  <Text className="font-semibold text-gray-800">
                    {selectedGym.name}
                  </Text>
                  <Text className="text-gray-600 text-sm">{selectedGym.address}</Text>
                </View>
              </View>
              <View className="bg-green-500 px-3 py-1 rounded-full">
                <Text className="text-white text-sm font-medium">Active</Text>
              </View>
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Quick Actions</Text>
          <View className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
                onPress={action.onPress}
                activeOpacity={0.7}
              >
                <View 
                  className="w-12 h-12 rounded-full justify-center items-center mb-3"
                  style={{ backgroundColor: `${action.color}20` }}
                >
                  <Ionicons name={action.icon as any} size={24} color={action.color} />
                </View>
                <Text className="font-semibold text-gray-800 mb-1">
                  {action.title}
                </Text>
                <Text className="text-gray-600 text-sm leading-4">
                  {action.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Today's Stats */}
        <View className="bg-gray-50 rounded-2xl p-6 mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Today's Progress</Text>
          <View className="grid grid-cols-3 gap-4">
            <View className="items-center">
              <Text className="text-2xl font-bold text-green-500">0</Text>
              <Text className="text-gray-600 text-sm">Workouts</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-blue-500">0</Text>
              <Text className="text-gray-600 text-sm">Calories</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-orange-500">0</Text>
              <Text className="text-gray-600 text-sm">Minutes</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Recent Activity</Text>
          <View className="bg-white border border-gray-200 rounded-2xl p-4">
            <Text className="text-gray-500 text-center py-8">
              No recent activity. Start your fitness journey today!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MemberHomeScreen;
