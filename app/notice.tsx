import axios from "axios";
import React from "react";
import { Text } from "react-native";
import Animated from "react-native-reanimated";

export default function notice() {
  const vToken = async () => {
    const res = await axios.get(
      "https://orim.yeosuai.com/wp-json/wp/v2/users/me",
    );
    if (!res.data) {
      throw new Error(" 토큰을 가져오지 못함");
    }
    console.log(res.data);
  };

  vToken();

  return (
    <Animated.ScrollView>
      {Array.from({ length: 31 }).map((_, i) => (
        <Text style={{ padding: 20 }}>Item {i + 1}</Text>
      ))}
    </Animated.ScrollView>
  );
}
