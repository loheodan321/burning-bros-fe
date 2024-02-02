"use client";

import { GlobalContext } from "@/providers/global_provider/GlobalProvider";
import userGlobaleStore, { GlobalStoreInterface } from "@/store/GlobalStore";
import { PagesEnum } from "@/types/types";
import { Layout } from "antd";
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";
import CustomModal from "../components/custom_modal/CustomModal";
const { Content } = Layout;

export function CheckCurrentPage(currPage: PagesEnum, currentPage: number) {
  switch (currPage) {
    case PagesEnum.user_list:
      switch (currentPage) {
        case 1:
          redirect("/dashboard");
        default:
          return;
      }
    default:
      switch (currentPage) {
        case 2:
          redirect("/dashboard/user_list");
        default:
          return;
      }
  }
}

const DashboardPage = () => {
  const { currentPage } = useContext(GlobalContext);
  useEffect(() => {
    CheckCurrentPage(PagesEnum.dashboard, currentPage);
  }, [currentPage]);

  return (
    <Content>
      <CustomModal />
      <div>dash board</div>
    </Content>
  );
};

export default DashboardPage;
