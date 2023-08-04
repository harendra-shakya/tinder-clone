import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "@/common/hooks/useAuth";

const HomeScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const { user, logOut } = useAuth();

  return (
    <View>
      <Text>Hellow {user.name}</Text>
      <View style={tailwind("pt-12 items-center")}>
        <Button
          title="Chat"
          onPress={() => {
            navigation.navigate("Chat");
          }}
        />
      </View>

      <View style={tailwind("pt-12 items-center")}>
        <Button title="logOut" onPress={logOut} />
      </View>
    </View>
  );
};

export default HomeScreen;
