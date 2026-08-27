import { describe, expect, it } from "vitest";
import { appendCanvasPoint, appendCompletedStroke, getCanvasPoint } from "./writingCanvas";

describe("writingCanvas helpers", () => {
  it("quy đổi đúng điểm khi kích thước CSS khác canvas backing store", () => {
    const canvas = { width: 720, height: 400, getBoundingClientRect: () => ({ left: 10, top: 20, width: 360, height: 200 }) };
    expect(getCanvasPoint(canvas, 190, 120)).toEqual({ x: 360, y: 200 });
  });

  it("trả null khi canvas không sẵn sàng hoặc vùng hiển thị có kích thước 0", () => {
    expect(getCanvasPoint(null, 10, 10)).toBeNull();
    expect(getCanvasPoint({ width: 720, height: 400, getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 200 }) }, 10, 10)).toBeNull();
    expect(getCanvasPoint({ width: 720, height: 400, getBoundingClientRect: () => ({ left: 0, top: 0, width: 360, height: 0 }) }, 10, 10)).toBeNull();
  });

  it("không tạo điểm trùng và không hoàn tất nét rỗng", () => {
    const initial = [{ x: 1, y: 2 }];
    expect(appendCanvasPoint(initial, { x: 1, y: 2 })).toBe(initial);
    expect(appendCanvasPoint(initial, { x: 3, y: 4 })).toEqual([{ x: 1, y: 2 }, { x: 3, y: 4 }]);
    expect(appendCompletedStroke([], [])).toEqual([]);
    expect(appendCompletedStroke([], initial)).toEqual([initial]);
  });
});
