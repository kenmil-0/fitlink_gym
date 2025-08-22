import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { memberAPI } from '../../utils/api';
import Card from '../../components/Card';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';

interface Subscription {
  status: string;
  plan: string;
  expires_at: string;
}

interface Workout {
  id: number;
  name: string;
  duration: string;
  difficulty: string;
  completed: boolean;
}

interface Progress {
  total_workouts: number;
  total_hours: number;
  progress_percentage: number;
}

export default function MemberDashboard() {
  const { user, logout } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch subscription data
      const subscriptionResult = await memberAPI.getSubscription();
      if (subscriptionResult.success) {
        setSubscription(subscriptionResult.data);
      }

      // Fetch workouts
      const workoutsResult = await memberAPI.getWorkouts();
      if (workoutsResult.success) {
        setWorkouts(workoutsResult.data);
      }

      // Fetch progress
      const progressResult = await memberAPI.getProgress();
      if (progressResult.success) {
        setProgress(progressResult.data);
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
                Welcome back, {user?.name}!
              </Text>
              <Text className="text-gray-600">Ready for your next workout?</Text>
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-red-100 px-3 py-2 rounded-lg"
            >
              <Text className="text-red-600 font-medium">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Subscription Status */}
        {subscription && (
          <Card title="Subscription Status" className="mb-6">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-semibold text-primary-green">
                  {subscription.plan} Plan
                </Text>
                <Text className="text-gray-600">
                  Expires: {new Date(subscription.expires_at).toLocaleDateString()}
                </Text>
              </View>
              <View className={`px-3 py-1 rounded-full ${
                subscription.status === 'active' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <Text className={`font-medium text-sm ${
                  subscription.status === 'active' ? 'text-primary-green' : 'text-red-600'
                }`}>
                  {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                </Text>
              </View>
            </View>
          </Card>
        )}

        {/* Quick Stats */}
        {progress && (
          <View className="flex-row space-x-4 mb-6">
            <Card className="flex-1">
              <Text className="text-2xl font-bold text-primary-green">
                {progress.total_workouts}
              </Text>
              <Text className="text-gray-600 text-sm">Workouts</Text>
            </Card>
            <Card className="flex-1">
              <Text className="text-2xl font-bold text-primary-orange">
                {progress.total_hours}
              </Text>
              <Text className="text-gray-600 text-sm">Hours</Text>
            </Card>
            <Card className="flex-1">
              <Text className="text-2xl font-bold text-neutral-gray">
                {progress.progress_percentage}%
              </Text>
              <Text className="text-gray-600 text-sm">Progress</Text>
            </Card>
          </View>
        )}

        {/* Today's Workouts */}
        {workouts.length > 0 && (
          <Card title="Today's Workouts" className="mb-6">
            {workouts.map((workout) => (
              <TouchableOpacity
                key={workout.id}
                className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <View className="flex-1">
                  <Text className="font-semibold text-neutral-gray">{workout.name}</Text>
                  <Text className="text-gray-600 text-sm">
                    {workout.duration} • {workout.difficulty}
                  </Text>
                </View>
                <View className={`px-3 py-1 rounded-full ${
                  workout.completed ? 'bg-green-100' : 'bg-primary-green'
                }`}>
                  <Text className={`text-sm font-medium ${
                    workout.completed ? 'text-primary-green' : 'text-white'
                  }`}>
                    {workout.completed ? 'Completed' : 'Start'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        )}

        {/* No Workouts Message */}
        {workouts.length === 0 && (
          <Card title="Today's Workouts" className="mb-6">
            <Text className="text-gray-600 text-center py-4">
              No workouts scheduled for today. Check back later!
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
              title="Start Workout"
              onPress={() => Alert.alert('Coming Soon', 'Workout feature will be available soon!')}
              variant="primary"
              className="w-full"
            />
            <Button
              title="View Progress"
              onPress={() => Alert.alert('Coming Soon', 'Progress tracking will be available soon!')}
              variant="outline"
              className="w-full"
            />
            <Button
              title="Book Session"
              onPress={() => Alert.alert('Coming Soon', 'Session booking will be available soon!')}
              variant="secondary"
              className="w-full"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
