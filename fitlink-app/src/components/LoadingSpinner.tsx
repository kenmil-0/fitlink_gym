import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = 'large',
  color = '#22c55e',
  text,
  className = '',
}: LoadingSpinnerProps) {
  return (
    <View className={`flex-1 justify-center items-center ${className}`}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text className="text-gray-600 mt-4 text-center">{text}</Text>
      )}
    </View>
  );
}
