import { describe, expect, it } from "vitest";
import { calculateLessonCompletion, getNextLesson, normalizeChinese, scoreTranscript } from "./assessment";
import { createBackup, defaultProgress, parseBackup } from "./storage";
import { audioManifest, getLessonById, lessons, videoManifest } from "@/data/courseData";
import { mockTests } from "@/data/mockTests";

describe("assessment", () => {
  it("chuẩn hóa câu tiếng Hoa trước khi so sánh", () => expect(normalizeChinese("你 好， 我 叫 安。 ")).toBe("你好我叫安"));
  it("phản hồi phần câu nói bị thiếu", () => { const result = scoreTranscript("你好", "你好我叫安"); expect(result.score).toBe(40); expect(result.missing).toEqual(["我", "叫", "安"]); });
  it("tính đúng tỷ lệ bốn kỹ năng hoàn thành", () => { const progress = defaultProgress(); progress.completedSections["w01-s01"] = ["listening", "reading"]; expect(calculateLessonCompletion(progress, "w01-s01")).toBe(50); });
});

describe("catalog 24 tuần", () => {
  it("có đủ 144 lesson và mỗi tuần có sáu buổi", () => { expect(lessons).toHaveLength(144); for (let week = 1; week <= 24; week += 1) expect(lessons.filter((lesson) => lesson.week === week)).toHaveLength(6); });
  it("mỗi lesson có các trường học tập bắt buộc và không có hoạt động rỗng", () => {
    for (const lesson of lessons) {
      expect(getLessonById(lesson.id)).toEqual(lesson);
      expect(lesson.duration).toBe(60); expect(lesson.goal).not.toHaveLength(0); expect(lesson.vocabulary.length).toBeGreaterThanOrEqual(5); expect(lesson.vocabulary.length).toBeLessThanOrEqual(8);
      expect(lesson.listening.transcript).not.toHaveLength(0); expect(lesson.listening.questions.length).toBeGreaterThanOrEqual(2); expect(lesson.speaking.target).not.toHaveLength(0);
      expect(lesson.reading.passage).not.toHaveLength(0); expect(lesson.reading.questions.length).toBeGreaterThanOrEqual(2); expect(lesson.writing.characters.length).toBeGreaterThanOrEqual(3); expect(lesson.writing.characters.length).toBeLessThanOrEqual(5); expect(lesson.writing.sentenceTask.answer).not.toHaveLength(0);
    }
  });
  it("có ID từ vựng duy nhất toàn khóa và đáp án nghe/đọc nhất quán với lựa chọn", () => {
    const wordIds = lessons.flatMap((lesson) => lesson.vocabulary.map((word) => word.id)); expect(new Set(wordIds).size).toBe(wordIds.length);
    for (const question of lessons.flatMap((lesson) => [...lesson.listening.questions, ...lesson.reading.questions])) expect(question.options.some((option) => option.id === question.answer)).toBe(true);
  });
  it("có manifest audio theo 144 lesson, manifest video theo 24 tuần, asset thật và nguồn ngoài minh bạch", () => { expect(audioManifest).toHaveLength(144); expect(videoManifest).toHaveLength(24); expect(audioManifest.some((audio) => audio.status === "available")).toBe(true); expect(videoManifest.some((video) => video.status === "available" && video.videoSrc && video.captionsSrc)).toBe(true); expect(videoManifest.every((video) => video.externalSource?.sourceUrl.startsWith("https://"))).toBe(true); expect(videoManifest.every((video) => video.externalSource?.channel && video.externalSource.checkedAt)).toBe(true); });
  it("có ba mini test, đề bán phần và mô phỏng 80 câu/85 phút ở tuần 24", () => { const full = mockTests.find((test) => test.id === "full-w24"); expect(mockTests).toHaveLength(5); expect(full?.questions).toHaveLength(80); expect(full?.durationSeconds).toBe(85 * 60); expect(full?.listeningCount).toBe(40); expect(full?.readingCount).toBe(30); expect(full?.writingCount).toBe(10); });
});

describe("tiến độ và sao lưu", () => {
  it("bắt đầu với tiến độ trống, không có điểm hoặc chuỗi ngày giả", () => { const progress = defaultProgress(); expect(progress.currentLessonId).toBeNull(); expect(progress.completedLessonIds).toEqual([]); expect(progress.totalMinutes).toBe(0); expect(progress.streakDays).toBe(0); expect(Object.values(progress.skills).every((record) => record.attempts === 0 && record.lastScore === 0)).toBe(true); });
  it("xuất và nhập backup v2 không mất cấu trúc tiến độ", () => { const progress = defaultProgress(); progress.currentLessonId = "w08-s02"; progress.totalMinutes = 120; const restored = parseBackup(createBackup(progress)); expect(restored.totalMinutes).toBe(120); expect(restored.currentLessonId).toBe("w08-s02"); expect(restored.schemaVersion).toBe(2); });
  it("ưu tiên lesson đang dở, sau đó tìm lesson chưa hoàn thành đầu tiên", () => { const progress = defaultProgress(); progress.currentLessonId = "w01-s02"; expect(getNextLesson(lessons, progress).id).toBe("w01-s02"); progress.completedSections["w01-s02"] = ["listening", "speaking", "reading", "writing"]; expect(getNextLesson(lessons, progress).id).toBe("w01-s01"); });
});
