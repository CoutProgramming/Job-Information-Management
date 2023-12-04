import React, { useEffect, useState } from "react";
import { getAllCompany } from "../../service/CompanyService";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Footer from "../HomePage/Footer";
import Pagination from "../Job/Pagination";
import Detail_Company from "./Detail_Company";

function Company(props) {
  const [listCompany, setListCompany] = useState([]);
  const [open, setOpen] = useState(false);
  const [id_Company, setId] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
        showAllCompany();

  }, []);

  const handleOpen = (id_Product) => {
    setOpen(true);
    setId(id_Product);
  };


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  //const currentJob = listJob[0].slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const showAllCompany = async () => {
    try {
      const listCompany = await getAllCompany();
      setListCompany(listCompany.recordset);
      console.log('list cpn', listCompany.recordset      );
    } catch (error) {
      toast.error("Error loading company.");
    }
  };

  return (
    <>
      <div className="title-product">
        <i className="fa-solid fa-list"></i> Danh sách công ty{" "}
      </div>
      <div className="list-product">
        <div className="container-product">
          {listCompany.map((item) => (
            <div className="card" id={item.id}>
              <h5 className="card-title">{item.company_name}</h5>
              <p className="card-text">
                Email: <b>{item.email}</b>
              </p>
              <p>
                Số điện thoại:{" "}
                <b className="card-price">
                  {item.salary}      
                </b>
              </p>
              <div className="button-container">
                <button
                  className="btn-detail"
                  onClick={() => handleOpen(item.id)}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        title="Thông tin chi tiết công ty"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        >
        <Detail_Company id={id_Company}/>
      </Modal>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={listCompany.length}
        currentPage={currentPage}
        paginate={paginate}
      />
      <Footer></Footer>
    </>
  );
}

export default Company;
