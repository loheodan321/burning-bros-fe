"use client";
import GlobalProvider from "@/providers/global_provider/GlobalProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "antd";
import React from "react";
import MenuSider from "../components/MenuSider";
import NavBarComponent from "../components/NavBar";
const { Content } = Layout;

const queryClient = new QueryClient();

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <Layout style={{ minHeight: "100vh" }}>
          <NavBarComponent />
          <Content>
            <Layout>
              <MenuSider />
              {children}
            </Layout>
          </Content>
        </Layout>
      </GlobalProvider>
    </QueryClientProvider>
  );
};

export default layout;
