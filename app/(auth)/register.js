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
import API_BASE_URL from "../../constants/api";

// Composant réutilisable pour tous les champs
import Input from "../../components/Input";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { logIn } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!email.trim() || !username.trim() || !description.trim() || !password.trim()) {
      setErrorMessage("Tous les champs doivent être remplis");
      return;
    }

    if (confirmPassword !== password) {
      setErrorMessage("Les mots de passe doivent etre identiques");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/user/sign_up`,
        {
          email: email.trim(),
          username: username.trim(),
          description: description.trim(),
          password: password.trim(),
        },
      );

      const userId = data.id ?? data._id;
      const nameFromApi =
        data.account?.username ?? data.username ?? username.trim();

      if (userId && data.token) {
        await logIn(data.token, userId, nameFromApi);
        alert("Compte cree avec succes");
        router.replace("/");
      } else {
        setErrorMessage("Une erreur est survenue");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || error.message || "Erreur d'inscription",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={70}
      extraHeight={140}
      showsVerticalScrollIndicator={false}
    >
      <Image source={require("../../images/Logo.jpg")} style={styles.logo} />

      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Create your account</Text>

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
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize="none"
          />
          <Input
            placeholder="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTrue={true}
          />
          <Input
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
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
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            router.push("/");
          }}
        >
          <Text style={styles.signupText}>
            Already have an account ? Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#fff5f8",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: Constant.statusBarHeight + 20,
    paddingBottom: 80,
    paddingHorizontal: 20,
    backgroundColor: "#fff5f8",
  },
  logo: {
    width: 120,
    height: 120,
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
    marginBottom: 16,
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
    marginBottom: 16,
  },
  form: {
    width: "100%",
    gap: 12,
    marginBottom: 14,
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
    marginBottom: 4,
    fontSize: 13,
    textAlign: "center",
  },
  signupText: {
    color: "#ff3e61",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 2,
  },
});
