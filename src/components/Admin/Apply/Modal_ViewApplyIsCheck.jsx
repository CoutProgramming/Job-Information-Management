import React, {useEffect, useState} from "react";
import { Form, Modal, Row, Col, Input, Button, DatePicker} from 'antd';
import {createNotification} from '../../../service/ApplyService'
import { toast } from "react-toastify";

const Modal_ViewApplyIsCheck = (props) => {

  const [form] = Form.useForm();
  const [content, setContent] = useState(null);
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
      account: info_Apply[0].accountID,
    })
  }

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setContent(dateString);
  };

  const createNoti = async () => {
    let data = form.getFieldsValue();
    let mergeDate = {...data, content}
    console.log('noti:', mergeDate);
    let result = await createNotification(mergeDate);
    if(result)
    {
      toast.success("Tạo lịch phỏng vấn thành công!")
      props.closeModal();
    }
  }

    return (
        <>
        <Modal title="Thông tin phỏng vấn" open={props.openModal} onOk={props.closeModal} onCancel={props.closeModal}>
        <Form layout="vertical" hideRequiredMark form={form}>
        <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Tiêu đề phỏng vấn"
                rules={[
                  {
                    required: true,
                    message: 'Nhập tiêu đề',
                  },
                ]}
              >
                <Input placeholder="Nhập tiêu đề"/>
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
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Thời gian phỏng vấn"
                rules={[
                  {
                    required: true,
                    message: 'Nhập thời gian tạo',
                  },
                ]}
              >
                <DatePicker onChange={onChange}/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button onClick={createNoti}>Tạo lịch hẹn</Button>
      </Modal>
        </>
    )
}

export default Modal_ViewApplyIsCheck;