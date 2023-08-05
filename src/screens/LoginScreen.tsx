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
  const { signInWithGoogle } = useAuth();
  const tailwind = useTailwind();
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ImageBackground
        resizeMode="cover"
        style={{ flex: 1 }}
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      />

      {/* <TouchableOpacity 
        onPress={signInWithGoogle}
        style={{ position: 'absolute', bottom: 100, width: 142 , padding: 10 , backgroundColor:'white', borderRadius: 20,left:'35%'}}
        >
          <Text style={{textAlign:'center', fontWeight:'500'}} >Let's get started</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={[
          tailwind("absolute bottom-40 w-52 bg-white p-4 rounded-2xl"),
          { marginHorizontal: "25%" },
        ]}
      >
        <Text
          style={tailwind("font-semibold text-center")}
          onPress={signInWithGoogle}
        >
          Sign In With Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
