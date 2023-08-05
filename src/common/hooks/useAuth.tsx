import { View, Text, ActivityIndicator } from "react-native";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { ReactElement } from "react";

import { auth } from "../../../firbase";

const AuthContext = createContext({});

WebBrowser.maybeCompleteAuthSession();

const config = {
  androidClientId: process.env.ANDROID_CLIENT_ID,
  iosClientId: process.env.IOS_CLIENT_ID,
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
  expoClientId:
    "822996900107-ifrqpflq68mkvrh4qr899c949ftcarfd.apps.googleusercontent.com",
  webClientId: process.env.ANDROID_CLIENT_ID,
};

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [test, setTest] = useState("Ok");
  const [user, setUser] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(true);

  // const signInWithGoogle = async () => {
  //   Google.logInAsync(config).then(async (response) => {
  //     if ((response.type = "success")) {
  //       // login
  //     }
  //   });
  // };

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     // setState({ userInfo });
  //   } catch (error) {}
  // };

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        console.log(user, "userrrr");

        if (user) {
          console.log("user is present");
          setUser({
            name: user.displayName!,
            pic: user.photoURL,
            email: user.email,
            id: user.uid,
          });
          setLoadingLogin(false);
        }
        if (!user) {
          setUser(null);
          setLoadingLogin(false);
        }
      }),
    []
  );

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(config);

  const signInWithGoogle = async () => {
    promptAsync();
  };

  const logOut = async () => {
    setLoadingLogin(true);
    await signOut(auth);
    setLoadingLogin(false);
  };

  const [token, setToken] = useState("");

  useEffect(() => {
    if (response?.type === "success") {
      console.log(response.params.id_token);
      // setToken(response.params.id_token);
      getUserInfo(response.params.id_token);
    }
  }, [response, token]);

  const getUserInfo = async (t: any) => {
    try {
      const credential = GoogleAuthProvider.credential(t);
      await signInWithCredential(auth, credential);
    } catch (error) {
      console.log(error, "error");
      // Add your own error handler here
    }
  };

  const memoedValue = useMemo(
    () => ({
      test,
      setTest,
      user,
      setUser,
      signInWithGoogle,
      token,
      loadingLogin,
      logOut,
    }),
    [user, loadingLogin, signInWithGoogle, logOut]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {loadingLogin ? <ActivityIndicator /> : children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
