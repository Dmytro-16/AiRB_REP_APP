import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function MainLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{ title: "Map" }}
        tabBarIcon={({ color, size }) => (
          <FontAwesome name="map-marker" size={size} color={color} />
        )}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile" }}
        tabBarIcon={({ color, size }) => (
          <FontAwesome name="user" size={size} color={color} />
        )}
      />
    </Tabs>
  );
}
