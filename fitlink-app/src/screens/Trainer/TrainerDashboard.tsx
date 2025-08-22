import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/Card';
import Button from '../../components/Button';

export default function TrainerDashboard() {
  const { user, logout } = useAuth();

  const mockClients = [
    { id: 1, name: 'Sarah Johnson', progress: 75, lastWorkout: '2 days ago' },
    { id: 2, name: 'Mike Chen', progress: 60, lastWorkout: '1 day ago' },
    { id: 3, name: 'Emma Davis', progress: 90, lastWorkout: 'Today' },
  ];

  const mockRoutines = [
    { id: 1, name: 'Beginner Strength', clients: 8, duration: '6 weeks' },
    { id: 2, name: 'Advanced Cardio', clients: 5, duration: '4 weeks' },
    { id: 3, name: 'Weight Loss', clients: 12, duration: '8 weeks' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-6">
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
              onPress={logout}
              className="bg-red-100 px-3 py-2 rounded-lg"
            >
              <Text className="text-red-600 font-medium">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Overview */}
        <View className="flex-row space-x-4 mb-6">
          <Card className="flex-1">
            <Text className="text-2xl font-bold text-primary-green">15</Text>
            <Text className="text-gray-600 text-sm">Active Clients</Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-2xl font-bold text-primary-orange">8</Text>
            <Text className="text-gray-600 text-sm">Routines</Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-2xl font-bold text-neutral-gray">92%</Text>
            <Text className="text-gray-600 text-sm">Satisfaction</Text>
          </Card>
        </View>

        {/* Recent Clients */}
        <Card title="Recent Clients" className="mb-6">
          {mockClients.map((client) => (
            <TouchableOpacity
              key={client.id}
              className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
              <View className="flex-1">
                <Text className="font-semibold text-neutral-gray">{client.name}</Text>
                <Text className="text-gray-600 text-sm">Last workout: {client.lastWorkout}</Text>
              </View>
              <View className="items-end">
                <Text className="text-primary-green font-semibold">{client.progress}%</Text>
                <Text className="text-gray-600 text-sm">Progress</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Card>

        {/* Active Routines */}
        <Card title="Active Routines" className="mb-6">
          {mockRoutines.map((routine) => (
            <TouchableOpacity
              key={routine.id}
              className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
              <View className="flex-1">
                <Text className="font-semibold text-neutral-gray">{routine.name}</Text>
                <Text className="text-gray-600 text-sm">{routine.clients} clients • {routine.duration}</Text>
              </View>
              <View className="bg-primary-orange px-3 py-1 rounded-full">
                <Text className="text-white text-sm font-medium">Manage</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Card>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-neutral-gray mb-4">
            Quick Actions
          </Text>
          <View className="space-y-3">
            <Button
              title="Add New Client"
              onPress={() => {}}
              variant="primary"
              className="w-full"
            />
            <Button
              title="Create Routine"
              onPress={() => {}}
              variant="secondary"
              className="w-full"
            />
            <Button
              title="View Schedule"
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
