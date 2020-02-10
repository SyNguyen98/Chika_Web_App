import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Carousel, Row, Col } from 'antd';

import '../../../styles/guest/product/MotionDetector.css';
import { LINK_SWITCH_SENSOR, LINK_SWITCH, LINK_MODULE_IR, LINK_HOME_CONTROLLER, LINK_DOOR_SENSOR } from '../../../constant';

class MotionDetector extends Component {

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
      <div className="motion-detector">
        <div className="motion-detector_introduce">
          <div className="motion-detector_introduce_image">
            <Carousel className="switch-sensor_introduce_carousel" autoplay dots='false'>
              <img alt="motion-detector" src="/image/product/motion-detector/motion-detector.png"></img>
            </Carousel>
          </div>
          <div className="motion-detector_introduce_content">
            <h1>CẢM BIẾN PHÁT HIỆN<br/>CHUYỂN ĐỘNG</h1>
            <p>
              <b>- Mô tả:</b> Tự động bật/tắt đèn khi phát hiện chuyển động, cảm biến môi trường còn đóng vai trò là "người bác sỹ" đo nhiệt độ, ánh sáng, độ ẩm … trong ngôi nhà của bạn.
                Ngoài ra, cảm biến còn được tích hợp trong giải pháp an ninh như: kích hoạt còi hú, bật đèn… khi phát hiện sự xâm nhập trái phép.
              <br/><br/>
              <b>- Điện áp:</b> 220V
              <br/><br/>
              <b>- Nhiệt độ hoạt động:</b> 60ºC Max
            </p>
          </div>
        </div>

        <div className="motion-detector_body">
          <b><i>Thiết kế tinh tế, hiện đại</i></b>
          <br/><strong>Cảm biến chuyển động</strong> Chika được làm bằng nhựa chống cháy PP, thiết kế tinh tế với đường bo tròn sang trọng, màu trắng mang đến nét hiện đại của sản phẩm.
          <br/>
          <br/><b><i>Ứng dụng của cảm biến chuyển động Chika</i></b>
          <br/><strong>Cảm biến chuyển động</strong> được ứng dụng tại khu vực hành lang, khu vệ sinh của các bệnh viện, khách sạn, nhà ở, trường học …
            tránh tình trạng người dùng quên tắt đèn khi ra vào. Cảm biến phát hiện người di chuyển và thông báo cho HC để bật đèn khi có người,
            không có người thì tự động tắt đèn. Giải pháp này giúp tiết kiệm, tránh lãng phí điện năng cho người sử dụng một các tối ưu nhất.
          <br/><img alt="cam-bien-chuyen-dong" src="/image/product/motion-detector/cam-bien-chuyen-dong.jpg"/>
          <br/><i style={{marginLeft: '10vw'}}>Cảm biến chuyển động truyền tín hiệu đến HC và từ HC đến công tắc đèn thông minh bằng sóng không dây Zigbee</i>
          <br/>
          <br/>Cảm biến chuyển động còn được tích hợp cảm biến đo nhiệt độ, ánh sáng, độ ẩm … trong ngôi nhà.
            Nếu 1 trong các yếu tố trên thừa hay thiếu, cảm biến sẽ gửi thông tin đến HC, HC sẽ thực hiện nhiệm vụ “ra lệnh” cho điều hòa, đèn, rèm mở ra khi trong nhà thiếu ánh sáng.
          <br/>Cảm biến chuyển động này sẽ được tích hợp trong giải pháp an ninh như: kích hoạt còi hú, đèn sáng … khi phát hiện có sự cố tình xâm nhập vào vùng chuyển động.
          <br/>
          <br/><b><i>Phương thức hoạt động</i></b>
          <br/>Cảm biến phát hiện chuyển động sẽ truyền tín hiệu đến bộ điều khiển trung tâm (HC) khi phát hiện có sự di chuyển vào vùng cảm biến.
            Tại đây, bộ điều khiển trung tâm sẽ gửi thông tin đến công tắc kết nối với bóng đèn để bật/tắt theo tín hiệu từ cảm biến phát hiện chuyển động.
          <br/>
          <br/>Thời gian bật/tắt sẽ được bạn cài đặt một cách linh hoạt. Ví dụ: thời gian sáng khi người đi qua hoặc đứng trong vùng cảm biến sẽ 1 – 3 phút.
            Và sẽ tắt sau khi người di chuyển qua từ 30s – 1 phút.
          <br/><img alt="cam-bien-chuyen-dong-1" src="/image/product/motion-detector/cam-bien-chuyen-dong-1.jpg"/>
          <br/><i style={{marginLeft: '20vw'}}>Cảm biến phát hiện chuyển động là 1 trong 6 giải pháp nhà thông minh Chika</i>
          <br/>
          <br/><b><i>An toàn và tiện dụng</i></b>
          <br/>Cảm biến thông thường trên thị trường sẽ dùng dây điện, để kết nối giữa cảm biến với bóng đèn.
            Khi cảm phát hiện sự di chuyển, ngay lập truyền tín hiệu tới công tắc bên trong cảm biến để thực hiện công việc bật/tắt đối với bóng đèn.
          <br/>
          <br/>Mặt khác, cảm biến của Chika có thể cấu hình theo hoạt cảnh và linh động trong việc sử dụng.
            Ví dụ: Nếu bạn muốn thay đổi công tắc đèn cảm biến thành công tắc rèm, đèn tuyp, quạt …
            chỉ cần cấu hình lại trên app điện thoại mà không cần đục đẽo đường dây điện như cảm biến thông thường.
          <br/>
          <br/><b><i>Lắp đặt cảm biến chuyển động Chika</i></b>
          <br/>Sản phẩm lắp đặt vô cùng dễ dàng, có thể dán lên trần nhà, lên tường bằng miếng dán kèm theo hoặc sử dụng vít tường kèm theo để gắn vào tường.
          <br/>
          <br/>Sau khi cố định mặt sau vào đúng vị trí lắp đặt quý khách hàng tiếp tục gắn mặt trước cảm biến vào vị trí mặt sau đã lắp đặt để hoàn thiện sản phẩm.
            Đặt mặt trước thiết bị sao cho các ngàm của mặt sau thiết bị trùng với các rãnh ngàm của mặt trước,
            sau đó xoay mặt trước theo chiều cùng chiều kim đồng hồ để các ngàm ăn khớp vào rãnh.
          <br/><i>Chú ý: ngàm nhỏ ở mặt sau tương ứng với rãnh nhỏ ở mặt trước. Thiết bị được thiết kế chỉ 1 vị trí có thể xoay ăn khớp giữa mặt trước và mặt sau.</i>
          <br/>
          <br/><b><i>Lưu ý khi sử dụng sản phẩm:</i></b>
          <br/>Không để cảm biến ở nơi nhiệt độ quá cao
          <br/>Không để thiết bị ở nơi ẩm ướt gần nguồn nước
          <br/>Không tự tháo mở thiết bị khi không cần thiết
          <br/>Không lau chùi thiết bị bằng các hoá chất ăn mòn
          <br/>Tuân thủ các quy định về môi trường khi loại bỏ hay tái chế thiết bị và các vật liệu bao bì của thiết bị.
          <br/>Cảm biến chuyển động là bộ phận không thể thiếu trong hệ thống an ninh.
        </div>

