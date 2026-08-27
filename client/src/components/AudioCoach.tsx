/**
 * Mực Đỏ Thực Hành: Bộ điều khiển audio dùng giọng đọc trình duyệt có trạng thái, tốc độ và ba lớp hỗ trợ.
 */
import { Pause, Play, RotateCcw, Rewind, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AudioCoachProps {
  chinese: string;
  pinyin: string;
  translation: string;
  rate?: number;
  volume?: number;
  audioSrc?: string;
  showPinyin?: boolean;
  showTranslation?: boolean;
  onCompleted?: () => void;
}

export function AudioCoach({ chinese, pinyin, translation, rate = 0.8, volume = 1, audioSrc, showPinyin = true, showTranslation = true, onCompleted }: AudioCoachProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(rate);
  const [error, setError] = useState("");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = () => {
    if (audioSrc) {
      const audio = audioRef.current ?? new Audio(audioSrc);
      audioRef.current = audio;
      audio.playbackRate = speed;
      audio.volume = volume;
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => { setIsPlaying(false); onCompleted?.(); };
      audio.onerror = () => setError("Không thể tải audio. Hãy kiểm tra kết nối rồi thử lại.");
      void audio.play().catch(() => setError("Trình duyệt chặn phát audio. Hãy bấm lại nút Phát để thử lại."));
      return;
    }
    if (!("speechSynthesis" in window)) {
      setError("Trình duyệt chưa hỗ trợ phát giọng đọc. Hãy dùng Chrome hoặc Edge bản mới.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(chinese);
    utterance.lang = "zh-CN";
    utterance.rate = speed;
    utterance.volume = volume;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => {
      setIsPlaying(false);
      onCompleted?.();
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setError("Không thể phát câu mẫu lúc này. Kiểm tra âm lượng thiết bị rồi thử lại.");
    };
    utteranceRef.current = utterance;
    setError("");
    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if (audioSrc && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }
    window.speechSynthesis.pause();
    setIsPlaying(false);
  };

  const replay = () => {
    if (audioSrc && audioRef.current) {
      audioRef.current.currentTime = 0;
      void audioRef.current.play();
      return;
    }
    window.speechSynthesis.cancel();
    play();
  };

  const rewind = () => {
    if (audioSrc && audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
      return;
    }
    setError("Câu mẫu tổng hợp chưa hỗ trợ tua vị trí. Bạn có thể bấm phát lại từ đầu.");
  };

  useEffect(() => () => { window.speechSynthesis?.cancel(); audioRef.current?.pause(); }, []);

  return (
    <div className="audio-coach">
      <div className="audio-coach__controls">
        <button className="round-control" onClick={isPlaying ? pause : play} aria-label={isPlaying ? "Tạm dừng" : "Phát câu mẫu"}>
          {isPlaying ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}
        </button>
        <button className="icon-control" onClick={replay} aria-label="Phát lại câu mẫu"><RotateCcw size={17} /></button>
        <button className="icon-control" onClick={rewind} aria-label="Tua lại 5 giây"><Rewind size={17} /></button>
        <span className="audio-coach__label"><Volume2 size={15} /> Câu mẫu</span>
        <label className="speed-picker">
          <span>Tốc độ</span>
          <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
            <option value={0.6}>Chậm</option>
            <option value={0.8}>0.8×</option>
            <option value={1}>Bình thường</option>
          </select>
        </label>
      </div>
      <p className="audio-coach__hanzi" lang="zh-CN">{chinese}</p>
      {showPinyin && <p className="audio-coach__pinyin">{pinyin}</p>}
      {showTranslation && <p className="audio-coach__translation">{translation}</p>}
      {error && <p role="alert" className="status-message status-message--error">{error}</p>}
    </div>
  );
}
