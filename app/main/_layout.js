import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ff3e61",
        tabBarInactiveTintColor: "#a7a7a7",
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
          marginBottom: 8,
        },
        tabBarStyle: {
          height: 120,
          paddingTop: 10,
          paddingBottom: 14,
          borderTopWidth: 0,
          backgroundColor: "#ffffff",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size + 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Carte",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map-marker" size={size + 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size + 2} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
