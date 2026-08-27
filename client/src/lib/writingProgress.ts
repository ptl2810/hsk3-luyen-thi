/** Mực Đỏ Thực Hành: Lượt luyện nét và kết quả câu viết là hai tín hiệu tiến độ độc lập. */
import type { ExerciseResult, LearningProgress, WritingPracticeSummary } from "@/lib/types";

export function recordWritingPractice(progress: LearningProgress, summary: WritingPracticeSummary): LearningProgress {
  return {
    ...progress,
    currentLessonId: summary.lessonId,
    currentSection: "writing",
    lastStudiedAt: summary.savedAt,
    writingPracticeSummaries: { ...progress.writingPracticeSummaries, [summary.lessonId]: summary },
  };
}

export function recordWritingTaskAttempt(
  progress: LearningProgress,
  attempt: Omit<ExerciseResult, "attemptedAt">,
  attemptedAt = new Date().toISOString(),
): LearningProgress {
  const previous = progress.skills.writing;
  const attempts = previous.attempts + 1;
  const completed = new Set(progress.completedSections[attempt.lessonId] ?? []);
  const shouldComplete = attempt.score === 100;
  const wasCompleted = completed.has("writing");
  if (shouldComplete) completed.add("writing");
  const isLessonComplete = completed.size === 4;
  return {
    ...progress,
    currentLessonId: attempt.lessonId,
    currentSection: "writing",
    lastStudiedAt: attemptedAt,
    totalMinutes: progress.totalMinutes + (shouldComplete && !wasCompleted ? 15 : 0),
    completedSections: shouldComplete ? { ...progress.completedSections, [attempt.lessonId]: Array.from(completed) } : progress.completedSections,
    completedLessonIds: isLessonComplete && !progress.completedLessonIds.includes(attempt.lessonId) ? [...progress.completedLessonIds, attempt.lessonId] : progress.completedLessonIds,
    exerciseResults: [...progress.exerciseResults, { ...attempt, attemptedAt }].slice(-240),
    skills: {
      ...progress.skills,
      writing: {
        lastScore: attempt.score,
        attempts,
        average: Math.round(((previous.average * previous.attempts) + attempt.score) / attempts),
      },
    },
  };
}
