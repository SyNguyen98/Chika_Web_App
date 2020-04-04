import React, { Component } from 'react';
import { Carousel } from 'antd';

import '../../../styles/guest/product/switch-sensor.component.css';
import ProductFooterComponent from './product-footer.component';

const imageUri = "/image/guest/product/switch-sensor/";

export default class SwitchSensorComponent extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return(
      <div className="switch-sensor">
        <div className="switch-sensor_introduce">
          <div className="switch-sensor_introduce_image">
            <Carousel className="switch-sensor_introduce_carousel" autoplay dots='false'>
              <img alt="switch" src={`${imageUri}switch-sensor-1.png`} />
              <img alt="switch" src={`${imageUri}switch-sensor-2.png`} />
              <img alt="switch" src={`${imageUri}switch-sensor-1.png`} />
              <img alt="switch" src={`${imageUri}switch-sensor-3.png`} />
            </Carousel>
          </div>
          <div className="switch-sensor_introduce_content">
            <h1>CÔNG TẮC CẦU THANG TÍCH HỢP CẢM BIẾN 2 IN 1</h1>
            <p>
              <strong>Thông số kỹ thuật:</strong>
              <br/><br/>- Điện áp hoạt động 100-240V ~ 50-60Hz
              <br/><br/>- Công suất tiêu thị không tải: &lt; 0.5W
              <br/><br/>- Nhiệt độ hoạt động: 0 C - 50 C
              <br/><br/>- Công suất tải: Đèn sợi đốt: 500W và Led : 150W
              <br/><br/>- Truyền thông: Zigbee hoặc Wifi
              <br/><br/>- Kích thước: Phiên bản chữ nhật: 80 x 121,5 x 31,5 mm và Phiên bản vuông: 95 x 95 x 31,5 mm
            </p>
          </div>
        </div>

        <div className="switch-sensor_body">
          <b className="switch-sensor_body_title">Mô tả:</b><br/>
          <strong>Công tắc đèn cầu thang</strong> tích hợp cảm biến 2IN1 là thiết bị thông minh trong nhà phục vụ cho việc chiếu sáng tự động dựa trên hiện diện và cường độ sáng.
            Với thiết kế sử dụng công nghệ cảm ứng điện dung, mặt kính cường lực chống xước, thiết bị sẽ làm cho căn nhà trở nên tinh tế sang trọng và hiện đại.
          <br/>Khi được tích hợp trong hệ thống nhà thông minh, sản phẩm sẽ kết nối với các thiết bị khác thông qua bộ điều khiển trung tâm.
          <br/>Thiết bị sử dụng công nghệ cảm ứng điện dung, để bật/tắt thiết bị điện, chỉ cần chạm nhẹ vào biểu tượng bàn tay trên bề mặt kính.
            Màu đỏ tương ứng đèn bật, màu xanh tương ứng đèn tắt.
          <br/>Đặc biệt, có 2 chế độ hoạt động: Ấn giữ nút cảm ứng auto 1s ( led nháy hồng 2lần) để chuyển giữa các chế độ.
          <br/><strong>Chế độ tự động: Led auto sáng xanh</strong>
          <br/>Đây là chế độ hoạt động mặc định của sản phẩm. Điều khiển bật tắt đèn dựa vào cảm biến.
            Phát hiện chuyển động đèn bật, led auto nháy xanh với chu kì 2s, khi hết chuyển động sau một khoảng thời gian thiết lập đèn tắt.
          <br/><strong>Chế độ thường: Led auto tắt</strong>
          <br/>Chế độ hoạt động không dựa vào cảm biến. Điều khiển bật tắt đèn bằng nút tròn có bàn tay chỉ vào.
          <br/><strong>Thông số kỹ thuật:</strong>
          <br/>Điện áp hoạt động 100-240V ~ 50-60Hz
          <br/>Công suất tiêu thị không tải: &lt; 0.5W
          <br/>Nhiệt độ hoạt động: 0 C - 50 C
          <br/>Công suất tải: Đèn sợi đốt: 500W và Led : 150W
          <br/>Truyền thông: Zigbee hoặc Wifi
          <br/>Kích thước: Phiên bản chữ nhật: 80 x 121,5 x 31,5 mm và Phiên bản vuông: 95 x 95 x 31,5 mm
          <br/>
          <br/><b className="switch-sensor_body_title">CÔNG TẮC CẦU THANG TÍCH HỢP CẢM BIẾN 2IN1</b>
          <br/>Thiết bị công tắc cầu thang tích hợp cảm biến của Chika có 2 góc quét phát hiện chuyển động, vì vậy bạn cần lưu ý để lắp đặt sản phẩm cho hợp lý.
            Nhìn hình cảm biến dưới, sẽ thấy:
          <br/>+ Góc phát hiện chuyển động 1 : góc 150.
          <br/><img alt="switch" src={`${imageUri}cong-tac-tich-hop-cam-bien-cau-thang.jpg`}/>
          <br/>+ Góc phát hiện chuyển động 2 : góc 35 .
          <br/><img alt="switch" src={`${imageUri}cong-tac-tich-hop-cam-bien-cau-thang-2.jpg`}/>
          <br/>Góc phát hiện chuyển động 2 nhỏ hơn góc phát hiện chuyển động 1.
          <br/>Góc phát hiện chuyển động 1 Góc phát hiện chuyển động 2
          <br/>Với mong muốn tăng thêm sự tiện lợi, bộ sản phẩm còn có một mắt che cảm biến đi kèm. Vật dụng đi kèm thu hẹp phạm vi góc phát hiện chuyển động 1 còn một nửa là 75,
            góc phát hiện chuyển động 2 vẫn giữ nguyên.
          <br/>
          <br/><b className="switch-sensor_body_title">ỨNG DỤNG CỦA CÔNG TẮC CẦU THANG THÔNG MINH CHIKA</b>
          <br/>- Cảm biến cầu thang bật tắt đèn khi chuyển động.
          <br/>- Cảm biến chuyển động gắn trong nhà, phục vụ cho việc chiếu sáng tự động dựa trên hiện diện và cường độ sáng môi trường.
          <br/>- Chế tạo phù hợp để lắp ở các vị trí có lắp đế âm
          <br/>- Viền che mắt thay thế được
          <br/>- Viền nhận diện 100% và viền nhân diện 50%
          <br/>
          <br/><b className="switch-sensor_body_title">PHƯƠNG THỨC HOẠT ĐỘNG</b>
          <br/><strong>Cảm biến cầu thang</strong> tích hợp 2in1 có một mắt cảm biến quan sát giúp phát hiện chuyển động để kích hoạt đèn bật sáng.
            Ngoài ra, mắt cảm biến còn nhận biết được điều kiện ánh sáng môi trường để bật tắt đèn cho phù hợp.
            Cảm biến chỉ bật đèn khi có người chuyển động trong vùng quét của mắt, khi ra khỏi vùng quét của mắt cảm biến đèn sẽ tắt.
          <br/><strong>Tích hợp 2 trong 1: tối ưu và thông minh, tiện dụng</strong>
          <br/>Nếu như trong nhà bạn ở một số vị trí đặc biệt là cầu thang cần có cả công tắc và cảm biến chuyển động,
            thì nay Chika đã có thể tích hợp 2 thiết bị trong 1 để giúp bạn tối ưu được chi phí và diện tích không gian.
          <br/>Sản phẩm công tắc cầu thang tích hợp cảm biến 2in1 vừa có chức năng là công tắc vừa có chức năng cảm biến ánh sáng.
          <br/>Công tắc cầu thang tích hợp cảm biến 2in1 được thiết kế nhỏ gọn hiện đại phù hợp với mọi ngôi nhà, với hình dáng chữ nhật hoặc hình vuông theo sở thích của khách hàng.
            Ngoài ra thiết bị này còn được sử dụng như một vật trang trí giúp ngôi nhà của bạn trở nên đẹp và sang trọng hơn.
        </div>

        <ProductFooterComponent history={this.props.history}/>
      </div>
    )
  }
}
