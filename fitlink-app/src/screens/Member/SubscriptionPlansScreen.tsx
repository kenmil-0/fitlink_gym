import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useGymStore } from '../../store/useGymStore';
import { gymsAPI } from '../../api/gyms';
import { SubscriptionPlan } from '../../api/subscriptions';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';

const SubscriptionPlansScreen = ({ navigation }: any) => {
  const { selectedGym } = useGymStore();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedGym) {
      fetchPlans();
    }
  }, [selectedGym]);

  const fetchPlans = async () => {
    setIsLoading(true);
    const result = await gymsAPI.getGymPlans(selectedGym!.id);
    if (result.success) {
      setPlans(result.plans);
    } else {
      Alert.alert('Error', 'Failed to fetch subscription plans');
    }
    setIsLoading(false);
  };

  const handlePlanSelect = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    if (!selectedPlan) {
      Alert.alert('Error', 'Please select a plan to continue');
      return;
    }
    navigation.navigate('PaymentConfirm', { plan: selectedPlan });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!selectedGym) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-gray-600">No gym selected</Text>
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
          className="mt-4"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="mt-4 mb-6">
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Choose Your Plan
          </Text>
          <Text className="text-gray-600">
            Select a subscription plan for {selectedGym.name}
          </Text>
        </View>

        {/* Gym Info */}
        <View className="bg-green-50 rounded-2xl p-4 mb-6">
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-green-100 rounded-full justify-center items-center mr-3">
              <Ionicons name="fitness" size={20} color="#22c55e" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">
                {selectedGym.name}
              </Text>
              <Text className="text-gray-600">{selectedGym.address}</Text>
            </View>
          </View>
        </View>

        {/* Plans */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              className={`border-2 rounded-2xl p-6 mb-4 ${
                selectedPlan?.id === plan.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white'
              }`}
              onPress={() => handlePlanSelect(plan)}
              activeOpacity={0.7}
            >
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1">
                  <Text className="text-xl font-bold text-gray-800 mb-1">
                    {plan.name}
                  </Text>
                  <Text className="text-3xl font-bold text-green-500">
                    ₦{plan.price}
                    <Text className="text-lg text-gray-600 font-normal">/month</Text>
                  </Text>
                </View>
                {selectedPlan?.id === plan.id && (
                  <View className="w-6 h-6 bg-green-500 rounded-full justify-center items-center">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                )}
              </View>

              <View className="space-y-2">
                {plan.features.map((feature, index) => (
                  <View key={index} className="flex-row items-center">
                    <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                    <Text className="text-gray-700 ml-2 flex-1">{feature}</Text>
                  </View>
                ))}
              </View>

              <View className="mt-4 pt-4 border-t border-gray-200">
                <Text className="text-gray-600 text-sm">
                  Duration: {plan.duration} days
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Continue Button */}
        <View className="mt-6 mb-6">
          <Button
            title={selectedPlan ? `Continue with ${selectedPlan.name}` : 'Select a Plan'}
            onPress={handleContinue}
            disabled={!selectedPlan}
            className="w-full"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SubscriptionPlansScreen;
