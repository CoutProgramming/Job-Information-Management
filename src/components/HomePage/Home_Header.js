import React, { useEffect, useState } from "react";
import "./Home_Header.scss";
import logoImg from "../../assets/image/logo.svg";
import { NavLink } from "react-router-dom";
import { Input } from "antd";
import Category from "../Category/Category";
import Carousel from "../HomePage/Carousel";
import Job from "../Job/Job";
import Company from '../Company/Company'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import SignUp from "../Login/SignUp";

function HomeHeader() {
  const [isLogin, setLogin] = useState(false);
  const [info_user, setUser] = useState("");
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let user = localStorage.getItem("info_user");
    if (user) {
      setUser(user);
      setLogin(true);
    }
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem('account_user');
    localStorage.removeItem('info_user');
    localStorage.removeItem('token');
    toast.success('Logout successful');
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  const handleParamUpdate = (newParamValue) => {
    // Thay đổi giá trị của `paramName` trong URL và chuyển hướng
    navigate(`?value=${newParamValue}`);
  }

  return (
    <>
      <header className="header">
        <div className="grid">
          <nav className="header__navbar">
            <ul className="header__navbar-list">
              <li
                className="header__navbar-item header__navbar-item-separate"
                style={{ transform: "translateX(-40%)" }}
              >
                Chào mừng đến với website tuyển dụng
              </li>
              <li
                className="header__navbar-item"
                style={{ transform: "translateX(-20%)" }}
              >
                Kết nối với chúng tôi
                <a
                  href="https://www.facebook.com/anhti2312/"
                  className="header__navbar-icon"
                >
                  <i className="fa-brands fa-facebook fa-xl"></i>
                </a>
              </li>
            </ul>

            <ul className="header__navbar-list">
              <li className="header__navbar-item header__navbar-icon">
                <i className="fa-regular fa-bell fa-xl"></i>
                <span className="none-hover">Thông báo</span>
              </li>
              {isLogin ? (
                <>
                  <li className="header__navbar-item header__navbar-icon">
                    <i className="fa-regular fa-circle-question fa-xl"></i>
                    <span className="none-hover">Trợ giúp</span>
                  </li>
                  <li className="header__navbar-item" onClick={handleLogout}>Đăng xuất</li>
                </>
              ) : (
                <>
                  <li className="header__navbar-item header__navbar-icon">
                    <i className="fa-regular fa-circle-question fa-xl"></i>
                    <span className="none-hover">Trợ giúp</span>
                  </li>
                  <li className="header__navbar-item" onClick={showDrawer}>Đăng kí</li>
                  <li className="header__navbar-item" onClick={handleLogin}>
                    Đăng nhập
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div className="header_search">
            <div className="header_search-logo">
              <NavLink to="/" className="nav-link">
                <img src={logoImg} alt="Logo" />
              </NavLink>
            </div>
            <div className="header_search-banner">
              <h1>Quang Phuc</h1>
              <h2>COMPANY</h2>
            </div>
            <div className="header_search-input">
              <Input placeholder="Tìm theo title, skill,..." onChange={(event) => setValue(event.target.value)}/>
              <button className="header_search_button" onClick={() => {handleParamUpdate(value)}}>
                <i className="fa-solid fa-magnifying-glass"></i>
                Tìm
              </button>
            </div>
            <div className="header_search-cart">
              {info_user ? (
                <h3>Xin chào: {info_user}</h3>
              ) : (
                <h3>You need login to view more information</h3>
              )}
            </div>
          </div>
        </div>
      </header>
      <Category></Category>
      <Carousel></Carousel>
      <Job></Job>
      <Company></Company>
      <SignUp
      openSignUp={open}
      closeSignUp={onClose}
      ></SignUp>
    </>
  );
}

export default HomeHeader;
