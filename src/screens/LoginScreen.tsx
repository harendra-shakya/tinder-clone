import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@/common/hooks/useAuth";
import { useTailwind } from "tailwind-rn";
import { Button } from "react-native";

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  const tailwind = useTailwind();
  return (
    <View>
      <Text>LoginScreen</Text>
      <View style={tailwind("pt-12 items-center")}>
        <Button title="Sign In" onPress={signInWithGoogle} />
      </View>
    </View>
  );
};

export default LoginScreen;
