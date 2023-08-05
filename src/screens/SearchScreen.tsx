import { View, Image } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";

const SearchScreen = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("flex-1 justify-center items-center")}>
      <Image
        source={{
          uri: "https://humornama.com/wp-content/uploads/2020/10/Padhai-Likhai-Karo-meme-template-of-Mirzapur-series-1024x576.jpg",
        }}
        style={[
          {
            width: 400, // Replace with your desired width for the image
            height: 300, // Replace with your desired height for the image
            borderRadius: 20,
            borderTopRightRadius: 0,
          },
        ]}
        resizeMode="cover" // Uncomment this line if you want to specify the image resize mode
      />
    </View>
  );
};

export default SearchScreen;
