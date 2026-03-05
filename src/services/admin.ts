import expressApi from "./expressApi";

export const getSOSList = async () => {
  const response = await expressApi.get("/sos");
  return response.data;
};
