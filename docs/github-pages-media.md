# Media khi triển khai GitHub Pages

GitHub Pages chỉ xuất bản các tệp nằm trong repository. Các URL `/manus-storage/...` đang phục vụ preview hiện tại sẽ **không** tự có trên một repository GitHub mới, vì vậy bộ media cần được chuyển sang `client/public/media/` hoặc một CDN do bạn quản lý trước khi xuất bản phiên bản public.

| Nhóm asset | Tệp gốc đang có | Cách dùng trên GitHub Pages |
|---|---|---|
| Nhận diện/hình minh họa | `hoa-ngu-180-logo.png`, `hero-study-desk.png`, `speaking-reading.png`, `writing-character.png` | Chép vào `client/public/media/images/`, sau đó thay URL trong `Home.tsx`. |
| Audio tệp thật | `hsk3-tones-week1.wav`, `hsk3-week08-shopping.wav`, `hsk3-week12-directions.wav`, `hsk3-week18-plan.wav`, `hsk3-week24-review.wav` | Chép vào `client/public/media/audio/`, rồi thay `audioSrc` trong `courseData.ts`. |
| Video và phụ đề | `week08-shopping-scene-1.mp4`, `week08-shopping.vtt`, poster tuần 8 | Chép vào `client/public/media/video/`, rồi thay `videoSrc`, `captionsSrc`, `posterSrc` trong `courseData.ts`. |

> Bản app vẫn hoạt động về nội dung khi media chưa được chuyển: audio chuyển sang `SpeechSynthesis` có thông báo; video hiển thị transcript và trạng thái thay thế. Tuy nhiên, để có trải nghiệm hình/audio đầy đủ trên GitHub Pages, cần hoàn tất bước chuyển asset này.
