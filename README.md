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

Catalog `lessons` trong `client/src/data/courseData.ts` có đủ **144 lesson**. Mỗi lesson có sáu từ vựng có ID riêng, ghi chú ngữ pháp, script nghe theo chủ đề, ba biến thể nói, một đoạn đọc ba câu kèm **ba câu hỏi** (ý chính, từ/cụm từ và chi tiết), ba đến năm chữ để luyện canvas, nhiệm vụ sắp xếp câu và nhiệm vụ điền một chữ Hán. Các màn hình đều lấy dữ liệu từ lesson đang mở, không dùng câu hỏi cố định theo UI.

| Thao tác của người học | Cách hoạt động |
|---|---|
| Mở bài | Vào **Lộ trình**, mở một tuần rồi chọn bất kỳ buổi nào trong sáu buổi. |
| Tiếp tục học | Nút dashboard ưu tiên lesson đang dở; nếu không có, mở lesson chưa hoàn thành đầu tiên. |
| Ôn lỗi | Các câu trả lời chưa đạt xuất hiện ở **Ôn tập**; nút ôn quay về đúng lesson và kỹ năng. |
| Thi thử | Có mini test tuần 4/8/12, đề bán phần tuần 18 và mô phỏng 80 câu/85 phút tuần 24. |
| Sao lưu | Vào **Cài đặt** để xuất/nhập JSON tiến độ. |

## Media phương án A

Audio tệp là học liệu ưu tiên. **Ứng dụng không còn dùng `SpeechSynthesis` của trình duyệt làm fallback** cho phần nghe/từ vựng: khi không có tệp, giao diện nói rõ audio đang chờ sản xuất thay vì thông báo đang đọc bằng giọng mặc định. `audioManifest` có 144 mục nghe với transcript Hanzi, pinyin, dịch Việt và trạng thái/ghi chú quyền sử dụng. `audioAssets` trong `client/src/data/mediaManifest.ts` mô tả riêng các clip tuần 1 có ID, Hán tự được nói, pinyin hiển thị, đường dẫn tệp, thời lượng, SHA-256, nguồn sinh giọng và trạng thái kiểm tra kỹ thuật.

`videoManifest` có 24 mục, mỗi mục gắn một **URL YouTube video công khai đơn lẻ** với video ID, URL nhúng dạng `youtube-nocookie`, tiêu đề, kênh, ghi chú phù hợp và ngày kiểm chứng. Nút video ngoài luôn mở đúng clip được ghi ở tuần đang học, không mở kênh hay playlist. Danh mục đối chiếu nằm tại `docs/video-specific-research.md`.

| Hạng mục | Số lượng | Tình trạng |
|---|---:|---|
| Lesson có thể mở | 144 | Đầy đủ dữ liệu cho bốn kỹ năng. |
| Audio nghe tệp thật | 5 | Một bài nghe đại diện ở tuần 1, 8, 12, 18 và 24; asset gốc tạo cho project. |
| Clip Mandarin tuần 1 | 8 | Năm clip thanh điệu riêng `妈/麻/马/骂/吗`, hai từ vựng `你/好` và câu đọc `我是学生。`. |
| Audio nghe chờ sản xuất | 139 | Có transcript; giao diện báo chờ sản xuất, không phát giọng mặc định. |
| Video tệp thật | 1 | Tuần 8; clip mở tình huống dài 8 giây, có poster và WebVTT. |
| Video chờ sản xuất | 23 | Có transcript, phụ đề văn bản, câu hỏi và ghi chú quyền trong manifest. |
| Video nguồn cụ thể | 24 | Một video YouTube đơn lẻ theo mỗi chủ đề tuần, đã kiểm chứng metadata công khai ngày 2026-08-27. |

Video tuần 8 có thể mở từ lesson tuần 8 ở cuối dashboard. Các video chờ không có placeholder giả: giao diện hiển thị đúng trạng thái, transcript và bài tập thay thế. Hạn mức tạo video hiện tại đã đạt giới hạn ngày sau khi tạo clip tuần 8, nên không có tuyên bố hoàn thành thêm video.

## Lưu dữ liệu và quyền riêng tư

Tiến độ dùng schema version `2`. Trạng thái người học mới là **trống**: không có điểm, chuỗi ngày, bài hoàn thành hoặc số phút giả. Migration nhận dữ liệu version 1; trạng thái demo mặc định trước đây được chuyển về trống, còn tiến độ thực tế được giữ khi có thể. Mỗi lượt lưu nét viết tạo một record có ID, lesson, chữ mẫu, số nét, thời điểm và trạng thái `practice-saved` trong IndexedDB. JSON backup giữ metadata tiến độ/lượt lưu, câu trả lời, từ khó và cài đặt; **không gói ảnh canvas hoặc Blob audio**, nên ảnh luyện nét vẫn ở thiết bị đã thực hành.

> Ứng dụng chỉ xin quyền micro sau khi người học bấm bắt đầu ghi âm. Không có dữ liệu học hay bản ghi nào tự động gửi lên máy chủ trong MVP này.

## Giới hạn kỹ thuật minh bạch

