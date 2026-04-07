import { AuthContextProvider } from "../context/AuthContext";
import RootNavigation from ".././navigation/RootNavigation";

export default function RootLayout() {
  return (
    <AuthContextProvider>
      {/* Composant contenant la navigation */}
      <RootNavigation />
    </AuthContextProvider>
  );
}
