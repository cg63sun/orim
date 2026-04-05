// src/services/push.ts

import * as Notifications from "expo-notifications";

export const registerForPush = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") return null;

  const tokenData = await Notifications.getExpoPushTokenAsync();
  return tokenData.data;
};
