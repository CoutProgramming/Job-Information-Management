import React, { useEffect, useState } from "react";
import "./Detail_Job.scss";
import { getJobById } from "../../service/JobService";
import { Image, Button, Space } from "antd";
import moment from "moment";

function Detail_Job(props) {
  const [infoProduct, setInfoProduct] = useState([]);

  useEffect(() => {
    const getDetailJob = async () => {
      const productId = props.id;
      try {
        const response  = await getJobById(productId);
        if (response) {
          let data = response.map(item => {
            return {
              ...item,
              time_Create: moment(item.time_Create).format('HH:mm:ss DD-MM-YYYY')
            };
          });
          setInfoProduct(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getDetailJob();
  }, [props.id]);

  return (
    <>
      <div className="detail-product">
        <div className="left-detail">
          <h3>Mô tả công việc</h3>
          {infoProduct.map((item) => <div>{item.description_Job}</div>)}
          <br></br>
          <h3>Ghi chú thêm</h3>
          {infoProduct.map((item) => <div>{item.note}</div>)}
        </div>
        <div className="right-detail">
          {infoProduct.map((item) => (
            <div className="info-product" key={item.id}>
              <div className="name-product">{item.title}</div>
              <div className="price-product">
                <p>
                  Lương: {item.salary}
                  <span className="price-underline"> vnđ</span>
                </p>
              </div>
              <div className="other-detail">
                <div>
                  <b>Trạng thái: </b>
                  {item.status_Job}
                </div>
                <div>
                  <b>Hạn nộp hồ sơ: </b>
                  {item.time_Create}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Detail_Job;
