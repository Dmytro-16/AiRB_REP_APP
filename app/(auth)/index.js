import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constant from "expo-constants";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

import Input from "../../components/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("EH3E");
  const [password, setPassword] = useState("123456");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const { logIn } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const { data } = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          {
            email,
            password,
          },
        );

        console.log(data);

        if (data.id && data.token) {
          // User logged in successfully
          // On enregistre le token et l'id de l'utilisateur dans le context
          logIn(data.token, data.id);
          // alert("Connexion réussie");
          // TODO: store token (e.g. AsyncStorage) and navigate to home
          // router.push("main/home/rooms");
        } else {
          setErrorMessage("Une erreur est survenue");
        }
      } catch (error) {
        console.log("catch Connexion****", error);
        setErrorMessage(
          error.response?.data?.error || error.message || "Erreur de connexion",
        );
      }
    } else {
      setErrorMessage("Tous les champs doivent être remplis");
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Image source={require("../../images/Logo.jpg")} style={styles.logo} />

      <Text>Log In</Text>

      <View style={styles.form}>
        <Input
          placeholder="nono@airbnb-api.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="pass"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTrue={true}
        />
      </View>

      <Text>{errorMessage}</Text>

      <TouchableOpacity onPress={handleSubmit}>
        <Text>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push("/register");
        }}
      >
        <Text>Don't have an account ? Sign Up</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: Constant.statusBarHeight + 50,
    backgroundColor: "#fff5f8",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff3e61",
    marginBottom: 30,
  },
  form: {
    width: "85%",
    gap: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ff3e61",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 40,
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
  },
  signupText: {
    color: "#ff3e61",
    fontWeight: "500",
  },
});
