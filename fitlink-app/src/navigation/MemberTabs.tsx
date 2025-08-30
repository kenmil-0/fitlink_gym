import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import MemberHomeScreen from '../screens/Member/MemberHomeScreen';
import MemberRoutinesScreen from '../screens/Member/MemberRoutinesScreen';
import MemberDietScreen from '../screens/Member/MemberDietScreen';
import MemberProfileScreen from '../screens/Member/MemberProfileScreen';
import GymDiscoveryScreen from '../screens/Member/GymDiscoveryScreen';
import SubscriptionPlansScreen from '../screens/Member/SubscriptionPlansScreen';
import PaymentConfirmScreen from '../screens/Member/PaymentConfirmScreen';
import NotificationCenter from '../screens/Member/NotificationCenter';

export type MemberTabParamList = {
  Home: undefined;
  Routines: undefined;
  Diet: undefined;
  Profile: undefined;
  GymDiscovery: undefined;
  SubscriptionPlans: undefined;
  PaymentConfirm: { plan: any };
  NotificationCenter: undefined;
  QRModal: undefined;
  SubscriptionManagement: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<MemberTabParamList>();

// Stack navigator for member screens
const MemberStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={MemberHomeScreen} />
      <Stack.Screen name="GymDiscovery" component={GymDiscoveryScreen} />
      <Stack.Screen name="SubscriptionPlans" component={SubscriptionPlansScreen} />
      <Stack.Screen name="PaymentConfirm" component={PaymentConfirmScreen} />
      <Stack.Screen name="NotificationCenter" component={NotificationCenter} />
      <Stack.Screen name="QRModal" component={MemberProfileScreen} />
      <Stack.Screen name="SubscriptionManagement" component={SubscriptionPlansScreen} />
    </Stack.Navigator>
  );
};

const MemberTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Routines') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'Diet') {
            iconName = focused ? 'nutrition' : 'nutrition-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#22c55e',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={MemberStack}
        options={{ title: 'Fitlink' }}
      />
      <Tab.Screen 
        name="Routines" 
        component={MemberRoutinesScreen}
        options={{ title: 'My Routines' }}
      />
      <Tab.Screen 
        name="Diet" 
        component={MemberDietScreen}
        options={{ title: 'My Diet' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={MemberProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default MemberTabs;
