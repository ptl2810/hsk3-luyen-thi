import { describe, expect, it } from "vitest";
import { calculateLessonCompletion, getNextLesson, normalizeChinese, scoreTranscript } from "./assessment";
import { createBackup, defaultProgress, parseBackup } from "./storage";
import { sampleLessons } from "@/data/courseData";

describe("assessment", () => {
  it("chuẩn hóa câu tiếng Hoa trước khi so sánh", () => {
    expect(normalizeChinese("你 好， 我 叫 安。 ")).toBe("你好我叫安");
  });

  it("phản hồi phần câu nói bị thiếu", () => {
    const result = scoreTranscript("你好", "你好我叫安");
    expect(result.score).toBe(40);
    expect(result.missing).toEqual(["我", "叫", "安"]);
  });

  it("tính đúng tỷ lệ bốn kỹ năng hoàn thành", () => {
    const progress = defaultProgress();
    progress.completedSections["w01-s01"] = ["listening", "reading"];
    expect(calculateLessonCompletion(progress, "w01-s01")).toBe(50);
  });

  it("xuất và nhập lại backup mà không mất cấu trúc tiến độ", () => {
    const progress = defaultProgress();
    progress.totalMinutes = 120;
    const restored = parseBackup(createBackup(progress));
    expect(restored.totalMinutes).toBe(120);
    expect(restored.currentLessonId).toBe(progress.currentLessonId);
  });

  it("xác định bài cần học tiếp theo từ tiến độ đã lưu", () => {
    const progress = defaultProgress();
    progress.currentLessonId = "w03-s01";
    expect(getNextLesson(sampleLessons, progress).id).toBe("w03-s01");
  });
});
