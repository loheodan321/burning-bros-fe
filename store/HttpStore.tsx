import SlackHttp from "@/data_source/http/Http";
import { LocalAuthDataSource } from "@/data_source/http/LocalAuth";
import { create } from "zustand";

export interface HttpStoreInterface {
  INSTANCE: SlackHttp;
  LOCAL_AUTH: LocalAuthDataSource;
}
const localAuth = new LocalAuthDataSource();
const slackInstance = new SlackHttp(localAuth);

const useHttpStore = create<HttpStoreInterface>()((set) => ({
  INSTANCE: slackInstance,
  LOCAL_AUTH: localAuth,
}));

export default useHttpStore;
