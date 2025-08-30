import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MemberDietScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mt-4 mb-6">
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            My Diet
          </Text>
          <Text className="text-gray-600">
            Track your nutrition and meal plans
          </Text>
        </View>

        {/* Placeholder Content */}
        <View className="flex-1 justify-center items-center py-12">
          <View className="w-24 h-24 bg-orange-100 rounded-full justify-center items-center mb-6">
            <Ionicons name="nutrition" size={40} color="#f97316" />
          </View>
          <Text className="text-xl font-bold text-gray-800 mb-2 text-center">
            No Diet Plan Yet
          </Text>
          <Text className="text-gray-600 text-center mb-8 leading-6">
            Your nutritionist will create a personalized diet plan for you. Check back soon!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MemberDietScreen;
