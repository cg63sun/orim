import { useAuthStore } from "@/src/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const login = useAuthStore((state) => state.login);

  // 🔥 입력값 상태
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log("로그인 버튼 클릭됨");
    if (!username.trim() || !password.trim()) {
      Alert.alert("아이디와 비밀번호를 입력하세요");
      return;
    }

    try {
      setLoading(true);
      console.log("login 호출 직전");
      await login(username, password);
      console.log("login 성공 후");
    } catch (err: any) {
      console.log("에러 발생:", err);
      Alert.alert(err.message || "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🏘 오림내동 마을</Text>
      <Text style={styles.subtitle}>우리 마을 공동체 앱</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="아이디"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="비밀번호"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
            style={styles.passwordInput}
            placeholderTextColor="#999"
          />

          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              name={secure ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>로그인</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: "#2c3e50",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    color: "#7f8c8d",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    backgroundColor: "#f5f7fa",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2ecc71",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
