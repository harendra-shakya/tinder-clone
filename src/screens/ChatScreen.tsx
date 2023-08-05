import { SafeAreaView, Text } from "react-native";
import React from "react";
import Header from "@/common/components/Header";
import ChatList from "@/common/components/ChatList";

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
