import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/Button';
import Input from '../../components/Input';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'member' | 'trainer' | 'gym_owner'>('member');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const roles = [
    { key: 'member', label: 'Member', description: 'Join workouts and track progress' },
    { key: 'trainer', label: 'Trainer', description: 'Create routines and manage clients' },
    { key: 'gym_owner', label: 'Gym Owner', description: 'Manage gym and subscriptions' },
  ];

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await register(name, email, password, selectedRole);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Error', result.error || 'Registration failed');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-6">
        <View className="flex-1 py-8">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-16 h-16 bg-primary-green rounded-full items-center justify-center mb-4">
              <Text className="text-white text-xl font-bold">F</Text>
            </View>
            <Text className="text-2xl font-bold text-neutral-gray mb-2">
              Create Account
            </Text>
            <Text className="text-gray-600 text-center">
              Join the Fitlink community
            </Text>
          </View>

          {/* Registration Form */}
          <View className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Input
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            {/* Role Selection */}
            <View className="mb-4">
              <Text className="text-neutral-gray font-medium mb-3 text-sm">
                Select Your Role
              </Text>
              <View className="space-y-2">
                {roles.map((role) => (
                  <TouchableOpacity
                    key={role.key}
                    className={`p-4 rounded-lg border-2 ${
                      selectedRole === role.key
                        ? 'border-primary-green bg-green-50'
                        : 'border-gray-200 bg-white'
                    }`}
                    onPress={() => setSelectedRole(role.key as any)}
                  >
                    <Text className={`font-semibold ${
                      selectedRole === role.key ? 'text-primary-green' : 'text-neutral-gray'
                    }`}>
                      {role.label}
                    </Text>
                    <Text className="text-gray-600 text-sm mt-1">
                      {role.description}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Button
              title="Create Account"
              onPress={handleRegister}
              loading={loading}
              className="mt-6"
            />
          </View>

          {/* Login Link */}
          <View className="mt-8 items-center">
            <Text className="text-gray-600">
              Already have an account?{' '}
              <Text className="text-primary-green font-semibold">
                Sign in here
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
