import { sendMessage } from "@/src/services/ai";
import { useChatStore } from "@/src/store/chatStore";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Chat() {
  const { messages, addMessage, clearMessages } = useChatStore();
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const currentInput = input;

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: currentInput,
    };

    const updatedMessages = [...messages, userMessage];

    addMessage(userMessage);
    setInput("");

    try {
      const res = await sendMessage(
        updatedMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      );

      const aiText =
        res?.data?.choices?.[0]?.message?.content ??
        "응답을 불러오지 못했습니다.";

      const aiMessage = {
        id: Date.now().toString() + "-ai",
        role: "assistant" as const,
        content: aiText,
      };

      addMessage(aiMessage);
    } catch (err) {
      console.log("채팅 전송 오류:", err);

      const errorMessage = {
        id: Date.now().toString() + "-error",
        role: "assistant" as const,
        content: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      };

      addMessage(errorMessage);
    }

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderItem = ({ item }: { item: (typeof messages)[number] }) => (
    <View
      style={[
        styles.bubble,
        item.role === "user" ? styles.userBubble : styles.aiBubble,
      ]}
    >
      <Text style={styles.text}>{item.content}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 10 }}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />

          <View style={styles.inputContainer}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="메시지를 입력하세요"
              style={styles.input}
              multiline
            />

            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Text style={{ color: "#fff" }}>전송</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={clearMessages} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>채팅 삭제</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  bubble: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 5,
    maxWidth: "75%",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#ffe812",
  },
  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#4e8cff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  clearButton: {
    margin: 10,
    padding: 12,
    backgroundColor: "#ff6666",
    borderRadius: 12,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

// import { sendMessage } from "@/src/services/ai";
// import React, { useRef, useState } from "react";
// import {
//   FlatList,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";

// type Message = {
//   id: string;
//   role: "user" | "assistant";
//   content: string;
// };

// export default function Chat() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const flatListRef = useRef<FlatList>(null);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       role: "user",
//       content: input,
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     try {
//       const res = await sendMessage([
//         ...messages.map((m) => ({ role: m.role, content: m.content })),
//         { role: "user", content: input },
//       ]);

//       const aiMessage: Message = {
//         id: Date.now().toString() + "-ai",
//         role: "assistant",
//         content: res.data.choices[0].message.content,
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (err) {
//       console.log(err);
//     }

//     setTimeout(() => {
//       flatListRef.current?.scrollToEnd({ animated: true });
//     }, 100);
//   };

//   const renderItem = ({ item }: { item: Message }) => (
//     <View
//       style={[
//         styles.bubble,
//         item.role === "user" ? styles.userBubble : styles.aiBubble,
//       ]}
//     >
//       <Text style={styles.text}>{item.content}</Text>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // 🔥 핵심
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.container}>
//           <FlatList
//             ref={flatListRef}
//             data={messages}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id}
//             contentContainerStyle={{ padding: 10 }}
//           />

//           <View style={styles.inputContainer}>
//             <TextInput
//               value={input}
//               onChangeText={setInput}
//               placeholder="메시지를 입력하세요"
//               style={styles.input}
//               multiline
//             />

//             <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
//               <Text style={{ color: "#fff" }}>전송</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f2f2f2",
//   },
//   bubble: {
//     padding: 12,
//     borderRadius: 16,
//     marginVertical: 5,
//     maxWidth: "75%",
//   },
//   userBubble: {
//     alignSelf: "flex-end",
//     backgroundColor: "#ffe812",
//   },
//   aiBubble: {
//     alignSelf: "flex-start",
//     backgroundColor: "#ffffff",
//   },
//   text: {
//     fontSize: 16,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     padding: 10,
//     backgroundColor: "#fff",
//     alignItems: "center",
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     marginRight: 10,
//   },
//   sendButton: {
//     backgroundColor: "#4e8cff",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 20,
//   },
// });
