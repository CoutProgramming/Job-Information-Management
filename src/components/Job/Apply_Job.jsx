import React, { useEffect } from "react";
import {Button, Modal, Form, Row, Col, Input, DatePicker } from "antd";
import moment from "moment";
import {createApply} from '../../service/ApplyService';
import { toast } from 'react-toastify';

const Apply_Job = (props) => {
    const [form] = Form.useForm();
    const currentDate = moment();
    console.log('date: ', currentDate)
    const idUser = localStorage.getItem('account_user')
    const idJob = props.idJob;



    useEffect(() => {
        if(currentDate)
        {
          onFill();
        }
      }, [idJob])

    const onFill = () => {
        form.setFieldsValue({
            time: currentDate,
            account: idUser,
            job: idJob
        })
    }

    const handleApply = async () => {
        let data = form.getFieldsValue();
        let result = await createApply(data);
        if(result.message === "Bạn đã ứng tuyển công việc này rồi!")
        {
            toast.warning(result.message);           
        }
        else
        {
          props.closeApply();
          toast.success(result.message);
          //handleSendEmail();
        }
    }

  return (
    <>
      <Modal
        title="Xác nhận thông tin ứng tuyển"
        open={props.openApply}
        onCancel={props.closeApply}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="account"
                label="Mã ứng viên"
                rules={[
                  {
                    required: true,
                    message: "Nhập mã ứng viên",
                  },
                ]}
              >
                <Input placeholder="Nhập mã ứng viên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="job"
                label="Mã công việc"
                rules={[
                  {
                    required: true,
                    message: "Nhập mã công việc",
                  },
                ]}
              >
                <Input placeholder="Nhập mã công việc" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="time"
                label="Thời gian ứng tuyển"
                rules={[
                  {
                    required: true,
                    message: "Nhập thời gian ứng tuyển",
                  },
                ]}
              >
                <DatePicker/>
              </Form.Item>
            </Col>         
          </Row>
        </Form>
        <Button type="primary" onClick={handleApply}>Ứng tuyển</Button>
      </Modal>
    </>
  );
};

export default Apply_Job;
