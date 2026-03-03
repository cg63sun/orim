import axios from "axios";

export const sendMessage = async (messages: any) => {
  return axios.post("https://orim.yeosuai.com/api/chat", { messages });
};
