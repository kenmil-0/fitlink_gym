import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import RoleSelectScreen from '../screens/Auth/RoleSelectScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import LoginScreen from '../screens/Auth/LoginScreen';

export type AuthStackParamList = {
  Welcome: undefined;
  RoleSelect: undefined;
  Register: { role: 'member' | 'gym_owner' | 'instructor' };
  Login: { role?: 'member' | 'gym_owner' | 'instructor' };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
