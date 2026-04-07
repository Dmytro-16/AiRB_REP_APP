import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constant from "expo-constants";
import axios from "axios";

// Composant réutilisable pour tous les champs
import Input from "../../components/Input";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    // console.log({ email, username, description, password, confirmPassword });

    if (email && username && description && password && confirmPassword) {
      // Si les champs sont tous remplis
      if (confirmPassword === password) {
        // Si les mot de passe sont identiques
        try {
          const { data } = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            {
              email,
              username,
              description,
              password,
            },
          );

          console.log(data);

          if (data.id && data.token) {
            // Si on reçoit un id et token on estime que le user est créé
            alert("user créé");
          } else {
            setErrorMessage("Une erreur est survenue");
          }
        } catch (error) {
          console.log("catch>>", error);
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage("Les mots de passe doivent être identique");
      }
    } else {
      setErrorMessage("Tous les chmaps doivent être rempli");
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Image source={require("../../images/Logo.jpg")} style={styles.logo} />

      <Text>Sign Up</Text>

      <View style={styles.form}>
        <Input
          placeholder="toto@mail.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="toto"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          placeholder="description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline={true}
        />
        <Input
          placeholder="pass"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTrue={true}
        />
        <Input
          placeholder="pass"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTrue={true}
        />
      </View>

      <Text>{errorMessage}</Text>

      <TouchableOpacity onPress={handleSubmit}>
        <Text>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push("/");
        }}
      >
        <Text>Already have an account ? Sign In</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: Constant.statusBarHeight + 50,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  form: {
    gap: 10,
    marginVertical: 30,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 3,
    height: 30,
  },
  multiline: {
    borderWidth: 1,
    height: 100,
  },
});
