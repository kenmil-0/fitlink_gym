import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import Button from '../../components/Button';

type RoleSelectScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'RoleSelect'>;
};

const RoleSelectScreen = ({ navigation }: RoleSelectScreenProps) => {
  const roles = [
    {
      id: 'member',
      title: 'Gym Member',
      description: 'Access gym facilities, track workouts, and manage subscriptions',
      icon: 'person-outline',
      color: '#22c55e',
    },
    {
      id: 'gym_owner',
      title: 'Gym Owner',
      description: 'Manage your gym, members, and business operations',
      icon: 'business-outline',
      color: '#f97316',
    },
    {
      id: 'instructor',
      title: 'Instructor/Staff',
      description: 'Help members, manage check-ins, and provide training',
      icon: 'fitness-outline',
      color: '#3b82f6',
    },
  ];

  const handleRoleSelect = (role: 'member' | 'gym_owner' | 'instructor') => {
    navigation.navigate('Register', { role });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="mt-8 mb-8">
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Choose Your Role
          </Text>
          <Text className="text-gray-600">
            Select how you'll be using Fitlink
          </Text>
        </View>

        {/* Role Options */}
        <View className="flex-1">
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-4 shadow-sm"
              onPress={() => handleRoleSelect(role.id as any)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <View 
                  className="w-16 h-16 rounded-full justify-center items-center mr-4"
                  style={{ backgroundColor: `${role.color}20` }}
                >
                  <Ionicons 
                    name={role.icon as any} 
                    size={28} 
                    color={role.color} 
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-semibold text-gray-800 mb-1">
                    {role.title}
                  </Text>
                  <Text className="text-gray-600 leading-5">
                    {role.description}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Already have account */}
        <View className="mb-6">
          <Text className="text-center text-gray-600 mb-4">
            Already have an account?
          </Text>
          <Button
            title="Sign In"
            onPress={() => navigation.navigate('Login', {})}
            variant="outline"
            className="w-full"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RoleSelectScreen;
