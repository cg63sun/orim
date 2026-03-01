import React from "react";
import { Text } from "react-native";
import Animated from "react-native-reanimated";

export default function notice() {
  return (
    <Animated.ScrollView>
      {Array.from({ length: 31 }).map((_, i) => (
        <Text style={{ padding: 20 }}>Item {i + 1}</Text>
      ))}
    </Animated.ScrollView>
  );
}
