/** Mực Đỏ Thực Hành: Cấu hình thi thử lấy câu hỏi theo lesson, phản ánh ba phần nghe–đọc–viết. */
import { lessons } from "./courseData";
import type { ChoiceQuestion, SkillId } from "@/lib/types";

export interface MockTestItem {
  id: string;
  lessonId: string;
  skill: Extract<SkillId, "listening" | "reading" | "writing">;
  prompt: string;
  correctAnswer: string;
  explanation: string;
  question?: ChoiceQuestion;
}

export interface MockTestConfig {
  id: string;
  label: string;
  description: string;
  durationSeconds: number;
  listeningCount: number;
  readingCount: number;
  writingCount: number;
  questions: MockTestItem[];
}

const listeningItems = lessons.flatMap((lesson) => lesson.listening.questions.map((question) => ({ id: `mock-${question.id}`, lessonId: lesson.id, skill: "listening" as const, prompt: question.prompt, correctAnswer: question.answer, explanation: question.explanation, question })));
const readingItems = lessons.flatMap((lesson) => lesson.reading.questions.map((question) => ({ id: `mock-${question.id}`, lessonId: lesson.id, skill: "reading" as const, prompt: question.prompt, correctAnswer: question.answer, explanation: question.explanation, question })));
const writingItems = lessons.map((lesson) => ({ id: `mock-${lesson.id}-writing`, lessonId: lesson.id, skill: "writing" as const, prompt: lesson.writing.sentenceTask.prompt, correctAnswer: lesson.writing.sentenceTask.answer, explanation: lesson.writing.sentenceTask.explanation }));

function config(id: string, label: string, description: string, durationSeconds: number, listeningCount: number, readingCount: number, writingCount: number, offset = 0): MockTestConfig {
  return { id, label, description, durationSeconds, listeningCount, readingCount, writingCount, questions: [...listeningItems.slice(offset, offset + listeningCount), ...readingItems.slice(offset, offset + readingCount), ...writingItems.slice(Math.floor(offset / 2), Math.floor(offset / 2) + writingCount)] };
}

export const mockTests: MockTestConfig[] = [
  config("mini-w04", "Mini test · tuần 4", "10 câu để kiểm tra nền phát âm và giao tiếp đầu khóa.", 12 * 60, 4, 4, 2),
  config("mini-w08", "Mini test · tuần 8", "10 câu để ôn sinh hoạt, gọi món và mua sắm.", 12 * 60, 4, 4, 2, 16),
  config("mini-w12", "Mini test · tuần 12", "10 câu về sức khỏe, giao thông và hỏi đường.", 12 * 60, 4, 4, 2, 32),
  config("partial-w18", "Đề bán phần · tuần 18", "40 câu để kiểm tra tốc độ làm ba kỹ năng nghe, đọc và viết.", 42 * 60, 20, 15, 5, 50),
  config("full-w24", "Mô phỏng HSK3 · tuần 24", "80 câu ở ba phần nghe, đọc, viết; 85 phút làm bài. Nói là bài luyện bổ sung, không thuộc bài thi chuẩn.", 85 * 60, 40, 30, 10, 0),
];
