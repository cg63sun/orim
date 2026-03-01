import { useAuthStore } from "@/src/store/useAuthStore";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
    </Stack>
  );
}
