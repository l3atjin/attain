import { Stack, Tabs } from 'expo-router';
import 'react-native-reanimated';
import "../global.css";
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function RootLayout() {

  return (
    <SafeAreaProvider>
      <Tabs screenOptions={{ headerShown: false }}/>
    </SafeAreaProvider>
    
  );
}
