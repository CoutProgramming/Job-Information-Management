import React, { useEffect, useState } from "react";
import { getCompanyByID } from "../../service/CompanyService";

function Detail_Company(props) {
  const [infoCompany, setInfoCompany] = useState([]);

  useEffect(() => {
    const getDetailCompany = async () => {
      const companyId = props.id;
      try {
        const response  = await getCompanyByID(companyId);
        if (response) {
        setInfoCompany(response);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getDetailCompany();
  }, [props.id]);

  return (
    <>
      <div className="detail-product">
        <div className="left-detail">
          <h3>Mô tả công ty</h3>
          {infoCompany.map((item) => <div>{item.description_company}</div>)}
          <br></br>
          <h3>Ghi chú thêm</h3>
          {infoCompany.map((item) => <div>{item.address}</div>)}
        </div>
        <div className="right-detail">
          {infoCompany.map((item) => (
            <div className="info-product" key={item.id}>
              <div className="name-product">{item.company_name}</div>
              <div className="price-product">
                <p>
                  Số điện thoại: {item.phone}
                </p>
              </div>
              <div className="other-detail">
                <div>
                  <b>Email: </b>
                  {item.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Detail_Company;
