/**
 * Mực Đỏ Thực Hành: Audio tệp gốc là ưu tiên; SpeechSynthesis chỉ là phương án dự phòng được ghi rõ.
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
  const [notice, setNotice] = useState(audioSrc ? "Audio tệp gốc" : "Audio tệp đang chờ sản xuất — dùng giọng đọc thiết bị khi bạn bấm Phát.");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playFallback = (reason?: string) => {
    if (!("speechSynthesis" in window)) {
      setIsLoading(false);
      setNotice("Không có audio tệp và trình duyệt chưa hỗ trợ giọng đọc. Hãy dùng transcript bên dưới để tự luyện.");
      return;
    }
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(chinese);
    const chineseVoice = synth.getVoices().find((voice) => /^(zh|cmn)(-|_)/i.test(voice.lang));
    if (chineseVoice) utterance.voice = chineseVoice;
    utterance.lang = chineseVoice?.lang || "zh-CN";
    utterance.rate = speed;
    utterance.volume = volume;
    utterance.onstart = () => { setIsLoading(false); setIsPlaying(true); setNotice(reason ?? (chineseVoice ? "Đang dùng giọng tiếng Hoa của trình duyệt cho câu mẫu này." : "Đang dùng giọng đọc mặc định của thiết bị cho câu mẫu này.")); };
    utterance.onend = () => { setIsPlaying(false); onCompleted?.(); };
    utterance.onerror = () => { setIsLoading(false); setIsPlaying(false); setNotice("Không thể phát giọng đọc lúc này. Bạn vẫn có thể đọc transcript và thử nói lại."); };
    synth.resume();
    synth.speak(utterance);
  };

  const play = () => {
    setIsLoading(true);
    if (!audioSrc) { playFallback(); return; }
    const audio = audioRef.current ?? new Audio(audioSrc);
    audioRef.current = audio;
    audio.playbackRate = speed;
    audio.volume = volume;
    audio.oncanplay = () => setIsLoading(false);
    audio.onplay = () => { setIsLoading(false); setIsPlaying(true); setNotice("Đang phát audio tệp gốc."); };
    audio.onended = () => { setIsPlaying(false); onCompleted?.(); };
    audio.onerror = () => playFallback("Không tải được audio tệp, đang dùng giọng đọc của trình duyệt.");
    void audio.play().catch(() => playFallback("Trình duyệt không phát được audio tệp, đang dùng giọng đọc của trình duyệt."));
  };

  const pause = () => {
    if (audioSrc && audioRef.current) audioRef.current.pause();
    window.speechSynthesis?.pause();
    setIsPlaying(false);
  };
  const replay = () => {
    if (audioSrc && audioRef.current) { audioRef.current.currentTime = 0; void audioRef.current.play(); return; }
    window.speechSynthesis?.cancel();
    play();
  };
  const rewind = () => {
    if (audioSrc && audioRef.current) { audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5); return; }
    setNotice("Giọng đọc thiết bị chưa hỗ trợ tua vị trí. Bạn có thể phát lại câu từ đầu.");
  };

  useEffect(() => () => { window.speechSynthesis?.cancel(); audioRef.current?.pause(); }, []);

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
