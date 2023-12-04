import React, {useState, useEffect} from "react";
import "./Category.scss";
import { NavLink } from "react-router-dom";
import Modal_ViewApply from "./Modal_ViewApply";
import Modal_InfoUser from "./Modal_InfoUser";
import {getUserByID} from '../../service/UserService'


const Category = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [info_User, setInfo_User] = useState(null);
  const id_User = localStorage.getItem('account_user')

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getInfoUser();
  }, [])

    const getInfoUser = async () => {
      try{
        let info = await getUserByID(id_User);
        if(info)
        {        
          setInfo_User(info);
        }
      }
      catch(err){
        console.error(err);
      }
    }

  return (
    <>
      <div className="category">
        <div className="Dashboard">
          Trang chủ <i class="fa-solid fa-chart-line"></i>
        </div>
        <div className="jobPosition">
          Vị trí tuyển dụng <i class="fa-solid fa-up-down-left-right"></i>
          <div className="jobPosition-Item">
            <ul>
            <NavLink to="/" className="nav-link">
              Tất cả vị trí tuyển dụng
              </NavLink>
            </ul>
          </div>
        </div>
        <div className="candidate">
          Ứng viên <i class="fa-solid fa-people-group"></i>
          <div className="candidate-Item">
            <ul>
              <li onClick={showModal}>Tất cả đơn đăng kí</li>
              {/* <li>Thông báo kết quả</li> */}
            </ul>
          </div>
        </div>
        <div className="company">
          Công ty <i class="fa-regular fa-building"></i>
          <div className="company-Item">
            <ul>
              <li>Tất cả công ty</li>
            </ul>
          </div>
        </div>
        <div className="more_action">
          Khác <i class="fa-solid fa-circle-plus"></i>
          <div className="more_action-Item">
            <ul>
              <li onClick={showDrawer}>Thông tin ứng viên</li>
              {/* <li>Thêm công ty</li> */}
            </ul>
          </div>
        </div>
      </div>
      <Modal_ViewApply
      showModal={isModalOpen}
      closeModal={handleCancel}
      ></Modal_ViewApply>

      <Modal_InfoUser
      showDrawer={open}
      closeDrawer={onClose}
      info={info_User}
      ></Modal_InfoUser>
    </>
  );
};



export default Category;
