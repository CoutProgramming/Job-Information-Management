import React, {useEffect} from "react";
import { Form, Modal, Row, Col, Input, Button} from 'antd';
import {updateCompany} from '../../../service/CompanyService'
import { toast } from "react-toastify";

const Modal_ViewCompany = (props) => {

  const [form] = Form.useForm();
  let info_Company = props.infoCompany;

  useEffect(() => {
    if(info_Company.length > 0)
    {
      onFill();
    }
  }, [props.infoCompany])

  const onFill = () => {
    form.setFieldsValue({ 
      id: info_Company[0].id,
      name: info_Company[0].company_name,
      phone: info_Company[0].phone,
      email: info_Company[0].email,
      address: info_Company[0].address,
      description: info_Company[0].description_company
    })
  }

  const update_Company = async () => {
    let data = form.getFieldsValue();
    let result = await updateCompany(data);
    if(result)
    {
      toast.success("Update company successfully!")
      props.showCompany();
      props.closeModal();
    }
  }

    return (
        <>
        <Modal title="Thông tin công ty" open={props.openModal} onOk={props.closeModal} onCancel={props.closeModal}>
        <Form layout="vertical" hideRequiredMark form={form}>
        <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="id"
                label="Mã công ty"
                rules={[
                  {
                    required: true,
                    message: 'Nhập mã công ty',
                  },
                ]}
              >
                <Input placeholder="Nhập mã công ty"/>
              </Form.Item>
            </Col>
          </Row>
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
                name="phone"
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
        <Button onClick={update_Company}>Cập nhật</Button>
      </Modal>
        </>
    )
}

export default Modal_ViewCompany;