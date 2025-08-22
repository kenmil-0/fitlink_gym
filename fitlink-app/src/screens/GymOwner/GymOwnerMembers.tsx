import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/Card';

export default function GymOwnerMembers() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-6 py-6">
        <Text className="text-2xl font-bold text-neutral-gray mb-6">
          Member Management
        </Text>
        <Card title="Coming Soon">
          <Text className="text-gray-600">
            Member management features will be available soon!
          </Text>
        </Card>
      </View>
    </SafeAreaView>
  );
}
