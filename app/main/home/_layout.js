import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="rooms" />
      <Stack.Screen name="room" />
    </Stack>
  );
}
