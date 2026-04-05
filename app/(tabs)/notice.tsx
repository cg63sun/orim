import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default function notice() {
  const vToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await axios.get(
      "https://orim.yeosuai.com/wp-json/wp/v2/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.data) {
      throw new Error(" 토큰 실패");
    }
    console.log("오늘 : ", res.data.roles);
  };

  useEffect(() => {
    vToken();
  }, []);

  return (
    <View>
      <Text>notice</Text>
    </View>
  );
}
