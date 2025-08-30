import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const OwnerDashboardScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mt-4 mb-6">
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Gym Dashboard
          </Text>
          <Text className="text-gray-600">
            Manage your gym operations and members
          </Text>
        </View>

        {/* Stats Overview */}
        <View className="grid grid-cols-2 gap-4 mb-6">
          <View className="bg-blue-50 rounded-2xl p-4">
            <View className="flex-row items-center justify-between mb-2">
              <Ionicons name="people" size={24} color="#3b82f6" />
              <Text className="text-2xl font-bold text-blue-600">156</Text>
            </View>
            <Text className="text-blue-700 font-medium">Total Members</Text>
          </View>

          <View className="bg-green-50 rounded-2xl p-4">
            <View className="flex-row items-center justify-between mb-2">
              <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
              <Text className="text-2xl font-bold text-green-600">142</Text>
            </View>
            <Text className="text-green-700 font-medium">Active Members</Text>
          </View>

          <View className="bg-orange-50 rounded-2xl p-4">
            <View className="flex-row items-center justify-between mb-2">
              <Ionicons name="calendar" size={24} color="#f97316" />
              <Text className="text-2xl font-bold text-orange-600">89</Text>
            </View>
            <Text className="text-orange-700 font-medium">Today's Check-ins</Text>
          </View>

          <View className="bg-purple-50 rounded-2xl p-4">
            <View className="flex-row items-center justify-between mb-2">
              <Ionicons name="card" size={24} color="#8b5cf6" />
              <Text className="text-2xl font-bold text-purple-600">₦2.4M</Text>
            </View>
            <Text className="text-purple-700 font-medium">Monthly Revenue</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Quick Actions</Text>
          <View className="space-y-3">
            <View className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-blue-100 rounded-full justify-center items-center mr-4">
                  <Ionicons name="people" size={24} color="#3b82f6" />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-800 mb-1">Manage Members</Text>
                  <Text className="text-gray-600 text-sm">View and manage member accounts</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
              </View>
            </View>

            <View className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-green-100 rounded-full justify-center items-center mr-4">
                  <Ionicons name="card" size={24} color="#22c55e" />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-800 mb-1">Subscription Plans</Text>
                  <Text className="text-gray-600 text-sm">Create and manage subscription plans</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
              </View>
            </View>

            <View className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-orange-100 rounded-full justify-center items-center mr-4">
                  <Ionicons name="analytics" size={24} color="#f97316" />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-800 mb-1">Analytics & Reports</Text>
                  <Text className="text-gray-600 text-sm">View gym performance metrics</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
              </View>
            </View>

            <View className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-purple-100 rounded-full justify-center items-center mr-4">
                  <Ionicons name="settings" size={24} color="#8b5cf6" />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-800 mb-1">Gym Settings</Text>
                  <Text className="text-gray-600 text-sm">Configure gym information and settings</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
              </View>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Recent Activity</Text>
          <View className="bg-white border border-gray-200 rounded-2xl p-4">
            <View className="space-y-4">
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-green-100 rounded-full justify-center items-center mr-3">
                  <Ionicons name="checkmark" size={16} color="#22c55e" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">New member registration</Text>
                  <Text className="text-gray-600 text-sm">John Doe joined Premium Plan</Text>
                </View>
                <Text className="text-gray-400 text-xs">2h ago</Text>
              </View>

              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-blue-100 rounded-full justify-center items-center mr-3">
                  <Ionicons name="card" size={16} color="#3b82f6" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">Subscription renewed</Text>
                  <Text className="text-gray-600 text-sm">Jane Smith renewed Basic Plan</Text>
                </View>
                <Text className="text-gray-400 text-xs">4h ago</Text>
              </View>

              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-orange-100 rounded-full justify-center items-center mr-3">
                  <Ionicons name="warning" size={16} color="#f97316" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">Subscription expired</Text>
                  <Text className="text-gray-600 text-sm">Mike Johnson's plan expired</Text>
                </View>
                <Text className="text-gray-400 text-xs">1d ago</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OwnerDashboardScreen;
