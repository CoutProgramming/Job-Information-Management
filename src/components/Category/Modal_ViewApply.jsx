import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { getAllApplyByID } from "../../service/ApplyService";
import moment from "moment";

const Modal_ViewApply = (props) => {
  const [InfoApply, setInfoApply] = useState(null);
  const id_user = localStorage.getItem("account_user");

  useEffect(() => {
    showApplyByID();
  }, []);

  const showApplyByID = async () => {
    try {
      let result = await getAllApplyByID(id_user);
      console.log("res:", result);
      if (result) {
        let data = result.map((item) => {
          return {
            ...item,
            create_Time: moment(item.create_Time).format("DD - MM - YYYY"),
          };
        });
        setInfoApply(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Modal
        title="Danh sách công việc đã ứng tuyển"
        open={props.showModal}
        onCancel={props.closeModal}
        okButtonProps={{ style: { display: "none" } }}
      >
        {InfoApply && InfoApply.length > 0 ? (
          InfoApply.map((item, index) => (
            <div key={index} id={item.id}>
              <div>Công việc ứng tuyển: {item.jobID}</div>
              <div>Trạng thái: {item.status_apply}</div>
              <div>Ngày ứng tuyển: {item.create_Time}</div>
              <br></br>
            </div>
          ))
        ) : (
          <div>Bạn chưa ứng tuyển công việc nào</div>
        )}
      </Modal>
    </>
  );
};

export default Modal_ViewApply;
