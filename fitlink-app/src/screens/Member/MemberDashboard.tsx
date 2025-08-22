import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/Card';
import Button from '../../components/Button';

export default function MemberDashboard() {
  const { user, logout } = useAuth();

  const mockWorkouts = [
    { id: 1, name: 'Upper Body Strength', duration: '45 min', difficulty: 'Intermediate' },
    { id: 2, name: 'Cardio Blast', duration: '30 min', difficulty: 'Beginner' },
    { id: 3, name: 'Core Focus', duration: '20 min', difficulty: 'Advanced' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <View className="py-6">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-2xl font-bold text-neutral-gray">
                Welcome back, {user?.name}!
              </Text>
              <Text className="text-gray-600">Ready for your next workout?</Text>
            </View>
            <TouchableOpacity
              onPress={logout}
              className="bg-red-100 px-3 py-2 rounded-lg"
            >
              <Text className="text-red-600 font-medium">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Subscription Status */}
        <Card title="Subscription Status" className="mb-6">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-semibold text-primary-green">
                Active Membership
              </Text>
              <Text className="text-gray-600">Premium Plan</Text>
            </View>
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-primary-green font-medium">Active</Text>
            </View>
          </View>
        </Card>

        {/* Quick Stats */}
        <View className="flex-row space-x-4 mb-6">
          <Card className="flex-1">
            <Text className="text-2xl font-bold text-primary-green">12</Text>
            <Text className="text-gray-600 text-sm">Workouts</Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-2xl font-bold text-primary-orange">8.5</Text>
            <Text className="text-gray-600 text-sm">Hours</Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-2xl font-bold text-neutral-gray">85%</Text>
            <Text className="text-gray-600 text-sm">Progress</Text>
          </Card>
        </View>

        {/* Today's Workouts */}
        <Card title="Today's Workouts" className="mb-6">
          {mockWorkouts.map((workout) => (
            <TouchableOpacity
              key={workout.id}
              className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
              <View className="flex-1">
                <Text className="font-semibold text-neutral-gray">{workout.name}</Text>
                <Text className="text-gray-600 text-sm">{workout.duration} • {workout.difficulty}</Text>
              </View>
              <View className="bg-primary-green px-3 py-1 rounded-full">
                <Text className="text-white text-sm font-medium">Start</Text>
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
              title="Start Workout"
              onPress={() => {}}
              variant="primary"
              className="w-full"
            />
            <Button
              title="View Progress"
              onPress={() => {}}
              variant="outline"
              className="w-full"
            />
            <Button
              title="Book Session"
              onPress={() => {}}
              variant="secondary"
              className="w-full"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
