import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OwnerDashboardScreen from '../screens/Owner/OwnerDashboardScreen';

export type OwnerStackParamList = {
  Dashboard: undefined;
  Members: undefined;
  Plans: undefined;
  Payments: undefined;
};

const Stack = createNativeStackNavigator<OwnerStackParamList>();

const OwnerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#22c55e',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Dashboard" 
        component={OwnerDashboardScreen}
        options={{ title: 'Gym Dashboard' }}
      />
      {/* TODO: Add more owner screens as needed */}
    </Stack.Navigator>
  );
};

export default OwnerStack;
