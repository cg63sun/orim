import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function registerForPushToken() {
  if (!Device.isDevice) {
    console.log("실제 기기에서만 푸시 테스트 가능합니다.");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("푸시 권한이 허용되지 않았습니다.");
    return null;
  }

  try {
    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      Constants.easConfig?.projectId;

    const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
      .data;

    console.log("Expo Push Token:", token);
    return token;
  } catch (error) {
    console.log("푸시 토큰 발급 실패:", error);
    return null;
  }
}
