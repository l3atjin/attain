import { View, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Item, Order } from '@/app';
import Modal from './Modal';

export default function ItemCard({
  itemDetails,
  setCart,
  cart,
}: {
  itemDetails: Item;
  setCart: React.Dispatch<React.SetStateAction<Order[]>>;
  cart: Order[];
}) {
  const [imageError, setImageError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const getCartQuantity = () => {
    return cart.reduce((total, item) => {
      if (item.id === itemDetails.id) {
        return total + item.quantity;
      }
      return total;
    }, 0);
  };

  const SaleTag = () => (
    <View className="absolute top-2 left bg-green-500 px-2 py-1 rounded-full">
      <Text className="text-white text-xs font-bold">sale</Text>
    </View>
  );

  const AddButton = () => {
    const cartQuantity = getCartQuantity();
    
    if (cartQuantity > 0) {
      return (
        <TouchableOpacity className="absolute bottom-2 right-2 bg-[#356B82] px-3 py-1 rounded-full" onPress={() => setModalVisible(true)} >
          <Text className="text-white font-bold">{cartQuantity}</Text>
        </TouchableOpacity>
      );
    }
  
    return (
      <TouchableOpacity
        className="absolute bottom-2 right-2 bg-[#356B82] px-2 py-2 rounded-full"
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={16} color="white" />
      </TouchableOpacity>
    );
  };

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 flex-1 mx-4">
      <View className="relative">
        <Image
          source={{
            uri: imageError ? 'https://via.placeholder.com/150?text=No+Image' : itemDetails.image // placeholder image if url is invalid.
          }}
          style={{ width: '100%', height: 150 }}
          contentFit="cover"
          onError={() => setImageError(true)}
        />
        {itemDetails.discounted_price !== '' && <SaleTag />}
        <AddButton />
      </View>
      <Text className="text-gray-600 underline">{itemDetails.supplier}</Text>
      <Text className="font-bold text-gray-800">{itemDetails.name}</Text>
      {itemDetails.discounted_price === '' ? (
        <Text className='text-gray-800 font-medium'>${itemDetails.price}</Text>
      ) : (
        <View className='flex-row items-center gap-2'>
          <Text className='text-green-500 font-bold'>${itemDetails.discounted_price}</Text>
          <Text className='text-black line-through'>${itemDetails.price}</Text>
        </View>
      )}
      {/* modal */}
      <Modal
        itemDetails={itemDetails}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        cart={cart}
        setCart={setCart}
      />

    </View>
  );
}
