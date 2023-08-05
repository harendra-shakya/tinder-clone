import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";

const MatchScreen = () => {
  const nav = useNavigation();
  const { params } = useRoute();
  const tailwind = useTailwind();

  const { myFullProfile, userSwiped } = params;

  return (
    <View style={[tailwind("h-full bg-red-500 pt-20"), { opacity: 0.89 }]}>
      <View style={tailwind("justify-center px-10 pt-20")}>
        <Image
          style={[tailwind("h-20 w-full"), { resizeMode: "contain" }]}
          source={{
            uri: "https://e9digital.com/love-at-first-website/images/its-a-match.png",
          }}
        />
      </View>
      <Text style={tailwind("text-white text-center mt-5")}>
        You and {userSwiped.name} have liked each other.
      </Text>
      <View style={tailwind("flex-row justify-evenly mt-5")}>
        <Image
          style={tailwind("h-32 w-32 rounded-full")}
          source={{ uri: myFullProfile.photoUrl }}
        />
        <Image
          style={tailwind("h-32 w-32 rounded-full")}
          source={{ uri: userSwiped.photoUrl }}
        />
      </View>
      <TouchableOpacity
        style={tailwind("bg-white m-5 px-10 py-8 rounded-full mt-20")}
        onPress={() => {
          nav.goBack();
          nav.navigate("Chat");
        }}
      >
        <Text style={tailwind("text-center")}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;
