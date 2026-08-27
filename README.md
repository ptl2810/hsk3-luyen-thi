# Hoa Ngữ 180 Ngày — MVP luyện thi HSK3

**Hoa Ngữ 180 Ngày** là web app tiếng Việt dành cho người mới bắt đầu học tiếng Hoa và chuẩn bị HSK3 theo lộ trình 24 tuần, 60 phút mỗi ngày. Phiên bản MVP ưu tiên trải nghiệm học có thể thao tác thật, tiến độ cục bộ và bốn kỹ năng **Nghe – Nói – Đọc – Viết**.

## Chạy dự án

| Lệnh | Mục đích |
|---|---|
| `pnpm install` | Cài đặt phụ thuộc (chỉ cần thực hiện sau khi nhận mã nguồn ở môi trường mới). |
| `pnpm dev` | Chạy ứng dụng ở chế độ phát triển. |
| `pnpm check` | Kiểm tra kiểu TypeScript. |
| `pnpm exec vitest run` | Chạy bộ test logic. |
| `pnpm build` | Tạo bản build production. |

Ứng dụng dùng **React 19, TypeScript, Vite và Tailwind CSS**. Không cần tài khoản hay backend cho MVP: dữ liệu tiến độ được lưu ngay trên trình duyệt của người học.

## Cấu trúc mã nguồn

| Đường dẫn | Vai trò |
|---|---|
| `client/src/data/courseData.ts` | Schema nội dung khóa học, bài mẫu, từ vựng và khung 24 tuần. |
| `client/src/lib/types.ts` | Kiểu dữ liệu chung cho bài học, tiến độ, bài tập và cài đặt. |
| `client/src/lib/assessment.ts` | Chấm trắc nghiệm, so sánh transcript nói, tính tiến độ và danh sách lỗi cần ôn. |
| `client/src/lib/storage.ts` | Lưu/khôi phục tiến độ qua `localStorage`, dữ liệu nặng qua IndexedDB, xuất/nhập JSON. |
| `client/src/components/AudioCoach.tsx` | Phát audio có phát/tạm dừng/phát lại/tua 5 giây, điều chỉnh tốc độ. |
| `client/src/components/SpeakingPractice.tsx` | Quyền micro, ghi âm, nghe lại và Web Speech API có phương án nhập transcript. |
| `client/src/components/WritingCanvas.tsx` | Canvas chuột/cảm ứng/bút, hoàn tác, xóa, cỡ nét và mẫu chữ. |
| `client/src/pages/Home.tsx` | Khung bàn học, dashboard, lộ trình, flashcard, ôn tập, thi thử, thống kê, cài đặt. |
| `client/src/lib/assessment.test.ts` | Test tối thiểu cho chấm bài, tiến độ và sao lưu. |

## Nội dung mẫu hiện có

Các dữ liệu hoàn chỉnh để người học thực hành nằm trong `sampleLessons`:

| Bài | Nội dung có thể học ngay |
|---|---|
| Tuần 1 · Buổi 1 | Pinyin và bốn thanh điệu, audio tiếng Hoa thật, bài nghe phân biệt nghĩa, nói theo mẫu, 5 chữ viết. |
| Tuần 1 · Buổi 2 | Chào hỏi và giới thiệu bản thân: hội thoại, ngữ pháp `叫`, nghe–nói–đọc–viết. |
| Tuần 2 · Buổi 1 | Số đếm, ngày giờ và câu lịch trình với quy tắc thời gian trước động từ. |
| Tuần 3 · Buổi 1 | Đọc đoạn giới thiệu ngắn, pinyin/dịch tùy chọn, từ gợi ý và câu hỏi đọc hiểu. |
| Tuần 4 · Buổi 1 | Luyện nét cơ bản với năm chữ `一 二 三 人 口` trên canvas. |
| Thi thử rút gọn | Bài tổng hợp nghe–đọc–viết và nhiệm vụ ghi âm nói riêng. |

Các tuần còn lại của lộ trình có tiêu đề, giai đoạn và sáu nhịp hoạt động rõ ràng để đội ngũ nội dung bổ sung dần, không dùng văn bản mẫu vô nghĩa.

