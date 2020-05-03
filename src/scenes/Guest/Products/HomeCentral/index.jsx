import React, { Component } from 'react';
import { Carousel } from 'antd';

import ProductFooterComponent from '../footer';

import "./home-central.css";

import {HOME_CENTRAL_URI} from "../../../../constant/uri";

export default class HomeCentralComponent extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return(
      <div className="home-controller">
        <div className="home-controller_introduce">
          <div className="home-controller_introduce_image">
            <Carousel className="switch-sensor_introduce_carousel" autoplay dots='false'>
              <img alt="home-controller" src={`${HOME_CENTRAL_URI}ca-hc.png`}/>
              <img alt="home-controller" src={`${HOME_CENTRAL_URI}ca-hc-1.png`}/>
              <img alt="home-controller" src={`${HOME_CENTRAL_URI}ca-hc-2.png`}/>
            </Carousel>
          </div>
          <div className="home-controller_introduce_content">
            <h1>BỘ ĐIỀU KHIỂN TRUNG TÂM</h1>
            <p>
              <b>- Mô tả:</b> Là bộ não của ngôi nhà thông minh, tích hợp công nghệ truyền thông không dây Zigbee cho phép: Kết nối và quản lý các thiết bị điện,
                lưu trữ các thông tin cấu hình cài đặt của người dùng, cập nhật trạng thái các thiết bị cho người sử dụng
              <br/><br/>
              <b>- Điện áp:</b> 5VDC - 1A
              <br/><br/>
              <b>- Nhiệt độ hoạt động:</b> 75ºC max
            </p>
          </div>
        </div>

        <div className="home-controller_body">
          <b><i>GIỚI THIỆU CHUNG</i></b>
          <br/>Được xem là bộ não của ngôi nhà thông minh, <strong>bộ điều khiển trung tâm</strong> được ứng công nghệ truyền thông không dây Zigbee
            – sử dụng tín hiệu radio có tần sóng ngắn, có 2 tầng và vận hành trong vùng bảo mật của hệ thống.
            Tuyệt đối an toàn cho ngôi nhà của bạn trước những tác nhân xấu.
          <br/>
          <br/>Là đầu mối tiếp nhận và truyền thông tin “công việc” đến các công tắc để yêu cầu thiết bị thực hiện nhiệm vụ mà người sử dụng yêu cầu.
            Nơi lưu trữ các thông tin cấu hình, cài đặt của người dùng, cập nhật trạng thái các thiết bị và tự động ra lệnh cho các thiết bị hoạt động
            theo cấu hình mà người dùng cài đặt.
          <br/><img alt="dieu-khien-trung-tam-1" src={`${HOME_CENTRAL_URI}dieu-khien-trung-tam-1.jpg`}/>
          <br/>Được thiết 2 màu cơ bản: đen – bạc, sắc nét, tỉ mỉ đến từng chi tiết
          <br/>
          <br/><b><i>Ứng dụng của bộ điều khiển nhà thông minh</i></b>
          <br/>Đóng vai trò là bộ não của giải pháp nhà thông minh. Hệ thống các công tắc kết nối thiết bị điện trong gia đình,
            nếu không có bộ điều khiển trung tâm thì sẽ trở thành công tắc cơ thông thường. Bạn không thể điều điều khiển,
            kiểm soát cũng như cài đặt chế độ tự hoạt động cho hệ thống thiết bị điện trong ngôi nhà của mình trên điện thoại, máy tính bảng …
          <br/><img alt="dieu-khien-trung-tam-2" src={`${HOME_CENTRAL_URI}dieu-khien-trung-tam-2.jpg`}/>
          <br/><i style={{marginLeft: '10vw'}}>Là nơi tiếp nhận và truyền thông tin đến từng thiết bị để yêu cầu thực hiện công việc theo nhu cầu của người dùng</i>
          <br/>
          <br/><b><i>Phương thức hoạt động</i></b>
          <br/>Bộ <strong>điều khiển nhà thông minh</strong> sẽ tiếp nhận tín hiệu từ cảm biến hoặc người dùng gửi đến sever.
            Sau khi tiếp nhận thông tin, bộ điều khiển trung tâm – HC truyền tín hiệu đến công tắc được gắn với thiết bị, để thực hiện yêu cầu của người dùng.
          <br/>Ví dụ: Khi cảm biến phát hiện chuyển động gửi tín hiệu “có người di chuyển vào vùng cảm biến” đến HC.
            Tại đây, HC truyền tín hiệu nhận được đến công tắc kết nối với thiết bị như bóng đèn hành lang, đèn tuýp … sẽ tự động bật/tắt.
          <br/><img alt="ca-hc" src={`${HOME_CENTRAL_URI}ca-hc.png`} style={{width: '20vw', height: '18vw',marginLeft: '30vw'}}/>
          <br/><i style={{marginLeft: '18vw'}}>Nơi lưu trữ tất cả các dữ liệu của giải pháp nhà thông minh trong ngôi nhà của bạn</i>
          <br/>
          <br/>Ngoài ra, HC còn cho phép người dùng tạo hoạt cảnh. Ví dụ: Bạn có thể tạo cảnh bằng cách sử dụng 1 nút công tắc bật hoặc tắt toàn bộ thiết bị trong nhà,
            chỉ cần 1 nốt chạm trực tiếp như công tắc cơ hoặc trên điện thoại, bạn đã hoàn toàn điều khiển tất cả các thiết bị điện trong ngôi nhà.
            Tương tự với những hoạt cảnh: tiếp khách, ăn tối, đi làm về … cho các thiết bị trong gia đình.
          <br/>
          <br/><b><i>Ưu điểm của bộ điều khiển trung tâm</i></b>
          <br/>Sử dụng công nghệ chuẩn ZigBee – công nghệ nổi bật trên thế giới hiện nay ứng dụng trong nhiều công nghệ, với những đặc điểm bảo mật tốt, có thể hỗ trợ,
            kết nối các thiết bị trong nhà thành một mạng lưới thông minh. Công nghệ ZigBee tiêu hao rất ít năng lượng, tiết kiệm tối đa chi phí so với các công nghệ khác.
          <br/>
          <br/>Đặc biệt, sever Chika đã tích hợp thành công với Sever của Amazon – Mỹ để tạo ra giải pháp nhà thông minh điều khiển bằng giọng nói.
            Cho phép người dùng hoàn toàn kiểm soát, điều khiển các thiết bị trong ngôi nhà bằng chính “giọng nói quyền năng” của mình.
            Khi bạn nói câu lệnh “Turn on/off Chika go home” tất cả các thiết bị trong ngôi nhà sẽ hoàn toàn bật/tắt, tùy theo câu lệnh.
          <br/>
          <br/>Hãng ABI Research cho biết: năm 2012 đã có hơn 1,5 triệu hệ thống nhà thông minh đã được lắp đặt ở Mỹ và dự kiến, con số này sẽ tăng đến 8 triệu vào năm 2018.
            Điều đó cho thấy, nhà thông minh đã và đang trở thành tiêu chuẩn, xu hướng nhà ở hiện đại trong tương lai.
        </div>

        <ProductFooterComponent history={this.props.history}/>
      </div>
    )
  }
}
