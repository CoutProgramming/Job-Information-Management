import React, {useEffect} from "react";
import { Form, Modal, Row, Col, Input, Button} from 'antd';
import {updateCompany} from '../../../service/CompanyService'
import { toast } from "react-toastify";     

const Modal_ViewApply = (props) => {

  const [form] = Form.useForm();
   let info_Apply = props.InfoApply;
   console.log('apply: ', info_Apply);

   useEffect(() => {
    if(info_Apply.length > 0)
    {
      onFill();
    }
  }, [props.InfoApply])

  const onFill = () => {
    form.setFieldsValue({ 
      id: info_Apply[0].id,
      account: info_Apply[0].accountID,
      job: info_Apply[0].jobID,
      status: info_Apply[0].status_apply,
      time: info_Apply[0].create_Time,
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
        <Modal title="Thông tin ứng tuyển" open={props.openModal} onOk={props.closeModal} onCancel={props.closeModal}>
        <Form layout="vertical" hideRequiredMark form={form}>
        <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="id"
                label="Mã ứng tuyển"
                rules={[
                  {
                    required: true,
                    message: 'Nhập mã ứng tuyển',
                  },
                ]}
              >
                <Input placeholder="Nhập mã ứng tuyển"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="account"
                label="Id tài khoản"
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
            <Col span={12}>
              <Form.Item
                name="job"
                label="Mã công việc"
                rules={[
                  {
                    required: true,
                    message: 'Nhập mã công việc',
                  },
                ]}
              >
                <Input placeholder="Nhập mã công việc"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="time"
                label="Thời gian tạo"
                rules={[
                  {
                    required: true,
                    message: 'Nhập thời gian tạo',
                  },
                ]}
              >
                <Input placeholder="Nhập thời gian tạo" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[
                  {
                    required: true,
                    message: 'Nhập trạng thái',
                  },
                ]}
              >
                <Input placeholder="Nhập trạng thái"/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button onClick={update_Company}>Cập nhật</Button>
      </Modal>
        </>
    )
}

export default Modal_ViewApply;