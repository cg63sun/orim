import { useAuthStore } from "@/src/store/useAuthStore";
import { Button, View } from "react-native";

export default function Profile() {
  const logout = useAuthStore((state) => state.logout);
  const token = useAuthStore((state) => state.token);
  console.log("현재 토큰:", token);

  return (
    <View style={{ padding: 50 }}>
      <Button title="로그아웃" onPress={logout} />
    </View>
  );
}
