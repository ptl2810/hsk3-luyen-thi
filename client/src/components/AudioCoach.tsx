/**
 * Mực Đỏ Thực Hành: Audio tệp gốc là học liệu ưu tiên; khi chưa có clip, báo rõ thay vì phát TTS thiết bị.
 */
import { Pause, Play, RotateCcw, Rewind, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AudioCoachProps {
  chinese: string;
  pinyin: string;
  translation: string;
  rate?: number;
  volume?: number;
  audioSrc?: string | null;
  showPinyin?: boolean;
  showTranslation?: boolean;
  onCompleted?: () => void;
}

export function AudioCoach({ chinese, pinyin, translation, rate = 0.8, volume = 1, audioSrc, showPinyin = true, showTranslation = true, onCompleted }: AudioCoachProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(rate);
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState(audioSrc ? "Audio tệp gốc" : "Audio tệp đang chờ sản xuất — dùng transcript để tự luyện, không phát giọng mặc định.");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = () => {
    setIsLoading(true);
    if (!audioSrc) { setIsLoading(false); setNotice("Audio tệp cho câu này đang chờ sản xuất; ứng dụng không phát giọng mặc định của thiết bị."); return; }
    const audio = audioRef.current ?? new Audio(audioSrc);
    audioRef.current = audio;
    audio.playbackRate = speed;
    audio.volume = volume;
    audio.oncanplay = () => setIsLoading(false);
    audio.onplay = () => { setIsLoading(false); setIsPlaying(true); setNotice("Đang phát audio tệp gốc."); };
    audio.onended = () => { setIsPlaying(false); onCompleted?.(); };
    audio.onerror = () => { setIsLoading(false); setIsPlaying(false); setNotice("Không tải được audio tệp. Hãy kiểm tra kết nối rồi thử lại; ứng dụng không chuyển sang giọng mặc định."); };
    void audio.play().catch(() => { setIsLoading(false); setIsPlaying(false); setNotice("Trình duyệt chặn phát audio tệp. Hãy bấm lại nút Phát; ứng dụng không chuyển sang giọng mặc định."); });
  };

  const pause = () => {
    if (audioSrc && audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
  };
  const replay = () => {
    if (audioSrc && audioRef.current) { audioRef.current.currentTime = 0; void audioRef.current.play(); return; }
    play();
  };
  const rewind = () => {
    if (audioSrc && audioRef.current) { audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5); return; }
    setNotice("Audio tệp cho câu này đang chờ sản xuất; bạn có thể dùng transcript để tự luyện.");
  };

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  return <div className="audio-coach">
    <div className="audio-coach__controls">
      <button className="round-control" onClick={isPlaying ? pause : play} aria-label={isPlaying ? "Tạm dừng" : "Phát câu mẫu"} disabled={isLoading}>{isPlaying ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}</button>
      <button className="icon-control" onClick={replay} aria-label="Phát lại câu mẫu"><RotateCcw size={17} /></button>
      <button className="icon-control" onClick={rewind} aria-label="Tua lại 5 giây"><Rewind size={17} /></button>
      <span className="audio-coach__label"><Volume2 size={15} /> {isLoading ? "Đang tải…" : "Câu mẫu"}</span>
      <label className="speed-picker"><span>Tốc độ</span><select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}><option value={0.6}>Chậm</option><option value={0.8}>0.8×</option><option value={1}>Bình thường</option></select></label>
    </div>
    <p className="audio-source-note" role="status">{notice}</p>
    <p className="audio-coach__hanzi" lang="zh-CN">{chinese}</p>
    {showPinyin && <p className="audio-coach__pinyin">{pinyin}</p>}
    {showTranslation && <p className="audio-coach__translation">{translation}</p>}
  </div>;
}
