import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "../hooks/useAuth";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const Footer = () => {
  const { user } = useAuth();
  const tailwind = useTailwind();
  const navigation = useNavigation();

  return (
    <>
      {user && (
        <View
          style={tailwind(
            "flex flex-row justify-evenly absolute w-full bottom-2"
          )}
        >
          <TouchableOpacity
            style={tailwind("")}
            onPress={() => navigation.navigate("Home")}
          >
            <Fontisto name="tinder" size={50} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            style={tailwind("")}
            onPress={() => navigation.navigate("Chat")}
          >
            <Ionicons name="chatbubbles-sharp" size={50} color={"gray"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={tailwind("")}
            onPress={() => navigation.navigate("Modal")}
          >
            <FontAwesome name="user" size={50} color="gray" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Footer;
