import React, { useState } from "react";
import "./Admin.scss";
import logo from "../../assets/image/logo.svg";
import {
  SettingOutlined,
  BarChartOutlined,
  TableOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { Menu, Button } from "antd";
import List_Company from "./Company/List_Company";
import List_Job from "./Job/List_Job";
import List_Apply from "./Apply/ListApply";
import Account from "./Account/Account";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import PrivatePage from "../../HOC/PrivatePage";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function Dashboard() {
  const [displayedComponent, setDisplayedComponent] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("account_user");
    localStorage.removeItem("info_user");
    localStorage.removeItem("token");
    toast.success("Logout successful");
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const onClick = (e) => {
    //console.log("click ", e.key);
    changeDashboard(e.key);
  };

  const changeDashboard = (component) => {
    setDisplayedComponent(component);
  };

  const items = [
    getItem("Quản lí công ty", "sub1", <BarChartOutlined />, [
      getItem(<div>Danh sách công ty</div>, "1"),
    ]),
    getItem("Quản lí công việc", "sub2", <DatabaseOutlined />, [
      getItem(<div>Danh sách công việc</div>, "6"),
    ]),
    {
      type: "divider",
    },
    getItem("Quản lí ứng tuyển", "sub4", <TableOutlined />, [
      getItem(<div>Danh sách ứng tuyển</div>, "10"),
    ]),
    getItem("Quản lí tài khoản", "sub5", <TableOutlined />, [
      getItem(<div>Danh sách tài khoản</div>, "18"),
    ]),
    {
      type: "divider",
    },
    getItem(
      "Exit",
      "grp",
      <SettingOutlined />,
      [getItem(<Button onClick={handleLogout}>Đăng xuất</Button>, "13")],
      "group"
    ),
  ];

  let contentToDisplay;

  switch (displayedComponent) {
    case "1":
      contentToDisplay = <List_Company />;
      break;
    case "6":
      contentToDisplay = <List_Job />;
      break;
    case "10":
      contentToDisplay = <List_Apply />;
      break;
    case "18":
      contentToDisplay = <Account />;
      break;
    default:
      contentToDisplay = <List_Company />;
  }

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div className="db-logo">
            <img src={logo} alt="Logo" className="logo-image" />
          </div>
          <div>
            <Menu
              onClick={onClick}
              style={{
                width: 256,
              }}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              items={items}
            />
          </div>
        </div>
        <div className="dashboard-content">{contentToDisplay}</div>
      </div>
    </>
  );
}

export default Dashboard;
