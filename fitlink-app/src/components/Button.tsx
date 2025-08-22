import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseClasses = 'rounded-lg items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary-green',
    secondary: 'bg-primary-orange',
    outline: 'border-2 border-primary-green',
  };

  const sizeClasses = {
    small: 'px-4 py-2',
    medium: 'px-6 py-3',
    large: 'px-8 py-4',
  };

  const textClasses = {
    primary: 'text-white font-semibold',
    secondary: 'text-white font-semibold',
    outline: 'text-primary-green font-semibold',
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <TouchableOpacity
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled ? 'opacity-50' : ''
      }`}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? '#22c55e' : '#ffffff'} 
          size="small" 
        />
      ) : (
        <Text className={`${textClasses[variant]} ${textSizeClasses[size]}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