        <div className="motion-detector_footer">
          <h1>CÁC THIẾT BỊ KHÁC</h1>
          <Row className="motion-detector_footer_row">
            <Col className="motion-detector_footer_col" span={8}>
              <img alt="Cong-tac-tich-hop-cam-bien" src="/image/product/cong-tac-tich-hop-cam-bien-cau-thang.png"
                  onClick={(event) => this.handleClickChangePage(event, LINK_SWITCH_SENSOR)}></img>
                <p>CÔNG TẮC TÍCH HỢP CẢM BIẾN</p>
            </Col>
            <Col className="motion-detector_footer_col" span={8}>
              <img alt="Cong-tac-vien-nhom" src="/image/product/cong-tac-vien-nhom.png"
                  onClick={(event) => this.handleClickChangePage(event, LINK_SWITCH)}></img>
                <p>CÔNG TẮC VIỀN NHÔM</p>
            </Col>
            <Col className="motion-detector_footer_col" span={8}>
              <img alt="Dieu-khien-hong-ngoai" src="/image/product/cam-bien-hong-ngoai.png"
                  onClick={(event) => this.handleClickChangePage(event, LINK_MODULE_IR)}></img>
              <p>ĐIỀU KHIỂN HỒNG NGOẠI</p>
            </Col>
          </Row>
          <Row className="motion-detector_footer_row">
            <Col className="motion-detector_footer_col" span={8}>
              <img alt="Bo-dieu-khien-trung-tam" src="/image/product/bo-dieu-khien-trung-tam.png"
                  onClick={(event) => this.handleClickChangePage(event, LINK_HOME_CONTROLLER)}></img>
              <p>BỘ ĐIỀU KHIỂN TRUNG TÂM</p>
            </Col>
            <Col className="motion-detector_footer_col" span={8}>
              <img alt="Cam-bien-cua" src="/image/product/cam-bien-cua.png"
                  onClick={(event) => this.handleClickChangePage(event, LINK_DOOR_SENSOR)}></img>
                <p>CẢM BIẾN CỬA</p>
            </Col>
            <Col className="motion-detector_footer_col" span={8}>
              <img alt="Cam-bien-chuyen-dong" src="/image/product/cam-bien-chuyen-dong.png"
                  onClick={this.toTopPage}></img>
                <p>CẢM BIẾN PHÁT HIỆN CHUYỂN ĐỘNG</p>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default withRouter(MotionDetector);
