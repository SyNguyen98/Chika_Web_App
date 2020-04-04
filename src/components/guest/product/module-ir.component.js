import React, { Component } from 'react';
import { Carousel } from 'antd';

import '../../../styles/guest/product/module-ir.component.css';
import ProductFooterComponent from './product-footer.component';

const imageUri = "/image/guest/product/module-ir/";

export default class ModuleIrComponent extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return(
      <div className="module-ir">
        <div className="module-ir_introduce">
          <div className="module-ir_introduce_image">
            <Carousel className="switch-sensor_introduce_carousel" autoplay dots='false'>
              <img alt="ca-irx" src={`${imageUri}ca-irx.png`}/>
              <img alt="ca-irx" src={`${imageUri}ca-irx-1.png`}/>
              <img alt="ca-irx" src={`${imageUri}ca-irx-2.png`}/>
            </Carousel>
          </div>
          <div className="module-ir_introduce_content">
            <h1>ĐIỀU KHIỂN HỒNG NGOẠI</h1>
            <p>
              <b>- Mô tả:</b> Thay vì điều khiển điều hòa, tivi qua remote cầm tay, điều khiển hồng ngoại Chika sẽ giúp bạn có thể điều khiển qua điện thoại:
                bật/ tắt chuyển kênh tivi, tăng/ giảm nhiệt độ điều hòa … Sử dụng công nghệ sóng không dây Zigbee hoặc Wifi, việc lắp đặt sẽ trở nên nhanh chóng và dễ dàng.
                Kết hợp cùng giải pháp khác để lên lịch bật tắt hay điều khiển nhiệt độ điều hòa theo thời gian.
              <br/><br/>
              <b>- Điện áp:</b> 5 VDC/1A
              <br/><br/>
              <b>- Nhiệt độ hoạt động:</b> 50ºC Max
              <br/><br/>
              <b>- Góc điều khiển:</b> 360º
              <br/><br/>
              <b>- Số mã lệnh học:</b> 1000 lệnh
              <br/><br/>
              <b>- Kích thước:</b> 70 x 21 mm
              <br/><br/>
              <b>- Khối lượng:</b> 66,5 gram
            </p>
          </div>
        </div>

        <div className="module-ir_body">
          <b><i>Thiết kế sang trọng, bắt mắt với kiểu dáng bo tròn</i></b>
          <br/><strong>Bộ điều khiển hồng ngoại</strong> của Chika chính là thiết bị chủ đạo trong giải pháp điều hòa, tivi thông minh.
            Từ thiết kế tinh tế, hình ảnh và màu sắc đều được các kỹ sư chăm chút đến từng chi tiết.
          <br/><img alt="cam-bien-hong-ngoai-1" src={`${imageUri}cam-bien-hong-ngoai-1.jpg`}/>
          <br/><i style={{marginLeft: '8vw'}}>Bộ điều khiển trung tâm có thể học lệnh Remote – lên tới 1.000 lệnh và cập nhật lệnh cho các thiết bị trong gia đình</i>
          <br/>
          <br/>Với 2 màu đen trắng kết hợp tạo nên thiết bị cảm biến ưa nhìn trên mọi góc độ.
            Không những thế, thiết bị được các chuyên gia và người dùng đánh giá cao bởi nhựa chống cháy PP.
          <br/>
          <br/><b><i>Ứng dụng cảm biến hồng ngoại Chika</i></b>
          <br/>Bộ cảm biến hồng ngoại có khả năng thay thế cho các loại remote của điều hòa, quạt tivi, đầu kỹ thuật số,… tiếp nhận và học được hơn 1000 câu lệnh.
            Cảm biến hồng ngoại có chức năng tương tự như một <strong>remote điều khiển từ xa</strong> qua điện thoại, hay thay thế công tắc điều khiển truyền thống.
          <br/>Thiết bị chứa các thư viện hơn 300 mã lệnh có sẵn cho 4 chủng loại điều khiển : Tivi, Quạt, điều hòa, đầu kỹ thuật số.
          <br/>Kết hợp bộ điều khiển trung tâm bạn có thể lên lịch <strong>bật tắt điều hòa thông minh</strong> theo giờ ví dụ bật điều hòa lúc 10 giờ tối và tắt lúc 4 giờ sáng.
            Ngoài ra cảm biến hồng ngoại thông minh còn có tích hợp với các cảm biến đo thông số môi trường để tăng giảm nhiệt độ theo môi trường bên ngoài.
          <br/><img alt="cam-bien-hong-ngoai-2" src={`${imageUri}cam-bien-hong-ngoai-2.jpg`}/>
          <br/><i style={{marginLeft: '25vw'}}>Điều khiển góc rộng 360 nửa bán cầu với 7 led IR</i>
          <br/>
          <br/>Với 1 thiết bị cảm biến hồng ngoại, có thể tạo được nhiều giao diện trên điện thoại để điều khiển nhiều thiết bị cùng 1 lúc.
            Ví dụ Quạt phòng khách, điều hòa phòng khách, ti vi phòng khách…có thể lựa chọn theo thư viện có sẵn để thiết lập giao diện điều khiển,
            hoặc nếu thư viện chưa hỗ trợ thì cũng hoàn toàn có thể thiết lập chế độ học lệnh mới cho thiết bị.
            Lưu ý: Đặt cảm biến hồng ngoại cách thiết bị cần điều khiển trong bán kính 5m.
          <br/>
          <br/>Kết hợp với giải pháp <strong>điều khiển bằng giọng nói</strong> Google Assistant, giờ đây bạn chỉ cần nói “OK Google, bật điều hòa” hay “OK Google, bật tivi”,
            ngay lập tức tivi và điều hòa sẽ được bật theo ý bạn.
          <br/>
          <br/>Đặc biệt hơn nữa, bộ điều khiển hồng ngoại năm 2020 được cải tiến hơn rất nhiều với chức năng thư viện,
            bạn có thể điều khiển thiết bị qua điện thoại hoàn toàn như 1 điều khiển từ xa.
          <br/>
          <br/><b><i>Phương thức hoạt động</i></b>
          <br/>Bộ điều khiển hồng ngoại sẽ lấy lệnh điều khiển từ thư viện có sẵn hoặc học tất cả câu lệnh trên Remote của các thiết bị trong ngôi nhà.
            Khi đó, trên app điện thoại của người dùng sẽ có từng mục như: điều hòa, ti vi, quạt …
            Thay vì dùng Remote, người dùng sẽ trực tiếp dùng điện thoại của mình để điều khiển các thiết bị.
          <br/>Mỗi thiết bị sẽ có một Giao diện khác nhau. Ví dụ: quạt sẽ có thư mục quạt, tivi, điều hòa …
          <br/><img alt="cam-bien-hong-ngoai-3" src={`${imageUri}cam-bien-hong-ngoai-3.jpg`}/>
          <br/><i style={{marginLeft: '25vw'}}>Dùng để điều khiển điều hòa, quạt, TV, Ampli, …</i>
          <br/>
          <br/><b><i>Ưu điểm nổi bật của bộ điều khiển hồng ngoại</i></b>
          <br/>Thay vì 10 cái remote bạn chỉ cần 1 chiếc điện thoại là hoàn toàn điều khiển được các thiết bị sử remote trong ngôi nhà.
          <br/>Mặt khác, người dùng có thể cài đặt theo ngữ cảnh “về nhà” – một hệ thống các thiết bị: điều hòa, bình nước nóng, đèn chiếu sáng, rèm cửa…
            sẽ sẵn sàng phục vụ bạn, chỉ cần chọn chế độ “về nhà” trên điện thoại, trước khi rời cơ quan.
          <br/><img alt="cam-bien-hong-ngoai-4" src={`${imageUri}cam-bien-hong-ngoai-4.jpg`}/>
          <br/><i style={{marginLeft: '5vw'}}>Với giải pháp nhà thông minh điều khiển bằng giọng nói, bạn hoàn toàn có thể điều khiển các thiết bị trong nhà bằng giọng nói</i>
          <br/>
          <br/><b><i>Cách lắp đặt cảm biến hồng ngoại Chika</i></b>
          <br/>Cách lắp đặt điều khiển hồng ngoại Chika rất đơn giản, bạn có thể tự lắp đặt tại nhà. Có 2 cách lắp đặt đấu nối nguồn cho bộ điều khiển hồng ngoại Chika:
          <br/>✔ Một là sử dụng nguồn điện 5V-DC: Bạn sử dụng bộ nguồn 5V cấp điện cho cảm biến thông qua cổng micro USB bên hông của thiết bị.
            Cách này áp dụng đối với trường hợp sản phẩm để trên bàn, thường xuyên di chuyển
          <br/>✔ Hai là sử dụng nguồn điện 220V-AC trực tiếp: bạn mở nắp nhựa phía dưới sản phẩm và đấu dây như hình vẽ hướng dẫn sử dụng.
            Gắn trên tường bằng cách cố định vít nở cấp kèm theo lên mặt tường sau đó gắn thiết bị CA-IRX lên sao cho hộc vít sau thiết bị khớp vào đầu vít nở.
            Cách này áp dụng trong trường hợp gắn cố định sản phẩm lên trần nhà.
        </div>

        <ProductFooterComponent history={this.props.history}/>
      </div>
    )
  }
}
