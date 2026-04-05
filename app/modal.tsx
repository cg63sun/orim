import * as Location from "expo-location";
import { Link, useRouter } from "expo-router";
import { Alert, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { sendSOSRequest } from "../src/services/sos";

export default function SosModal() {
  const router = useRouter();

  const sendSOS = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("위치 권한이 필요합니다.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      await sendSOSRequest({
        user_name: "홀길동",
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        message: "긴급 도움 요청",
      });

      Alert.alert("SOS가 전송되었습니다.");
      router.dismiss();
    } catch (error) {
      Alert.alert("SOS 전송 실패", "네트워크 상태를 확인해주세요.");
    }
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={{ marginBottom: 100 }} type="title">
        긴급 도움 요청
      </ThemedText>
      <ThemedText style={styles.description}>
        정말 긴급 요청을 보내시겠습니까?
      </ThemedText>
      <ThemedText type="link" onPress={sendSOS} style={styles.link}>
        ✅ 요청 보내기
      </ThemedText>

      <Link href="/(tabs)" dismissTo style={styles.link}>
        <ThemedText style={styles.link} type="link">
          ❌ 취소
        </ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  description: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 24,
    fontWeight: 700,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    fontSize: 30,
    fontWeight: 700,
  },
  title: {
    marginBottom: 100,
  },
});
