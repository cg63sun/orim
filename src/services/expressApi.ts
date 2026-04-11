// expressApi.ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const expressApi = axios.create({
  baseURL: "https://orim.yeosuai.com/api",
});

expressApi.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("expressApi 실행");

  return config;
});

export default expressApi;
