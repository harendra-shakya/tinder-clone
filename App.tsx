import { SafeAreaView } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import StackNavigation from "./StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "@/common/hooks/useAuth";

import Hello from "@components/Hello";
import utilities from "./tailwind.json";

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <AuthProvider>
          <StackNavigation />
        </AuthProvider>
      </NavigationContainer>
    </TailwindProvider>
  );
}
