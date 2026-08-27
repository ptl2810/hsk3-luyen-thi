/** Mực Đỏ Thực Hành: Video tình huống có phụ đề bật/tắt và bản đọc thay thế khi media chưa sẵn sàng. */
import { Captions, Clapperboard, FileText } from "lucide-react";
import { useState } from "react";
import type { VideoContext } from "@/lib/types";

export function LessonVideo({ video }: { video: VideoContext | undefined }) {
  const [showCaptions, setShowCaptions] = useState(true);
  const [failed, setFailed] = useState(false);
  if (!video) return null;
  const ready = video.status === "available" && !!video.videoSrc && !failed;
  return <section className="lesson-video" aria-labelledby="video-title">
    <div className="video-heading"><div><span>VIDEO TÌNH HUỐNG · TUẦN {video.week}</span><h3 id="video-title">{video.title}</h3></div><button type="button" onClick={() => setShowCaptions((current) => !current)} aria-pressed={showCaptions}><Captions size={16} /> {showCaptions ? "Ẩn phụ đề" : "Hiện phụ đề"}</button></div>
    {ready ? <div className="video-stage"><video controls preload="metadata" poster={video.posterSrc ?? undefined} onError={() => setFailed(true)}><source src={video.videoSrc ?? undefined} type="video/mp4" />{video.captionsSrc && <track kind="subtitles" srcLang="zh-CN" label="中文" src={video.captionsSrc} default={showCaptions} />}</video>{showCaptions && <p className="video-caption" lang="zh-CN">{video.captionsText}</p>}</div> : <div className="video-fallback"><Clapperboard size={23} /><div><b>{video.status === "planned" ? "Video đang chờ sản xuất" : "Không tải được video"}</b><p>Đọc transcript, tập tình huống và trả lời câu hỏi bên dưới. Không có video thay thế hoặc nội dung giả lập.</p></div></div>}
    <div className="video-transcript"><FileText size={15} /><div><p lang="zh-CN">{video.transcript.hanzi}</p><small>{video.transcript.pinyin}</small><span>{video.transcript.translation}</span></div></div>
    <p className="media-rights">Tình trạng media: {video.status === "available" ? "có tệp gốc" : "chờ sản xuất"}. {video.rights}</p>
  </section>;
}
