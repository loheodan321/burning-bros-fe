import { voidCallBack } from "@/types/types";
import { create } from "zustand";

export interface GlobalStoreInterface {
  user: null | UserInterface;
  setUser: (user: UserInterface) => void;
  removeUser: voidCallBack;
  isLoading: boolean;
  setLoading: voidCallBack;
}

export interface UserInterface {
  name: string;
  password: string;
  token?: string;
  refresh_token?: string;
}

const userGlobaleStore = create<GlobalStoreInterface>()((set) => ({
  user: null,
  setUser: (user: UserInterface) => {
    return set(() => ({ user }));
  },
  removeUser: () => {
    return set(() => ({ user: null }));
  },
  isLoading: false,
  setLoading: (input: boolean) =>
    set(() => {
      return { isLoading: input };
    }),
}));

export default userGlobaleStore;
