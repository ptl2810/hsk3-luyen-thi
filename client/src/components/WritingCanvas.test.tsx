// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const { saveWritingPracticeMock } = vi.hoisted(() => ({ saveWritingPracticeMock: vi.fn() }));
vi.mock("@/lib/storage", () => ({ saveWritingPractice: saveWritingPracticeMock }));

import { WritingCanvas } from "./WritingCanvas";

const context = {
  clearRect: vi.fn(), fillRect: vi.fn(), strokeRect: vi.fn(), beginPath: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(), stroke: vi.fn(), setLineDash: vi.fn(), fillText: vi.fn(),
  globalAlpha: 1, fillStyle: "", strokeStyle: "", lineWidth: 1, font: "", textAlign: "", textBaseline: "", lineCap: "", lineJoin: "",
};
const guides = [{ character: "你", strokes: 7, hint: "Bộ nhân đứng ở trái." }, { character: "好", strokes: 6, hint: "Nữ ở trái, tử ở phải." }];

function renderCanvas(overrides: Partial<React.ComponentProps<typeof WritingCanvas>> = {}) {
  const onPracticeSaved = vi.fn();
  const onProceedToSentence = vi.fn();
  render(<WritingCanvas lessonId="w01-s01" guides={guides} onPracticeSaved={onPracticeSaved} onProceedToSentence={onProceedToSentence} {...overrides} />);
  return { onPracticeSaved, onProceedToSentence, canvas: screen.getByLabelText("Ô luyện viết chữ 你") };
}

function drawOneStroke(canvas: HTMLElement, pointerType = "mouse") {
  fireEvent.pointerDown(canvas, { clientX: 10, clientY: 20, pointerId: 9, pointerType });
  fireEvent.pointerMove(canvas, { clientX: 90, clientY: 80, pointerId: 9, pointerType });
  fireEvent.pointerMove(canvas, { clientX: 150, clientY: 140, pointerId: 9, pointerType });
  fireEvent.pointerUp(canvas, { clientX: 190, clientY: 160, pointerId: 9, pointerType });
}

beforeAll(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, "getContext", { configurable: true, value: vi.fn(() => context) });
  Object.defineProperty(HTMLCanvasElement.prototype, "getBoundingClientRect", { configurable: true, value: vi.fn(() => ({ left: 10, top: 20, width: 360, height: 200 })) });
  Object.defineProperty(HTMLCanvasElement.prototype, "toDataURL", { configurable: true, value: vi.fn(() => "data:image/png;base64,canvas") });
  Object.defineProperty(HTMLCanvasElement.prototype, "setPointerCapture", { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLCanvasElement.prototype, "hasPointerCapture", { configurable: true, value: vi.fn(() => true) });
  Object.defineProperty(HTMLCanvasElement.prototype, "releasePointerCapture", { configurable: true, value: vi.fn() });
});

beforeEach(() => {
  saveWritingPracticeMock.mockReset();
  saveWritingPracticeMock.mockResolvedValue({ id: "practice-1", lessonId: "w01-s01", character: "你", strokeCount: 1, savedAt: "2026-08-27T13:20:00.000Z", status: "practice-saved" });
});
afterEach(cleanup);

describe("WritingCanvas", () => {
  it("vẽ chuột theo chuỗi pointer và lưu thành công chỉ sau transaction hoàn tất", async () => {
    const { canvas, onPracticeSaved } = renderCanvas();
    expect(screen.getByText("Chưa có nét nào.")).toBeTruthy();
    expect(screen.getByRole("button", { name: /lưu bài luyện/i })).toHaveProperty("disabled", true);
    drawOneStroke(canvas);
    expect(screen.getByText("Đã có 1 nét, chưa lưu.")).toBeTruthy();
    const save = screen.getByRole("button", { name: /lưu bài luyện/i });
    expect(save).toHaveProperty("disabled", false);
    fireEvent.click(save);
    await waitFor(() => expect(onPracticeSaved).toHaveBeenCalledTimes(1));
    expect(saveWritingPracticeMock).toHaveBeenCalledWith(expect.objectContaining({ lessonId: "w01-s01", character: "你", strokeCount: 1 }));
    expect(screen.getByText(/Đã lưu lượt luyện chữ/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /sang chấm câu/i }));
  });

  it("hoàn tất một nét khi pointer bị cancel hoặc mất capture, kể cả thao tác touch", () => {
    const { canvas } = renderCanvas();
    fireEvent.pointerDown(canvas, { clientX: 12, clientY: 22, pointerId: 5, pointerType: "touch" });
    fireEvent.pointerMove(canvas, { clientX: 80, clientY: 90, pointerId: 5, pointerType: "touch" });
    fireEvent.pointerCancel(canvas, { pointerId: 5, pointerType: "touch" });
    expect(screen.getByText("Đã có 1 nét, chưa lưu.")).toBeTruthy();
    fireEvent.pointerDown(canvas, { clientX: 20, clientY: 25, pointerId: 6, pointerType: "pen" });
    fireEvent.lostPointerCapture(canvas, { pointerId: 6, pointerType: "pen" });
    expect(screen.getByText("Đã có 2 nét, chưa lưu.")).toBeTruthy();
  });

  it("giữ nét trong phiên khi lưu lỗi và reset trạng thái khi đổi chữ mẫu", async () => {
    saveWritingPracticeMock.mockRejectedValueOnce(new Error("IndexedDB failed"));
    const { canvas, onPracticeSaved } = renderCanvas();
    drawOneStroke(canvas);
    fireEvent.click(screen.getByRole("button", { name: /lưu bài luyện/i }));
    expect((await screen.findByRole("alert")).textContent).toContain("Chưa lưu được lượt luyện nét.");
    expect(onPracticeSaved).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "好" }));
    expect(screen.getByText("Chưa có nét nào.")).toBeTruthy();
    expect(screen.getByLabelText("Ô luyện viết chữ 好")).toBeTruthy();
  });
});
