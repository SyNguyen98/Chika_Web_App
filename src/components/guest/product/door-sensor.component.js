import React, { Component } from 'react';
import { Carousel } from 'antd';

import '../../../styles/guest/product/door-sensor.component.css';
import ProductFooterComponent from './product-footer.component';

const imageUri = "/image/guest/product/door-sensor/";

export default class DoorSensorComponent extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return(
      <div className="door-sensor">
        <div className="door-sensor_introduce">
          <div className="door-sensor_introduce_image">
            <Carousel className="switch-sensor_introduce_carousel" autoplay dots='false'>
              <img alt="door-sensor" src={`${imageUri}door-sensor.png`}/>
              <img alt="door-sensor" src={`${imageUri}door-sensor-1.jpg`}/>
              <img alt="door-sensor" src={`${imageUri}door-sensor-2.jpg`}/>
            </Carousel>
          </div>
          <div className="door-sensor_introduce_content">
            <h1>CẢM BIẾN CỬA</h1>
            <p>
              <b>- Mô tả:</b> Phát hiện đóng mở cửa trái phép, kích hoạt hệ thống các thiết bị nào như: còi hú, đèn xoáy, mở rèm, bật đèn sáng …
                đồng thời cảnh báo lên ứng dụng trên điện thoại hoặc máy tính bảng. Cảm biến sử dụng công nghệ không dây Zigbee - tiêu chuẩn 802.15.4 bảo mật cao.
                Mặt khác, cảm biến phát hiện chuyển động còn tích hợp sẵn bên trong cảm biến môi trường để đo các thông tin như: nhiệt độ, độ ẩm, ánh sáng ...
                giúp tạo không gian trong lành, đảm bảo sức khỏe tốt nhất cho gia đình bạn.
              <br/><br/>
              <b>- Điện áp:</b> Pin CR2477 - 3V
              <br/><br/>
              <b>- Nhiệt độ hoạt động:</b> 50ºC Max
            </p>
          </div>
        </div>

        <div className="door-sensor_body">
          <b><i>Cảm biến cửa Chika - thiết kế tinh tế, hiện đại với màu trắng bắt mắt</i></b>
          <br/>Cảm biến cửa Chika được thiết kế thành 2 phần riêng biệt, được gắn tại cửa ra vào của ngôi nhà hay của từng phòng, được lắp với tối đa cách nhau là 2cm.
            Được làm từ chất liệu nhựa chống cháy PP, thiết kế tinh tế, tỉ mỉ với các đầu vát tròn.
            <strong> Cảm biến phát hiện đột nhập</strong> chỉ duy nhất có màu trắng, thể hiện sự hiện đại, sang trọng.
          <br/><img alt="cam-bien-dot-nhap" src={`${imageUri}cam-bien-dot-nhap.jpg`}/>
          <br/><i style={{marginLeft: '18vw'}}>Cảm ứng của phát hiện đột nhập của Lumi sử dụng công nghệ không dây Zigbee</i>
          <br/>
          <br/>Thiết bị phát hiện có sự kiện đóng/ mở cửa. Nếu truyền về bộ điều khiển trung tâm: Đèn chỉ thị nháy xanh, nháy nhanh 2 lần.
            Nếu không truyền về bộ điều khiển trung tâm: Đèn chỉ thị nháy đỏ, nháy nhanh 2 lần.
          <br/>
          <br/><b><i>Ứng dụng của bộ điều khiển nhà thông minh</i></b>
          <br/>Cảm biến cửa Chika là 1 trong những thiết bị trong giải pháp chuẩn an ninh của Chika.
            Nó được ứng dụng vào giải pháp chống trộm thông minh cho nhà ở, căn hộ chung cư, xe ô tô … ví dụ:
            Khi lắp cảm biến phát hiện chuyển động như cửa ra vào, bạn cài đặt theo khung thời gian từ 23h – 5h sáng, 8h – 11h và 13h – 17h.
            Trong khoảng thời gian này, khi cánh cửa bị mở, cảm biến phát hiện chuyển động ngay lập tức truyền tín hiệu đến bộ điều khiển trung tâm HC.
            Tại đây, HC có chức năng kích hoạt các công tắc để bật đèn, mở rèm, còi báo động …
          <br/><img alt="cam-bien-dot-nhap-1" src={`${imageUri}cam-bien-dot-nhap-1.jpg`}/>
          <br/>Việc gửi cảnh báo đến điện thoại và huy động các thiết bị tham gia quá trình “chống trộm” đã góp phần vào việc bảo vệ ngôi nhà bạn trước những tác nhân xấu.
          <br/>
          <br/><b><i>Cách thức hoạt động</i></b>
          <br/>Khi cửa mở, cảm biến sẽ gửi tín hiệu tới bộ điều khiển trung tâm (HC) khi phát hiện cửa mở và báo cho bạn biết.
            Tại đây, HC thực hiện chức năng gửi cảnh báo đến điện thoại di động của bạn, đồng thời gửi thông báo đến công tắc
            kích hoạt 1 hệ thống các thiết bị cùng tham gia “chống trộm” như: còi hú, rèm mở, đèn bật sáng … tùy theo ngữ cảnh mà bạn cài đặt.
          <br/><img alt="cam-bien-dot-nhap-2" src={`${imageUri}cam-bien-dot-nhap-2.jpg`}/>
          <br/>Lưu ý: Để cảm biến hoạt động hiệu quả, bạn nên cài đặt thời gian hoạt động cho cảm biến theo khung giờ. Ví dụ: từ 23h – 5h sáng, 8h – 11h và 13h – 17h.
          <br/>
          <br/><b><i>Đảm bảo an toàn tuyệt đối cho ngôi nhà bạn</i></b>
          <br/>Việc gửi cảnh báo đến điện thoại và huy động các thiết bị tham gia quá trình “chống trộm” đã góp phần vào việc bảo vệ ngôi nhà bạn trước những tác nhân xấu.
            Ngoài ra, cảm biến cửa còn có chức năng như cảm biến môi trường, có thể đo được các thông số như: độ ẩm, nhiệt độ, ánh sáng môi trường và báo đến điện thoại,
            giúp gia đình bạn luôn có môi trường đảm bảo sức khỏe.
          <br/>
          <br/>Sử dụng công nghệ không dây zigbee, tiêu chuẩn 802.15.4 – sử dụng tín hiệu radio có tần sóng ngắn, có 2 tầng và vận hành trong vùng bảo mật của hệ thống.
            Nên trộm không thể xâm nhập vào hệ thống mạng không dây zigbee nhà bạn để mở cửa một cách dễ dàng.
          <br/><img alt="cam-bien-dot-nhap-3" src={`${imageUri}cam-bien-dot-nhap-3.jpg`}/>
          <br/><i style={{marginLeft: '3vw'}}>Lumi là đơn vị đạt chứng chỉ CE – tiêu chuẩn xuất khẩu sang Châu Âu và chứng chỉ UL – được phép xuất khẩu đến 104 quốc gia trên thế giới</i>
          <br/>
          <br/><b><i>Lắp đặt</i></b>
          <br/>Sản phẩm được gắn dễ dàng trên cửa bằng miếng dán kèm theo vô cùng chắc chắn.
          <br/>Sau khi cố định mặt sau vào đúng vị trí lắp đặt quý khách hàng tiếp tục gắn mặt trước cảm biến vào vị trí mặt sau đã lắp đặt để hoàn thiện sản phẩm.
          <br/>Nhà sản xuất khuyến nghị: quý khách hàng nên lắp nam châm vào lề cửa, cảm biến cửa vào cánh cửa và khoáng cách giữa nam châm và cảm biến cửa 2cm.
          <br/><i>Để đảm bảo cảm biến cửa hoạt động: Quý khách hàng lưu ý lắp rãnh khuyết ở cảm biến trùng với rãnh khuyết trên nam châm.</i>
        </div>

        <ProductFooterComponent history={this.props.history}/>
      </div>
    )
  }
}
