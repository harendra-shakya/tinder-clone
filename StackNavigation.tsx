import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import ChatScreen from "@/screens/ChatScreen";
import LoginScreen from "@/screens/LoginScreen";
import { useAuth } from "@/common/hooks/useAuth";
import ModalScreen from "@/screens/ModalScreen";
import MatchScreen from "@/screens/MatchScreen";
import SearchScreen from "@/screens/SearchScreen";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen name="Match" component={MatchScreen} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
