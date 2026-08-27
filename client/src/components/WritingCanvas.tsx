/**
 * Mực Đỏ Thực Hành: Canvas nền giấy, ưu tiên thao tác chuột/cảm ứng/bút và chỉ phản hồi tự đối chiếu có căn cứ.
 */
import { Eraser, Eye, EyeOff, RotateCcw, Save, Undo2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { saveWritingPractice } from "@/lib/storage";

interface Point { x: number; y: number }
interface CharacterGuide { character: string; strokes: number; hint: string }

interface WritingCanvasProps {
  lessonId: string;
  guides: CharacterGuide[];
  onCompleted: () => void;
}

export function WritingCanvas({ lessonId, guides, onCompleted }: WritingCanvasProps) {
  const [selected, setSelected] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const [lineWidth, setLineWidth] = useState(6);
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [activeStroke, setActiveStroke] = useState<Point[] | null>(null);
  const [notice, setNotice] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const guide = guides[selected];

  const drawPath = (context: CanvasRenderingContext2D, path: Point[], color = "#20211e", width = lineWidth) => {
    if (!path.length) return;
    context.beginPath();
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = width;
    context.strokeStyle = color;
    context.moveTo(path[0].x, path[0].y);
    path.slice(1).forEach((point) => context.lineTo(point.x, point.y));
    path.length === 1 && context.lineTo(path[0].x + 0.01, path[0].y + 0.01);
    context.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#fffdf8";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#aab8b6";
    context.setLineDash([7, 8]);
    context.lineWidth = 1;
    context.strokeRect(28, 26, canvas.width - 56, canvas.height - 52);
    context.beginPath();
    context.moveTo(canvas.width / 2, 26); context.lineTo(canvas.width / 2, canvas.height - 26);
    context.moveTo(28, canvas.height / 2); context.lineTo(canvas.width - 28, canvas.height / 2);
    context.stroke();
    context.setLineDash([]);
    if (showGuide) {
      context.globalAlpha = 0.12;
      context.fillStyle = "#d84727";
      context.font = "250px 'Noto Serif SC', serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(guide.character, canvas.width / 2, canvas.height / 2 + 8);
      context.globalAlpha = 1;
    }
    strokes.forEach((stroke) => drawPath(context, stroke));
    if (activeStroke) drawPath(context, activeStroke);
  }, [strokes, activeStroke, showGuide, lineWidth, guide.character]);

  const pointFromEvent = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * (720 / rect.width), y: (event.clientY - rect.top) * (400 / rect.height) };
  };

  const startStroke = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setActiveStroke([pointFromEvent(event)]);
  };
  const moveStroke = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!activeStroke) return;
    event.preventDefault();
    setActiveStroke((previous) => previous ? [...previous, pointFromEvent(event)] : previous);
  };
  const endStroke = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!activeStroke) return;
    event.preventDefault();
    setStrokes((previous) => [...previous, activeStroke]);
    setActiveStroke(null);
  };

  const savePractice = async () => {
    const image = canvasRef.current?.toDataURL("image/png");
    if (!image || !strokes.length) {
      setNotice("Hãy viết ít nhất một nét trước khi lưu bài luyện.");
      return;
    }
    try {
      await saveWritingPractice(lessonId, image);
      setNotice(`Đã lưu ${strokes.length} nét cho chữ ${guide.character}. Kết quả là “đang luyện”: hãy tự đối chiếu nét mẫu.`);
      onCompleted();
    } catch {
      setNotice("Nét viết vẫn hiển thị trong phiên này nhưng chưa thể lưu lâu dài trên trình duyệt hiện tại.");
    }
  };

  return (
    <div className="writing-canvas">
      <div className="character-switcher" aria-label="Chọn chữ mẫu">
        {guides.map((item, index) => <button key={item.character} className={selected === index ? "is-selected" : ""} onClick={() => { setSelected(index); setStrokes([]); setActiveStroke(null); }} lang="zh-CN">{item.character}</button>)}
      </div>
      <div className="canvas-meta"><span lang="zh-CN">{guide.character}</span><p><b>{guide.strokes} nét.</b> {guide.hint}</p></div>
      <canvas ref={canvasRef} width={720} height={400} className="practice-surface" onPointerDown={startStroke} onPointerMove={moveStroke} onPointerUp={endStroke} onPointerCancel={endStroke} />
      <div className="canvas-controls">
        <button className="mini-action" onClick={() => setStrokes((items) => items.slice(0, -1))} disabled={!strokes.length}><Undo2 size={16} /> Hoàn tác</button>
        <button className="mini-action" onClick={() => setStrokes([])} disabled={!strokes.length}><Eraser size={16} /> Xóa</button>
        <button className="mini-action" onClick={() => setShowGuide((visible) => !visible)}>{showGuide ? <EyeOff size={16} /> : <Eye size={16} />}{showGuide ? " Ẩn mẫu" : " Xem mẫu"}</button>
        <label className="line-width">Nét <input type="range" min="3" max="13" value={lineWidth} onChange={(event) => setLineWidth(Number(event.target.value))} /></label>
        <button className="mini-action" onClick={() => { setStrokes([]); setActiveStroke(null); }}><RotateCcw size={16} /> Viết lại</button>
        <button className="save-writing" onClick={savePractice}><Save size={16} /> Lưu bài luyện</button>
      </div>
      {notice && <p className="status-message">{notice}</p>}
    </div>
  );
}

