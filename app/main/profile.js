import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ProfileScreen() {
  const { logOut, userId } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Text style={styles.subtitle}>Mon compte</Text>

      <View style={styles.card}>
        <Image
          source={{ uri: "https://www.gravatar.com/avatar/?d=mp" }}
          style={styles.avatar}
        />

        <Text style={styles.name}>Utilisateur Airbnb</Text>
        <Text style={styles.userId}>ID: {userId || "non disponible"}</Text>

        <Pressable
          style={styles.logoutButton}
          onPress={() => {
            logOut();
          }}
        >
          <Text style={styles.logoutText}>Se deconnecter</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f8",
    paddingHorizontal: 20,
    paddingTop: 26,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#ff3e61",
    marginTop: 10,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 18,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#ffe4eb",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    marginBottom: 12,
    backgroundColor: "#efefef",
  },
  name: {
    fontSize: 19,
    fontWeight: "700",
    color: "#2b2b2b",
  },
  userId: {
    marginTop: 6,
    fontSize: 13,
    color: "#777",
  },
  logoutButton: {
    marginTop: 18,
    backgroundColor: "#ff3e61",
    width: "100%",
    borderRadius: 40,
    paddingVertical: 14,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
