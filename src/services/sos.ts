import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const sendSOSRequest = async (data: any) => {
  try {
    const token = await SecureStore.getItemAsync("token");
    const response = await axios.post(
      "https://orim.yeosuai.com/api/sos",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.log(error.response?.data);
    throw error;
  }
};

// import axios from "axios";
// import * as SecureStore from "expo-secure-store";

// export const sendSOSRequest = async (data: any) => {
//   try {
//     const token = await SecureStore.getItemAsync("token");

//     const response = await axios.post(
//       "https://orim.yeosuai.com/api/sos",
//       data,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );
//     return response.data;
//   } catch (error: any) {
//     console.log("🔥 SOS ERROR FULL:", error);
//     console.log("🔥 RESPONSE:", error.response);
//     console.log("🔥 DATA:", error.response?.data);
//     console.log("🔥 STATUS:", error.response?.status);
//     throw error;
//   }
// };
