import { View, TouchableOpacity } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "../hooks/useAuth";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { useNavigationState } from "@react-navigation/native";

const Footer = () => {
  const { user } = useAuth();
  const tailwind = useTailwind();
  const navigation = useNavigation();

  const ICON_SIZE: number = 45;

  const screenName = useNavigationState(
    (state) => state?.routes[state.index].name
  );

  return (
    <>
      {user && screenName !== "Message" && (
        <View
          style={tailwind(
            "flex flex-row justify-evenly absolute w-full bottom-4"
          )}
        >
          <TouchableOpacity
            style={tailwind("")}
            onPress={() => navigation.navigate("Home")}
          >
            <Fontisto name="tinder" size={ICON_SIZE} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            style={tailwind("")}
            onPress={() => navigation.navigate("Search")}
          >
            <MaterialCommunityIcons
              name="account-search"
              size={ICON_SIZE}
              color="gray"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={tailwind("")}
            onPress={() => navigation.navigate("Chat")}
          >
            <Ionicons
              name="chatbubbles-sharp"
              size={ICON_SIZE}
              color={"gray"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={tailwind("")}
            onPress={() => navigation.navigate("Modal")}
          >
            <FontAwesome name="user" size={ICON_SIZE} color="gray" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Footer;
