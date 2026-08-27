# Định hướng thiết kế — Hoa Ngữ 180 Ngày

## Ba hướng mỹ thuật

| Theme Name | Very Brief Intro | Probability |
|---|---|---:|
| Bàn Học Lặng | Một không gian học tập ấm, lấy chất liệu giấy và nhịp điệu của sổ tay làm nền; giảm kích thích thị giác để người mới học tập trung từng bước. | 0.043 |
| Sân Ga Thượng Hải | Học qua cảm giác dịch chuyển: biển chỉ dẫn, thẻ hành trình và các tuyến kỹ năng đầy năng lượng, phù hợp các bài hội thoại thực tế. | 0.078 |
| Mực Đỏ Thực Hành | Một “phiếu luyện” hiện đại kết hợp tinh thần biên tập Thụy Sĩ với dấu bút đỏ của gia sư: thông tin rõ, phản hồi trực tiếp và chữ Hán là điểm nhấn văn hóa. | 0.018 |

## Hướng được chọn: Mực Đỏ Thực Hành

### Design Movement

**Contemporary editorial design** lấy cảm hứng từ hệ thống biểu mẫu luyện thi, bố cục kiểu Swiss editorial và văn hóa dụng cụ học tập Đông Á. Sản phẩm cần tạo cảm giác người học đang làm việc cùng một gia sư có cấu trúc, thay vì đang chơi một ứng dụng nhiều hiệu ứng.

### Core Principles

1. **Nhiệm vụ trước, trang trí sau:** trạng thái bài học, thao tác thực hành và phản hồi chấm bài luôn dễ nhận ra trong một cái nhìn.
2. **Bốn kỹ năng có bản sắc nhưng cùng một ngôn ngữ:** Nghe, Nói, Đọc và Viết dùng màu tín hiệu riêng, nhưng cùng vật liệu giấy ngà, mực than và điểm nhấn đỏ.
3. **Nhịp điệu biên tập rõ ràng:** khoảng trắng, đường kẻ mảnh, nhãn nhỏ và các khối nội dung lệch trục thay cho dải thẻ đồng nhất.
4. **Khích lệ có căn cứ:** giao diện nhấn vào bước tiếp theo và lỗi cần ôn, không dùng bảng xếp hạng hay huy hiệu gây xao nhãng.

### Color Philosophy

Nền **giấy gạo #F7F1E6** giảm độ chói khi đọc pinyin và chữ Hán trong thời gian dài. Mực than **#20211E** cho cảm giác nghiêm túc, dễ đọc. Đỏ son **#D84727** là màu thương hiệu và cũng là “dấu bút của gia sư” dành cho hành động chủ đạo, lỗi cần ôn và phản hồi quan trọng. Bốn kỹ năng dùng những sắc trầm có độ bão hòa vừa phải (lam khoáng, xanh ngọc, vàng mù tạt, tím mận) để phân loại, không biến giao diện thành bảng màu gamification.

### Layout Paradigm

Giao diện vận hành như một **bàn học mở**: thanh điều hướng dọc ở trái trên màn hình lớn, “dải nhiệm vụ hôm nay” nằm ở trung tâm, và một cột ghi chú/phản hồi hẹp bên phải. Các phần không nằm trong lưới thẻ đều nhau; chúng được xếp theo các “dải giấy” chiều dọc với tiêu đề lề, đường gạch chân và khối thao tác có chủ ý. Trên điện thoại, thanh điều hướng chuyển thành thanh đáy; khu học bốn kỹ năng dùng chuỗi dải cuộn ngang dễ quét bằng ngón tay.

### Signature Elements

1. **Dấu mực đỏ:** vòng tròn, gạch chân và nhãn phản hồi ở các điểm cần hành động.
2. **Đường lề giấy:** các đường mảnh xanh xám và số mục tạo nhịp như một trang bài tập được biên soạn.
3. **Chữ Hán phông lớn tiết chế:** một chữ mẫu xuất hiện như watermark hoặc chỉ số bài học, không biến thành ảnh nền rối mắt.

### Interaction Philosophy

Tương tác phải giống việc đánh dấu trên phiếu luyện: chọn đáp án có phản hồi tức thì, hoàn thành một phần sẽ được “đóng dấu” nhẹ, còn lỗi sai trở thành mục ôn cụ thể. Các nút audio, micro và canvas ưu tiên kích thước thao tác thực tế; trạng thái quyền micro hoặc không hỗ trợ nhận diện luôn giải thích rõ và có phương án thay thế.

### Animation

