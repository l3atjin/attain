import { View, Text, TextInput } from 'react-native'
import React from 'react'
import cart from '@/app/cart';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ searchQuery, onSearch, cartLength }: { searchQuery: string, onSearch: (text: string) => void, cartLength: number }) {

  return (
    <View className="px-8 py-6 bg-[#356B82]">
      <Text className="text-2xl font-bold text-white">Order Book</Text>
      <View className="flex-row justify-center items-center mt-2 px-4 gap-2">
        <View className="flex-row items-center bg-gray-100 border rounded-full w-full px-4">
          <Ionicons name="search" size={20} color="#666" />
          <TextInput 
            placeholder="Search"
            className="flex-1 h-10 ml-2"
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={(text) => onSearch(text)}
          />
        </View>
        <View className="relative">
          <Ionicons name="cart" size={30} color="white" />
          <View className="absolute top-0 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
            <Text className="text-white text-xs font-bold">{cartLength}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}