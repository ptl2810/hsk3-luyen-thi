# Hoa Ngữ 180 Ngày — Luyện thi HSK3

**Hoa Ngữ 180 Ngày** là web app tiếng Việt dành cho người Việt bắt đầu từ số 0, tổ chức 24 tuần × 6 buổi × 60 phút nhằm xây nền tiếng Hoa và luyện các dạng bài HSK3. Sản phẩm dạy **Nghe – Nói – Đọc – Viết**, còn phiếu thi thử HSK3 chỉ gồm Nghe, Đọc và Viết, bám mô tả 80 câu trong khoảng 85 phút của trang chính thức.[1]

> Hoàn thành lộ trình không phải là bảo đảm đỗ kỳ thi. Điểm luyện tập là tín hiệu để chọn phần cần ôn lại, không phải dự đoán kết quả thi chính thức.

## Chạy dự án

| Lệnh | Mục đích |
|---|---|
| `pnpm install` | Cài phụ thuộc ở môi trường mới. |
| `pnpm dev` | Chạy ứng dụng ở chế độ phát triển. |
| `pnpm check` | Kiểm tra kiểu TypeScript. |
| `pnpm exec vitest run` | Chạy test logic và dữ liệu. |
| `pnpm build` | Tạo build production. |

Ứng dụng dùng React 19, TypeScript, Vite và Tailwind CSS. Đây là MVP frontend tĩnh; không cần tài khoản hoặc backend. Tiến độ được giữ cục bộ trên thiết bị của người học.

## Nội dung và điều hướng

Catalog `lessons` trong `client/src/data/courseData.ts` có đủ **144 lesson**. Mỗi lesson có sáu từ vựng có ID riêng, một ghi chú ngữ pháp, hai câu hỏi nghe, một mục tiêu nói theo tình huống, một đoạn đọc kèm hai câu hỏi, ba đến năm chữ để luyện canvas và một nhiệm vụ viết câu. Các màn hình đều lấy dữ liệu từ lesson đang mở, không dùng câu hỏi cố định theo UI.

| Thao tác của người học | Cách hoạt động |
|---|---|
| Mở bài | Vào **Lộ trình**, mở một tuần rồi chọn bất kỳ buổi nào trong sáu buổi. |
| Tiếp tục học | Nút dashboard ưu tiên lesson đang dở; nếu không có, mở lesson chưa hoàn thành đầu tiên. |
| Ôn lỗi | Các câu trả lời chưa đạt xuất hiện ở **Ôn tập**; nút ôn quay về đúng lesson và kỹ năng. |
| Thi thử | Có mini test tuần 4/8/12, đề bán phần tuần 18 và mô phỏng 80 câu/85 phút tuần 24. |
| Sao lưu | Vào **Cài đặt** để xuất/nhập JSON tiến độ. |

## Media phương án A

Audio tệp là lựa chọn ưu tiên trong `AudioCoach`. Khi bài chưa có tệp, giao diện báo rõ trạng thái “đang chờ sản xuất” trước khi dùng `SpeechSynthesis` của trình duyệt làm fallback. `audioManifest` có 144 mục với transcript Hanzi, pinyin, dịch Việt và trạng thái/ghi chú quyền sử dụng. `videoManifest` có 24 mục, mỗi mục có kịch bản transcript, phụ đề văn bản, câu hỏi hiểu ngữ cảnh và trạng thái media.

| Hạng mục | Số lượng | Tình trạng |
|---|---:|---|
| Lesson có thể mở | 144 | Đầy đủ dữ liệu cho bốn kỹ năng. |
| Audio tệp thật | 5 | Tuần 1, 8, 12, 18 và 24; asset gốc tạo cho project. |
| Audio chờ sản xuất | 139 | Có transcript và fallback `SpeechSynthesis` minh bạch. |
| Video tệp thật | 1 | Tuần 8; clip mở tình huống dài 8 giây, có poster và WebVTT. |
| Video chờ sản xuất | 23 | Có transcript, phụ đề văn bản, câu hỏi và ghi chú quyền trong manifest. |

Video tuần 8 có thể mở từ lesson tuần 8 ở cuối dashboard. Các video chờ không có placeholder giả: giao diện hiển thị đúng trạng thái, transcript và bài tập thay thế. Hạn mức tạo video hiện tại đã đạt giới hạn ngày sau khi tạo clip tuần 8, nên không có tuyên bố hoàn thành thêm video.

