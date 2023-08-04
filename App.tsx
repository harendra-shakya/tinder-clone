import { SafeAreaView } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import StackNavigation from "./StackNavigation";
import { NavigationContainer } from "@react-navigation/native";

import Hello from "@components/Hello";
import utilities from "./tailwind.json";

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </TailwindProvider>
  );
}
