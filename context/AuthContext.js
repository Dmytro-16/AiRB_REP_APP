import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Création du context***********************//
export const AuthContext = createContext();

// Création du provider//********************* */
export const AuthContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");
  const [userId, setUserId] = useState("");

  // Fonction pour connecter un utilisateur
  const logIn = async (token, id) => {
    setUserId(id);
    setUserToken(token);
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("id", id);
  };

  // Fonction pour déconnecter un utilisateur
  const logOut = async () => {
    setUserId("");
    setUserToken("");
    await AsyncStorage.removeItemItem("");
    await AsyncStorage.removeItem("");
  };

  useEffect(() => {
    const responseData = async () => {
      try {
        // on va chercher dans les clés userId et userToken
        const token = await AsyncStorage.getItem("token");
        const id = await AsyncStorage.getItem("id");
        if (token && id) {
          setUserToken(token);
          setUserId(id);
        }
      } catch (error) {
        console.log("Error, AsyncStorage request", error);
      }
    };
    responseData();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, userToken, logOut, logIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
