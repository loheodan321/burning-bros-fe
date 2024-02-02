import { voidCallBack } from "@/types/types";
import { create } from "zustand";

export interface LoadingStoreInterface {
  isLoading: boolean;
  setLoading: voidCallBack;
}

const useLoadingStore = create<LoadingStoreInterface>()((set) => ({
  isLoading: false,
  setLoading: (input: boolean) =>
    set(() => {
      return { isLoading: input };
    }),
}));

export default useLoadingStore;
