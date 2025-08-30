import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/useAuthStore';
import AuthNavigator from './AuthNavigator';
import MemberTabs from './MemberTabs';
import OwnerStack from './OwnerStack';
import StaffStack from './StaffStack';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated, user, isLoading, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
          {user?.role === 'member' && (
            <Stack.Screen name="MemberTabs" component={MemberTabs} />
          )}
          {user?.role === 'gym_owner' && (
            <Stack.Screen name="OwnerStack" component={OwnerStack} />
          )}
          {user?.role === 'instructor' && (
            <Stack.Screen name="StaffStack" component={StaffStack} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
