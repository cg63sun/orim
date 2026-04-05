import { getSOSList } from "@/src/services/admin";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function AdminScreen() {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 50000); // 50초마다 갱신

    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    const res = await getSOSList();
    setList(res);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>🚨 SOS 요청 목록</Text>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              marginVertical: 5,
              backgroundColor: "#f2f2f2",
              borderRadius: 8,
            }}
          >
            <Text>👤 {item.user_name}</Text>
            <Text>
              📍 {item.latitude}, {item.longitude}
            </Text>
            <Text>🕒 {item.created_at}</Text>
            <Text>💬 {item.message}</Text>
          </View>
        )}
      />
    </View>
  );
}
