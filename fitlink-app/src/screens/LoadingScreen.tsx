import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoadingScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <View className="items-center">
        <Text className="text-3xl font-bold text-green-500 mb-4">Fitlink</Text>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text className="text-gray-600 mt-4">Loading...</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;
