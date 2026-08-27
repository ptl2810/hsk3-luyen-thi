/**
 * Mực Đỏ Thực Hành: Ghi âm có xin quyền rõ ràng, nhận diện tiếng Hoa khi có và phương án nhập câu thay thế.
 */
import { Mic, Pause, Play, Square, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { scoreTranscript } from "@/lib/assessment";
import { saveAudioRecord } from "@/lib/storage";

type RecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: any) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: any) => void) | null;
  start: () => void;
  stop: () => void;
};

type RecognitionConstructor = new () => RecognitionLike;

interface SpeakingPracticeProps {
  lessonId: string;
  target: string;
  scenario: string;
  checkpoints: string[];
  onCompleted: (score: number, transcript: string) => void;
}

export function SpeakingPractice({ lessonId, target, scenario, checkpoints, onCompleted }: SpeakingPracticeProps) {
  const [recording, setRecording] = useState(false);
  const [recordUrl, setRecordUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [notice, setNotice] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const chunksRef = useRef<Blob[]>([]);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<RecognitionLike | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getRecognitionConstructor = (): RecognitionConstructor | undefined => {
    const extended = window as Window & { SpeechRecognition?: RecognitionConstructor; webkitSpeechRecognition?: RecognitionConstructor };
    return extended.SpeechRecognition ?? extended.webkitSpeechRecognition;
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setNotice("Trình duyệt không hỗ trợ ghi âm. Bạn vẫn có thể nhập câu tiếng Hoa để tự đối chiếu.");
      return;
    }
    try {
      setNotice("Ứng dụng chỉ ghi âm sau khi bạn bấm Bắt đầu. Bản ghi được lưu cục bộ trên thiết bị này.");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => event.data.size && chunksRef.current.push(event.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        if (blob.size) {
          if (recordUrl) URL.revokeObjectURL(recordUrl);
          setRecordUrl(URL.createObjectURL(blob));
          try {
            await saveAudioRecord(lessonId, blob);
          } catch {
            setNotice("Bản ghi nghe lại được trong phiên này, nhưng trình duyệt chưa cho phép lưu lâu dài.");
          }
        }
        stream.getTracks().forEach((track) => track.stop());
      };
      recorder.start();
      recorderRef.current = recorder;
      setRecording(true);

      const Recognition = getRecognitionConstructor();
      if (Recognition) {
        const recognition = new Recognition();
        recognition.lang = "zh-CN";
        recognition.interimResults = false;
        recognition.continuous = false;
        recognition.onresult = (event) => setTranscript(event.results?.[0]?.[0]?.transcript ?? "");
        recognition.onerror = () => setNotice("Ghi âm vẫn hoạt động, nhưng nhận diện tiếng Hoa không khả dụng. Hãy nhập câu để tự đối chiếu.");
        recognition.onend = () => undefined;
        recognitionRef.current = recognition;
        recognition.start();
      } else {
        setNotice("Trình duyệt chưa hỗ trợ nhận diện tiếng Hoa. Bạn có thể nghe lại bản ghi hoặc nhập câu trả lời.");
      }
    } catch {
      setNotice("Không lấy được quyền micro. Hãy kiểm tra biểu tượng ổ khóa trên thanh địa chỉ, cho phép Microphone rồi thử lại.");
    }
  };

  const stopRecording = () => {
    recorderRef.current?.state === "recording" && recorderRef.current.stop();
    recognitionRef.current?.stop();
    setRecording(false);
  };

  const clearRecording = () => {
    if (recordUrl) URL.revokeObjectURL(recordUrl);
    setRecordUrl(null);
    setTranscript("");
    setNotice("");
  };

  const playRecording = () => {
    if (!recordUrl) return;
    audioRef.current?.pause();
    const audio = new Audio(recordUrl);
    audioRef.current = audio;
    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
    void audio.play();
  };

  const feedback = transcript ? scoreTranscript(transcript, target) : null;

  return (
    <div className="speaking-practice">
      <div className="speaking-context"><b>Tình huống</b><p>{scenario}</p><ol>{checkpoints.map((item) => <li key={item}>{item}</li>)}</ol></div>
      <div className="recording-row">
        {!recording ? (
          <button className="record-button" onClick={startRecording}><Mic size={18} /> Bắt đầu ghi âm</button>
        ) : (
          <button className="record-button record-button--active" onClick={stopRecording}><Square size={16} fill="currentColor" /> Dừng ghi</button>
        )}
        <button className="mini-action" onClick={playRecording} disabled={!recordUrl} aria-label="Nghe lại bản ghi">
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button className="mini-action" onClick={clearRecording} disabled={!recordUrl && !transcript} aria-label="Xóa bản ghi"><Trash2 size={16} /></button>
      </div>
      {notice && <p className="status-message">{notice}</p>}
      <label className="transcript-input">
        <span>Transcript hoặc tự nhập câu bạn đã nói</span>
        <input value={transcript} onChange={(event) => setTranscript(event.target.value)} placeholder="Ví dụ: 你好，我叫安" lang="zh-CN" />
      </label>
      {feedback && (
        <div className="speech-feedback">
          <div><strong>{feedback.score}% khớp nội dung</strong><span>Điểm luyện tập, không phải điểm thi chính thức.</span></div>
          {feedback.missing.length > 0 && <p>Cần nghe lại: <b lang="zh-CN">{feedback.missing.join(" ")}</b></p>}
          {feedback.extra.length > 0 && <p>Nhận diện thêm: <b lang="zh-CN">{feedback.extra.join(" ")}</b></p>}
          <button className="text-action" onClick={() => onCompleted(feedback.score, transcript)}>Lưu kết quả nói</button>
        </div>
      )}
    </div>
  );
}
