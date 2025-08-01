import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DiagnosisProvider } from "@/hooks/use-diagnosis-store";
import { AuthProvider } from "@/hooks/use-auth-store";
import CustomSplashScreen from "@/components/SplashScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ 
      headerBackTitle: "Back",
      headerStyle: {
        backgroundColor: "#1E88E5",
      },
      headerTintColor: "#FFFFFF",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="symptom-checker" options={{ title: "Symptom Checker" }} />
      <Stack.Screen name="disease/[id]" options={{ title: "Disease Information" }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    // Keep the native splash screen visible
    SplashScreen.preventAutoHideAsync();
    
    // Simulate app initialization
    const initializeApp = async () => {
      try {
        // Add any initialization logic here
        // For example: loading fonts, checking auth state, etc.
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.warn('App initialization error:', error);
      } finally {
        // Hide the native splash screen
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, []);

  const handleSplashFinish = () => {
    setIsReady(true);
  };

  if (!isReady) {
    return <CustomSplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DiagnosisProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootLayoutNav />
          </GestureHandlerRootView>
        </DiagnosisProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}