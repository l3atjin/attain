// Notes:
  // grid layout has fixed 2 columns -> adjust based on screensize for responsiveness
  // the cart state should probably be a global or context, not local to the component
  // use useCallBack to improve the fetch performance

import { Text, View, FlatList, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import Header from "@/Components/Header";
import ItemCard from "@/Components/ItemCard";

export interface Item {
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Search query:", query);
    
    const filtered = items.filter((item) => {
      console.log("Item name:", item.name)
      if (!item.name) return false
      return item?.name.toLowerCase().includes(query.toLowerCase())
   });
    setFilteredItems(filtered);
  };

  // should validate if item has all required fields
  const validateItems = (rawItems: Item[]) => {
    return rawItems.filter((item) => {
      if (!item.name) return false
      return true
    })
  };

  const URL = 'https://retoolapi.dev/f0ee0v/items';

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        const validatedItems = validateItems(data);
        setItems(validatedItems);
        setFilteredItems(validatedItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#356B82]">
      <Header onSearch={handleSearch} searchQuery={searchQuery} cartLength={cart.length}/>
      <View className="flex-1 bg-[#BDDAE0] -mb-10">
        <FlatList
          className="flex-1"
          data={filteredItems}
          renderItem={({ item }) => <ItemCard itemDetails={item} setCart={setCart} cart={cart} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
        />
      </View>
    </SafeAreaView>
  );
}
  