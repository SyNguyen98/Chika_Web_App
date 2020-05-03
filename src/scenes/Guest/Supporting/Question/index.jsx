import React, {Component} from 'react';
import {Col, Icon, Row} from 'antd';

import './question.css';

export default class QuestionComponent extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return(
      <div className="question">
        <div className="question_header">
          CÁC CÂU HỎI THƯỜNG GẶP
        </div>
        <div className="question_body">
          <div className="question_body_content">
            <h1>1. Chế độ bảo hành của Chika ra sao?</h1>
            <p>
              Tất cả sản phẩm của Chika được bảo hành 24 tháng. Trong thời gian bảo hành Chika cam kết 1 đổi 1 tại nơi sử dụng.
            </p>
            <h1>2. Lắp đặt thiết bị của Chika mất bao lâu?</h1>
            <p>
              Vì thiết bị Chika tương thích hoàn toàn với các đế âm tường sẵn có trên thị trường nên nếu hạ tầng hệ thống điện trong ngôi nhà của bạn đã hoàn thiện
              thì thi công lắp đặt thiết bị Chika chỉ mất 01 ngày.
              <br/><i>Lưu ý:</i> Chika có 2 kiểu dáng sản phẩm tương thích với 2 loại đế âm tường sẵn có là đế vuông và đế chữ nhật. Để thuận lợi nhất cho việc thi công,
              quý khách nên chôn đế âm vào sâu trong mặt tường thêm 1,5cm.
              <br/>Thay thiết bị bình thường bằng thiết bị của Chika có khó không? Có cần phải thay đổi cơ sở hạ tầng không?
              <br/>Thiết bị của Chika có tính tương thích cao, hoàn toàn phù hợp với đế âm tường có sẵn trên thị trường và được dùng phổ biến trong các công trình, gia đình…
              Vì vậy việc lắp đặt hết sức đơn giản, các thao tác tương tự cách lắp đặt công tắc cơ bình thường và không phải thay đổi kết cấu (khoan, đục) tường nhà.
            </p>
            <h1>3. Các thiết bị của Chika kết nối với nhau như thế nào?</h1>
            <p>
              Các thiết bị của Chika liên kết với nhau bằng công nghệ truyền thông không dây Zigbee.
              Zigbee là công nghệ không dây, sử dụng tần số 2.4Ghz giống với sóng Wifi.
              <br/>Sử dụng thiết bị không dây của Chika có ảnh hưởng tới sức khoẻ không?
              <br/>Năng lượng tín hiệu của sóng Zigbee thấp hơn 20 lần so với năng lượng sóng Wifi, như vậy hàng chục bộ phát tín hiệu của Chika mới có năng lượng tín hiệu
              tương đương với 01 modem Wifi. Trên thế giới cũng chưa từng ghi nhận trường hợp nào bị ảnh hưởng sức khỏe bởi tín hiệu sóng Zigbee.
            </p>
            <h1>4. Các thiết bị của Chika tiêu thụ bao nhiêu điện năng?</h1>
            <p>
              Ở chế độ không tải, các thiết bị của Chika chỉ tiêu thụ không tới 0.2W để phục vụ cho việc hiển thị LED báo hiệu và nuôi chip điều khiển bên trong.
              Như vậy, lượng điện tiêu thụ của thiết bị Chika là không đáng kể, chưa tới 500đ/tháng.
            </p>
            <h1>5. Sản phẩm của Chika điều khiển được những thiết bị nào?</h1>
            <p>
              Sản phẩm của Chika được tích hợp để điều khiển:
              <br/>– Hệ thống chiếu sáng (tắt-bật; tăng-giảm sáng).
              <br/>– Hệ thống quạt (tắt-bật, tăng-giảm tốc độ).
              <br/>– Hệ thống rèm cửa.
              <br/>– Cửa cuốn.
              <br/>– Bình nóng lạnh.
              <br/>– Điều hòa nhiệt độ (bật-tắt).
              <br/>– Ti vi (bật- tắt).
            </p>
            <h1>6. Thiết bị điện thông minh Chika là gì?</h1>
            <p>
              Công ty Cổ phần Chika là đơn vị tiên phong trong lĩnh vực nghiên cứu, phát triển, ứng dụng khoa học công nghệ vào sản phẩm thiết bị điện thông minh tại Việt Nam.
              Bằng việc tích hợp những công nghệ tiên tiến nhất hiện nay như: cảm ứng điện dung, nguồn xung, công nghệ truyền thông không dây Zigbee, đến nay,
              các sản phẩm mang thương hiệu Chika đã trở nên phổ biến, được sử dụng rộng rãi tại các công trình lớn trên toàn quốc, biến ước mơ sở hữu ngôi nhà thông minh
              không còn là điều quá xa vời.
              <br/>Chika hiện đang cung cấp ra thị trường 2 dòng sản phẩm:
              <br/>– Dòng Handy: Công tắc cảm ứng tích hợp bộ điều khiển từ xa để điều khiển một hoặc một cụm thiết bị trong nhà,
              thiết lập sẵn các kịch bản sử dụng thiết bị cho từng phòng.
              <br/>– Dòng Elite:Tích hợp ứng dụng phần mềm trong điều khiển và giám sát thiết bị điện qua Smartphone.
              Hãy gọi ngay cho chúng tôi theo số hotline: 0909.123.456 để được tư vấn chi tiết.
            </p>
            <h1>7. Tại sao tôi nên chọn sản phẩm của Chika?</h1>
            <p>
              Với tâm huyết mang tới cho người dùng Việt Nam những sản phẩm nội địa với chất lượng và đẳng cấp Quốc tế, Chika đã đầu tư nghiên cứu:
              Nhu cầu, Thói quen sử dụng thiết bị điện trong nhà của người Việt, Điều kiện hoạt động thực tế của thiết bị điện tại Việt Nam…
              để đưa ra sản phẩm mới, tích hợp những giải pháp tiên tiến mang tới sự tiện lợi, nâng cao độ an toàn, dễ sử dụng.
              <br/>Đặc biệt: sản phẩm của Chika hoàn toàn phù hợp với thói quen sử dụng thiết bị điện của người Việt và tương thích với các thiết bị sẵn có trong gia đình.
              Hơn thế, là một doanh nghiệp Việt Nam, có văn phòng đại diện và hệ thống phân phối rộng khắp toàn quốc, Chika nhanh chóng hỗ trợ khách hàng bất kì lúc nào,
              cũng như chân thành lắng nghe những thông tin phản hồi, từ đó cải tiến sản phẩm, nâng cao chất lượng dịch vụ, đáp ứng đòi hỏi ngày càng cao của những khách hàng hiểu biết
              – điều mà không phải doanh nghiệp nào cũng thực hiện như một kim chỉ nam cho sứ mệnh của mình.
            </p>
          </div>
        </div>

        <div className="question_footer">
          <h1>Không tìm thấy nội dung bạn tìm kiếm?<br/>Chúng tôi ở đây để trợ giúp bạn</h1>
          <Row>
            <Col className="question_footer_col" span={5}>
              <h2><Icon type="desktop" style={{color: 'green', fontSize: '2vw'}}/>&ensp;TRỰC TUYẾN</h2>
              <h3>Email: info@chika.vn</h3>
              <p>Chúng tôi sẽ phản hồi trong vòng 24 giờ từ khi nhận được yêu cầu của bạn</p>
              <h3>Phản hồi chất lượng đại lý</h3>
              <p>Gửi phản hồi đến chúng tôi để nhận được sự chăm sóc từ đại lý tốt nhất</p>
            </Col>
            <Col className="question_footer_col" span={5}>
              <h2><Icon type="phone" style={{color: 'green', fontSize: '2vw'}}/>&ensp;GỌI ĐIỆN THOẠI</h2>
              <h3>0909 123 456</h3>
              <p>24 giờ, 7 ngày trong tuần.</p>
              <h3>Tư vấn trực tuyến</h3>
              <p>24 giờ, 7 ngày trong tuần.</p>
            </Col>
            <Col className="question_footer_col" span={5}>
              <h2><Icon type="environment" style={{color: 'green', fontSize: '2vw'}}/>&ensp;HỖ TRỢ TRỰC TIẾP</h2>
              <h3>Facebook</h3>
              <p>facebook.com/chikavietnam</p>
              <h3>Zalo</h3>
              <p>Liên hệ với chúng tôi qua zalo: 0909 123 456</p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
