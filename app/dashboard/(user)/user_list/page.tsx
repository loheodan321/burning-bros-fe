"use client";

import { ResultState } from "@/models/Result";
import { UserDataModelInterface } from "@/models/user/User";
import { GlobalContext } from "@/providers/global_provider/GlobalProvider";
import useUserRepo from "@/repo/user/UserRepository";
import { PagesEnum } from "@/types/types";
import { Layout } from "antd";
import { useContext, useEffect, useState } from "react";
import { match } from "ts-pattern";
import { CheckCurrentPage } from "../../page";
import UserList from "./UserList";
import userGlobaleStore, { GlobalStoreInterface } from "@/store/GlobalStore";
import CustomModal from "@/app/components/custom_modal/CustomModal";

const { Content } = Layout;

const UserComponenet = () => {
  const { currentPage } = useContext(GlobalContext);
  const [tableData, setTableData] = useState<null | UserDataModelInterface[]>(
    null
  );
  const setLoading = userGlobaleStore(
    (state: GlobalStoreInterface) => state.setLoading
  );

  const { getUser } = useUserRepo();

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const response = await getUser();
      match(response)
        .with({ state: ResultState.success }, ({ data }) => {
          setTableData(data.data);
        })
        .with({ state: ResultState.failed }, () => {})
        .exhaustive();
      setLoading(false);
    }

    fetchUser();
  }, []);

  useEffect(() => {
    CheckCurrentPage(PagesEnum.user_list, currentPage);
  }, [currentPage]);
  return (
    <Content>
      <CustomModal />
      <UserList tableData={tableData} />
    </Content>
  );
};

export default UserComponenet;
