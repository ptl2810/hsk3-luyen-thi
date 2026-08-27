/**
 * Mực Đỏ Thực Hành: Canvas giấy gạo chỉ lưu lượt luyện nét; việc chấm “đạt” thuộc nhiệm vụ câu có đáp án.
 * Pointer Event được quy đổi đồng bộ thành Point trước mọi cập nhật state để không giữ SyntheticEvent quá hạn.
 */
import { CheckCircle2, CircleAlert, Eraser, Eye, EyeOff, PenLine, RotateCcw, Save, Undo2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { saveWritingPractice } from "@/lib/storage";
import { appendCanvasPoint, appendCompletedStroke, getCanvasPoint, type Point } from "@/lib/writingCanvas";
import type { WritingPracticeSummary } from "@/lib/types";

interface CharacterGuide { character: string; strokes?: number; hint: string }
type PracticeState = "empty" | "dirty" | "saving" | "saved" | "error";

interface WritingCanvasProps {
  lessonId: string;
  guides: CharacterGuide[];
  lastSavedSummary?: WritingPracticeSummary;
  onPracticeSaved: (summary: WritingPracticeSummary) => void;
  onProceedToSentence: () => void;
}

function formatSavedTime(savedAt: string) {
  return new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit" }).format(new Date(savedAt));
}

export function WritingCanvas({ lessonId, guides, lastSavedSummary, onPracticeSaved, onProceedToSentence }: WritingCanvasProps) {
  const [selected, setSelected] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const [lineWidth, setLineWidth] = useState(6);
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [activeStroke, setActiveStroke] = useState<Point[] | null>(null);
  const [practiceState, setPracticeState] = useState<PracticeState>(lastSavedSummary ? "saved" : "empty");
  const [savedSummary, setSavedSummary] = useState<WritingPracticeSummary | undefined>(lastSavedSummary);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const activeStrokeRef = useRef<Point[]>([]);
  const strokesRef = useRef<Point[][]>([]);
  const activePointerIdRef = useRef<number | null>(null);
  const nextActionRef = useRef<HTMLButtonElement | null>(null);
  const guide = guides[selected] ?? null;
  const displayedStrokeCount = strokes.length + (activeStroke?.length ? 1 : 0);

  const drawPath = (context: CanvasRenderingContext2D, path: Point[], color = "#20211e", width = lineWidth) => {
    if (!path.length) return;
    context.beginPath();
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = width;
    context.strokeStyle = color;
    context.moveTo(path[0].x, path[0].y);
    path.slice(1).forEach((point) => context.lineTo(point.x, point.y));
    if (path.length === 1) context.lineTo(path[0].x + 0.01, path[0].y + 0.01);
    context.stroke();
  };

  useEffect(() => {
    if (selected >= guides.length && guides.length) setSelected(0);
  }, [guides.length, selected]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !guide) return;
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
  }, [activeStroke, guide, lineWidth, showGuide, strokes]);

  const setDirty = () => {
    setPracticeState("dirty");
    setSavedSummary(undefined);
  };

  const releasePointer = (canvas: HTMLCanvasElement, pointerId: number) => {
    try {
      if (canvas.hasPointerCapture(pointerId)) canvas.releasePointerCapture(pointerId);
    } catch {
      // Một số trình duyệt đã tự nhả capture sau pointerup; không cần báo lỗi cho người học.
    }
  };

  const commitPoint = (point: Point) => {
    const nextStroke = appendCanvasPoint(activeStrokeRef.current, point);
    if (nextStroke === activeStrokeRef.current) return;
    activeStrokeRef.current = nextStroke;
    setActiveStroke(nextStroke);
  };

  const finalizeStroke = (canvas: HTMLCanvasElement | null, pointerId: number) => {
    if (!isDrawingRef.current || activePointerIdRef.current !== pointerId) return;
    const completedStroke = activeStrokeRef.current;
    isDrawingRef.current = false;
    activePointerIdRef.current = null;
    activeStrokeRef.current = [];
    if (completedStroke.length) {
      setStrokes((previous) => {
        const next = appendCompletedStroke(previous, completedStroke);
        strokesRef.current = next;
        return next;
      });
      setDirty();
    }
    setActiveStroke(null);
    if (canvas) releasePointer(canvas, pointerId);
  };

  const startStroke = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const { clientX, clientY, pointerId, pointerType } = event;
    const canvas = canvasRef.current;
    if (!canvas || !guide) return;
    if (pointerType && !["mouse", "touch", "pen"].includes(pointerType)) return;
    const point = getCanvasPoint(canvas, clientX, clientY);
    if (!point) return;
    event.preventDefault();
    try { canvas.setPointerCapture(pointerId); } catch { /* vẫn có thể vẽ nếu trình duyệt không cấp capture */ }
    isDrawingRef.current = true;
    activePointerIdRef.current = pointerId;
    activeStrokeRef.current = [point];
    setActiveStroke([point]);
    setDirty();
  };

  const moveStroke = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const { clientX, clientY, pointerId, pointerType } = event;
    if (!isDrawingRef.current || activePointerIdRef.current !== pointerId) return;
    if (pointerType && !["mouse", "touch", "pen"].includes(pointerType)) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const point = getCanvasPoint(canvas, clientX, clientY);
    if (!point) return;
    event.preventDefault();
    commitPoint(point);
  };

  const endStroke = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const { clientX, clientY, pointerId, pointerType } = event;
    const canvas = canvasRef.current;
    if (!isDrawingRef.current || activePointerIdRef.current !== pointerId) return;
    if (pointerType && !["mouse", "touch", "pen"].includes(pointerType)) return;
    const point = getCanvasPoint(canvas, clientX, clientY);
    if (point) commitPoint(point);
    event.preventDefault();
    finalizeStroke(canvas, pointerId);
  };

  const cancelStroke = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const { pointerId, pointerType } = event;
    if (!isDrawingRef.current || activePointerIdRef.current !== pointerId) return;
    if (pointerType && !["mouse", "touch", "pen"].includes(pointerType)) return;
    event.preventDefault();
    finalizeStroke(canvasRef.current, pointerId);
  };

  const lostPointerCapture = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const { pointerType } = event;
    if (pointerType && !["mouse", "touch", "pen"].includes(pointerType)) return;
    finalizeStroke(canvasRef.current, event.pointerId);
  };

  const clearCurrentDrawing = () => {
    isDrawingRef.current = false;
    activePointerIdRef.current = null;
    activeStrokeRef.current = [];
    strokesRef.current = [];
    setStrokes([]);
    setActiveStroke(null);
    setPracticeState("empty");
    setSavedSummary(undefined);
  };

  const undoStroke = () => {
    const next = strokesRef.current.slice(0, -1);
    strokesRef.current = next;
    setStrokes(next);
    if (!next.length) setPracticeState("empty"); else setDirty();
  };

  const selectGuide = (index: number) => {
    clearCurrentDrawing();
    setSelected(index);
  };

  const savePractice = async () => {
    const canvas = canvasRef.current;
    const completedStrokes = strokesRef.current;
    if (!canvas || !guide || !completedStrokes.length) {
      setPracticeState("empty");
      return;
    }
    const imageData = canvas.toDataURL("image/png");
    setPracticeState("saving");
    try {
      const summary = await saveWritingPractice({ lessonId, character: guide.character, strokeCount: completedStrokes.length, imageData });
      setSavedSummary(summary);
      setPracticeState("saved");
      onPracticeSaved(summary);
      window.setTimeout(() => nextActionRef.current?.focus(), 0);
    } catch {
      setPracticeState("error");
    }
  };

  if (!guide) return <section className="writing-content-error" role="alert"><CircleAlert size={20} /><div><b>Không có chữ mẫu để luyện ở bài này.</b><p>Hãy quay lại lộ trình, mở lại bài hoặc chọn một lesson khác rồi thử lại.</p></div></section>;

  const status = practiceState === "saved" && savedSummary ? <div className="writing-status writing-status--saved" role="status" aria-live="polite"><CheckCircle2 size={21} /><div><b>Đã lưu lượt luyện chữ <span lang="zh-CN">{savedSummary.character}</span> lúc {formatSavedTime(savedSummary.savedAt)}.</b><p>{savedSummary.strokeCount} nét đã lưu trong thiết bị này. Đây là lượt luyện nét, không phải điểm đúng/sai chữ viết tay.</p></div><button ref={nextActionRef} className="mini-action" onClick={onProceedToSentence}>Sang chấm câu</button></div> : practiceState === "error" ? <div className="writing-status writing-status--error" role="alert"><CircleAlert size={21} /><div><b>Chưa lưu được lượt luyện nét.</b><p>Nét vẫn đang hiển thị trong phiên này. Hãy kiểm tra dung lượng/quyền lưu của trình duyệt rồi thử lại.</p></div><button className="mini-action" onClick={() => void savePractice()}>Thử lại</button></div> : practiceState === "saving" ? <div className="writing-status" role="status" aria-live="polite"><Save size={20} /><div><b>Đang lưu lượt luyện nét…</b><p>Giữ nguyên trang cho đến khi có xác nhận lưu.</p></div></div> : displayedStrokeCount ? <div className="writing-status writing-status--dirty" role="status" aria-live="polite"><PenLine size={20} /><div><b>Đã có {displayedStrokeCount} nét, chưa lưu.</b><p>Kiểm tra lại bố cục trong ô vuông rồi lưu lượt luyện. App không tự chấm đúng/sai nét chữ.</p></div></div> : <div className="writing-status" role="status" aria-live="polite"><PenLine size={20} /><div><b>Chưa có nét nào.</b><p>Viết ít nhất một nét để bắt đầu lượt luyện.</p></div></div>;

  return <div className="writing-canvas">
    <div className="character-switcher" aria-label="Chọn chữ mẫu">{guides.map((item, index) => <button key={item.character} type="button" className={selected === index ? "is-selected" : ""} onClick={() => selectGuide(index)} lang="zh-CN">{item.character}</button>)}</div>
    <div className="canvas-meta"><span lang="zh-CN">{guide.character}</span><p><b>{guide.strokes ? `${guide.strokes} nét.` : "Đang biên soạn số nét."}</b> {guide.hint}</p></div>
    <canvas ref={canvasRef} width={720} height={400} tabIndex={0} className="practice-surface" aria-label={`Ô luyện viết chữ ${guide.character}`} onPointerDown={startStroke} onPointerMove={moveStroke} onPointerUp={endStroke} onPointerCancel={cancelStroke} onLostPointerCapture={lostPointerCapture} />
    <div className="canvas-controls"><button type="button" className="mini-action" onClick={undoStroke} disabled={!strokes.length}><Undo2 size={16} /> Hoàn tác</button><button type="button" className="mini-action" onClick={clearCurrentDrawing} disabled={!displayedStrokeCount}><Eraser size={16} /> Xóa</button><button type="button" className="mini-action" onClick={() => setShowGuide((visible) => !visible)}>{showGuide ? <EyeOff size={16} /> : <Eye size={16} />}{showGuide ? " Ẩn mẫu" : " Xem mẫu"}</button><label className="line-width">Nét <input type="range" min="3" max="13" value={lineWidth} onChange={(event) => setLineWidth(Number(event.target.value))} /></label><button type="button" className="mini-action" onClick={clearCurrentDrawing}><RotateCcw size={16} /> Viết lại</button><button type="button" className="save-writing" onClick={() => void savePractice()} disabled={!strokes.length || practiceState === "saving"}><Save size={16} /> {practiceState === "saving" ? "Đang lưu…" : "Lưu bài luyện"}</button></div>
    {status}
  </div>;
}
