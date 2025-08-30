import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { useAuthStore } from '../../store/useAuthStore';
import Button from '../../components/Button';

const MemberProfileScreen = () => {
  const { user, logout } = useAuthStore();
  const [showQR, setShowQR] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout, style: 'destructive' },
      ]
    );
  };

  const profileOptions = [
    {
      id: 'qr',
      title: 'Show My QR Code',
      description: 'Display your check-in QR code',
      icon: 'qr-code',
      onPress: () => setShowQR(true),
    },
    {
      id: 'subscription',
      title: 'Subscription Details',
      description: 'View and manage your subscription',
      icon: 'card',
      onPress: () => {},
    },
    {
      id: 'settings',
      title: 'Account Settings',
      description: 'Update your profile information',
      icon: 'settings',
      onPress: () => {},
    },
    {
      id: 'help',
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: 'help-circle',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="mt-4 mb-6">
          <View className="items-center mb-6">
            <View className="w-24 h-24 bg-green-100 rounded-full justify-center items-center mb-4">
              <Text className="text-3xl font-bold text-green-500">
                {user?.name?.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text className="text-2xl font-bold text-gray-800 mb-1">
              {user?.name}
            </Text>
            <Text className="text-gray-600 mb-2">{user?.email}</Text>
            <View className="bg-green-500 px-3 py-1 rounded-full">
              <Text className="text-white text-sm font-medium capitalize">
                {user?.role}
              </Text>
            </View>
          </View>
        </View>

        {/* Profile Options */}
        <View className="mb-6">
          {profileOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 mb-3 shadow-sm"
              onPress={option.onPress}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-gray-100 rounded-full justify-center items-center mr-4">
                  <Ionicons name={option.icon as any} size={24} color="#6b7280" />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-800 mb-1">
                    {option.title}
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    {option.description}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View className="mb-6">
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            className="w-full"
          />
        </View>
      </ScrollView>

      {/* QR Code Modal */}
      <Modal
        visible={showQR}
        transparent
        animationType="fade"
        onRequestClose={() => setShowQR(false)}
      >
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
          <View className="bg-white rounded-2xl p-6 mx-6 max-w-sm w-full">
            <View className="items-center">
              <Text className="text-xl font-bold text-gray-800 mb-4">
                Your Check-in QR Code
              </Text>
              <View className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                <QRCode
                  value={user?.uuid || `member_${user?.id}`}
                  size={200}
                  color="#000000"
                  backgroundColor="#FFFFFF"
                />
              </View>
              <Text className="text-gray-600 text-center mb-4">
                Show this QR code to gym staff for quick check-in
              </Text>
              <Button
                title="Close"
                onPress={() => setShowQR(false)}
                className="w-full"
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MemberProfileScreen;
