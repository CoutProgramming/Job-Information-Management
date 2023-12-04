import React, { useState, useEffect } from "react";
import {
    getAllUser,
    getUserByID
} from "../../../service/UserService";
import { Table, Popconfirm, Space, Button } from "antd";
import Modal_ViewAccount from './Modal_ViewAccount'
import moment from "moment";
import { toast } from "react-toastify";

const List_Apply = () => {
  const [List_Users, setListUser] = useState([]);
  const [InfoApply, setInfoApply] = useState([]);
  const [open, setOpenModal] = useState(false);

  useEffect(() => {
    showApplication();
  }, []);

  const showModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  const showApplication = async () => {
    try {
      const response = await getAllUser();  
      if (response) {
        setListUser(response.recordsets[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showUserByID = async (id) => {  
    try {
      showModal();
      let result = await getUserByID(id);   
      if (result) {
        setInfoApply(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

//   const handleDeleteApply = async (id) => {
//     let result = await deleteApply(id);
//     if (result) {
//       toast.success("Xoá thông tin thành công!");
//       showApplication();
//     }
//   }; 

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tài khoản",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Quyền tài khoản",
      dataIndex: "role_user",
      key: "role_user",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="btn-infoo"
            onClick={() => {
              showUserByID(record.id);
            }}>           
            <i class="fa-solid fa-info"></i>
          </button>
          <Popconfirm
            title="Xoá thông tin tài khoản"
            description="Bạn muốn xoá thông tin tài khoản này?"
            okText="Yes"
            cancelText="No"
          >
            <button className="btn-delete">
              <i class="fa-solid fa-trash"></i>
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <h1>DANH SÁCH TÀI KHOẢN</h1>
      <br></br>
      <Table dataSource={List_Users } columns={columns} />;
    </>
  );
};

export default List_Apply;
