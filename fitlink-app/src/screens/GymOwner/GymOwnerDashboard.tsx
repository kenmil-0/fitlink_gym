import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { gymOwnerAPI } from '../../utils/api';
import Card from '../../components/Card';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';

interface Member {
  id: number;
  name: string;
  plan: string;
  status: string;
  join_date: string;
  email: string;
}

interface Revenue {
  month: string;
  amount: number;
}

interface Subscription {
  id: number;
  member_name: string;
  plan: string;
  status: string;
  amount: number;
}

export default function GymOwnerDashboard() {
  const { user, logout } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [revenue, setRevenue] = useState<Revenue[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch members
      const membersResult = await gymOwnerAPI.getMembers();
      if (membersResult.success) {
        setMembers(membersResult.data);
      }

      // Fetch revenue
      const revenueResult = await gymOwnerAPI.getRevenue();
      if (revenueResult.success) {
        setRevenue(revenueResult.data);
      }

      // Fetch subscriptions
      const subscriptionsResult = await gymOwnerAPI.getSubscriptions();
      if (subscriptionsResult.success) {
        setSubscriptions(subscriptionsResult.data);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      Alert.alert('Error', 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  const calculateTotalRevenue = () => {
    return revenue.reduce((total, item) => total + item.amount, 0);
  };

  const calculateActiveMembers = () => {
    return members.filter(member => member.status === 'active').length;
  };

  if (loading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView 
        className="flex-1 px-6"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
              onPress={handleLogout}
              className="bg-red-100 px-3 py-2 rounded-lg"
            >
              <Text className="text-red-600 font-medium">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Key Metrics */}
        <View className="flex-row space-x-4 mb-6">
          <Card className="flex-1">
            <Text className="text-2xl font-bold text-primary-green">
              {members.length}
            </Text>
            <Text className="text-gray-600 text-sm">Total Members</Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-2xl font-bold text-primary-orange">
              ${(calculateTotalRevenue() / 1000).toFixed(1)}K
            </Text>
            <Text className="text-gray-600 text-sm">Monthly Revenue</Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-2xl font-bold text-neutral-gray">
              {calculateActiveMembers()}
            </Text>
            <Text className="text-gray-600 text-sm">Active Members</Text>
          </Card>
        </View>

        {/* Revenue Overview */}
        {revenue.length > 0 && (
          <Card title="Revenue Overview" className="mb-6">
            <View className="space-y-3">
              {revenue.slice(0, 3).map((item) => (
                <View key={item.month} className="flex-row items-center justify-between">
                  <Text className="font-medium text-neutral-gray">{item.month} 2024</Text>
                  <Text className="text-primary-green font-semibold">
                    ${item.amount.toLocaleString()}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        {/* Recent Members */}
        {members.length > 0 && (
          <Card title="Recent Members" className="mb-6">
            {members.slice(0, 3).map((member) => (
              <TouchableOpacity
                key={member.id}
                className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <View className="flex-1">
                  <Text className="font-semibold text-neutral-gray">{member.name}</Text>
                  <Text className="text-gray-600 text-sm">
                    {member.plan} • Joined {new Date(member.join_date).toLocaleDateString()}
                  </Text>
                </View>
                <View className={`px-3 py-1 rounded-full ${
                  member.status === 'active' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Text className={`font-medium text-sm ${
                    member.status === 'active' ? 'text-primary-green' : 'text-red-600'
                  }`}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        )}

        {/* No Members Message */}
        {members.length === 0 && (
          <Card title="Recent Members" className="mb-6">
            <Text className="text-gray-600 text-center py-4">
              No members registered yet. Start building your gym community!
            </Text>
          </Card>
        )}

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-neutral-gray mb-4">
            Management Actions
          </Text>
          <View className="space-y-3">
            <Button
              title="Add New Member"
              onPress={() => Alert.alert('Coming Soon', 'Member management will be available soon!')}
              variant="primary"
              className="w-full"
            />
            <Button
              title="Manage Subscriptions"
              onPress={() => Alert.alert('Coming Soon', 'Subscription management will be available soon!')}
              variant="secondary"
              className="w-full"
            />
            <Button
              title="View Reports"
              onPress={() => Alert.alert('Coming Soon', 'Reports and analytics will be available soon!')}
              variant="outline"
              className="w-full"
            />
            <Button
              title="Trainer Management"
              onPress={() => Alert.alert('Coming Soon', 'Trainer management will be available soon!')}
              variant="outline"
              className="w-full"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
