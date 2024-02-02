import { AuthDatasource } from "@/data_source/login/AuthDatasource";
import { resultGuard } from "@/models/Result";
import useHttpStore, { HttpStoreInterface } from "../../store/HttpStore";
import userGlobaleStore, { GlobalStoreInterface } from "@/store/GlobalStore";

export function useAuthenRepo() {
  const INSTANCE = useHttpStore((state: HttpStoreInterface) => state.INSTANCE);
  const LOCAL_AUTH = useHttpStore(
    (state: HttpStoreInterface) => state.LOCAL_AUTH
  );

  const datasource = new AuthDatasource(INSTANCE, LOCAL_AUTH);

  async function login(props: { username: string; password: string }) {
    return resultGuard(async () => await datasource.login(props));
  }

  return { login };
}
