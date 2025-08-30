import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';
import { checkinAPI } from '../../api/checkin';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';

const ScanCheckInScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: any) => {
    setScanned(true);
    setIsProcessing(true);

    try {
      // Use mock check-in for now
      const result = await checkinAPI.mockCheckIn(data);
      setScanResult(result);
    } catch (error) {
      Alert.alert('Error', 'Failed to process check-in');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
    setScanResult(null);
  };

  const handleCheckIn = async () => {
    if (!scanResult) return;

    setIsProcessing(true);
    try {
      const result = await checkinAPI.checkIn({ member_id: scanResult.member.id.toString() });
      if (result.success) {
        Alert.alert('Success', 'Check-in recorded successfully!');
        handleScanAgain();
      } else {
        Alert.alert('Error', result.error || 'Failed to record check-in');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to record check-in');
    } finally {
      setIsProcessing(false);
    }
  };

  if (hasPermission === null) {
    return <LoadingSpinner />;
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center px-6">
        <View className="w-24 h-24 bg-red-100 rounded-full justify-center items-center mb-6">
          <Ionicons name="camera-off" size={40} color="#ef4444" />
        </View>
        <Text className="text-xl font-bold text-gray-800 mb-2 text-center">
          Camera Permission Required
        </Text>
        <Text className="text-gray-600 text-center mb-8 leading-6">
          Please grant camera permission to scan member QR codes for check-in.
        </Text>
        <Button
          title="Grant Permission"
          onPress={() => BarCodeScanner.requestPermissionsAsync()}
          className="w-full"
        />
      </SafeAreaView>
    );
  }

  if (isProcessing) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <LoadingSpinner />
        <Text className="text-gray-600 mt-4">Processing check-in...</Text>
      </SafeAreaView>
    );
  }

  if (scanned && scanResult) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 px-6">
          {/* Header */}
          <View className="mt-4 mb-6">
            <Text className="text-3xl font-bold text-gray-800 mb-2">
              Check-in Result
            </Text>
            <Text className="text-gray-600">
              Member information and subscription status
            </Text>
          </View>

          {/* Result Card */}
          <View className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
            <View className="items-center mb-6">
              <View 
                className={`w-20 h-20 rounded-full justify-center items-center mb-4 ${
                  scanResult.member.subscription_status === 'active'
                    ? 'bg-green-100'
                    : 'bg-red-100'
                }`}
              >
                <Ionicons 
                  name={scanResult.member.subscription_status === 'active' ? 'checkmark' : 'close'} 
                  size={40} 
                  color={scanResult.member.subscription_status === 'active' ? '#22c55e' : '#ef4444'} 
                />
              </View>
              <Text className="text-2xl font-bold text-gray-800 mb-1">
                {scanResult.member.name}
              </Text>
              <Text className="text-gray-600">Member ID: {scanResult.member.id}</Text>
            </View>

            <View className="space-y-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600">Subscription Status</Text>
                <View 
                  className={`px-3 py-1 rounded-full ${
                    scanResult.member.subscription_status === 'active'
                      ? 'bg-green-100'
                      : 'bg-red-100'
                  }`}
                >
                  <Text 
                    className={`font-medium capitalize ${
                      scanResult.member.subscription_status === 'active'
                        ? 'text-green-700'
                        : 'text-red-700'
                    }`}
                  >
                    {scanResult.member.subscription_status}
                  </Text>
                </View>
              </View>

              {scanResult.member.subscription_end_date && (
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-600">Expires</Text>
                  <Text className="font-medium text-gray-800">
                    {new Date(scanResult.member.subscription_end_date).toLocaleDateString()}
                  </Text>
                </View>
              )}

              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600">Check-in Time</Text>
                <Text className="font-medium text-gray-800">
                  {new Date(scanResult.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="space-y-4">
            {scanResult.member.subscription_status === 'active' ? (
              <Button
                title="Record Check-in"
                onPress={handleCheckIn}
                className="w-full"
              />
            ) : (
              <View className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4">
                <Text className="text-red-700 text-center font-medium">
                  Subscription expired. Please ask member to renew.
                </Text>
              </View>
            )}
            
            <Button
              title="Scan Another QR"
              onPress={handleScanAgain}
              variant="outline"
              className="w-full"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1">
        {/* Header */}
        <View className="absolute top-12 left-6 right-6 z-10">
          <View className="bg-black bg-opacity-50 rounded-2xl p-4">
            <Text className="text-white text-xl font-bold text-center mb-2">
              Scan Member QR Code
            </Text>
            <Text className="text-white text-center opacity-80">
              Position the QR code within the frame
            </Text>
          </View>
        </View>

        {/* Scanner */}
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ flex: 1 }}
        />

        {/* Scan Frame Overlay */}
        <View className="absolute inset-0 justify-center items-center">
          <View className="w-64 h-64 border-2 border-white rounded-2xl">
            <View className="absolute -top-1 -left-1 w-8 h-8 border-l-4 border-t-4 border-green-500 rounded-tl-2xl" />
            <View className="absolute -top-1 -right-1 w-8 h-8 border-r-4 border-t-4 border-green-500 rounded-tr-2xl" />
            <View className="absolute -bottom-1 -left-1 w-8 h-8 border-l-4 border-b-4 border-green-500 rounded-bl-2xl" />
            <View className="absolute -bottom-1 -right-1 w-8 h-8 border-r-4 border-b-4 border-green-500 rounded-br-2xl" />
          </View>
        </View>

        {/* Bottom Instructions */}
        <View className="absolute bottom-12 left-6 right-6">
          <View className="bg-black bg-opacity-50 rounded-2xl p-4">
            <Text className="text-white text-center">
              Hold steady to scan the QR code
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScanCheckInScreen;
