import { View, Text, Pressable } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ProfileScreen() {
  const { logOut } = useContext(AuthContext);

  return (
    <View>
      <Text>ProfileScreen</Text>

      <Pressable
        onPress={() => {
          // On déconnecte l'utilisateur
          logOut();
        }}
      >
        <Text> Log Out </Text>
      </Pressable>
    </View>
  );
}
