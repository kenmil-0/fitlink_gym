import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useGymStore } from '../../store/useGymStore';
import { gymsAPI } from '../../api/gyms';
import Button from '../../components/Button';
import Input from '../../components/Input';
import LoadingSpinner from '../../components/LoadingSpinner';

const GymDiscoveryScreen = ({ navigation }: any) => {
  const { availableGyms, setAvailableGyms, setSelectedGym, setLoading, isLoading } = useGymStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const cities = ['All Cities', 'Asaba', 'Lagos', 'Abuja', 'Port Harcourt', 'Kano'];

  useEffect(() => {
    fetchGyms();
  }, []);

  const fetchGyms = async () => {
    setLoading(true);
    const filters: any = {};
    if (selectedCity && selectedCity !== 'All Cities') {
      filters.city = selectedCity;
    }
    if (searchQuery) {
      filters.search = searchQuery;
    }

    const result = await gymsAPI.getGyms(filters);
    if (result.success) {
      setAvailableGyms(result.gyms);
    } else {
      Alert.alert('Error', result.error || 'Failed to fetch gyms');
    }
    setLoading(false);
  };

  const handleGymSelect = (gym: any) => {
    setSelectedGym(gym);
    navigation.navigate('SubscriptionPlans');
  };

  const handleSearch = () => {
    fetchGyms();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="mt-4 mb-6">
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Find Your Gym
          </Text>
          <Text className="text-gray-600">
            Discover gyms near you and choose your fitness home
          </Text>
        </View>

        {/* Search and Filter */}
        <View className="mb-6">
          <Input
            label="Search Gyms"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by name or location"
            className="mb-4"
          />
          
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Filter by City</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row space-x-2">
                {cities.map((city) => (
                  <TouchableOpacity
                    key={city}
                    className={`px-4 py-2 rounded-full border ${
                      selectedCity === city || (city === 'All Cities' && !selectedCity)
                        ? 'bg-green-500 border-green-500'
                        : 'bg-white border-gray-300'
                    }`}
                    onPress={() => {
                      setSelectedCity(city === 'All Cities' ? '' : city);
                      fetchGyms();
                    }}
                  >
                    <Text
                      className={`font-medium ${
                        selectedCity === city || (city === 'All Cities' && !selectedCity)
                          ? 'text-white'
                          : 'text-gray-700'
                      }`}
                    >
                      {city}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <Button
            title="Search"
            onPress={handleSearch}
            variant="outline"
            className="w-full"
          />
        </View>

        {/* Gym List */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {availableGyms.length === 0 ? (
            <View className="items-center py-12">
              <Ionicons name="location-outline" size={64} color="#9ca3af" />
              <Text className="text-gray-500 text-lg mt-4 text-center">
                No gyms found in this area
              </Text>
              <Text className="text-gray-400 text-center mt-2">
                Try adjusting your search or location
              </Text>
            </View>
          ) : (
            availableGyms.map((gym) => (
              <TouchableOpacity
                key={gym.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm"
                onPress={() => handleGymSelect(gym)}
                activeOpacity={0.7}
              >
                <View className="flex-row items-start">
                  <View className="w-16 h-16 bg-green-100 rounded-full justify-center items-center mr-4">
                    <Ionicons name="fitness" size={24} color="#22c55e" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl font-semibold text-gray-800 mb-1">
                      {gym.name}
                    </Text>
                    <Text className="text-gray-600 mb-2">
                      {gym.address}
                    </Text>
                    <View className="flex-row items-center">
                      <Ionicons name="location" size={16} color="#6b7280" />
                      <Text className="text-gray-500 ml-1">{gym.city}</Text>
                      {gym.distance && (
                        <>
                          <Text className="text-gray-500 mx-2">•</Text>
                          <Text className="text-gray-500">{gym.distance}km away</Text>
                        </>
                      )}
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default GymDiscoveryScreen;
