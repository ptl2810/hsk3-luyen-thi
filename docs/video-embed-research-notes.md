# Ghi chú kiểm chứng nhúng video — Hoa Ngữ 180 Ngày

Ngày rà soát: 27-08-2026.

## Tiêu chí triển khai

YouTube hỗ trợ nhúng bằng `iframe` theo dạng `https://www.youtube.com/embed/VIDEO_ID`; player cần kích thước tối thiểu 200 × 200 px. Với ứng dụng học, dùng `autoplay=0`, giữ điều khiển bàn phím và ưu tiên `youtube-nocookie.com` khi có thể. Cần kiểm tra riêng từng video vì video giới hạn độ tuổi có thể không phát được ở website bên thứ ba.

TikTok hỗ trợ lấy mã nhúng từ mục Share → Embed trên trang video desktop hoặc dùng endpoint oEmbed. TikTok cũng cung cấp player iframe bằng đường dẫn `https://www.tiktok.com/player/v1/{post_id}`. Video bị gỡ hoặc bị hạn chế ở TikTok cũng sẽ không xem được trong bản nhúng; ứng dụng cần luôn có nút mở nguồn ngoài và transcript dự phòng.

## Nguồn quy tắc

- YouTube Embedded Players and Player Parameters: <https://developers.google.com/youtube/player_parameters>
- YouTube Help — Embed videos & playlists: <https://support.google.com/youtube/answer/171780?hl=en>
- TikTok for Developers — Embed Videos: <https://developers.tiktok.com/doc/embed-videos/>
- TikTok for Developers — Embed Player: <https://developers.tiktok.com/doc/embed-player?enter_method>

## Nguồn video đã mở và kiểm chứng ban đầu

| Nguồn | Nội dung đã xác nhận | Cách dùng được đề xuất | Lưu ý |
| --- | --- | --- | --- |
| Mandarin Corner — HSK 3 Complete Vocabulary Course | Trang hiển thị video YouTube, có mục PDF/transcript và liên kết tới video hội thoại, từ vựng theo chủ đề, podcast và bài luyện HSK. | Liên kết đến playlist/video gốc, hoặc nhúng YouTube sau khi kiểm tra riêng video được phép embed. | Một số tệp tải về/transcript nằm trong khu vực supporter; không sao chép nội dung đó. |
| Chinese Zero to Hero — YouTube | Kênh công khai có mục Chinese Listening Practice và các video tiếng Hoa chậm hiển thị CC. | Nhúng video công khai ở dạng YouTube iframe hoặc mở nguồn ngoài. | Dùng cho nghe-đọc có hướng dẫn; không dùng video có giới hạn độ tuổi hay thiếu phù hợp theo chủ đề. |
| Mandarin Click — `ZMK1KYYKxmw` | Video “小王的生活” được công khai, metadata có URL iframe `https://www.youtube.com/embed/ZMK1KYYKxmw`, mô tả cho biết có transcript. | Ứng viên cho bài nghe-đọc HSK3 về đời sống; giữ link về nguồn và viết câu hỏi riêng. | Transcript/PDF gốc có thể có điều kiện thành viên; chỉ dùng link/nhúng hợp lệ và nội dung bài tập do ứng dụng tự biên soạn. |
| Chinese with Mandarin HQ — Street Interviews | Playlist công khai về nghe tiếng Hoa thực tế, gồm hội thoại đời sống, ăn uống, sức khỏe và mẫu câu giao tiếp. | Dùng playlist/liên kết ngoài cho các tuần chủ đề đời sống; cắt nghĩa từ vựng và tự biên soạn hoạt động đi kèm. | Có một số video trong playlist bị ẩn; phải kiểm tra video cụ thể trước khi gắn chính thức. |
| Learn Chinese with Pipo — HSK 3–4 Conversations | Playlist công khai 18 video, có chủ đề giao thông công cộng, công sở, thời trang, dinh dưỡng, kế hoạch và thuê nhà. | Nguồn trọng tâm cho các video tình huống tuần trung và cuối lộ trình. | Video dài; ứng dụng nên hướng người học tới timestamp/câu hỏi, không phát toàn bộ như một bài 8–35 giây. |
| ChinesePod — YouTube | Kênh công khai có podcast Beginner/Intermediate và thư viện video rất lớn về hội thoại tiếng Hoa. | Nguồn phụ trợ để chọn video ngắn phù hợp sau vòng kiểm tra từng video. | Một số nội dung đầy đủ/tài liệu bổ sung dẫn về dịch vụ trả phí; không sao chép transcript hoặc tài liệu có điều kiện truy cập. |
| HSK Official — Chinese Testing International | Kênh công khai tự giới thiệu là kênh về HSK, liên kết tới chinesetest.cn và có video về thông tin/kỳ thi/cuộc thi HSK. | Dùng làm nguồn liên kết chính thức tại khu thi thử hoặc trang tham khảo kỳ thi. | Không nên coi đây là nguồn chính cho 24 video tình huống đời sống vì nội dung quan sát được thiên về thông tin/cuộc thi. |

