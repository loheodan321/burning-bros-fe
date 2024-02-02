"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import userGlobaleStore, { GlobalStoreInterface } from "@/store/GlobalStore";
import "./style.css";

function CustomModal() {
  const isLoading = userGlobaleStore(
    (state: GlobalStoreInterface) => state.isLoading
  );

  return (
    <Modal
      centered
      open={isLoading}
      footer={null}
      closable={false}
      styles={{
        content: { height: "400px" },
        body: {
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <h1>Loading...</h1>
    </Modal>
  );
}

export default CustomModal;
