import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/Button';
import Input from '../../components/Input';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Error', result.error || 'Login failed');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-6">
        <View className="flex-1 justify-center py-12">
          {/* Logo and Title */}
          <View className="items-center mb-12">
            <View className="w-20 h-20 bg-primary-green rounded-full items-center justify-center mb-4">
              <Text className="text-white text-2xl font-bold">F</Text>
            </View>
            <Text className="text-3xl font-bold text-neutral-gray mb-2">
              Welcome to Fitlink
            </Text>
            <Text className="text-gray-600 text-center">
              Your fitness journey starts here
            </Text>
          </View>

          {/* Login Form */}
          <View className="space-y-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              className="mt-6"
            />
          </View>

          {/* Register Link */}
          <View className="mt-8 items-center">
            <Text className="text-gray-600">
              Don't have an account?{' '}
              <Text className="text-primary-green font-semibold">
                Sign up here
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
