import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Création du context***********************//
export const AuthContext = createContext();

// Création du provider//********************* */
export const AuthContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  // Fonction pour connecter un utilisateur
  const logIn = async (token, id, username = "") => {
    setUserId(id);
    setUserToken(token);
    const name = typeof username === "string" ? username.trim() : "";
    setUserName(name);
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("id", id);
    await AsyncStorage.setItem("username", name);
  };

  // Fonction pour déconnecter un utilisateur
  const logOut = async () => {
    setUserId("");
    setUserToken("");
    setUserName("");
    await AsyncStorage.multiRemove(["token", "id", "username"]);
  };

  useEffect(() => {
    const responseData = async () => {
      try {
        // on va chercher dans les clés userId et userToken
        const token = await AsyncStorage.getItem("token");
        const id = await AsyncStorage.getItem("id");
        const storedName = await AsyncStorage.getItem("username");
        if (token && id) {
          setUserToken(token);
          setUserId(id);
          setUserName(storedName || "");
        }
      } catch (error) {
        console.log("Error, AsyncStorage request", error);
      }
    };
    responseData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ userId, userToken, userName, logOut, logIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
