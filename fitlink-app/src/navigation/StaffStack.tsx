import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanCheckInScreen from '../screens/Staff/ScanCheckInScreen';

export type StaffStackParamList = {
  ScanCheckIn: undefined;
  Members: undefined;
  Assignments: undefined;
};

const Stack = createNativeStackNavigator<StaffStackParamList>();

const StaffStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ScanCheckIn"
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
        name="ScanCheckIn" 
        component={ScanCheckInScreen}
        options={{ title: 'Scan Check-in' }}
      />
      {/* TODO: Add more staff screens as needed */}
    </Stack.Navigator>
  );
};

export default StaffStack;
