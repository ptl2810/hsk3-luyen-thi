# Danh sách triển khai — Hoàn thiện nội dung & media Hoa Ngữ 180 Ngày

- [x] Đọc phần còn lại của đặc tả triển khai và rà soát mã nguồn, schema, component, test hiện có.
- [x] Chốt schema Lesson đầy đủ cho nghe, nói, đọc, viết, media và bộ đề thi thử; bảo đảm dữ liệu cũ có thể khôi phục.
- [x] Tạo 144 lesson (24 tuần × 6 buổi), mỗi lesson có bốn hoạt động, từ vựng, ngữ pháp, câu hỏi và nhiệm vụ viết riêng.
- [x] Tạo audio manifest cho 144 bài, ghi nhận nguồn/trạng thái bản quyền; sản xuất audio tệp thật cho các mốc đại diện và dùng SpeechSynthesis fallback có thông báo cho media chờ.
- [x] Tạo video manifest, transcript, phụ đề và câu hỏi cho 24 video tình huống; tích hợp 01 asset thật tuần 8 và ghi rõ các video chờ theo phương án A.
- [x] Refactor toàn bộ panel Nghe, Nói, Đọc, Viết, Lộ trình, Ôn tập và Thi thử để lấy dữ liệu theo lesson đang mở.
- [x] Chuyển trạng thái người dùng mới thành tiến độ trống, cập nhật tiếp tục học và điểm/thống kê theo dữ liệu thực.
- [x] Thêm test lookup đủ 144 bài, tính bắt buộc của dữ liệu, đáp án, lesson tiếp theo, backup và trạng thái tiến độ.
- [x] Kiểm tra dashboard desktop/mobile, type check, test, build và bàn giao báo cáo media minh bạch.

## Chuẩn bị GitHub Pages

- [x] Rà soát đường dẫn asset và cấu hình Vite khi triển khai ngoài môi trường hiện tại.
- [x] Thêm workflow GitHub Actions để build và xuất bản GitHub Pages khi đẩy nhánh `main`.
- [x] Thêm cấu hình base path theo biến môi trường, kiểm tra build tương thích GitHub Pages.
- [x] Cập nhật hướng dẫn chuyển mã nguồn, cấu hình Pages và quản lý asset media khi dùng GitHub.

## Hướng dẫn người mới & phương án B

- [ ] Xác định các bước triển khai GitHub Pages theo thứ tự phù hợp với người chưa dùng GitHub.
- [ ] Soạn hướng dẫn chi tiết tạo repository, đưa mã nguồn lên GitHub, bật Pages và kiểm tra xuất bản.
- [ ] Soạn lộ trình nâng lên phương án B, gồm sản xuất 139 audio tệp và 23 video còn chờ theo từng đợt.
- [ ] Bàn giao tài liệu với danh sách kiểm tra, cách xử lý lỗi thường gặp và điểm cần người dùng xác nhận.

## Xuất bản GitHub Pages có hỗ trợ thao tác

- [x] Xác nhận repository đồng bộ `ptl2810/hsk3-luyen-thi` là đích xuất bản; repository `hoa-ngu-180-ngay` không được sử dụng.
- [x] Xác nhận repository đồng bộ đã chuyển sang Public để đủ điều kiện GitHub Pages miễn phí.
- [x] Kiểm tra cấu hình GitHub Pages và bật nguồn GitHub Actions trên repository đồng bộ.
- [ ] Theo dõi workflow deploy đầu tiên và xác minh URL GitHub Pages.
- [ ] Bàn giao URL Pages, quyền quản lý và lưu ý các asset media đang chờ chuyển.
