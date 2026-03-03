import React from "react";
import { Text, View } from "react-native";

export default function sos() {
  return (
    <View>
      <Text>sosㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱ</Text>
    </View>
  );
}

// import * as Location from "expo-location";
// import React from "react";
// import { Alert, Button, View } from "react-native";

// export default function sos() {
//   const sendSOS = async () => {
//     const { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") return;
//     const location = await Location.getCurrentPositionAsync();
//     console.log(location.coords);
//     Alert.alert("긴금 요청 전송완료");
//   };
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button title="긴급 도움 요청" onPress={sendSOS} />
//     </View>
//   );
// }
