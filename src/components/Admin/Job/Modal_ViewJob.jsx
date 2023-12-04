import React, {useEffect} from "react";
import { Form, Modal, Row, Col, Input, Button} from 'antd';
import {updateJob} from '../../../service/JobService'
import { toast } from "react-toastify";


const Modal_ViewJob = (props) => {

  const [form] = Form.useForm();
   let info_Job = props.info_Job;
   console.log('job: ', info_Job);

   useEffect(() => {
    if(info_Job.length > 0)
    {
      onFill();
    }
  }, [props.info_Job])

  const onFill = () => {
    form.setFieldsValue({ 
      id: info_Job[0].id,
      account: info_Job[0].accountID,
      company: info_Job[0].companyID,
      count: info_Job[0].count,
      description: info_Job[0].description_Job,
      education: info_Job[0].educationID,
      major: info_Job[0].majorID,
      note: info_Job[0].note,
      priority: info_Job[0].priorityID,
      salary: info_Job[0].salary,
      status: info_Job[0].status_Job,
      time: info_Job[0].time_Create,
      title: info_Job[0].title
    })
  }

  const update_Job = async () => {
    try
    {
      let data = form.getFieldsValue();
      let result = await updateJob(data);
      if(result)
      {
        toast.success("Update job successfully!")
        props.showJob();
        props.closeModal();
      }
    }
    catch(error)
    {
      toast.error("Cập nhật thất bại!");
    }
  }

    return (
        <>
        <Modal title="Thông tin công việc" open={props.openModal} onOk={props.closeModal} onCancel={props.closeModal}>
        <Form layout="vertical" hideRequiredMark form={form}>
        <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Công việc"
                rules={[
                  {
                    required: true,
                    message: 'Nhập công việc',
                  },
                ]}
              >
                <Input placeholder="Nhập công việc"/>
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
                name="company"
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
                name="priority"
                label="Độ ưu tiên"
                rules={[
                  {
                    required: true,
                    message: 'Nhập độ ưu tiên',
                  },
                ]}
              >
                <Input placeholder="Nhập độ ưu tiên" />
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
          <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                name="education"
                label="Cấp học"
                rules={[
                  {
                    required: true,
                    message: 'Nhập cấp học',
                  },
                ]}
              >
                <Input placeholder="Nhập cấp học"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="major"
                label="Chuyên nghành"
                rules={[
                  {
                    required: true,
                    message: 'Nhập chuyên nghành',
                  },
                ]}
              >
                <Input placeholder="Nhập chuyên nghành"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                name="count"
                label="Đã ứng tuyển"
                rules={[
                  {
                    required: true,
                    message: 'Nhập số lượng ứng tuyển',
                  },
                ]}
              >
                <Input placeholder="Nhập số lượng ứng tuyển"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="salary"
                label="Lương"
                rules={[
                  {
                    required: true,
                    message: 'Nhập lương',
                  },
                ]}
              >
                <Input placeholder="Nhập lương"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                name="id"
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
            <Col span={12}>
              <Form.Item
                name="time"
                label="Hạn nộp hồ sơ"
                rules={[
                  {
                    required: true,
                    message: 'Nhập thời gian tạo',
                  },
                ]}
              >
                <Input placeholder="Nhập thời gian tạo"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô tả công việc"
                rules={[
                  {
                    required: true,
                    message: 'Nhập mô tả công việc',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Nhập mô tả công việc" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="note"
                label="Thông tin thêm"
                rules={[
                  {
                    required: true,
                    message: 'Nhập thông tin thêm',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Nhập thông tin thêm" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button onClick={update_Job}>Cập nhật</Button>
      </Modal>
        </>
    )
}

export default Modal_ViewJob;