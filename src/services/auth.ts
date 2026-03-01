import api from "./api";

export type LoginResponse = {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
};

// 🔥 로그인 (통신만)
export const loginRequest = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/jwt-auth/v1/token", {
    username,
    password,
  });

  if (!res.data.token) {
    throw new Error("토큰을 받을 수 없습니다.");
  }

  return res.data;
};

// 🔥 사용자 정보 확인
export const validateTokenRequest = async () => {
  const res = await api.get("/wp/v2/users/me");
  return res.data;
};
