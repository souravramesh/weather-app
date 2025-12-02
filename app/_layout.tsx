// import {
//   Roboto_100Thin,
//   Roboto_200ExtraLight,
//   Roboto_300Light,
//   Roboto_400Regular,
//   Roboto_500Medium,
//   Roboto_600SemiBold,
//   Roboto_700Bold,
//   Roboto_800ExtraBold,
//   Roboto_900Black,
//   useFonts,
// } from "@expo-google-fonts/roboto";
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function RootLayout () {

  const [loaded, error] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });
  // const [loaded, error] = useFonts({
  //   Roboto_100Thin,
  //   Roboto_200ExtraLight,
  //   Roboto_300Light,
  //   Roboto_400Regular,
  //   Roboto_500Medium,
  //   Roboto_600SemiBold,
  //   Roboto_700Bold,
  //   Roboto_800ExtraBold,
  //   Roboto_900Black,
  // });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </QueryClientProvider>
  );
}