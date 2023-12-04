import React from "react";
import "./Footer.scss";

class Footer extends React.Component {
  render() {
    return (
      <>
        <div className="footer">
          <div className="content">
            <ul className="TongDai">
              <li>Want to post a job? Contact us at:</li>
              <li>Ho Chi Minh: <span style={{color: "#ffcb05"}}> 0393921810</span></li>
              <li>Ha Noi:<span style={{color: "#ffcb05"}}> 0393921810</span></li>
              <li>Liên hệ với chúng tôi</li>
              <li><a href="https://www.facebook.com/anhti2312/" style={{color:"#fff"}}><i class="fa-brands fa-facebook fa-lg"></i></a> <span style={{margin: "0px 40px 0px 40px"}}><i class="fa-brands fa-instagram fa-lg"></i></span> <i class="fa-brands fa-tiktok fa-lg"></i></li>
            </ul>
            <ul className="HeThong">
              <li>ABOUT US</li>
              <li>Home</li>
              <li>About us</li>
              <li>Contact us</li>
              <li>All job</li>
            </ul>
            <ul className="HoTro">
              <li>Campaign</li>
              <li>IT Story</li>
              <li>Writing contest</li>
            </ul>
            <ul className="NhaThuoc">
              <li>Term</li>
              <li>Privacy Policy</li>
              <li>Operating Regulation</li>
              <li>Complaint Handling</li>
              <li>Terms & Conditions</li>
              <li>Press</li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
