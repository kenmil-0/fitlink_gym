import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { trainerAPI } from '../../utils/api';
import Card from '../../components/Card';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';

interface Client {
  id: number;
  name: string;
  progress: number;
  last_workout: string;
  email: string;
}

interface Routine {
  id: number;
  name: string;
  client_count: number;
  duration: string;
  difficulty: string;
}

export default function TrainerDashboard() {
  const { user, logout } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch clients
      const clientsResult = await trainerAPI.getClients();
      if (clientsResult.success) {
        setClients(clientsResult.data);
      }

      // Fetch routines
      const routinesResult = await trainerAPI.getRoutines();
      if (routinesResult.success) {
        setRoutines(routinesResult.data);
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
                Trainer Dashboard
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

        {/* Stats Overview */}
        <View className="flex-row space-x-4 mb-6">
          <Card className="flex-1">
            <Text className="text-2xl font-bold text-primary-green">
              {clients.length}
            </Text>
            <Text className="text-gray-600 text-sm">Active Clients</Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-2xl font-bold text-primary-orange">
              {routines.length}
            </Text>
            <Text className="text-gray-600 text-sm">Routines</Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-2xl font-bold text-neutral-gray">
              {clients.length > 0 ? Math.round(clients.reduce((acc, client) => acc + client.progress, 0) / clients.length) : 0}%
            </Text>
            <Text className="text-gray-600 text-sm">Avg Progress</Text>
          </Card>
        </View>

        {/* Recent Clients */}
        {clients.length > 0 && (
          <Card title="Recent Clients" className="mb-6">
            {clients.slice(0, 3).map((client) => (
              <TouchableOpacity
                key={client.id}
                className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <View className="flex-1">
                  <Text className="font-semibold text-neutral-gray">{client.name}</Text>
                  <Text className="text-gray-600 text-sm">Last workout: {client.last_workout}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-primary-green font-semibold">{client.progress}%</Text>
                  <Text className="text-gray-600 text-sm">Progress</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        )}

        {/* No Clients Message */}
        {clients.length === 0 && (
          <Card title="Recent Clients" className="mb-6">
            <Text className="text-gray-600 text-center py-4">
              No clients assigned yet. Start building your client base!
            </Text>
          </Card>
        )}

        {/* Active Routines */}
        {routines.length > 0 && (
          <Card title="Active Routines" className="mb-6">
            {routines.slice(0, 3).map((routine) => (
              <TouchableOpacity
                key={routine.id}
                className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <View className="flex-1">
                  <Text className="font-semibold text-neutral-gray">{routine.name}</Text>
                  <Text className="text-gray-600 text-sm">
                    {routine.client_count} clients • {routine.duration} • {routine.difficulty}
                  </Text>
                </View>
                <View className="bg-primary-orange px-3 py-1 rounded-full">
                  <Text className="text-white text-sm font-medium">Manage</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        )}

        {/* No Routines Message */}
        {routines.length === 0 && (
          <Card title="Active Routines" className="mb-6">
            <Text className="text-gray-600 text-center py-4">
              No routines created yet. Create your first workout routine!
            </Text>
          </Card>
        )}

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-neutral-gray mb-4">
            Quick Actions
          </Text>
          <View className="space-y-3">
            <Button
              title="Add New Client"
              onPress={() => Alert.alert('Coming Soon', 'Client management will be available soon!')}
              variant="primary"
              className="w-full"
            />
            <Button
              title="Create Routine"
              onPress={() => Alert.alert('Coming Soon', 'Routine creation will be available soon!')}
              variant="secondary"
              className="w-full"
            />
            <Button
              title="View Schedule"
              onPress={() => Alert.alert('Coming Soon', 'Schedule management will be available soon!')}
              variant="outline"
              className="w-full"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
