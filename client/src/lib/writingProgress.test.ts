import { describe, expect, it } from "vitest";
import { defaultProgress } from "./storage";
import { recordWritingPractice, recordWritingTaskAttempt } from "./writingProgress";

describe("writing progress", () => {
  const practice = { id: "practice-1", lessonId: "w01-s01", character: "你", strokeCount: 3, savedAt: "2026-08-27T13:15:00.000Z", status: "practice-saved" as const };
  const attempt = (score: number) => ({ exerciseId: "w01-s01-writing-sentence", lessonId: "w01-s01", skill: "writing" as const, answer: score ? "我叫安" : "我安叫", correctAnswer: "我叫安", score, explanation: "Sắp xếp theo mẫu.", questionType: "writing" as const });

  it("lưu lượt luyện nét chỉ lưu metadata, không hoàn thành kỹ năng Viết hay tự tạo điểm", () => {
    const next = recordWritingPractice(defaultProgress(), practice);
    expect(next.writingPracticeSummaries[practice.lessonId]).toEqual(practice);
    expect(next.completedSections[practice.lessonId]).toBeUndefined();
    expect(next.skills.writing).toEqual({ lastScore: 0, average: 0, attempts: 0 });
  });

  it("câu sai lưu attempt thật nhưng không hoàn thành; câu đúng mới hoàn thành kỹ năng Viết", () => {
    const afterWrong = recordWritingTaskAttempt(defaultProgress(), attempt(0), "2026-08-27T13:16:00.000Z");
    expect(afterWrong.exerciseResults).toHaveLength(1);
    expect(afterWrong.skills.writing).toEqual({ lastScore: 0, average: 0, attempts: 1 });
    expect(afterWrong.completedSections["w01-s01"]).toBeUndefined();
    const afterCorrect = recordWritingTaskAttempt(afterWrong, attempt(100), "2026-08-27T13:17:00.000Z");
    expect(afterCorrect.exerciseResults).toHaveLength(2);
    expect(afterCorrect.completedSections["w01-s01"]).toContain("writing");
    expect(afterCorrect.skills.writing).toEqual({ lastScore: 100, average: 50, attempts: 2 });
  });
});
