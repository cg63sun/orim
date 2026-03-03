import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { loginRequest, validateTokenRequest } from "../services/auth";

type useAuthType = {
  user: any;
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  restoreToken: () => Promise<void>;
};
export const useAuthStore = create<useAuthType>((set) => ({
  user: null,
  token: null,
  isLoading: true,

  login: async (username: any, password: any) => {
    const data = await loginRequest(username, password);
    await SecureStore.setItemAsync("token", data.token);

    const user = await validateTokenRequest();

    set({
      token: data.token,
      user,
    });
  },
  logout: async () => {
    await SecureStore.deleteItemAsync("token");
    set({
      token: null,
      user: null,
    });
  },
  restoreToken: async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        set({
          isLoading: false,
        });
        return;
      }

      const user = await validateTokenRequest();

      set({
        token,
        user,
        isLoading: false,
      });
      console.log("user roles : ", user.roles);
    } catch {
      await SecureStore.deleteItemAsync("token");
      set({
        token: null,
        user: null,
        isLoading: false,
      });
    }
  },
}));
