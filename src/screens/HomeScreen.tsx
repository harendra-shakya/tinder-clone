import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "@/common/hooks/useAuth";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";

const HomeScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const { user, logOut } = useAuth();

  return (
    <SafeAreaView style={tailwind("pt-8 mx-2")}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 5,
        }}
      >
        <TouchableOpacity>
          <Image
            source={require("../../public/full-logo.png")}
            style={{ height: 60, width: 120 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={40} color={"#FF5864"} />
        </TouchableOpacity>
      </View>

      {/** Cards */}

      <View style={tailwind("pt-12 items-center")}>
        <Button title="logOut" onPress={logOut} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
