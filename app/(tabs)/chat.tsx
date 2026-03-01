import { sendMessage } from "@/src/services/ai";
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

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await sendMessage([
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: input },
      ]);

      const aiMessage: Message = {
        id: Date.now().toString() + "-ai",
        role: "assistant",
        content: res.data.choices[0].message.content,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.log(err);
    }

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderItem = ({ item }: { item: Message }) => (
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // 🔥 핵심
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{ marginVertical: 60, alignItems: "center" }}>
            <Text style={{ fontSize: 24 }}>마을공동체 행사 일정안내</Text>
          </View>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 10 }}
            onContentSizeChange={() =>
              // 안끊김
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
              <Text style={{ fontSize: 20, color: "#fff" }}>전송</Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#336699",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
    marginBottom: 8,
  },
  sendButton: {
    backgroundColor: "#4e8cff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
});

// import { sendMessage } from "@/src/services/ai";
// import { useState } from "react";
// import {
//   Button,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   Text,
//   TextInput,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";

// export default function Chat() {
//   const [input, setInput] = useState("");
//   const [reply, setReply] = useState("");

//   const handleSend = async () => {
//     Keyboard.dismiss();
//     const res = await sendMessage([{ role: "user", content: input }]);

//     setReply(res.data.choices[0].message.content);
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View
//           style={{
//             padding: 20,
//             flex: 1,
//             alignItems: "center",
//             gap: 20,
//           }}
//         >
//           <TextInput
//             value={input}
//             onChangeText={setInput}
//             placeholder="마을에 대해 질문하세요"
//             style={{ borderWidth: 1, padding: 10, width: "100%", fontSize: 20 }}
//             autoCorrect={false}
//             autoCapitalize="none"
//           />
//           <Button title="보내기" onPress={handleSend} />
//           <Text style={{ fontSize: 20 }}>{reply}</Text>
//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// }
