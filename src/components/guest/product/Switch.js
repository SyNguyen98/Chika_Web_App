import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Carousel, Row, Col } from 'antd';

import '../../../styles/guest/product/Switch.css';
import { LINK_SWITCH_SENSOR, LINK_MODULE_IR, LINK_HOME_CONTROLLER, LINK_DOOR_SENSOR, LINK_MOTION_DETECTOR } from '../../../constant';

class Switch extends Component {

  handleClickChangePage = (event, link) => {
    event.preventDefault();
    this.props.history.push(link);
  }

  toTopPage = (event) => {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return(
      <div className="switch">
        <div className="switch_introduce">
          <div className="switch_introduce_image">
            <Carousel className="switch-sensor_introduce_carousel" autoplay dots='false'>
              <img alt="ca-sw2" src="/image/product/switch/ca-sw2-doc.png"></img>
              <img alt="ca-sw2" src="/image/product/switch/ca-sw2-nghieng.png"></img>
              <img alt="ca-sw3" src="/image/product/switch/ca-sw3-den.png"></img>
              <img alt="ca-sw3" src="/image/product/switch/ca-sw3-trang.png"></img>
            </Carousel>
          </div>
          <div className="switch_introduce_content">
            <h1>CÔNG TẮC VIỀN NHÔM</h1>
            <p>
              <b>- Mô tả:</b> Là loại công tắc cảm ứng thông minh sử dụng công nghệ cảm ứng điện dung, công nghệ không dây Zigbee hoặc Wifi, mặt kính cường lực, chống xước, chống va đập,
                kết hợp với vòng tròn tỏa sáng LED bao quanh tạo nên sự tinh tế, sang trọng, đẳng cấp
              <br/><br/>
              <b>- Điện áp:</b> 150 - 250 VAC
              <br/><br/>
              <b>- Nhiệt độ hoạt động:</b> 0 - 40ºC max
              <br/><br/>
              <b>- Công suất:</b> 700w(Đèn sợi đốt)-150w(Đèn led)/1 nút
              <br/><br/>
              <b>- Kích thước:</b> Hình vuông (95 x 95 mm) - Hình chữ nhật (121,5 x 80 mm)
              <br/><br/>
              <b>- Xuất xứ:</b> Việt Nam
            </p>
          </div>
        </div>

        <div className="switch_body">
          <b>Đặc điểm công tắc điều khiển từ xa Chika</b>
          <br/>Công tắc điều khiển từ xa Chika viền nhôm có ba loại với hai màu chủ đạo đen và trắng: 1 nút, 2 nút và 3 nút.
          <br/>Công tắc cảm ứng thông minh Chika được thiết kế 2 kiểu dáng là công tắc hình vuông và công tắc hình chữ nhật để có thể tương thích với các loại đế âm tường sẵn có
            trên thị trường. Điều này giúp người dùng có thể tự lắp đặt các công tắc điều khiển từ xa của Chika theo hướng dẫn.
          <br/><br/><strong><i>Thiết kế tinh tế, hiện đại, đẳng cấp sang trọng</i></strong>
          <br/><img alt="switch" src="/image/product/switch/ca-sw1.jpg"/>
          <br/>Công tắc điện Chika là công tắc cảm ứng thông minh, sử dụng mặt mặt kính cường lực, chống xước, chống va đập tốt, kết hợp với vòng tròn tỏa sáng Led bao quanh
            tạo nên điểm nhấn và sự lôi cuốn cho sản phẩm. Đồng thời, đèn Led luôn được tỏa sáng dù bật hay tắt, nên bạn sẽ thấy ngay chiếc công tắc dù là trong đêm tối.
          <br/>
          <br/><b><i>Hệ thống cầu nối an toàn tuyệt đối</i></b>
          <br/>Bên trong công tắc Chika là hệ thống Relay có chức năng đóng/cắt nguồn điện. Vỏ ngoài làm bằng chất liệu nhựa PP, có khả năng chống cháy.
            Sản phẩm được kiểm tra, và test kỹ càng trước khi xuất xưởng nên tuyệt đối không xảy ra trường hợp chập cháy.
            Đặc biệt, công tắc cảm ứng của Chika được sử dụng công nghệ điện dung nên rất an toàn kể cả khi tay ướt chạm vào công tắc điện.
          <br/><img alt="switch" src="/image/product/switch/ca-sw-mat-sau.jpg"/>
          <br/><i style={{marginLeft: '12vw'}}>Với số lần bật tắt lên đến 100 nghìn lần, công tắc cảm ứng của Chika có độ bền lên tới từ 10 – 20 năm</i>
          <br/>
          <br/><b><i>Ứng dụng</i></b>
          <br/>Dùng để điều khiển trực tiếp các thiết bị điện trong nhà như: điều hòa, quạt, đèn chiếu sáng, rèm … Với công tắc cảm ứng thông minh của Chika,
            bạn có thể cài đặt rất nhiều kiểu bật/tắt cho các thiết bị trong nhà như: Tạo hoạt cảnh bật/tắt, tạo nhóm đảo chiều không cần dây nối, tạo rule cho thiết bị.
            Ví dụ: Bạn có thể tạo cảnh bằng cách sử dụng 1 nút công tắc bật hoặc tắt toàn bộ thiết bị trong nhà, chỉ cần 1 nốt chạm trực tiếp như công tắc cơ hoặc trên điện thoại,
            bạn đã hoàn toàn bật/tắt tất cả các thiết bị điện trong ngôi nhà. Tương tự với những hoạt cảnh: tiếp khách, ăn tối, đi làm về… cho các thiết bị trong gia đình.
          <br/>Đặc biệt, với giải pháp nhận dạng giọng nói của Chika, còn cho phép bạn điều khiển hệ thống các thiết bị trong ngôi nhà bằng chính “giọng nói quyền năng” của mình.
            Ví dụ: khi bạn nói câu lệnh <strong><i>“OK GOOGLE, VỀ NHÀ”</i></strong> tất cả các thiết bị trong ngôi nhà sẽ hoàn toàn bật/tắt, tùy theo câu lệnh.
          <br/><img alt="switch" src="/image/product/switch/ca-sw2-doc.jpg" style={{width: '40vw', marginLeft: '17vw'}}/>
          <br/><i style={{marginLeft: '15vw'}}>Giải pháp an toàn vì hạn chế tiếp xúc điện, thân thiện, dễ sử dụng đối với người cao tuổi</i>
          <br/>
          <br/><b><i>Ưu điểm nổi bật của công tắc điện cảm ứng Chika</i></b>
          <br/>Đế âm tường công tắc cảm ứng của Chika được thiết kế tương thích với đế âm tường nhà bạn có sẵn. Vì vậy, không cần phải đục đẽo tường,
            giữ nguyên được hiện trạng ngôi nhà của bạn và thời gian lắp đặt các thiết bị chỉ trong 1 ngày. Đặc biệt, sản phẩm của Chika để nguồn cấp từ  110V – 240V
            rất phù hợp với hệ thống lưới điện tại Việt Nam, vì nguồn cấp cho hệ thống điện nhà bạn không phải khi nào cũng ở mức ổn định 220V.
            Điều đó sẽ giúp các thiết bị điện nhà bạn tránh được những hư hỏng khi nguồn cấp không ổn định.
          <br/><img alt="switch" src="/image/product/switch/ca-sw3-den.jpg" style={{width: '40vw', marginLeft: '17vw'}}/>
          <br/>Bằng điện thoại, bạn có thể điều khiển được hệ thống thiết bị điện trong ngôi nhà dù ở bất cứ đâu.
            Ngoài ra, bạn có thể cài đặt hoạt cảnh như “về nhà”, trước khi rời khỏi cơ quan, chỉ cần chạm nhẹ trên smartphone “về nhà” là một hệ thống bao gồm:
            đèn chiếu sáng  rèm cửa, bình nóng lạnh, điều hòa… đã sẵn sàng chào đón bạn.
            Đặc biệt, vòng tròn Led tỏa sáng giúp bạn sẽ thấy ngay công tắc đèn mà không cần lò dò trong bóng tối tìm công tắc đèn như những sản phẩm thông thường khác.
          <br/>
          <br/><b><i>Hình ảnh sản phẩm</i></b>
          <br/><img alt="switch" src="/image/product/switch/ca-sw2-nghieng.jpg" style={{width: '50vw', marginLeft: '15vw'}}/>
          <br/><i style={{marginLeft: '12vw'}}>Đế âm tường sản phẩm của Chika thích hợp được với đế 2 loại đế âm tường vuông/chữ nhật trên thị trường</i>
          <br/><img alt="switch" src="/image/product/switch/ca-sw3-den.jpg" style={{width: '45vw', marginLeft: '17vw'}}/>
          <br/><img alt="switch" src="/image/product/switch/ca-sw3-trang.jpg" style={{width: '45vw', marginLeft: '17vw'}}/>
          <br/><i style={{marginLeft: '23vw'}}>Công tắc 3 nút phiên bản hình chữ nhật, hai màu trắng – đen</i>
        </div>

        <div className="switch_footer">
          <h1>CÁC THIẾT BỊ KHÁC</h1>
          <Row className="switch_footer_row">
            <Col className="switch_footer_col" span={8}>
              <img alt="Cong-tac-tich-hop-cam-bien" src="/image/product/cong-tac-tich-hop-cam-bien-cau-thang.png"
                  onClick={(event) => this.handleClickChangePage(event, LINK_SWITCH_SENSOR)}></img>
              <p>CÔNG TẮC TÍCH HỢP CẢM BIẾN</p>
            </Col>
            <Col className="switch_footer_col" span={8}>
              <img alt="Cong-tac-vien-nhom" src="/image/product/cong-tac-vien-nhom.png"
                  onClick={this.toTopPage}></img>
              <p>CÔNG TẮC VIỀN NHÔM</p>
            </Col>
            <Col className="switch_footer_col" span={8}>
              <img alt="Dieu-khien-hong-ngoai" src="/image/product/cam-bien-hong-ngoai.png"
                  onClick={(event) => this.handleClickChangePage(event, LINK_MODULE_IR)}></img>
              <p>ĐIỀU KHIỂN HỒNG NGOẠI</p>
            </Col>
          </Row>
          <Row className="switch_footer_row">
            <Col className="switch_footer_col" span={8}>
              <img alt="Bo-dieu-khien-trung-tam" src="/image/product/bo-dieu-khien-trung-tam.png"
                  onClick={(event) => this.handleClickChangePage(event, LINK_HOME_CONTROLLER)}></img>
              <p>BỘ ĐIỀU KHIỂN TRUNG TÂM</p>
            </Col>
            <Col className="switch_footer_col" span={8}>
              <img alt="Cam-bien-cua" src="/image/product/cam-bien-cua.png"
                  onClick={(event) => this.handleClickChangePage(event, LINK_DOOR_SENSOR)}></img>
                <p>CẢM BIẾN CỬA</p>
            </Col>
            <Col className="switch_footer_col" span={8}>
              <img alt="Cam-bien-chuyen-dong" src="/image/product/cam-bien-chuyen-dong.png"
                  onClick={(event) => this.handleClickChangePage(event, LINK_MOTION_DETECTOR)}></img>
              <p>CẢM BIẾN PHÁT HIỆN CHUYỂN ĐỘNG</p>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default withRouter(Switch);
