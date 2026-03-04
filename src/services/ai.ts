import expressApi from "./expressApi";

export const sendMessage = async (messages: any) => {
  return await expressApi.post("https://orim.yeosuai.com/api/chat", {
    messages,
  });
};
