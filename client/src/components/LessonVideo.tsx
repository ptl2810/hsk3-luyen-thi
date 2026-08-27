/** Mực Đỏ Thực Hành: Video tình huống giữ transcript gốc; nguồn ngoài chỉ là clip cụ thể đúng chủ đề, không liên kết kênh/playlist. */
import { Captions, Clapperboard, ExternalLink, FileText } from "lucide-react";
import { useState } from "react";
import type { VideoContext } from "@/lib/types";

export function LessonVideo({ video }: { video: VideoContext | undefined }) {
  const [showCaptions, setShowCaptions] = useState(true);
  const [failed, setFailed] = useState(false);
  if (!video) return null;
  const ready = video.status === "available" && !!video.videoSrc && !failed;
  return <section className="lesson-video" aria-labelledby="video-title">
    <div className="video-heading"><div><span>VIDEO TÌNH HUỐNG · TUẦN {video.week}</span><h3 id="video-title">{video.title}</h3></div><div className="video-heading__actions">{video.externalSource && <a className="video-source-link" href={video.externalSource.sourceUrl} target="_blank" rel="noreferrer" title={`Mở video cụ thể: ${video.externalSource.sourceTitle}`}><ExternalLink size={15} /> Mở video cụ thể</a>}<button type="button" onClick={() => setShowCaptions((current) => !current)} aria-pressed={showCaptions}><Captions size={16} /> {showCaptions ? "Ẩn phụ đề" : "Hiện phụ đề"}</button></div></div>
    {ready ? <div className="video-stage"><video controls preload="metadata" poster={video.posterSrc ?? undefined} onError={() => setFailed(true)}><source src={video.videoSrc ?? undefined} type="video/mp4" />{video.captionsSrc && <track kind="subtitles" srcLang="zh-CN" label="中文" src={video.captionsSrc} default={showCaptions} />}</video>{showCaptions && <p className="video-caption" lang="zh-CN">{video.captionsText}</p>}</div> : <div className="video-fallback"><Clapperboard size={23} /><div><b>{video.status === "planned" ? "Video của bài đang chờ sản xuất" : "Không tải được video"}</b><p>{video.externalSource ? "Bạn có thể mở nguồn tham khảo ở nút phía trên, đồng thời đọc transcript và làm câu hỏi trong app. Nội dung luyện trong app không sao chép từ nguồn ngoài." : "Đọc transcript, tập tình huống và trả lời câu hỏi bên dưới. Không có video thay thế hoặc nội dung giả lập."}</p></div></div>}
    <div className="video-transcript"><FileText size={15} /><div><p lang="zh-CN">{video.transcript.hanzi}</p><small>{video.transcript.pinyin}</small><span>{video.transcript.translation}</span></div></div>
    {video.externalSource && <p className="external-source-note"><b>Video cụ thể:</b> <a href={video.externalSource.sourceUrl} target="_blank" rel="noreferrer">{video.externalSource.sourceTitle}</a> · {video.externalSource.channel}. {video.externalSource.note}</p>}
    <p className="media-rights">Tình trạng media: {video.status === "available" ? "có tệp gốc" : "chờ sản xuất"}. {video.rights}</p>
  </section>;
}
