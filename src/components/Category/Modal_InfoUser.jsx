import React, {useEffect} from "react";
import { Col, Drawer, Form, Input, Row, Button } from 'antd';
import {updateUser} from '../../service/UserService';
import { toast } from "react-toastify";


const Modal_InfoUser = (props) => {
    const [form] = Form.useForm();
    let data = props.info;

    useEffect(() => {
      onFill();
    }, [props.info])

    const onFill = () => {
      console.log('data: ', data);
      try {
        form.setFieldsValue(
          {
            id: data[0].id,
            name: data[0].name_user,
            level: data[0].level_user,
            address: data[0].address,
            school: data[0].school,
            more: data[0].description_user,
            gender: data[0].gender,
            account: data[0].account_user
          }
        )
      } catch (error) {
        console.log(error)
      }
    }

    const handleUpdateUser = async () => {
      let data = form.getFieldsValue();
      let result = await updateUser(data);
      if(result)
      {
        toast.success("Cập nhật thông tin thành công!")
        props.closeDrawer();
      }
    }

    return(
        <>
        <Drawer
        title="Thông tin tài khoản"
        width={720}
        onClose={props.closeDrawer}
        open={props.showDrawer}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="id"
                label="Mã tài khoản"
                rules={[
                  {
                    required: true,
                    message: 'Nhập mã tài khoản',
                  },
                ]}
              >
                <Input placeholder="Nhập mã tài khoản" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên"
                rules={[
                  {
                    required: true,
                    message: 'Nhập tên',
                  },
                ]}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                name="school"
                label="Trường"
                rules={[
                  {
                    required: true,
                    message: 'Nhập trường',
                  },
                ]}
              >
                <Input placeholder="Nhập trường" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="level"
                label="Học vị"
                rules={[
                  {
                    required: true,
                    message: 'Nhập học vị',
                  },
                ]}
              >
                <Input placeholder="Nhập học vị" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[
                  {
                    required: true,
                    message: 'Nhập giới tính',
                  },
                ]}
              >
                <Input placeholder="Nhập giới tính" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Đia chỉ"
                rules={[
                  {
                    required: true,
                    message: 'Nhập địa chỉ',
                  },
                ]}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                name="more"
                label="Thông tin thêm"
                rules={[
                  {
                    required: true,
                    message: 'Nhập thông tin thêm',
                  },
                ]}
              >
                <Input placeholder="Nhập thông tin thêm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="account"
                label="Tài khoản"
                rules={[
                  {
                    required: true,
                    message: 'Nhập tài khoản',
                  },
                ]}
              >
                <Input placeholder="Nhập tài khoản" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button type="primary" onClick={handleUpdateUser}>Cập nhật</Button>
      </Drawer>
        </>
    )
}

export default Modal_InfoUser;