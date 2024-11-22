import { Stack, Tabs } from 'expo-router';
import 'react-native-reanimated';
import "../global.css";


export default function RootLayout() {

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
    </Tabs>
  );
}
