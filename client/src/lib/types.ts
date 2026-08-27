/**
 * Mực Đỏ Thực Hành: Schema version 2 tách nội dung, câu hỏi và media khỏi giao diện;
 * audio học chính thức luôn được mô tả bằng manifest tệp, không dựa vào TTS thiết bị.
 */
export type SkillId = "listening" | "speaking" | "reading" | "writing";

export type LessonStatus = "not-started" | "in-progress" | "complete" | "review";
export type MediaStatus = "available" | "planned";

export interface VocabularyWord {
  id: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  partOfSpeech: string;
  example: string;
  exampleMeaning: string;
  audioAssetId?: string;
}

export type AudioAssetKind = "tone-drill" | "vocabulary" | "reading-practice" | "reading" | "listening";
export type AudioReviewStatus = "generated-technical-verified" | "pending-human-review";

export interface AudioAsset {
  id: string;
  kind: AudioAssetKind;
  lessonId?: string;
  spokenTextHanzi: string;
  displayPinyin: string;
  translation: string;
  fileName: string;
  src: string;
  durationSeconds: number;
  sha256: string;
  source: "neural-tts-generated" | "recorded-original";
  voice: string;
  reviewStatus: AudioReviewStatus;
}

export interface WritingPracticeSummary {
  id: string;
  lessonId: string;
  character: string;
  strokeCount: number;
  savedAt: string;
  status: "practice-saved";
}

export interface WritingPracticeRecord extends WritingPracticeSummary {
  imageData: string;
}

export interface ChoiceOption {
  id: string;
  label: string;
}

export interface ChoiceQuestion {
  id: string;
  prompt: string;
  options: ChoiceOption[];
  answer: string;
  explanation: string;
}

export interface ListeningContent {
  audioSrc: string | null;
  transcript: string;
  pinyin: string;
  translation: string;
  questions: ChoiceQuestion[];
}

export interface SpeakingContent {
  target: string;
  pinyin: string;
  translation: string;
  scenario: string;
  checkpoints: string[];
  variations: Array<{ hanzi: string; pinyin: string; translation: string }>;
}

export interface ReadingContent {
  passage: string;
  pinyin: string;
  translation: string;
  audioAssetId?: string;
  hints: Array<{ hanzi: string; pinyin: string; meaning: string }>;
  questions: ChoiceQuestion[];
}

export interface WritingContent {
  characters: Array<{ character: string; strokes?: number; hint: string }>;
  sentenceTask: { prompt: string; wordBank: string[]; answer: string; explanation: string };
  fillBlankTask: { prompt: string; sentence: string; answer: string; explanation: string };
}

export interface LessonMedia {
  audioId: string;
  videoId: string | null;
  posterSrc: string | null;
  videoSrc: string | null;
  captionsSrc: string | null;
}

export interface VideoContext {
  id: string;
  week: number;
  title: string;
  durationSeconds: number;
  posterSrc: string | null;
  videoSrc: string | null;
  captionsSrc: string | null;
  captionsText: string;
  transcript: { hanzi: string; pinyin: string; translation: string };
  question: ChoiceQuestion;
  status: MediaStatus;
  rights: string;
  externalSource?: {
    provider: "youtube" | "tiktok";
    sourceUrl: string;
    videoId: string;
    embedUrl: string;
    channel: string;
    sourceTitle: string;
    display: "external-link" | "embed";
    specificity: "specific-video";
    checkedAt: string;
    note: string;
  };
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
    positiveExample: string;
    commonMistake: string;
  };
  vocabulary: VocabularyWord[];
  listening: ListeningContent;
  speaking: SpeakingContent;
  reading: ReadingContent;
  writing: WritingContent;
  /** Giữ alias để component cũ có thể nâng cấp dần mà không mất dữ liệu canvas. */
  writingCharacters: Array<{ character: string; strokes?: number; hint: string }>;
  media: LessonMedia;
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
  questionType?: "listening" | "reading" | "writing" | "speaking" | "mock-test";
}

export interface AppSettings {
  showPinyin: boolean;
  showTranslation: boolean;
  speechRate: number;
  volume: number;
  compactMode: boolean;
}

export interface LearningProgress {
  schemaVersion: 2;
  currentLessonId: string | null;
  currentSection: SkillId;
  completedLessonIds: string[];
  completedSections: Record<string, SkillId[]>;
  exerciseResults: ExerciseResult[];
  difficultWordIds: string[];
  skills: Record<SkillId, SkillRecord>;
  totalMinutes: number;
  streakDays: number;
  lastStudiedAt: string | null;
  audioPlayCounts: Record<string, number>;
  reviewedWordIds: string[];
  /** Chỉ metadata sao lưu JSON; ảnh nét viết tiếp tục ở IndexedDB của thiết bị hiện tại. */
  writingPracticeSummaries: Record<string, WritingPracticeSummary>;
  settings: AppSettings;
}

export const SKILL_META: Record<SkillId, { label: string; short: string; color: string; description: string }> = {
  listening: { label: "Nghe", short: "N", color: "blue", description: "Nhận diện âm, thanh điệu và ý chính." },
  speaking: { label: "Nói", short: "N", color: "jade", description: "Nghe mẫu, ghi âm và tự đối chiếu." },
  reading: { label: "Đọc", short: "Đ", color: "ochre", description: "Đọc chữ Hán theo ngữ cảnh có hỗ trợ." },
  writing: { label: "Viết", short: "V", color: "plum", description: "Luyện nét, chữ mẫu và câu ngắn." },
};
