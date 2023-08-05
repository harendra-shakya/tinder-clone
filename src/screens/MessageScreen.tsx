import { View, Text } from "react-native";
import React from "react";
import Header from "@/common/components/Header";
import getMatchedUserInfo from "@/utils/getMatchedUserInfo";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "@/common/hooks/useAuth";
import { useRoute } from "@react-navigation/native";

const MessageScreen = () => {
  const tailwind = useTailwind();
  const { user } = useAuth();
  const { params } = useRoute();

  const { matchDetails } = params;

  return (
    <View style={tailwind("flex-1")}>
      <Header
        title={getMatchedUserInfo(matchDetails.users, user.id).name}
        callEnabled
      />
    </View>
  );
};

export default MessageScreen;