## Lưu dữ liệu và quyền riêng tư

Tiến độ dùng schema version `2`. Trạng thái người học mới là **trống**: không có điểm, chuỗi ngày, bài hoàn thành hoặc số phút giả. Migration nhận dữ liệu version 1; trạng thái demo mặc định trước đây được chuyển về trống, còn tiến độ thực tế được giữ khi có thể. Bản ghi âm và ảnh nét viết được cố gắng lưu trong IndexedDB; JSON backup bảo toàn tiến độ, câu trả lời, từ khó và cài đặt nhưng chưa gói Blob audio/ảnh canvas để tránh tệp quá lớn.

> Ứng dụng chỉ xin quyền micro sau khi người học bấm bắt đầu ghi âm. Không có dữ liệu học hay bản ghi nào tự động gửi lên máy chủ trong MVP này.

## Giới hạn kỹ thuật minh bạch

| Khu vực | Hiện có | Giới hạn |
|---|---|---|
| Nghe | Tệp audio ưu tiên, phát/tạm dừng/phát lại/tua, tốc độ, pinyin/dịch. | 139 bài đang chờ audio tệp; chất lượng giọng fallback phụ thuộc thiết bị. |
| Nói | Ghi âm cục bộ, nghe lại, nhận diện `zh-CN` khi trình duyệt hỗ trợ, tự nhập transcript. | “Mức khớp nội dung” chỉ so sánh transcript; không chấm thanh điệu, nhịp hay phát âm chuyên sâu. |
| Viết | Canvas chuột/cảm ứng/bút, mẫu chữ, hoàn tác, xóa, lưu ảnh. | Chỉ là luyện và tự đối chiếu; không nhận diện hoặc chấm chữ viết tay. |
| Video | Một video gốc có poster/WebVTT; 24 kịch bản có fallback văn bản. | Clip tuần 8 hiện ngắn hơn mục tiêu 30–60 giây; 23 video chưa được sản xuất. |
| Thi thử | Timer và cấu hình 10/40/80 câu theo mốc. | Nội dung là phiếu luyện do project biên soạn; không đại diện cho đề thi chính thức. |

## Cấu trúc mã nguồn chính

| Đường dẫn | Vai trò |
|---|---|
| `client/src/data/courseData.ts` | Catalog 144 lesson, audio manifest, video manifest, lookup lesson. |
| `client/src/data/mockTests.ts` | Cấu hình mini test, đề bán phần và mô phỏng tuần 24. |
| `client/src/lib/types.ts` | Schema lesson, câu hỏi, media và tiến độ v2. |
| `client/src/lib/assessment.ts` | Chấm trắc nghiệm, so sánh transcript, tiến độ, lesson tiếp theo và danh sách ôn. |
| `client/src/lib/storage.ts` | localStorage, migration v1→v2, IndexedDB và backup JSON. |
| `client/src/components/AudioCoach.tsx` | Tệp audio ưu tiên với fallback minh bạch. |
| `client/src/components/LessonVideo.tsx` | Video, phụ đề, fallback transcript và trạng thái media. |
| `client/src/components/SpeakingPractice.tsx` | Ghi âm, nhận diện tùy thiết bị và mức khớp nội dung. |
| `client/src/components/WritingCanvas.tsx` | Canvas luyện và tự đối chiếu. |
| `client/src/pages/Home.tsx` | Dashboard, lộ trình, các panel kỹ năng, ôn tập, cài đặt. |
| `client/src/lib/assessment.test.ts` | 11 test cho logic, catalog, media manifest, mock test và backup. |

## Kiểm thử

Phiên bản này đã chạy `pnpm check`, `pnpm exec vitest run` (**11 test đạt**) và `pnpm build`. Các test kiểm tra đủ 144 lesson/24 tuần, trường nội dung bắt buộc, ID từ vựng duy nhất, đáp án nghe/đọc, manifest media, đề mô phỏng 80 câu/85 phút, tiến độ mới trống, sao lưu v2 và chọn lesson tiếp theo.

## Tham khảo

[1]: https://m.chinesetest.cn/HSK/3 "HSK (Level 3) — Chinese Tests Service Website"
