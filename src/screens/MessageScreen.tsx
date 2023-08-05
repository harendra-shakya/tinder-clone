import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingViewBase,
  PlatformColor,
  Platform,
  TouchableWithoutFeedbackBase,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "@/common/components/Header";
import getMatchedUserInfo from "@/utils/getMatchedUserInfo";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "@/common/hooks/useAuth";
import { useRoute } from "@react-navigation/native";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";
import ReceiverMessage from "@/common/components/ReceiverMessage";
import SenderMessage from "@/common/components/SenderMessage";
import { db } from "../../firbase";

const MessageScreen = () => {
  const tailwind = useTailwind();
  const { user } = useAuth();
  const { params } = useRoute();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const { matchDetails } = params;

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
  }, [matchDetails, db]);

  const sendMessage = () => {
    if (input != "") {
      addDoc(collection(db, "matches", matchDetails.id, "messages"), {
        timestamp: serverTimestamp(),
        userId: user.id,
        name: user.name,
        photoURL: matchDetails.users[user.id].photoUrl,
        message: input,
      });

      setInput("");
    }
  };

  return (
    <View style={tailwind("flex-1")}>
      <Header
        title={getMatchedUserInfo(matchDetails.users, user.id).name}
        callEnabled
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tailwind("flex-1")}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted={-1}
            style={tailwind("pl-4")}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.id ? (
                <SenderMessage key={messages.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>
        <View
          style={tailwind(
            "flex-row justify-between items-center border-t border-gray-200 px-5 py-2"
          )}
        >
          <TextInput
            multiline={true}
            style={tailwind("flex-1 h-10 text-lg")}
            placeholder="Send a message"
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button title="Send" color="#FF5864" onPress={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MessageScreen;
