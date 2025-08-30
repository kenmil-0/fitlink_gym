import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuthStore } from '../../store/useAuthStore';
import Button from '../../components/Button';
import Input from '../../components/Input';
import LoadingSpinner from '../../components/LoadingSpinner';

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
  route: RouteProp<AuthStackParamList, 'Register'>;
};

const RegisterScreen = ({ navigation, route }: RegisterScreenProps) => {
  const { role } = route.params;
  const { register, isLoading } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    const result = await register({
      ...formData,
      role,
    });

    if (result.success) {
      // Registration successful, user will be automatically logged in
      // and redirected to appropriate screen based on role
    } else {
      Alert.alert('Registration Failed', result.error || 'Please try again');
    }
  };

  const getRoleTitle = () => {
    switch (role) {
      case 'member': return 'Gym Member';
      case 'gym_owner': return 'Gym Owner';
      case 'instructor': return 'Instructor/Staff';
      default: return 'User';
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mt-8 mb-8">
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </Text>
          <Text className="text-gray-600">
            Join Fitlink as a {getRoleTitle()}
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Enter your full name"
            error={errors.name}
            autoCapitalize="words"
          />

          <Input
            label="Email Address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="Enter your email"
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            placeholder="Create a password"
            error={errors.password}
            secureTextEntry
          />

          <Input
            label="Confirm Password"
            value={formData.password_confirmation}
            onChangeText={(text) => setFormData({ ...formData, password_confirmation: text })}
            placeholder="Confirm your password"
            error={errors.password_confirmation}
            secureTextEntry
          />
        </View>

        {/* Register Button */}
        <View className="mt-8 mb-6">
          <Button
            title="Create Account"
            onPress={handleRegister}
            className="w-full"
          />
        </View>

        {/* Sign In Link */}
        <View className="mb-6">
          <Text className="text-center text-gray-600">
            Already have an account?{' '}
            <Text 
              className="text-green-500 font-semibold"
              onPress={() => navigation.navigate('Login', { role })}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
