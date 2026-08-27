/**
 * Mực Đỏ Thực Hành: Kiểu dữ liệu giữ nội dung khóa học tách biệt với giao diện.
 */
export type SkillId = "listening" | "speaking" | "reading" | "writing";

export type LessonStatus = "not-started" | "in-progress" | "complete" | "review";

export interface VocabularyWord {
  id: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  partOfSpeech: string;
  example: string;
  exampleMeaning: string;
}

export interface Lesson {
  id: string;
  week: number;
  session: number;
  stage: string;
  title: string;
  shortTitle: string;
  duration: number;
  goal: string;
  warmup: string;
  chinese: string;
  pinyin: string;
  translation: string;
  grammar: {
    title: string;
    formula: string;
    explanation: string;
  };
  vocabulary: VocabularyWord[];
  writingCharacters: Array<{ character: string; strokes: number; hint: string }>;
  status?: LessonStatus;
}

export interface SkillRecord {
  lastScore: number;
  average: number;
  attempts: number;
}

export interface ExerciseResult {
  exerciseId: string;
  lessonId: string;
  skill: SkillId;
  answer: string;
  correctAnswer: string;
  score: number;
  explanation: string;
  attemptedAt: string;
}

export interface AppSettings {
  showPinyin: boolean;
  showTranslation: boolean;
  speechRate: number;
  volume: number;
  compactMode: boolean;
}

export interface LearningProgress {
  schemaVersion: 1;
  currentLessonId: string;
  currentSection: SkillId;
  completedLessonIds: string[];
  completedSections: Record<string, SkillId[]>;
  exerciseResults: ExerciseResult[];
  difficultWordIds: string[];
  skills: Record<SkillId, SkillRecord>;
  totalMinutes: number;
  streakDays: number;
  lastStudiedAt: string | null;
  settings: AppSettings;
}

export const SKILL_META: Record<
  SkillId,
  { label: string; short: string; color: string; description: string }
> = {
  listening: {
    label: "Nghe",
    short: "N",
    color: "blue",
    description: "Nhận diện âm, thanh điệu và ý chính.",
  },
  speaking: {
    label: "Nói",
    short: "N",
    color: "jade",
    description: "Nghe mẫu, ghi âm và tự đối chiếu.",
  },
  reading: {
    label: "Đọc",
    short: "Đ",
    color: "ochre",
    description: "Đọc chữ Hán theo ngữ cảnh có hỗ trợ.",
  },
  writing: {
    label: "Viết",
    short: "V",
    color: "plum",
    description: "Luyện nét, chữ mẫu và câu ngắn.",
  },
};

