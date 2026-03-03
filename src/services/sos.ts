import axios from "axios";

export const sendSOSRequest = async (data: any) => {
  return axios.post("https://orim.yeosuai.com/api/sos", data);
};

// 디버깅 개선용 버젼
// import axios from "axios";

// export const sendSOSRequest = async (data: any) => {
//   try {
//     const response = await axios.post(
//       "https://sample05.yeosuai.com/api/sos",
//       data,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("SOS 응답:", response.data);
//     return response.data;
//   } catch (error: any) {
//     console.log("SOS 오류:", error.response?.data || error.message);
//     throw error;
//   }
// };
