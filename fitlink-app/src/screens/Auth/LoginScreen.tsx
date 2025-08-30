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

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
  route: RouteProp<AuthStackParamList, 'Login'>;
};

const LoginScreen = ({ navigation, route }: LoginScreenProps) => {
  const { login, isLoading } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    const result = await login(formData.email, formData.password, rememberMe);

    if (result.success) {
      // Login successful, user will be automatically redirected
    } else {
      Alert.alert('Login Failed', result.error || 'Please check your credentials');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mt-8 mb-8">
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </Text>
          <Text className="text-gray-600">
            Sign in to your Fitlink account
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-4">
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
            placeholder="Enter your password"
            error={errors.password}
            secureTextEntry
          />

          {/* Remember Me */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View 
                className={`w-5 h-5 border-2 rounded mr-2 ${
                  rememberMe ? 'bg-green-500 border-green-500' : 'border-gray-300'
                }`}
                onTouchEnd={() => setRememberMe(!rememberMe)}
              >
                {rememberMe && (
                  <Text className="text-white text-xs text-center">✓</Text>
                )}
              </View>
              <Text className="text-gray-700">Remember me</Text>
            </View>
            <Text className="text-green-500 font-medium">Forgot Password?</Text>
          </View>
        </View>

        {/* Login Button */}
        <View className="mt-8 mb-6">
          <Button
            title="Sign In"
            onPress={handleLogin}
            className="w-full"
          />
        </View>

        {/* Register Link */}
        <View className="mb-6">
          <Text className="text-center text-gray-600">
            Don't have an account?{' '}
            <Text 
              className="text-green-500 font-semibold"
              onPress={() => navigation.navigate('RoleSelect')}
            >
              Create Account
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
