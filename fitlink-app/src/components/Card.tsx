import React from 'react';
import { View, Text } from 'react-native';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <View className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}>
      {title && (
        <Text className="text-lg font-semibold text-neutral-gray mb-3">
          {title}
        </Text>
      )}
      {children}
    </View>
  );
}
