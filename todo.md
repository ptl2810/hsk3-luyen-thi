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
- [x] Theo dõi workflow deploy đầu tiên và xác minh URL GitHub Pages; deployment #5 thành công và trang chủ tải đúng.
- [ ] Bàn giao URL Pages, quyền quản lý và lưu ý các asset media đang chờ chuyển.

## Nghiên cứu nguồn video HSK3 bên ngoài

- [x] Xác định tiêu chí chọn nguồn, quy tắc nhúng của YouTube/TikTok và chủ đề video cần phủ theo 24 tuần.
- [x] Tìm các kênh và video công khai theo nhóm: pinyin, hội thoại đời sống, HSK3, ngữ pháp, luyện nghe và viết chữ.
- [x] Mở và kiểm chứng từng nguồn ưu tiên về khả năng xem công khai, nhúng/liên kết, transcript và quyền sử dụng.
- [x] Lập manifest với URL, chủ đề phù hợp, nền tảng, kênh, cách hiển thị và trạng thái kiểm chứng.
- [ ] Bàn giao danh mục nguồn có trích dẫn cùng đề xuất tích hợp vào 24 video tình huống.

## Sửa tương tác từ vựng và nguồn video

- [x] Rà soát handler nút Nghe của từ vựng, component video và trường media theo lesson.
- [x] Kết nối nút Nghe với SpeechSynthesis tiếng Hoa, nêu lỗi khi trình duyệt không hỗ trợ hoặc không có giọng Hoa.
- [x] Bổ sung trường external source và nút mở video nguồn cho các tuần có nguồn đã kiểm chứng.
- [x] Kiểm tra luồng trên desktop/mobile, build và cập nhật hướng dẫn người dùng.

## Audio thực và video cụ thể theo bài

- [x] Rà soát yêu cầu desktop để áp dụng đúng phần web app: lỗi TTS im lặng được thay bằng phát audio tệp hoặc trạng thái trung thực.
- [x] Đối chiếu 24 chủ đề lesson với video YouTube cụ thể, chỉ giữ URL công khai có tiêu đề/nội dung khớp bài học.
- [x] Thay cơ chế TTS im lặng bằng audio tiếng Hoa tệp thật hoặc trạng thái lỗi trung thực có hướng dẫn khắc phục.
- [x] Thay mọi link kênh/playlist bằng link video cụ thể; ghi nguồn/kênh/video ID, URL nhúng và ngày kiểm chứng trong manifest.
- [ ] Kiểm thử thao tác đọc, link video và desktop trước khi bàn giao.

## Áp dụng đặc tả audio trên web app

- [x] Rà soát lại các yêu cầu có thể áp dụng cho web app; loại trừ installer Windows, AppData, Tauri và ASR offline.
- [x] Tạo audio Mandarin tệp thật cho năm thanh điệu tuần 1 và câu đọc `我是学生。`; kiểm tra asset theo manifest kỹ thuật.
- [x] Thay TTS trình duyệt trong luồng từ vựng/đọc ưu tiên bằng tệp audio thực khi asset đã có; nội dung thiếu asset báo chờ sản xuất, không giả phát giọng mặc định.
- [x] Tìm và kiểm chứng URL YouTube video cụ thể cho từng lesson, không dùng link kênh hoặc playlist.
- [ ] Thêm kiểm tra manifest text–asset–URL, test luồng web và báo cáo rõ các media chưa có audio tệp.

## Hotfix phần Viết, lưu luyện nét và tiến độ

- [x] Rà soát `WritingCanvas`, `storage`, `Home` và các test để đối chiếu lỗi Pointer Events cùng luồng hoàn thành phần Viết.
- [x] Sửa toạ độ canvas để mọi Pointer Event được chuyển thành `Point` đồng bộ trước cập nhật state; bảo toàn capture, cancel và lost capture.
- [x] Thêm khối trạng thái viết rõ ràng cho chưa vẽ, đã vẽ/chưa lưu, lưu thành công và lỗi lưu; không đánh giá đúng/sai nét chữ viết tay.
- [x] Lưu record luyện nét có lesson, chữ mẫu, số nét, thời điểm và trạng thái sau transaction IndexedDB; phản ánh chính xác trên tiến độ.
- [x] Tách lưu luyện nét khỏi chấm câu: chỉ hoàn thành kỹ năng Viết khi nhiệm vụ câu có đáp án được chấm đúng.
- [x] Thêm test helper Canvas, chuỗi pointer, lưu luyện nét, câu đúng/sai, sau đó kiểm tra hồi quy toàn bộ app trên desktop và mobile.

## Hoàn thiện nội dung luyện HSK3 sau MVP

- [x] Đối chiếu đề cương HSK3 và lập ma trận nội dung 24 tuần × 6 buổi, nêu rõ độ dài đọc/nghe, dạng câu hỏi và mục tiêu mỗi giai đoạn.
- [x] Thay các đoạn Đọc một câu bằng đoạn nhiều câu có ngữ cảnh, pinyin/dịch Việt theo nhu cầu và hai đến bốn câu hỏi từ ý chính đến chi tiết.
- [x] Mở rộng script Nghe, kịch bản Nói và nhiệm vụ Viết theo chủ đề tuần; giữ nội dung dữ liệu hóa, không đặt cứng trong giao diện.
- [x] Nâng schema/UI để hiển thị đoạn đầy đặn, danh sách câu hỏi và phản hồi phù hợp với bài tập đã mở rộng.
- [x] Thêm validator/test về độ dài nội dung, độ đa dạng câu hỏi, tính nhất quán đáp án và kiểm thử hồi quy 144 lesson.
