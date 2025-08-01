import { Tabs } from "expo-router";
import React from "react";
import { Home, Camera, FileText, Settings } from "lucide-react-native";
import Colors from "@/constants/colors";
import AuthGuard from "@/components/AuthGuard";

export default function TabLayout() {
  return (
    <AuthGuard>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textLight,
          tabBarStyle: {
            backgroundColor: Colors.background,
            borderTopColor: Colors.border,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "DiagnoLite",
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="camera"
          options={{
            title: "Image Diagnosis",
            tabBarLabel: "Camera",
            tabBarIcon: ({ color }) => <Camera size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="guidelines"
          options={{
            title: "Guidelines",
            tabBarLabel: "Guidelines",
            tabBarIcon: ({ color }) => <FileText size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarLabel: "Settings",
            tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}