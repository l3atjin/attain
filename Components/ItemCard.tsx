import { View, Text, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Item, Order } from '@/app';

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
  const [quantity, setQuantity] = useState(1);

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
  const addToCart = () => {
    const existingItemIndex = cart.findIndex(item => item.id === itemDetails.id);
    
    if (existingItemIndex >= 0) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity = quantity;
      setCart(newCart);
    } else {
      const newItem = { id: itemDetails.id, quantity };
      setCart([...cart, newItem]);
    }
    
    setModalVisible(false);
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
      <Text className="text-gray-600">{itemDetails.price}</Text>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Modal Background */}
        <View className="flex flex-1 justify-end bg-black/50 mb-10">
          {/* Modal Content */}
          <View className="bg-white rounded-t-2xl p-4 relative">
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="absolute top-2 right-2"
            >
              <Ionicons name="close" size={36} color="#356B82" />
            </TouchableOpacity>

            <View className='flex-row mt-10 justify-between'>
              <Image
                source={{
                  uri: imageError ? 'https://via.placeholder.com/150?text=No+Image' : itemDetails.image // placeholder image if url is invalid.
                }}
                style={{ width: 100, height: 100, borderWidth: 1 }}
                contentFit="cover"
                onError={() => setImageError(true)}
              />
              <View className="flex-1">
                <Text className="text-lg font-bold text-wrap">{itemDetails.name}</Text>
                <View className='flex-row justify-between'>
                  <Text className='text-gray-600 font-medium'>Unit Size</Text>
                  <Text className='text-gray-600'>{itemDetails.unit_size} ct</Text>
                </View>
                <View className='flex-row justify-between'>
                  <Text className='text-gray-600 font-medium'>Price</Text>
                  {itemDetails.discounted_price === '' ? (
                    <Text className='text-black font-bold'>${itemDetails.price}</Text>
                  ) : (
                    <View className='flex-row items-center gap-2'>
                      <Text className='text-green-500 font-bold'>${itemDetails.discounted_price}</Text>
                      <Text className='text-black line-through'>${itemDetails.price}</Text>
                    </View>
                  )}
                  
                </View>
              </View>
              

            </View>
            
            <View className="flex-row items-center justify-between mt-10">
              <Text className="text-[#356B82] text-lg font-bold">Quantity</Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg overflow-hidden">
                <TouchableOpacity 
                  className="p-2 bg-[#356B82]" 
                  onPress={() => setQuantity(Math.max(0, quantity - 1))}
                >
                  <Text className="text-lg text-white font-bold px-2">-</Text>
                </TouchableOpacity>
                
                <TextInput
                  className="p-2 w-12 text-center"
                  keyboardType="numeric"
                  value={quantity.toString()}
                  onChangeText={(text) => setQuantity(Number(text) || 1)}
                />
                
                <TouchableOpacity 
                  className="p-2 bg-[#356B82]"
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Text className="text-lg text-white font-bold px-2">+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity className='bg-[#BDDAE0] p-2 rounded-lg mx-8 mt-10' onPress={addToCart}>
              <Text className='text-[#356B82] font-bold text-lg text-center'>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}