## Thêm bài học, từ vựng hoặc bài tập

1. Thêm một đối tượng mới theo kiểu `Lesson` vào `sampleLessons` trong `client/src/data/courseData.ts`.
2. Khai báo mục tiêu đo được, bài khởi động, `chinese`, `pinyin`, `translation`, ngữ pháp, từ vựng và 5 hoặc nhiều hơn chữ luyện viết.
3. Thêm `exerciseId` duy nhất khi tạo bài tập mới; gọi `recordExercise` trong UI để kết quả đi vào thống kê và danh sách ôn.
4. Nếu bài cần audio tệp, lưu tệp bên ngoài thư mục mã nguồn, tải vào kho tài sản web và truyền đường dẫn đó cho `AudioCoach` qua `audioSrc`.
5. Khi thêm dạng bài phức tạp, viết hàm chấm độc lập trong `client/src/lib/assessment.ts` trước khi dựng UI.

## Lưu dữ liệu và sao lưu

Tiến độ, cài đặt, điểm, lỗi sai và từ đánh dấu khó được lưu bằng `localStorage` với schema version `1`. Dữ liệu ghi âm và dữ liệu nét viết được cố gắng lưu bằng IndexedDB để tránh làm nặng localStorage. Người học có thể xuất/nhập bản sao lưu JSON từ **Cài đặt**; bản sao lưu tập trung vào tiến độ học, điểm và cài đặt.

> Không có dữ liệu học hay bản ghi nào tự động tải lên máy chủ trong MVP này. Ứng dụng chỉ yêu cầu micro sau hành động rõ ràng của người dùng.

## Giới hạn kỹ thuật của MVP

| Khu vực | Cách MVP xử lý | Giới hạn minh bạch |
|---|---|---|
| Audio | Dùng audio tiếng Hoa thật cho bài bốn thanh điệu; các câu mẫu khác dùng Speech Synthesis của trình duyệt. | Chất lượng giọng và việc tua vị trí của câu mẫu tổng hợp phụ thuộc trình duyệt; audio tệp hỗ trợ tua 5 giây. |
| Nói | Ghi âm qua `MediaRecorder`, nhận diện qua Web Speech API khi trình duyệt hỗ trợ; luôn có ô nhập transcript thay thế. | Không chấm thanh điệu, nhịp hoặc phát âm chuyên sâu; phản hồi chỉ đo mức độ khớp nội dung. |
| Viết | Canvas hỗ trợ chuột, cảm ứng và bút; có mẫu chữ, số nét, hoàn tác và xóa. | Không tuyên bố nhận diện/chấm chữ viết tay. Kết quả được ghi “đang luyện/tự đối chiếu”. |
| Offline | Nội dung và tiến độ có thể tiếp tục dùng sau khi giao diện được tải. | Speech recognition và một số giọng đọc có thể cần mạng hoặc không có ở mọi trình duyệt. |
| Sao lưu | JSON bảo toàn tiến độ, điểm, bài làm văn bản và cài đặt. | Tệp ghi âm Blob/nét ảnh trong IndexedDB không được gói vào JSON của phiên bản MVP để tránh backup quá nặng. |

## Kiểm thử hiện có

`client/src/lib/assessment.test.ts` kiểm tra các tình huống thiết yếu sau: chuẩn hóa chữ Hoa trước khi so sánh, phát hiện ký tự thiếu trong transcript nói, phần trăm hoàn thành bốn kỹ năng, xuất/nhập JSON không mất tiến độ và xác định bài học tiếp theo.

## Việc nên làm sau MVP

Sau 2–4 tuần dùng thử, các bước có giá trị cao nhất là: bổ sung thêm audio đã thu âm biên soạn, export/import cả Blob audio/nét viết dưới dạng gói nén, mở rộng ngân hàng bài học theo syllabus HSK đang dùng, đồng bộ nhiều thiết bị có xác thực, chấm phát âm có backend bảo mật, và thuật toán ôn tập thích ứng dựa trên lịch lỗi thực tế.
