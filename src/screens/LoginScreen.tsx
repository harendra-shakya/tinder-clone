import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useAuth } from "@/common/hooks/useAuth";
import { useTailwind } from "tailwind-rn";

const LoginScreen = () => {
  const { signInWithGoogle, loadingLogin } = useAuth();
  const tailwind = useTailwind();
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ImageBackground
        resizeMode="cover"
        style={{ flex: 1 }}
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      />

      <TouchableOpacity
        style={[
          tailwind("absolute bottom-40 w-52 bg-white p-4 rounded-2xl"),
          { marginHorizontal: "25%" },
        ]}
        disabled={loadingLogin}
      >
        <Text
          style={tailwind("font-semibold text-center")}
          onPress={signInWithGoogle}
        >
          {!loadingLogin ? "Sign In With Google" : "Signing In"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
