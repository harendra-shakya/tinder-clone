import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const MatchScreen = () => {
  const nav = useNavigation();
  const { params } = useRoute();

  const { myFullProfile, userSwiped } = params;

  return (
    <View>
      <Text>MatchScreen</Text>
    </View>
  );
};

export default MatchScreen;
