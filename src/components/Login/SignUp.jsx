import React, {useState} from "react";
import { Modal , Form , Input, Button} from 'antd'
import {handleSignup} from '../../service/LoginService';
import { toast } from "react-toastify";

const SignUp = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [form] = Form.useForm();


  const onFinish =  (values) => {
    setUsername(values.username);
    setPassword(values.password);
    let data = {username, password};
    processSignUp(data);
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const processSignUp = async (data) => {
    let result = await handleSignup(data);
    if(result.message === "Tài khoản này đã tồn tại")
    {
        toast.warning(result.message);
    }
    else{
        toast.success(result.message);
        props.closeSignUp();
        form.resetFields();
    }
  }


  return (
    <>
    <Modal title="Đăng kí tài khoản mới để đăng nhập" open={props.openSignUp} onOk={props.closeSignUp} onCancel={props.closeSignUp}>
        <br></br>
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
        form={form}
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
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Đăng kí
          </Button>
        </Form.Item>
      </Form>
      </Modal>
    {/* <Drawer
        title="Đăng kí tài khoản mới"
        width={720}
        onClose={props.closeSignUp}
        open={props.openSignUp}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={props.closeSignUp}>Cancel</Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user name',
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="Url"
                rules={[
                  {
                    required: true,
                    message: 'Please enter url',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
          </Row>
          </Form>
      </Drawer> */}
    </>
    
  );
};
export default SignUp;
