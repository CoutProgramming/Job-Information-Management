import React, { useEffect, useState } from "react";
import { getAllJob, getJobById, deleteJob } from "../../../service/JobService";
import { Table, Space, Popconfirm, Button } from "antd";
import Modal_ViewJob from './Modal_ViewJob'
import Modal_AddJob from "./Modal_AddJob";
import { toast } from "react-toastify";
import moment from "moment";

const  List_Job = () => {
  const [listJob, setListJob] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [infoJob, setInfoJob] = useState([])

  const showJob = async () => {
    try {
      const response = await getAllJob();
      if (response) {
        let data = response.recordsets[0].map(item => {
            return {
              ...item,
              time_Create: moment(item.time_Create).format('DD - MM - YYYY'),
            };
          });
        setListJob(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const showModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    showJob();
  }, []);

  const showJobByID = async (id) => {
    try{
      showModal();
      let result = await getJobById(id);
      if (result) {
        let data = result.map(item => {
            return {
              ...item,
              time_Create: moment(item.time_Create).format('YYYY-MM-DD'),
            };
          });
        setInfoJob(data);
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  const handleDeleteJob = async (id) => {
    let result = await deleteJob(id);
    if(result) {
      toast.success("Xoá thông tin thành công!")
      showJob();
    }
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Lương",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Trạng thái",
      dataIndex: "status_Job",
      key: "status_Job",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="btn-infoo"
            onClick={() => {
              showJobByID(record.id);
            }}
          >
            <i class="fa-solid fa-info"></i>
          </button>
          <Popconfirm
            title="Xoá thông tin công ty"
            description="Bạn muốn xoá thông tin công việc này?"
            onConfirm={() => {
              handleDeleteJob(record.id);
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
      <h1>DANH SÁCH CÔNG VIỆC</h1>
      <Button onClick={showDrawer}>Thêm công việc mới</Button>
      <Table columns={columns} dataSource={listJob} />;
      <Modal_ViewJob
      openModal={openModal}
      closeModal={closeModal}
      info_Job={infoJob}
      showJob={showJob}
      />
      <Modal_AddJob
      openDrawer={openDrawer}
      closeDrawer={closeDrawer}
      showJob={showJob}
      />
    </>
  );
}

export default List_Job;
