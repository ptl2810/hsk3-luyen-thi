/**
 * Mực Đỏ Thực Hành: Các helper Canvas chỉ nhận dữ liệu nguyên thủy/canvas đã guard;
 * tuyệt đối không giữ React SyntheticEvent để dùng bất đồng bộ.
 */
export interface Point { x: number; y: number }

export type CanvasPointTarget = Pick<HTMLCanvasElement, "width" | "height" | "getBoundingClientRect">;

export function getCanvasPoint(canvas: CanvasPointTarget | null | undefined, clientX: number, clientY: number): Point | null {
  if (!canvas || !Number.isFinite(clientX) || !Number.isFinite(clientY)) return null;
  const rect = canvas.getBoundingClientRect();
  if (!rect || rect.width <= 0 || rect.height <= 0) return null;
  return {
    x: (clientX - rect.left) * (canvas.width / rect.width),
    y: (clientY - rect.top) * (canvas.height / rect.height),
  };
}

export function appendCanvasPoint(stroke: Point[], point: Point): Point[] {
  const previous = stroke[stroke.length - 1];
  if (previous?.x === point.x && previous.y === point.y) return stroke;
  return [...stroke, point];
}

export function appendCompletedStroke(strokes: Point[][], activeStroke: Point[]): Point[][] {
  return activeStroke.length ? [...strokes, activeStroke] : strokes;
}
