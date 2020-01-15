import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'antd';
import '../../styles/guest/Product.css';

class Product extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return(
      <div className="product-page">
        <div className="product-image">
          <div className="product-title">
            <h1>THIẾT BỊ ĐIỆN THÔNG MINH</h1>
            <p>Mang lại những tiện nghi tuyệt vời cho ngôi nhà của bạn</p>
          </div>
        </div>

        <div className="product-content">
          <div className="product-switch-image">
            <img alt="switch" src="https://unie.vn/wp-content/uploads/Cong-tac-cam-ung-3-nut-lumi-trang-hinh-vuong111.png" width='100%'></img>
          </div>
          <div className="product-switch">
            <h1>CÔNG TẮC CẢM ỨNG</h1>
            <p>Nguồn cấp: 100-240V 50/60Hz<br/>Công suất: 8A/ kênh<br/>Kiểu dáng: Hình vuông/ Hình chữ nhật<br/>Màu sắc: Đen/ Trắng</p>
            <Button shape="round" ghost>Tìm hiểu thêm<Icon type="double-right" /></Button>
          </div>

          <div className="product-socket-image">
            <img alt="socket" src="https://lumi.vn/image/%E1%BB%94%20c%E1%BA%AFm%20vi%E1%BB%81n%20nh%C3%B4m%20564x500.jpg" width="90%"></img>
          </div>
          <div className="product-socket">
            <h1>Ổ CẮM THÔNG MINH</h1>
            <p>Nguồn cấp: 100-240V 50/60Hz<br/>Công suất: 16A<br/>Kiểu dáng: Hình vuông/ Hình chữ nhật<br/>Màu sắc: Đen/ Trắng</p>
            <Button shape="round" ghost>Tìm hiểu thêm<Icon type="double-right" /></Button>
          </div>

          <div className="product-moduleir-image">
            <img alt="switch" src="https://lumi.vn/image/bo-dieu-khien-hong-ngoai2-451x440.png"></img>
          </div>
          <div className="product-moduleir">
            <h1>CÔNG TẮC CẢM ỨNG</h1>
            <p>Nguồn cấp: 100-240V 50/60Hz<br/>Công suất: 8A/ kênh<br/>Kiểu dáng: Hình vuông/ Hình chữ nhật<br/>Màu sắc: Đen/ Trắng</p>
            <Button  shape="round" ghost>Tìm hiểu thêm<Icon type="double-right" /></Button>
          </div>

          <div className="product-center-image">
            <img alt="socket" src="https://lumi.vn/image/B%E1%BB%99%20%C4%91i%E1%BB%81u%20khi%E1%BB%83n%20trung%20t%C3%A2m%20564x500.jpg" width="90%"></img>
          </div>
          <div className="product-center">
            <h1>BỘ ĐIỀU KHIỂN TRUNG TÂM</h1>
            <p>Nguồn cấp: 100-240V ~ 50-60Hz<br/>Nhiệt độ hoạt động: 0-50ºC<br/>Kích thước: 95,6 x 48,9 x 46mm<br/>Màu sắc: Màu đen</p>
            <Button shape="round" ghost>Tìm hiểu thêm<Icon type="double-right" /></Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
