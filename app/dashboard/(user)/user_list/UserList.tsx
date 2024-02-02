"use client";
import { UserDataModelInterface } from "@/models/user/User";
import type { TableProps } from "antd";
import { Table } from "antd";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const columns: TableProps<UserDataModelInterface>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
];

function UserList({
  tableData,
}: {
  tableData: null | UserDataModelInterface[];
}) {
  const [nexPage, setNextPage] = useState("");

  const convertedData = useMemo(() => {
    if (!tableData) return [];
    else
      return tableData.map((item: UserDataModelInterface, index: number) => {
        return { ...item, key: index };
      });
  }, [tableData]);

  function ClickHanlder(record: UserDataModelInterface) {
    if (record) {
      setNextPage(record.id.toString());
    }
  }

  useEffect(() => {
    if (nexPage !== "") {
      redirect(`/dashboard/user_list/${nexPage}`);
    }
  }, [nexPage]);

  return (
    <>
      {convertedData.length != 0 && (
        <Table
          columns={columns}
          dataSource={convertedData}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                ClickHanlder(record);
              },
              onDoubleClick: (event) => {}, // double click row
              onContextMenu: (event) => {}, // right button click row
              onMouseEnter: (event) => {}, // mouse enter row
              onMouseLeave: (event) => {}, // mouse leave row
            };
          }}
        />
      )}
    </>
  );
}

export default UserList;
