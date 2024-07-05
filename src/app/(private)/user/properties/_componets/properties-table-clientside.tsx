"use client";
import { Property } from "@prisma/client";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";

function ClientSidePropertiesTable({ properties }: { properties: Property[] }) {
  const router = useRouter();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render(price: number) {
        return `$${price}`;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      //   key: "updatedAt",
      render(updatedAt: Date) {
        return dayjs(updatedAt).format("DD MMM YYYY");
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      // key: "actions",
      render(value: any, record: Property) {
        return (
          <div className="flex gap-5">
            <Button size="small">
              <i className="ri-delete-bin-line"></i>
            </Button>
            <Button size="small">
              <i className="ri-file-copy-line"></i>
            </Button>
            <Button
              size="small"
              onClick={() =>
                router.push(`/user/properties/edit-property/${record.id}`)
              }
            >
              <i className="ri-pencil-line"></i>
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="capitalize">
      <Table dataSource={properties} columns={columns} />
    </div>
  );
}

export default ClientSidePropertiesTable;
