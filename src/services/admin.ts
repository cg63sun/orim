import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const getSOSList = async () => {
  const token = await SecureStore.getItemAsync("token");

  return axios.get("https://orim.yeosuai.com/api/sos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
