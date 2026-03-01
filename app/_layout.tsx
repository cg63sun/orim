import { useAuthStore } from "@/src/store/useAuthStore";
import { Slot } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function _layout() {
  const restoreToken = useAuthStore((state) => state.restoreToken);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    restoreToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <Slot />;
}
// import { useAuthStore } from "@/src/store/useAuthStore";
// import { Slot } from "expo-router";
// import { useEffect } from "react";
// import { ActivityIndicator, View } from "react-native";

// export default function RootLayout() {
//   const token = useAuthStore((state) => state.token);
//   const isLoading = useAuthStore((state) => state.isLoading);
//   const restoreToken = useAuthStore((state) => state.restoreToken);

//   useEffect(() => {
//     restoreToken();
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator />
//       </View>
//     );
//   }

//   // 🔥 여기서 그룹을 직접 렌더링
//   return <Slot />;
// }