| Khu vực | Hiện có | Giới hạn |
|---|---|---|
| Nghe | Script 3 câu cho các lesson chờ audio và 2 câu hỏi hiểu nội dung; tệp audio ưu tiên khi có. | 139 bài đang chờ audio tệp; không có fallback giọng đọc mặc định. |
| Từ vựng | Clip Mandarin riêng cho sáu từ tuần 1 và drill năm thanh, phát qua audio tệp. | Chưa có clip riêng cho từ vựng tuần 2–24; giao diện báo rõ là đang chờ sản xuất. |
| Nói | Ba biến thể mẫu theo tình huống, ghi âm cục bộ, nghe lại, nhận diện `zh-CN` khi trình duyệt hỗ trợ, tự nhập transcript. | “Mức khớp nội dung” chỉ so sánh transcript; không chấm thanh điệu, nhịp hay phát âm chuyên sâu. |
| Đọc | Đoạn 3 câu, pinyin/dịch bật tắt, gợi ý từ và 3 câu hỏi chấm cùng lúc; mỗi câu được lưu vào Ôn tập. | Đây là học liệu gốc theo chủ đề, không phải câu hỏi thi chính thức sao chép từ đề. |
| Viết | Canvas chuột/cảm ứng/bút với pointer capture an toàn, mẫu chữ, hoàn tác, xóa, lưu record; sắp xếp câu và điền chữ. | Chỉ là luyện và tự đối chiếu; app không nhận diện/chấm chữ viết tay. “Đạt bài viết” chỉ áp dụng cho nhiệm vụ câu có đáp án máy chấm được. |
| Video | Một video gốc có poster/WebVTT; 24 kịch bản có fallback văn bản và 24 link YouTube video cụ thể. | Clip tuần 8 hiện ngắn hơn mục tiêu 30–60 giây; 23 video nội bộ chưa được sản xuất. Khả năng xem/nhúng video bên ngoài vẫn phụ thuộc YouTube và thiết bị. |
| Thi thử | Timer và cấu hình 10/40/80 câu theo mốc. | Nội dung là phiếu luyện do project biên soạn; không đại diện cho đề thi chính thức. |

## Cấu trúc mã nguồn chính

| Đường dẫn | Vai trò |
|---|---|
| `client/src/data/courseData.ts` | Catalog 144 lesson, audio manifest, video manifest, lookup lesson. |
| `client/src/data/mediaManifest.ts` | Manifest clip Mandarin tuần 1 và resolver audio theo từ. |
| `client/src/data/mockTests.ts` | Cấu hình mini test, đề bán phần và mô phỏng tuần 24. |
| `client/src/lib/types.ts` | Schema lesson, câu hỏi, media và tiến độ v2. |
| `client/src/lib/assessment.ts` | Chấm trắc nghiệm, so sánh transcript, tiến độ, lesson tiếp theo và danh sách ôn. |
| `client/src/lib/storage.ts` | localStorage, migration v1→v2, IndexedDB và backup JSON. |
| `client/src/lib/writingCanvas.ts` | Helper toạ độ Canvas thuần, không giữ React SyntheticEvent. |
| `client/src/lib/writingProgress.ts` | Tách metadata lưu luyện nét khỏi kết quả chấm câu viết. |
| `client/src/components/AudioCoach.tsx` | Trình phát audio tệp với trạng thái lỗi/chờ sản xuất trung thực. |
| `client/src/components/LessonVideo.tsx` | Video, phụ đề, fallback transcript và trạng thái media. |
| `client/src/components/SpeakingPractice.tsx` | Ghi âm, nhận diện tùy thiết bị và mức khớp nội dung. |
| `client/src/components/WritingCanvas.tsx` | Canvas luyện nét có Pointer Events an toàn, capture/cancel/lost capture và khối trạng thái lưu rõ ràng. |
| `client/src/pages/Home.tsx` | Dashboard, lộ trình, các panel kỹ năng, ôn tập, cài đặt. |
| `client/src/**/*writing*.test.*` | 8 test Canvas/tiến độ: scale toạ độ, rect rỗng, pointer chuột/chạm/bút, cancel/lost capture, lưu thành công/lỗi và câu viết đúng/sai. |

## Kiểm thử

Phiên bản này đã chạy `pnpm check`, `pnpm exec vitest run` (**24 test đạt**) và `pnpm build`. Ngoài catalog/media/backup, test kiểm tra 144 đoạn Đọc riêng và nhiều câu, script Nghe nhiều câu khi audio tệp chưa có, bộ ba câu Đọc từ UI đến lưu kết quả, toạ độ Canvas khi CSS scale khác backing store, chuỗi Pointer Events chuột/chạm/bút, `pointercancel`, `lostpointercapture`, lưu thành công/lỗi và quy tắc: lưu nét không tự hoàn thành kỹ năng Viết, chỉ câu đúng mới tạo điểm/hoàn thành.

> Các clip Mandarin tuần 1 là **neural TTS đã kiểm tra kỹ thuật về tệp/thời lượng/hash**, chưa phải bản được người bản ngữ thẩm định. App không tuyên bố đã có kiểm duyệt phát âm bởi người bản ngữ.

## Triển khai GitHub Pages

Repository đã có workflow `.github/workflows/deploy-pages.yml`. Sau khi đưa mã lên một repository GitHub, vào **Settings → Pages → Build and deployment**, chọn **GitHub Actions**. Mỗi lần đẩy nhánh `main`, workflow sẽ build `dist/public` với base path theo tên repository rồi triển khai Pages. Chi tiết cách chuyển media ra khỏi môi trường preview nằm tại `docs/github-pages-media.md`.

## Tham khảo

[1]: https://m.chinesetest.cn/HSK/3 "HSK (Level 3) — Chinese Tests Service Website"
