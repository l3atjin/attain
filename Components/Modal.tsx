import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Item, Order } from '@/app';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';


export default function QuantityModal({
  itemDetails,
  visible,
  onClose,
  cart,
  setCart,
}: {
  itemDetails: Item;
  visible: boolean;
  onClose: () => void;
  cart: Order[];
  setCart: React.Dispatch<React.SetStateAction<Order[]>>;
}) {
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    const existingItemIndex = cart.findIndex((item) => item.id === itemDetails.id);

    if (existingItemIndex >= 0) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity = quantity;
      setCart(newCart);
    } else {
      const newItem = { id: itemDetails.id, quantity };
      setCart([...cart, newItem]);
    }

    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex flex-1 justify-end bg-black/50 mb-10">
        <View className="bg-white rounded-t-2xl p-4 relative">
          <TouchableOpacity onPress={onClose} className="absolute top-2 right-2">
            <Ionicons name="close" size={36} color="#356B82" />
          </TouchableOpacity>

          <View className="flex-row mt-10 justify-between">
            <Image
              source={{
                uri: imageError
                  ? 'https://via.placeholder.com/150?text=No+Image'
                  : itemDetails.image,
              }}
              style={{ width: 100, height: 100 }}
              contentFit="cover"
              onError={() => setImageError(true)}
            />
            <View className="flex-1">
              <Text className="text-lg font-bold text-wrap">{itemDetails.name}</Text>
              <View className="flex-row justify-between">
                <Text className="text-gray-600 font-medium">Unit Size</Text>
                <Text className="text-gray-600">{itemDetails.unit_size} ct</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600 font-medium">Price</Text>
                {itemDetails.discounted_price === '' ? (
                  <Text className="text-black font-bold">${itemDetails.price}</Text>
                ) : (
                  <View className="flex-row items-center gap-2">
                    <Text className="text-green-500 font-bold">${itemDetails.discounted_price}</Text>
                    <Text className="text-black line-through">${itemDetails.price}</Text>
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
          <TouchableOpacity
            className="bg-[#BDDAE0] p-2 rounded-lg mx-8 mt-10"
            onPress={addToCart}
          >
            <Text className="text-[#356B82] font-bold text-lg text-center">
              Add To Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
