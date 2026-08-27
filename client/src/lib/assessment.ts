/**
 * Mực Đỏ Thực Hành: Hàm chấm điểm và xác định bước học tiếp theo, độc lập với UI.
 */
import type { ExerciseResult, LearningProgress, Lesson, SkillId } from "@/lib/types";

export function normalizeChinese(input: string): string {
  return input
    .toLocaleLowerCase("zh-CN")
    .replace(/[，。！？、,.!?\s]/g, "")
    .trim();
}

export function scoreTranscript(transcript: string, target: string) {
  const spoken = normalizeChinese(transcript);
  const expected = normalizeChinese(target);
  const expectedCharacters = Array.from(expected);
  const spokenCharacters = Array.from(spoken);
  const missing = expectedCharacters.filter((character) => !spoken.includes(character));
  const extra = spokenCharacters.filter((character) => !expected.includes(character));
  const matched = expectedCharacters.filter((character) => spoken.includes(character)).length;
  const score = expected.length ? Math.round((matched / expected.length) * 100) : 0;
  return { score, missing, extra, isExact: spoken === expected };
}

export function calculateLessonCompletion(progress: LearningProgress, lessonId: string): number {
  const required: SkillId[] = ["listening", "speaking", "reading", "writing"];
  const completed = progress.completedSections[lessonId] ?? [];
  return Math.round((required.filter((skill) => completed.includes(skill)).length / required.length) * 100);
}

export function calculateCourseCompletion(progress: LearningProgress, lessons: Lesson[]): number {
  if (!lessons.length) return 0;
  const total = lessons.reduce((sum, lesson) => sum + calculateLessonCompletion(progress, lesson.id), 0);
  return Math.round(total / lessons.length);
}

export function getNextLesson(lessons: Lesson[], progress: LearningProgress): Lesson {
  const activeLesson = lessons.find((lesson) => lesson.id === progress.currentLessonId);
  if (activeLesson && calculateLessonCompletion(progress, activeLesson.id) < 100) return activeLesson;
  return lessons.find((lesson) => calculateLessonCompletion(progress, lesson.id) < 100) ?? lessons[0];
}

export function getWeakestSkill(progress: LearningProgress): SkillId {
  return (Object.entries(progress.skills) as Array<[SkillId, LearningProgress["skills"][SkillId]]>)
    .sort(([, a], [, b]) => a.lastScore - b.lastScore)[0][0];
}

export function getReviewItems(results: ExerciseResult[]) {
  return results
    .filter((result) => result.score < 100)
    .slice(-6)
    .reverse();
}

export function scoreMultipleChoice(answer: string, correctAnswer: string): number {
  return answer === correctAnswer ? 100 : 0;
}
