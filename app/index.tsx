import { Text, View, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from 'expo-router';
import { useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
  const navigation = useNavigation();

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

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-[#356B82]">
      <Header />
      <View className="flex-1 bg-[#BDDAE0] -mb-10">
        <ScrollView className="flex-1 px-4">
          <Text>Home</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
