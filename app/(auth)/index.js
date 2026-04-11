import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constant from "expo-constants";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import API_BASE_URL from "../../constants/api";

import Input from "../../components/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { logIn } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Tous les champs doivent être remplis");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/user/log_in`,
        {
          email: email.trim(),
          password: password.trim(),
        },
      );

      if (data.id && data.token) {
        // On enregistre le token et l'id de l'utilisateur dans le contexte.
        await logIn(data.token, data.id);
      } else {
        setErrorMessage("Une erreur est survenue");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || error.message || "Erreur de connexion",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Image source={require("../../images/Logo.jpg")} style={styles.logo} />

      <Text style={styles.title}>Log In</Text>
      <Text style={styles.subtitle}>Welcome back</Text>

      <View style={styles.authCard}>
        <View style={styles.form}>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTrue={true}
          />
        </View>

        {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.button, isLoading && styles.buttonDisabled]}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          router.push("/register");
        }}
      >
        <Text style={styles.signupText}>Don't have an account ? Sign Up</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: Constant.statusBarHeight + 30,
    paddingHorizontal: 20,
    backgroundColor: "#fff5f8",
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginBottom: 24,
    borderRadius: 70,
    backgroundColor: "#ffffff",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#ff3e61",
    marginTop: 10,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#6d6d6d",
    marginBottom: 20,
  },
  authCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#ffe4eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  form: {
    width: "100%",
    gap: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ff3e61",
    paddingVertical: 15,
    borderRadius: 40,
    width: "100%",
    marginTop: 6,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  error: {
    color: "#ff3e61",
    marginBottom: 10,
    fontSize: 13,
    textAlign: "center",
  },
  signupText: {
    color: "#ff3e61",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 24,
  },
});
