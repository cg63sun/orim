import axios from "axios";

export const sendMessage = async (messages: any) => {
  return axios.post("https://sample05.yeosuai.com/api/chat", { messages });
};
