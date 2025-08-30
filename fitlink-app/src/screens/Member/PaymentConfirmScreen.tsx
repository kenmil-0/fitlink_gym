import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useGymStore } from '../../store/useGymStore';
import { useAuthStore } from '../../store/useAuthStore';
import { subscriptionsAPI } from '../../api/subscriptions';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';

const PaymentConfirmScreen = ({ navigation, route }: any) => {
  const { plan } = route.params;
  const { selectedGym } = useGymStore();
  const { user, updateUser } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!selectedGym || !plan) {
      Alert.alert('Error', 'Missing gym or plan information');
      return;
    }

    setIsProcessing(true);

    try {
      // Create subscription
      const subscriptionResult = await subscriptionsAPI.createSubscription({
        gym_id: selectedGym.id,
        plan_id: plan.id,
        duration: plan.duration,
      });

      if (!subscriptionResult.success) {
        throw new Error(subscriptionResult.error || 'Failed to create subscription');
      }

      // Mock payment confirmation
      const paymentResult = await subscriptionsAPI.confirmPayment(
        subscriptionResult.subscription.id,
        { method: 'card', amount: plan.price }
      );

      if (paymentResult.success) {
        // Update user subscription status
        if (user) {
          updateUser({
            ...user,
            subscription_status: 'active',
            default_gym_id: selectedGym.id,
          });
        }

        // Show success and navigate to home
        Alert.alert(
          'Payment Successful!',
          `Welcome to ${selectedGym.name}! Your subscription is now active.`,
          [
            {
              text: 'Continue',
              onPress: () => navigation.navigate('MemberHome'),
            },
          ]
        );
      } else {
        throw new Error('Payment failed');
      }
    } catch (error: any) {
      Alert.alert('Payment Failed', error.message || 'Please try again');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <LoadingSpinner />
        <Text className="text-gray-600 mt-4">Processing payment...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="mt-4 mb-8">
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Payment Confirmation
          </Text>
          <Text className="text-gray-600">
            Review your subscription details and complete payment
          </Text>
        </View>

        {/* Order Summary */}
        <View className="bg-gray-50 rounded-2xl p-6 mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Order Summary</Text>
          
          <View className="space-y-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Gym</Text>
              <Text className="font-semibold text-gray-800">{selectedGym?.name}</Text>
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Plan</Text>
              <Text className="font-semibold text-gray-800">{plan?.name}</Text>
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Duration</Text>
              <Text className="font-semibold text-gray-800">{plan?.duration} days</Text>
            </View>
            
            <View className="border-t border-gray-200 pt-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-bold text-gray-800">Total</Text>
                <Text className="text-2xl font-bold text-green-500">₦{plan?.price}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Payment Method</Text>
          
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-blue-100 rounded-full justify-center items-center mr-3">
                <Ionicons name="card" size={24} color="#3b82f6" />
              </View>
              <View>
                <Text className="font-semibold text-gray-800">Credit/Debit Card</Text>
                <Text className="text-gray-600 text-sm">**** **** **** 1234</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
          </View>
        </View>

        {/* Features Included */}
        <View className="bg-green-50 rounded-2xl p-6 mb-8">
          <Text className="text-lg font-bold text-gray-800 mb-4">What's Included</Text>
          <View className="space-y-2">
            {plan?.features.map((feature, index) => (
              <View key={index} className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                <Text className="text-gray-700 ml-2">{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Payment Button */}
        <View className="mb-6">
          <Button
            title={`Pay ₦${plan?.price}`}
            onPress={handlePayment}
            className="w-full"
          />
        </View>

        {/* Terms */}
        <Text className="text-gray-500 text-center text-sm mb-6">
          By completing this payment, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PaymentConfirmScreen;
