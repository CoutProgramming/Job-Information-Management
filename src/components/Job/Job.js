import React, { useEffect, useState } from "react";
import "./Job.scss";
import { getAllJob, getJobBySearch } from "../../service/JobService";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Detail_Job from "./Detail_Job";
import Apply_Job from "./Apply_Job";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";

function Job(props) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const value = params.get("value");
  const [listJob, setListJob] = useState([]);
  const [idJob, setIdJob] = useState(null);
  const [open, setOpen] = useState(false);
  const [openApply, setOpenApply] = useState(false);
  const [id_Job, setId] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [isLogin, setIsLogin] = useState(false);
  const checkLogin = localStorage.getItem("token");

  useEffect(() => {
    if (value) {
      showJobsBySearch(value);
    } else {
      showAllJob();
    }

    if(checkLogin) {
      console.log('login: ', checkLogin);
      setIsLogin(true);
    }
  }, [value, checkLogin]);

  const handleOpen = (id_Product) => {
    setOpen(true);
    setId(id_Product);
  };

  const handleOpenApply = (idJob) => {
    if(!isLogin)
    {
      toast.info("Bạn cần đăng nhập để thực hiện ứng tuyển");
    }
    else{
      setIdJob(idJob);
      setOpenApply(true);
    }
  };

  const handleCloseApply = () => {
    setOpenApply(!openApply);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  //const currentJob = listJob.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const showAllJob = async () => {
    try {
      const listJob = await getAllJob();
      setListJob(listJob.recordset        );
      console.log(listJob);
    } catch (error) {
      toast.error("Error loading jobs.");
    }
  };

  const showJobsBySearch = async (value) => {
    try {
      const listJob = await getJobBySearch(value);
      if(listJob.length > 0) {
        console.log(listJob);
        setListJob(listJob);
      }
      else
      {
        toast.error("Không có công việc phù hợp với yêu cầu tìm kiếm của bạn!")
      }
    } catch (error) {
      toast.error("Error loading products.");
    }
  };

  return (
    <>
      <div className="title-product">
        <i className="fa-solid fa-list"></i> Danh sách công việc{" "}
      </div>
      <div className="list-product">
        <div className="container-product">
          {listJob.map((item) => (
            <div className="card" id={item.id}>
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">
                Trạng thái: <b>{item.status_Job}</b>
              </p>
              <p>
                Mức lương:{" "}
                <b className="card-price">
                  {item.salary}
                  <span className="card-vnd"> vnđ</span>
                </b>
              </p>
              <div className="button-container">
                <button
                  className="btn-detail"
                  onClick={() => handleOpen(item.id)}
                >
                  Xem chi tiết
                </button>
                <button
                  className="btn-detail"
                  onClick={() => handleOpenApply(item.id)}
                >
                  Ứng tuyển
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        title="Thông tin chi tiết công việc"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Detail_Job id={id_Job} />
      </Modal>
      <Apply_Job
      openApply={openApply}
      closeApply={handleCloseApply}
      idJob={idJob}
      />
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={listJob.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </>
  );
}

export default Job;
