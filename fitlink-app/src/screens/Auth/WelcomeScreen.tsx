import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import Button from '../../components/Button';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;
};

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        {/* Logo/Icon */}
        <View className="w-32 h-32 bg-green-100 rounded-full justify-center items-center mb-8">
          <Text className="text-6xl">💪</Text>
        </View>

        {/* Title */}
        <Text className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Welcome to Fitlink
        </Text>

        {/* Subtitle */}
        <Text className="text-lg text-gray-600 text-center mb-8 leading-6">
          Your all-in-one fitness companion. Connect with gyms, track your progress, and achieve your fitness goals.
        </Text>

        {/* Features */}
        <View className="w-full mb-12">
          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-3">✅</Text>
            <Text className="text-gray-700 flex-1">Easy gym check-ins with QR codes</Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-3">✅</Text>
            <Text className="text-gray-700 flex-1">Personalized workout routines</Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-3">✅</Text>
            <Text className="text-gray-700 flex-1">Nutrition and diet tracking</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-2xl mr-3">✅</Text>
            <Text className="text-gray-700 flex-1">Real-time notifications</Text>
          </View>
        </View>

        {/* Get Started Button */}
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('RoleSelect')}
          className="w-full"
        />
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
