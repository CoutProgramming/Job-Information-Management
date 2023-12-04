import React, { useState, useEffect } from "react";
import { getAllCompany, getCompanyByID, deleteCompany } from "../../../service/CompanyService";
import { Table, Popconfirm, Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./List_Company.scss";
import './Modal_AddCompany'
import Modal_AddCompany from "./Modal_AddCompany";
import Modal_ViewCompany from "./Modal_ViewCompany";
import { toast } from "react-toastify";

function List_Category() {
  const [List_Company, setListCompany] = useState([]);
  const [Info_Company, setInfoCompany] = useState([]);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const showModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    showCompany();
  }, []);

  const showCompany = async () => {
    try {
      let list = await getAllCompany();
      if (list) {
        setListCompany(list.recordsets[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showCompanyByID = async (id) => {
    try{
      showModal();
      let result = await getCompanyByID(id);
      if(result)
      {
        setInfoCompany(result);
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  const handleDeleteCompany = async (id) => {
    let result = await deleteCompany(id);
    if(result) {
      toast.success("Xoá thông tin thành công!")
      showCompany();
    }
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên công ty",
      dataIndex: "company_name",
      key: "company_name",
    },
    {
      title: "Email công ty",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="btn-infoo"
            onClick={() => {
              showCompanyByID(record.id);
            }}
          >
            <i class="fa-solid fa-info"></i>
          </button>
          <Popconfirm
            title="Xoá thông tin công ty"
            description="Bạn muốn xoá thông tin công ty này?"
            onConfirm={() => {
              handleDeleteCompany(record.id);
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
      <h1>DANH SÁCH CÔNG TY</h1>
      <br></br>
      <Button onClick={showDrawer} icon={<PlusOutlined />}>
        Thêm công ty mới
      </Button>
      <br></br>
      <Table dataSource={List_Company} columns={columns} />;
      <Modal_AddCompany
        openDrawer={open}
        closeDrawer={onClose}
        showCompany={showCompany}
      />
      <Modal_ViewCompany
      openModal={openModal}
      closeModal={closeModal}
      infoCompany={Info_Company}
      showCompany={showCompany}
      />
    </>
  );
}

export default List_Category;
