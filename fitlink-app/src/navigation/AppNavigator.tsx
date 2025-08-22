import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../hooks/useAuth';

// Auth Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

// Member Screens
import MemberDashboard from '../screens/Member/MemberDashboard';
import MemberWorkouts from '../screens/Member/MemberWorkouts';
import MemberProfile from '../screens/Member/MemberProfile';

// Trainer Screens
import TrainerDashboard from '../screens/Trainer/TrainerDashboard';
import TrainerClients from '../screens/Trainer/TrainerClients';
import TrainerProfile from '../screens/Trainer/TrainerProfile';

// Gym Owner Screens
import GymOwnerDashboard from '../screens/GymOwner/GymOwnerDashboard';
import GymOwnerMembers from '../screens/GymOwner/GymOwnerMembers';
import GymOwnerSettings from '../screens/GymOwner/GymOwnerSettings';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    );
  }

  // Role-based navigation
  switch (userRole) {
    case 'member':
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MemberDashboard" component={MemberDashboard} />
          <Stack.Screen name="MemberWorkouts" component={MemberWorkouts} />
          <Stack.Screen name="MemberProfile" component={MemberProfile} />
        </Stack.Navigator>
      );
    
    case 'trainer':
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TrainerDashboard" component={TrainerDashboard} />
          <Stack.Screen name="TrainerClients" component={TrainerClients} />
          <Stack.Screen name="TrainerProfile" component={TrainerProfile} />
        </Stack.Navigator>
      );
    
    case 'gym_owner':
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="GymOwnerDashboard" component={GymOwnerDashboard} />
          <Stack.Screen name="GymOwnerMembers" component={GymOwnerMembers} />
          <Stack.Screen name="GymOwnerSettings" component={GymOwnerSettings} />
        </Stack.Navigator>
      );
    
    default:
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      );
  }
}