## Quyết định về TikTok

Một mẫu video TikTok có chủ đề HSK3 được tìm thấy từ tìm kiếm nhưng không trả về nội dung video/metadata đủ để đánh giá trong môi trường kiểm chứng. Vì vậy, TikTok không được đưa vào danh mục nhúng mặc định. Chỉ chấp nhận video TikTok khi có URL công khai, mã nhúng hoặc oEmbed hợp lệ, tác giả/kênh được nhận diện, nội dung đã xem xét và không chứa hạn chế phù hợp. Trong ứng dụng, TikTok nên mặc định là nút **Mở nguồn ngoài**; iframe chỉ bật sau khi kiểm tra từng video.

## Đánh giá sử dụng

| Nguồn | Khả năng nhúng/đường dẫn | Độ phù hợp HSK3 | Rủi ro cần kiểm soát | Trạng thái đề xuất |
| --- | --- | --- | --- | --- |
| Mandarin Corner | Có thể dùng link hoặc YouTube embed cho video công khai. | Cao cho từ vựng, nghe chậm và hội thoại thực tế. | Một phần transcript/tải về có giới hạn thành viên; không sao chép hay phát lại nội dung premium. | Ưu tiên 1, chọn video công khai từng cái. |
| Chinese Zero to Hero | YouTube embed chuẩn khi video công khai và chủ kênh không tắt embed. | Trung bình–cao cho nghe chậm, pinyin và ngữ pháp. | Nội dung đầy đủ có thể dẫn tới trang khóa học; cần gắn attribution và không trình bày như nội dung của ứng dụng. | Ưu tiên 1, dùng nội dung miễn phí công khai. |
| Mandarin Click | Đã kiểm chứng ít nhất một video có URL YouTube embed trong metadata. | Cao cho truyện ngắn/nghe-đọc chậm. | Kiểm tra từng video; không lấy transcript/PDF ngoài điều kiện được phép. | Ưu tiên 1 cho nghe-đọc. |
| Chinese with Mandarin HQ | Playlist công khai; embed tùy từng video. | Trung bình–cao cho giao tiếp, ăn uống, sức khỏe. | Có video ẩn; không dùng playlist như bằng chứng video nào cũng khả dụng. | Ưu tiên 2, chọn từng video công khai. |
| Learn Chinese with Pipo | Playlist công khai; embed tùy từng video. | Cao cho tình huống HSK3–4; nhiều video dài. | Cần chọn timestamp và viết hoạt động riêng, không yêu cầu người học xem cả video. | Ưu tiên 1 cho tuần 8–24. |
| ChinesePod | Kênh/podcast công khai; embed tùy từng video. | Trung bình cho hội thoại mở rộng. | Video và transcript đầy đủ có thể liên quan dịch vụ trả phí; luôn giữ link nguồn. | Ưu tiên 2, chỉ dùng link ngoài sau biên tập. |
| HSK Official | Video YouTube công khai; embed tùy từng video. | Cao cho thông tin kỳ thi, thấp cho hội thoại. | Không suy diễn video chính thức là đề thi chính thức; chỉ dùng trang tham khảo. | Nguồn bổ trợ thi thử. |
| TikTok | Theo tài liệu có embed/oEmbed; mẫu kiểm chứng chưa tải đủ metadata. | Phụ thuộc creator, khó chuẩn hóa. | Link có thể thay đổi/gỡ, có video gợi ý cuối và điều kiện nền tảng. | Link ngoài mặc định; không dùng cho trải nghiệm cốt lõi. |
