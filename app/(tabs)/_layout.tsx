import { useAuthStore } from "@/src/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const token = useAuthStore((state) => state.token);
  if (!token) return <Redirect href="/(auth)/login" />;
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "AI상담",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// import { useAuthStore } from "@/src/store/useAuthStore";
// import { Redirect, Tabs, useRouter } from "expo-router";
// import React from "react";

// import AntDesign from "@expo/vector-icons/AntDesign";
// import { TouchableOpacity } from "react-native";

// export default function TabLayout() {
//   const token = useAuthStore((state) => state.token);

//   if (!token) {
//     return <Redirect href="/(auth)/login" />;
//   }

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "홈",
//           tabBarIcon: ({ color }) => (
//             <AntDesign size={28} name="home" color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="notice"
//         options={{
//           title: "공지",
//           tabBarIcon: ({ color }) => (
//             <AntDesign size={28} name="bell" color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="sos"
//         options={{
//           title: "SOS",
//           tabBarIcon: ({ color }) => (
//             <AntDesign size={28} name="bell" color={color} />
//           ),
//           tabBarButton: (props) => {
//             const router = useRouter();
//             return (
//               <TouchableOpacity
//                 {...props}
//                 onPress={() => router.push("/modal")}
//               />
//             );
//           },
//         }}
//       />
//       <Tabs.Screen
//         name="chat"
//         options={{
//           title: "AI",
//           tabBarIcon: ({ color }) => (
//             <AntDesign size={28} name="bell" color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }
