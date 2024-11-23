import { Text, View, FlatList, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { Image,ImageBackground } from 'expo-image';

interface Item {
  id: number;
  oos: string;
  qoh: string;
  name: string;
  size: string;
  upc1: string;
  upc2: string;
  image: string;
  price: string;
  metadata: string;
  supplier: string;
  unit_size: string;
  created_at: string;
  nacs_category: string;
  discounted_price: string;
  nacs_subcategory: string;
}

export default function Index() {
  const [items, setItems] = useState<Item[]>([]);
  const [cart, setCart] = useState<Item[]>([]);

  const Header = () => {
    return (
      <View className="px-8 py-6 bg-[#356B82]">
        <Text className="text-2xl font-bold text-white">Order Book</Text>
        <View className="flex-row items-center bg-gray-100 border rounded-full w-full px-4 mt-2">
          <Ionicons name="search" size={20} color="#666" />
          <TextInput 
            placeholder="Search"
            className="flex-1 h-10 ml-2"
            placeholderTextColor="#666"
          />
        </View>
      </View>
    );
  };

  const ItemCard = ({ itemDetails }: { itemDetails: Item } ) => {
    const SaleTag = () => {
      return (
        <View className="absolute top-2 left bg-green-500 px-2 py-1 rounded-full">
          <Text className="text-white text-xs font-bold">sale</Text>
        </View>
      );
    }

    const AddButton = ({ onClick }: { onClick: () => void }) => {
      return (
        <TouchableOpacity
          className="absolute bottom-2 right-2 bg-[#356B82] px-2 py-2 rounded-full"
          onPress={onClick}
        >
          <Ionicons name="add" size={16} color="white" />
        </TouchableOpacity>
      );
    }
 
    return (
      <View className="bg-white rounded-lg p-4 mb-4 flex-1 mx-4">
        <View className="relative">
          <Image
            source={{ uri: itemDetails.image }}
            style={{ width: '100%', height: 150 }}
            contentFit="cover"
          />

          {itemDetails.discounted_price !== "" && <SaleTag />}
          <AddButton onClick={() => setCart([...cart, itemDetails])}/>
          
        </View>
       
        <Text className="text-gray-600 underline">{itemDetails.supplier}</Text>
        <Text className="font-bold text-gray-800">{itemDetails.name}</Text>
        <Text className="text-gray-600">{itemDetails.price}</Text>
      </View>
    );
  };

  const URL = 'https://retoolapi.dev/f0ee0v/items';

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setItems(data);
        console.log(JSON.stringify(data[0], null, 2));
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, []);

  // Notes:
  // grid layout has fixed 2 columns -> adjust based on screensize for responsiveness
  // the cart state should probably be a global or context, not local to the component

  return (
    <SafeAreaView className="flex-1 bg-[#356B82]">
      <Header />
      <View className="flex-1 bg-[#BDDAE0] -mb-10">
        <FlatList
          className="flex-1"
          data={items}
          renderItem={({ item }) => <ItemCard itemDetails={item} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
        />
      </View>
    </SafeAreaView>
  );
}
