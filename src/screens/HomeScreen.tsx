import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "@/common/hooks/useAuth";
import { Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import SafeViewAndroid from "@/utils/SafeViewAndroid";

import generateId from "@/utils/generateIds";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firbase";

const dummyData = [
  {
    name: "Mitsuri",
    job: "107 | Demon Slayer",
    photoUrl:
      "https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/7/74/Mitsuri_anime.png/revision/latest?cb=20230614072150",
    age: 30,
    id: 12,
  },
  {
    name: "Nezuko",
    job: "Demon",
    photoUrl:
      "https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/4/4d/Nezuko_anime.png/revision/latest?cb=20211119014953",
    age: 30,
    id: 12,
  },

  {
    name: "Kanao",
    job: "Demon Slayer",
    photoUrl:
      "https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/c/cd/Kanao_anime.png/revision/latest?cb=20191028091138",
    age: 30,
    id: 12,
  },

  {
    name: "Kanae Kocho",
    job: "Hashira",
    photoUrl:
      "https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/d/dc/Kanae_Kocho.png/revision/latest?cb=20210524131850",
    age: 30,
    id: 12,
  },

  {
    name: "Raju Bhai",
    job: "Rich Person",
    photoUrl:
      "https://scontent.fbho3-1.fna.fbcdn.net/v/t1.6435-9/106372903_147240663605582_6546821225802705377_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=mVzW_QQbG6QAX9gsXMC&_nc_ht=scontent.fbho3-1.fna&oh=00_AfBuYMi94hZzMqly_s8M_pbRs1g5snBTf7MK4pSPPR4wAA&oe=64F52257",
    age: 30,
    id: 12,
  },
  {
    name: "Kachra Seth",
    job: "Business Man",
    photoUrl: "https://media.tenor.com/GTkqRCxIwvgAAAAd/phir-hera.gif",
    age: 34,
    id: 13,
  },
  {
    name: "Majnu Bhai",
    job: "Artist",
    photoUrl: "https://c.ndtvimg.com/gws/4548/assets/1.jpeg?1640334077",
    age: 31,
    id: 14,
  },
  {
    name: "Babu Rao",
    job: "Dhoti owner",
    photoUrl:
      "https://img.mensxp.com/media/content/2022/Jun/Header-Image_Amazon-Prime-Video_62b5b28b77500.jpeg?w=2200&h=1116&cc=1",
    age: 49,
    id: 14,
  },
  {
    name: "?",
    job: "Muje Sab Aata hai (Multi talented)",
    photoUrl:
      "https://pbs.twimg.com/media/D4kWLR_UYAAlpO4?format=jpg&name=900x900",
    age: 37,
    id: 15,
  },
  {
    name: "Titu Mama",
    job: "Andar Bahar",
    photoUrl:
      "https://scontent.fbho3-2.fna.fbcdn.net/v/t39.30808-6/305572618_394778882813161_7303895898430113193_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=u6MxU-Zle4cAX-qv828&_nc_ht=scontent.fbho3-2.fna&oh=00_AfCnHa7nYfQYmXvBODh4bo2onBwVzfhsxaCYikbaFmr93g&oe=64D2A2C3",
    age: 29,
    id: 16,
  },
];

const HomeScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const { user, logOut } = useAuth();
  const swipeRef = useRef();

  const [profilesState, setProfilesState] = useState([]);

  const checkObjectExists = async () => {
    try {
      const docRef = doc(db, "users", user.id);

      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        // nothing
      } else {
        navigation.navigate("Modal");
        console.log("Object does not exist.");
      }
    } catch (error) {
      console.error("Error checking object:", error);
    }
  };

  useLayoutEffect(() => {
    console.log(user);

    checkObjectExists();
  }, [user]);

  const swipeLeftHandler = async (index) => {
    if (!profilesState[index]) return;

    const userSwiped = profilesState[index];
    console.log(`${user.name} passed Left on ${userSwiped.name}`);

    setDoc(doc(db, "users", user.id, "left_swipes", userSwiped.id), userSwiped);
  };

  const swipeRightHandler = async (cardIndex) => {
    if (!profilesState[cardIndex]) return;

    const userSwiped = profilesState[cardIndex];
    const myFullProfile = await (
      await getDoc(doc(db, "users", user.id))
    ).data();

    //Check if the user swiped on you...
    getDoc(doc(db, "users", userSwiped.id, "right_swipes", user.id)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          //user has matched with you before you matched with them...
          //Create a MATCH!
          console.log(`Hooray, you matched with ${userSwiped.name}`);
          setDoc(
            doc(db, "users", user.id, "right_swipes", userSwiped.id),
            userSwiped
          );
          //CREATE A MATCH!
          setDoc(doc(db, "matches", generateId(user.id, userSwiped.id)), {
            users: {
              [user.id]: myFullProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.id, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate("Match", {
            myFullProfile,
            userSwiped,
          });

          return;
        } else {
          //User has swiped as first interaction between the two or didn't get swiped on...
          console.log(`You swiped on ${userSwiped.name} (${userSwiped.job})`);
          setDoc(
            doc(db, "users", user.id, "right_swipes", userSwiped.id),
            userSwiped
          );

          return;
        }
      }
    );

    //User has swiped as first interaction between the two...
    console.log(`You swiped on ${userSwiped.name} (${userSwiped.job})`);
    setDoc(
      doc(db, "users", user.id, "right_swipes", userSwiped.id),
      userSwiped
    );
  };

  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.id, "right_swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "users", user.id, "left_swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      console.log([...passedUserIds, ...swipedUserIds]);

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfilesState([
            ...snapshot.docs
              .filter((doc) => doc.id !== user.id)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })),
            ...dummyData,
          ]);
        }
      );

      // setProfilesState([...dummyData]);
    };
    console.log(profilesState, "loaded profiles");
    fetchCards();

    return unsub;
  }, []);

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      {/** Header */}

      <View
        style={tailwind("flex flex-row items-center justify-between px-6 py-5")}
      >
        <TouchableOpacity
          onPress={() => {
            let unsub;
            const fetchCards = async () => {
              const passes = await getDocs(
                collection(db, "users", user.id, "right_swipes")
              ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

              const swipes = await getDocs(
                collection(db, "users", user.id, "left_swipes")
              ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

              const passedUserIds = passes.length > 0 ? passes : ["test"];
              const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

              console.log([...passedUserIds, ...swipedUserIds]);

              unsub = onSnapshot(
                query(
                  collection(db, "users"),
                  where("id", "not-in", [...passedUserIds, ...swipedUserIds])
                ),
                (snapshot) => {
                  setProfilesState(
                    snapshot.docs
                      .filter((doc) => doc.id !== user.id)
                      .map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                      }))
                  );
                }
              );
            };
            console.log(profilesState, "loaded profiles");
            fetchCards();
            return unsub;
          }}
        >
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

      <View
        style={{
          flex: 1,
          marginTop: -25,
        }}
      >
        <Swiper
          ref={swipeRef}
          stackSize={5}
          cardIndex={0}
          cards={profilesState}
          // cards={dummyData}
          animateCardOpacity
          verticalSwipe={false}
          containerStyle={{ backgroundColor: "transparent" }}
          onSwipedLeft={(index) => {
            console.log("Swiped Left");
            swipeLeftHandler(index);
          }}
          onSwipedRight={(index) => {
            console.log("Swiped Right");
            swipeRightHandler(index);
          }}
          renderCard={(card) =>
            card ? (
              <View style={tailwind("relative bg-white h-3/4 rounded-xl")}>
                {/* <Text>{card.name}</Text> */}
                <Image
                  source={{ uri: card.photoUrl }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                    borderTopRightRadius: 0,
                  }}
                />

                <View
                  style={tailwind(
                    "absolute bottom-0 bg-white w-full flex-row justify-center items-center h-20 px-6 py-2"
                  )}
                >
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {card.name}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={tailwind(
                  "relative bg-white rounded-2xl h-520 flex justify-center items-center"
                )}
              >
                <Text style={{ fontWeight: 500, paddingBottom: 10 }}>
                  No More Profiles
                </Text>
                <Image
                  source={{
                    uri: "https://humornama.com/wp-content/uploads/2020/10/Padhai-Likhai-Karo-meme-template-of-Mirzapur-series-1024x576.jpg",
                  }}
                  style={{ height: 100, width: 100 }}
                  height={100}
                  width={100}
                />
              </View>
            )
          }
        />
      </View>

      {/** Swipe buttons */}

      <View
        style={tailwind(
          "flex flex-row justify-evenly absolute w-full bottom-20"
        )}
      >
        <TouchableOpacity
          style={tailwind(
            "items-center justify-center rounded-full w-16 h-16 bg-red-200"
          )}
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={24} color={"red"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={tailwind(
            "items-center justify-center rounded-full w-16 h-16 bg-green-200"
          )}
        >
          <Entypo
            name="heart"
            size={24}
            color={"green"}
            onPress={() => swipeRef.current.swipeRight()}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
