import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import './Login.scss';
import {handleLogin} from '../../service/LoginService';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();


  const onFinish =  (values) => {
    processLogin(values.username, values.password);
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const processLogin = async (username, password) => {
    try{
      let result = await handleLogin(username, password);
      console.log('result', result);
      if(result.errCode !== 3)
      {
        toast.error(result.message);
      }
      else{
        console.log(result);
        if(result.account_user === "1")
        {
          navigate("/admin");
          localStorage.setItem("account_user", "1");
          localStorage.setItem("info_user", result.infoUser);
          localStorage.setItem("token", result.token);
          toast.success(result.message);
        }
        else{
          navigate("/");
          toast.success(result.message);
          localStorage.setItem("account_user", result.account_user);
          localStorage.setItem("info_user", result.infoUser);
          localStorage.setItem("token", result.token);
          setTimeout(() =>{
            window.location.reload();
          }, 1000)
        }
      }
    }
    catch(error){
      console.log("Failed:", error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};
export default Login;
