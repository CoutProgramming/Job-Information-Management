import React, { useState, useEffect } from "react";
import {
  getAllApply,
  getApplyByID,
  deleteApply,
} from "../../../service/ApplyService";
import { Table, Popconfirm, Space, Button } from "antd";
import moment from "moment";
import Modal_ViewApply from "./Modal_ViewApply";
import { toast } from "react-toastify";

const List_Apply = () => {
  const [List_Applies, setListApply] = useState([]);
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
      const response = await getAllApply();
      if (response) {
        let data = response.recordsets[0].map((item) => {
          return {
            ...item,
            create_Time: moment(item.create_Time).format("DD - MM - YYYY"),
          };
        });
        setListApply(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showApplyByID = async (id) => {
    try {
      showModal();
      let result = await getApplyByID(id);
      if (result) {
        setInfoApply(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteApply = async (id) => {
    let result = await deleteApply(id);
    if (result) {
      toast.success("Xoá thông tin thành công!");
      showApplication();
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tài khoản ứng tuyển",
      dataIndex: "accountID",
      key: "accountID",
    },
    {
      title: "Công việc ứng tuyển",
      dataIndex: "jobID",
      key: "jobID",
    },
    {
      title: "Trạng thái",
      dataIndex: "status_apply",
      key: "status_apply",
    },
    {
      title: "Thời gian ứng tuyển",
      dataIndex: "create_Time",
      key: "create_Time",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="btn-infoo"
            onClick={() => {
              showApplyByID(record.id);
            }}
          >
            <i class="fa-solid fa-info"></i>
          </button>
          <Popconfirm
            title="Xoá thông tin đơn ứng tuyển"
            description="Bạn muốn xoá thông tin đơn ứng tuyển này?"
            onConfirm={() => {
              handleDeleteApply(record.id);
            }}
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
      <h1>DANH SÁCH ỨNG TUYỂN</h1>
      <br></br>
      <Table dataSource={List_Applies} columns={columns} />;
      <Modal_ViewApply
        openModal={open}
        closeModal={closeModal}
        InfoApply={InfoApply}
      />
    </>
  );
};

export default List_Apply;
