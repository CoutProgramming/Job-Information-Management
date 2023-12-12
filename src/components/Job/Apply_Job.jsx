import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Col, Input, DatePicker } from "antd";
import moment from "moment";
import { createApply, uploadCV } from "../../service/ApplyService";
import { toast } from "react-toastify";

const Apply_Job = (props) => {
  const [form] = Form.useForm();
  const currentDate = moment();
  const [file, setFile] = useState([]);
  console.log("date: ", currentDate);
  const idUser = localStorage.getItem("account_user");
  const idJob = props.idJob;

  useEffect(() => {
    if (currentDate) {
      onFill();
    }
  }, [idJob]);

  const onFill = () => {
    form.setFieldsValue({
      time: currentDate,
      account: idUser,
      job: idJob,
    });
  };

  const handleApply = async () => {
    if(file.length === 0)
    {
      toast.error("Bạn cần upload CV trước khi apply")
    }
    else{
      let data = form.getFieldsValue();
      let result = await createApply(data);
      if (result.message === "Bạn đã ứng tuyển công việc này rồi!") {
        toast.warning(result.message);
      } else {
        handleSaveFile();
        props.closeApply();
        toast.success(result.message);
        //handleSendEmail();
      }
    }
  };

  const handleUploadFile = (event) => {
    console.log("file: ", event.target.files[0]);
    if (event.target && event.target.files && event.target.files[0]) {
      let fileCurrent = event.target.files[0];
      if (fileCurrent.type !== "application/pdf") {
        toast.error("Chỉ chấp nhận file pdf");
        console.log("file upload: ", file);
        return;
      }
      else{
        setFile(fileCurrent);
        toast.success("Upload CV thành công");
        console.log("file upload: ", file);
        return
      }
    }
  }

  const handleSaveFile = async () => {
    try {
      const formData = new FormData();
        formData.append("cv-user", file);
        await uploadCV(formData);
    } catch (e) {
      console.log(e);
    }
  };

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
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div>
          <label htmlFor="test" className="btn btn-primary">
            <i class="fa-solid fa-file-import"></i> Upload CV
          </label>
          <input
            id="test"
            type="file"
            name="uploadfile"
            hidden
            onChange={(event) => handleUploadFile(event)}
          ></input>
        </div>
        <br></br>
        <Button type="primary" onClick={handleApply}>
          Ứng tuyển
        </Button>
      </Modal>
    </>
  );
};

export default Apply_Job;
