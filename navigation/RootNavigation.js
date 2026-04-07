import { Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function RootNavigation() {
  const { userToken } = useContext(AuthContext);

  return (
    <Stack>
      {/* ROOT PROTECTED NON CONNECT > AUTH */}
      <Stack.Protected guard={!userToken}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      {/* ROOT PROTECTED CONNECT > MAIN */}
      <Stack.Protected guard={userToken}>
        <Stack.Screen name="main" />
      </Stack.Protected>
    </Stack>
  );
}
