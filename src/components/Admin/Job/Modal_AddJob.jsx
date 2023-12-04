import React, { useEffect, useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, DatePicker } from "antd";
import {
  createNewJob,
  getAllPriority,
  getAllMajor,
  getAllEducation,
} from "../../../service/JobService";
import {getAllCompany} from "../../../service/CompanyService";
import { toast } from "react-toastify";

const Modal_AddJob = (props) => {
  const [form] = Form.useForm();
  const [priority, setPriority] = useState([]);
  const [major, setMajor] = useState([]);
  const [education, setEducation] = useState([]);
  const [company, setCompany] = useState([]);
  const [date, setDate] = useState(null);
  const id_user = localStorage.getItem('account_user');


  useEffect(() => {
    getInfomation();
    onFill();
  }, []);

  const onChange = (date, dateString) => {
    console.log( dateString);
    setDate(dateString);
  };

  const getInfomation = async () => {
    let priority = await getAllPriority();
    if (priority) {
      setPriority(priority.recordsets[0]);
    }
    let major = await getAllMajor();
    if (major) {
      setMajor(major.recordsets[0]);
    }
    let education = await getAllEducation();
    if (education) {
      setEducation(education.recordsets[0]);
    }

    let company = await getAllCompany();
    if (company) {
      setCompany(company.recordsets[0]);
    }
  };

  const onFill = () => {
    form.setFieldsValue({ account: id_user });
  }

  const handleAddJob = async () => {
    try {
      let data = form.getFieldsValue();
      data.time = date;
      console.log('form', data);
      let result = await createNewJob(data);
      if (result) {
        toast.success(result.message);
        form.resetFields();
        props.closeDrawer();
        props.showJob();
      }
    } catch (error) {
      toast.error("Lỗi dữ liệu!");
    }
  };

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
            <Col span={24}>
              <Form.Item
                name="title"
                label="Công việc"
                rules={[
                  {
                    required: true,
                    message: "Nhập công việc",
                  },
                ]}
              >
                <Input placeholder="Nhập công việc" />
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
                    message: "Nhập tài khoản",
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
                    message: "Nhập mã công ty",
                  },
                ]}
              >
                <Select
                  defaultValue="Chọn mã công ty"
                  style={{
                    width: 300,
                  }}
                  allowClear
                  options={company.map((item) => ({
                    value: item.id,
                    label: item.company_name,
                  }))}
                />
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
                    message: "Nhập độ ưu tiên",
                  },
                ]}
              >
                <Select
                  defaultValue="Chọn mức độ ưu tiên"
                  style={{
                    width: 300,
                  }}
                  allowClear
                  options={priority.map((item) => ({
                    value: item.id,
                    label: item.name_priority,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[
                  {
                    required: true,
                    message: "Nhập trạng thái",
                  },
                ]}
              >
                <Input placeholder="Nhập trạng thái" />
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
                    message: "Nhập cấp học",
                  },
                ]}
              >
                <Select
                  defaultValue="Chọn cấp học"
                  style={{
                    width: 300,
                  }}
                  allowClear
                  options={education.map((item) => ({
                    value: item.id,
                    label: item.name_level,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="major"
                label="Chuyên nghành"
                rules={[
                  {
                    required: true,
                    message: "Nhập chuyên nghành",
                  },
                ]}
              >
                <Select
                  defaultValue="Chọn chuyên nghành"
                  style={{
                    width: 300,
                  }}
                  allowClear
                  options={major.map((item) => ({
                    value: item.id,
                    label: item.name_major,
                  }))}
                />
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
                    message: "Nhập số lượng ứng tuyển",
                  },
                ]}
              >
                <Input placeholder="Nhập số lượng ứng tuyển" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="salary"
                label="Lương"
                rules={[
                  {
                    required: true,
                    message: "Nhập lương",
                  },
                ]}
              >
                <Input placeholder="Nhập lương" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="time"
                label="Hạn nộp hồ sơ"
                rules={[
                  {
                    required: true,
                    message: "Nhập thời gian tạo",
                  },
                ]}
              >
                <DatePicker onChange={onChange} />
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
                    message: "Nhập mô tả công việc",
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
                    message: "Nhập thông tin thêm",
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Nhập thông tin thêm" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button type="primary" onClick={handleAddJob}>
          Tạo mới
        </Button>
      </Drawer>
    </>
  );
};

export default Modal_AddJob;
