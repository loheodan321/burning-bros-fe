"use client";

import { GlobalContext } from "@/providers/global_provider/GlobalProvider";
import Icon from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useContext, useMemo } from "react";
const { Sider } = Layout;

export interface MenuItem {
  key: number;
  label: string;
  icon: React.ReactNode;
  children?: { key: number; label: string }[];
}
const MenuItem = ({
  key,
  icon,
  children,
  ...props
}: {
  key: string;
  icon: string;
  children: React.ReactNode;
}) => (
  <Menu.Item key={key} {...props}>
    <Icon type={icon} />
    {children}
  </Menu.Item>
);

const MenuSider = () => {
  const { setCurrentPage } = useContext(GlobalContext);

  const menuList = useMemo(() => {
    return [
      { key: 1, label: "Dash board", icon: <></> },
      {
        key: 2,
        label: "User",
        icon: <></>,
        children: [{ key: 2.1, label: "User list" }],
      },
    ];
  }, []);

  function ChangeTabHandler({ key }: { key: string }) {
    setCurrentPage(parseInt(key));
  }

  return (
    <>
      <Sider theme="light" collapsible>
        <Menu
          className="ant-menu"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuList}
          onClick={ChangeTabHandler}
        />
      </Sider>
    </>
  );
};

export default MenuSider;