Chuyển động ngắn, có trọng lượng và phục vụ định hướng: nút nhấn thu về `scale(0.97)` trong 120–160ms; bảng phản hồi hoặc khay bài tập mở trong 200–240ms với `cubic-bezier(0.23, 1, 0.32, 1)`; tiến độ hoàn tất được tô theo nét bút, không nhấp nháy. Tôn trọng `prefers-reduced-motion`; mọi thao tác bàn phím được phản hồi tức thì.

### Typography System

**Be Vietnam Pro** dùng cho giao diện tiếng Việt với tiêu đề đậm, gần gũi và thân thiện khi đọc dài. **Noto Serif SC** dùng cho chữ Hán lớn, câu mẫu và ví dụ nhằm thể hiện hình khối nét chữ rõ ràng. Nhãn điều hướng dùng cỡ nhỏ, viết hoa có giãn ký tự vừa phải; tiêu đề bài học dùng 28–36px; tiếng Trung trong nội dung học tối thiểu 20px để người mới không phải nheo mắt.

### Brand Essence

**Hoa Ngữ 180 Ngày là bàn học cá nhân có cấu trúc cho người Việt bắt đầu từ số 0 và tiến dần tới HSK3, mỗi ngày một bước học thực hành được.** Tính cách thương hiệu: **điềm tĩnh, chính xác, động viên**.

### Brand Voice

Giọng điệu ngắn, tin cậy và dẫn dắt bằng hành động cụ thể; tránh khẩu hiệu chung chung hoặc tuyên bố quá mức về trình độ. Ví dụ: “Hôm nay, bạn chỉ cần hoàn thành 3 thao tác để giữ nhịp học.” và “Câu này còn thiếu `很` — nghe lại chậm một lần rồi thử nói lại.”

### Wordmark & Logo

Logo là dấu **180** được tạo từ một nét bút liên tục: vòng đầu là vòng tròn nghe, thân số 8 gợi liên kết bốn kỹ năng, vòng cuối giữ một nét ngang như trang vở. Biểu tượng không có chữ, dùng đỏ son trên nền giấy; wordmark “Hoa Ngữ 180 Ngày” sẽ được dựng bằng Be Vietnam Pro đậm, khoảng cách chữ được điều chỉnh để đồng hành cùng logo.

### Signature Brand Color

**Đỏ Son Gia Sư — #D84727**.

## Style Decisions

- Biểu tượng nét bút **180** và wordmark **Hoa Ngữ 180 Ngày** xuất hiện thường trực ở điều hướng chính; thương hiệu không được trở thành một dashboard vô danh.
- Đỏ Son Gia Sư **#D84727** là mực phản hồi: dùng cho vòng khoanh, gạch chân, dấu xác nhận, lỗi cần ôn và hành động chính; không dùng như màu trang trí chung chung.
- Các khu dashboard ưu tiên cảm giác **phiếu luyện được biên tập**: nhãn lề, đường kẻ nhẹ, dải nhiệm vụ lệch trục và cột ghi chú của gia sư thay cho cấu trúc thẻ đồng đều.
- Trên desktop, cấu trúc mặc định đọc thành ba vùng **điều hướng thương hiệu bên trái / nhiệm vụ trung tâm / ghi chú gia sư bên phải**; topbar chỉ có vai trò phụ trợ.
- Khu bốn kỹ năng được dàn thành các **dải phiếu lệch trục** có số mục, vệt màu tín hiệu và nét bút đỏ, không hiển thị như bốn thẻ sản phẩm bằng nhau.
- Hình ảnh học tập luôn được xử lý như một phần tài liệu: có watermark chữ Hán, dấu khoanh/gạch đỏ hoặc nhãn bài đi kèm, không chỉ làm nền trang trí.
- Khu bốn kỹ năng trên desktop dùng một chuỗi phiếu chồng lệch, có đường lề dọc và chỉ dấu số thứ tự; mỗi tiêu đề có gạch sửa đỏ để thể hiện hành vi của gia sư.
- Liên kết video ngoài được thể hiện bằng phiếu nguồn riêng: nền đỏ nhạt, ghi rõ kênh, trạng thái kiểm chứng và luôn mở ở tab mới để người học không nhầm với video nội bộ.
- Dải nhiệm vụ hôm nay luôn nêu rõ tuần, buổi, kỹ năng và thao tác kế tiếp của lesson đang mở; không dùng lời chào tiến độ chung lặp lại giữa các bài.
- Mỗi khối học chính có một dấu hiệu biên tập cố định — số mục, nhãn lề, đường kẻ giấy hoặc dấu bút đỏ — để tránh trở thành card trắng đồng đều.
- Đỏ Son Gia Sư chỉ biểu đạt hành vi gia sư: khoanh phần cần làm, gạch điểm chú ý, đóng dấu trạng thái, chỉ lỗi hoặc là hành động chính; không dùng như màu trang trí trung tính.
