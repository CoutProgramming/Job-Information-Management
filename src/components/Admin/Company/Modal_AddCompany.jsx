import React from "react";
import { Button, Col, Drawer, Form, Input, Row} from 'antd';
import {createCompany} from '../../../service/CompanyService';
import { toast } from "react-toastify";

const Modal_AddCompany = (props) => {

  const [form] = Form.useForm();

  const handleAddCompany = async () => {
    try{
      let data = form.getFieldsValue();
      let result = await createCompany(data);
      if(result)
      {
        toast.success(result.message);
        form.resetFields();
        props.closeDrawer();
        props.showCompany();
      }
    }
    catch(error)
    {
      toast.error("Lỗi dữ liệu!");
    }
  }

    return (
        <>
        <Drawer
        title="Thêm mới công ty"
        width={720}
        onClose={props.closeDrawer}
        open={props.openDrawer}
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
                name="name"
                label="Tên công ty"
                rules={[
                  {
                    required: true,
                    message: 'Nhập tên công ty',
                  },
                ]}
              >
                <Input placeholder="Nhập tên công ty" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="sdt"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: 'Nhập số điện thoại',
                  },
                ]}
              >
                <Input placeholder="Nhập số điện thoại"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Nhập email',
                  },
                ]}
              >
                <Input placeholder="Nhập email"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[
                  {
                    required: true,
                    message: 'Nhập địa chỉ',
                  },
                ]}
              >
                <Input placeholder="Nhập địa chỉ"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[
                  {
                    required: true,
                    message: 'Nhập mô tả',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Nhập mô tả" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button type='primary' onClick={handleAddCompany}>Tạo mới</Button>
      </Drawer>
        </>
    )
}

export default Modal_AddCompany;