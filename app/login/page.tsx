"use client";

import { ResultState } from "@/models/Result";
import { useAuthenRepo } from "@/repo/authen/AuthenRepository";
import userGlobaleStore, { GlobalStoreInterface } from "@/store/GlobalStore";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { match } from "ts-pattern";

const LoginPage = () => {
  const { SubmitHandler } = useViewModal();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "600px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={SubmitHandler}
        style={{ minWidth: "30%", fontFamily: "" }}
        size={"large"}
      >
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

function useViewModal() {
  const router = useRouter();
  const user = userGlobaleStore((state: GlobalStoreInterface) => state.user);
  const setUser = userGlobaleStore(
    (state: GlobalStoreInterface) => state.setUser
  );

  const { login } = useAuthenRepo();

  async function SubmitHandler(props: { password: string; username: string }) {
    const { username, password } = props;
    if (username && password) {
      const response = await login({ username, password });
      match(response)
        .with({ state: ResultState.success }, () => {
          setUser({ name: props.username, password: props.password });
          router.push("/");
        })
        .with({ state: ResultState.failed }, () => {})
        .exhaustive();
    }
  }

  return { SubmitHandler };
}

export default LoginPage;
