import React, { useState, useEffect } from "react";
import { getAllNotification } from "../../../service/ApplyService";
import { Table, Popconfirm, Space, Button } from "antd";
import moment from "moment";
import Modal_ViewApply from "./Modal_ViewApply";
import { toast } from "react-toastify";

const List_Apply = () => {
  const [List_Notification, setListNotification] = useState([]);

  useEffect(() => {
    showNotification();
  }, []);

  const showNotification = async () => {
    try {
      const response = await getAllNotification();
      if (response) {
        setListNotification(response.recordsets[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Thời gian",
      dataIndex: "content",
      key: "content",
    },
  ];
  return (
    <>
      <h1>DANH SÁCH LỊCH PHỎNG VẤN</h1>
      <br></br>
      <Table dataSource={List_Notification} columns={columns} />;
    </>
  );
};

export default List_Apply;
