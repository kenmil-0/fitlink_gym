import React from 'react';
import { TextInput, Text, View } from 'react-native';

interface InputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: string;
  className?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  className = '',
  autoCapitalize = 'none',
}: InputProps) {
  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="text-neutral-gray font-medium mb-2 text-sm">
          {label}
        </Text>
      )}
      <TextInput
        className={`border border-gray-300 rounded-lg px-4 py-3 text-base ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}
