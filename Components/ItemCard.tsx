import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import cart from '@/app/cart';
import { Ionicons } from '@expo/vector-icons';
import { Item } from '@/app';
import { Image } from 'expo-image';

export default function ItemCard({ itemDetails, setCart, cart }: { itemDetails: Item, setCart: React.Dispatch<React.SetStateAction<Item[]>>, cart: Item[] }) {
  const [imageError, setImageError] = useState(false);

  const SaleTag = () => (
    <View className="absolute top-2 left bg-green-500 px-2 py-1 rounded-full">
      <Text className="text-white text-xs font-bold">sale</Text>
    </View>
  );

  const AddButton = ({ onClick }: { onClick: () => void }) => (
    <TouchableOpacity
      className="absolute bottom-2 right-2 bg-[#356B82] px-2 py-2 rounded-full"
      onPress={onClick}
    >
      <Ionicons name="add" size={16} color="white" />
    </TouchableOpacity>
  );

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 flex-1 mx-4">
      <View className="relative">
      <Image
          source={{
            uri: imageError ? "https://via.placeholder.com/150?text=No+Image" : itemDetails.image // placeholder image if url is invalid.
          }}
          style={{ width: '100%', height: 150 }}
          contentFit="cover"
          onError={() => setImageError(true)}
        />
        {itemDetails.discounted_price !== "" && <SaleTag />}
        <AddButton onClick={() => setCart([...cart, itemDetails])} />
      </View>
      <Text className="text-gray-600 underline">{itemDetails.supplier}</Text>
      <Text className="font-bold text-gray-800">{itemDetails.name}</Text>
      <Text className="text-gray-600">{itemDetails.price}</Text>
    </View>
  );
}
