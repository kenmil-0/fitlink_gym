import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/Card';
import Button from '../../components/Button';

export default function GymOwnerDashboard() {
  const { user, logout } = useAuth();

  const mockMembers = [
    { id: 1, name: 'John Smith', plan: 'Premium', status: 'Active', joinDate: 'Jan 2024' },
    { id: 2, name: 'Lisa Brown', plan: 'Basic', status: 'Active', joinDate: 'Feb 2024' },
    { id: 3, name: 'David Wilson', plan: 'Premium', status: 'Expired', joinDate: 'Dec 2023' },
  ];

  const mockRevenue = [
    { month: 'Jan', amount: 12500 },
    { month: 'Feb', amount: 13800 },
    { month: 'Mar', amount: 14200 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <View className="py-6">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-2xl font-bold text-neutral-gray">
                Gym Management
              </Text>
              <Text className="text-gray-600">Welcome back, {user?.name}</Text>
            </View>
            <TouchableOpacity
              onPress={logout}
              className="bg-red-100 px-3 py-2 rounded-lg"
            >
              <Text className="text-red-600 font-medium">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Key Metrics */}
        <View className="flex-row space-x-4 mb-6">
          <Card className="flex-1">
            <Text className="text-2xl font-bold text-primary-green">156</Text>
            <Text className="text-gray-600 text-sm">Total Members</Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-2xl font-bold text-primary-orange">$14.2K</Text>
            <Text className="text-gray-600 text-sm">Monthly Revenue</Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-2xl font-bold text-neutral-gray">8</Text>
            <Text className="text-gray-600 text-sm">Trainers</Text>
          </Card>
        </View>

        {/* Revenue Overview */}
        <Card title="Revenue Overview" className="mb-6">
          <View className="space-y-3">
            {mockRevenue.map((item) => (
              <View key={item.month} className="flex-row items-center justify-between">
                <Text className="font-medium text-neutral-gray">{item.month} 2024</Text>
                <Text className="text-primary-green font-semibold">
                  ${item.amount.toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Recent Members */}
        <Card title="Recent Members" className="mb-6">
          {mockMembers.map((member) => (
            <TouchableOpacity
              key={member.id}
              className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
              <View className="flex-1">
                <Text className="font-semibold text-neutral-gray">{member.name}</Text>
                <Text className="text-gray-600 text-sm">{member.plan} • Joined {member.joinDate}</Text>
              </View>
              <View className={`px-3 py-1 rounded-full ${
                member.status === 'Active' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <Text className={`font-medium text-sm ${
                  member.status === 'Active' ? 'text-primary-green' : 'text-red-600'
                }`}>
                  {member.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Card>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-neutral-gray mb-4">
            Management Actions
          </Text>
          <View className="space-y-3">
            <Button
              title="Add New Member"
              onPress={() => {}}
              variant="primary"
              className="w-full"
            />
            <Button
              title="Manage Subscriptions"
              onPress={() => {}}
              variant="secondary"
              className="w-full"
            />
            <Button
              title="View Reports"
              onPress={() => {}}
              variant="outline"
              className="w-full"
            />
            <Button
              title="Trainer Management"
              onPress={() => {}}
              variant="outline"
              className="w-full"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
