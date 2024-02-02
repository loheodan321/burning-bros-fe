import UserDatasource from "@/data_source/user/UserDatasource";
import { resultGuard } from "@/models/Result";
import useHttpStore, { HttpStoreInterface } from "@/store/HttpStore";

function useUserRepo() {
  const INSTANCE = useHttpStore((state: HttpStoreInterface) => state.INSTANCE);

  const datasource = new UserDatasource(INSTANCE);

  async function getUser() {
    return resultGuard(async () => await datasource.getUser());
  }

  return { getUser };
}

export default useUserRepo;
