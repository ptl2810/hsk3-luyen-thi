/**
 * Mực Đỏ Thực Hành: Tiến độ v2 bắt đầu trống; backup lưu metadata luyện nét còn ảnh nằm ở IndexedDB thiết bị.
 */
import type { LearningProgress, SkillId, WritingPracticeRecord, WritingPracticeSummary } from "@/lib/types";

const PROGRESS_KEY = "hoa-ngu-180-progress-v1";
const DB_NAME = "hoa-ngu-180-media-v1";

type LegacyProgress = {
  schemaVersion?: number;
  currentLessonId?: string;
  currentSection?: SkillId;
  completedLessonIds?: string[];
  completedSections?: Record<string, SkillId[]>;
  exerciseResults?: LearningProgress["exerciseResults"];
  difficultWordIds?: string[];
  skills?: LearningProgress["skills"];
  totalMinutes?: number;
  streakDays?: number;
  lastStudiedAt?: string | null;
  writingPracticeSummaries?: Record<string, WritingPracticeSummary>;
  settings?: Partial<LearningProgress["settings"]>;
};

export const defaultProgress = (): LearningProgress => ({
  schemaVersion: 2,
  currentLessonId: null,
  currentSection: "listening",
  completedLessonIds: [],
  completedSections: {},
  exerciseResults: [],
  difficultWordIds: [],
  skills: {
    listening: { lastScore: 0, average: 0, attempts: 0 },
    speaking: { lastScore: 0, average: 0, attempts: 0 },
    reading: { lastScore: 0, average: 0, attempts: 0 },
    writing: { lastScore: 0, average: 0, attempts: 0 },
  },
  totalMinutes: 0,
  streakDays: 0,
  lastStudiedAt: null,
  audioPlayCounts: {},
  reviewedWordIds: [],
  writingPracticeSummaries: {},
  settings: { showPinyin: true, showTranslation: true, speechRate: 0.8, volume: 1, compactMode: false },
});

function migrateProgress(raw: LegacyProgress | LearningProgress): LearningProgress {
  const isLegacyDemo = raw.schemaVersion === 1 && raw.currentLessonId === "w01-s02" && raw.totalMinutes === 75 && raw.streakDays === 3 && raw.exerciseResults?.length === 0 && raw.completedLessonIds?.length === 1 && raw.completedLessonIds[0] === "w01-s01";
  if (isLegacyDemo) return defaultProgress();
  const base = defaultProgress();
  return {
    ...base,
    ...raw,
    schemaVersion: 2,
    currentLessonId: raw.currentLessonId ?? null,
    currentSection: raw.currentSection ?? "listening",
    completedLessonIds: raw.completedLessonIds ?? [],
    completedSections: raw.completedSections ?? {},
    exerciseResults: raw.exerciseResults ?? [],
    difficultWordIds: raw.difficultWordIds ?? [],
    skills: { ...base.skills, ...raw.skills },
    audioPlayCounts: "audioPlayCounts" in raw && raw.audioPlayCounts ? raw.audioPlayCounts : {},
    reviewedWordIds: "reviewedWordIds" in raw && raw.reviewedWordIds ? raw.reviewedWordIds : [],
    writingPracticeSummaries: "writingPracticeSummaries" in raw && raw.writingPracticeSummaries ? raw.writingPracticeSummaries : {},
    settings: { ...base.settings, ...raw.settings },
  };
}

export function loadProgress(): LearningProgress {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw) as LegacyProgress | LearningProgress;
    if (parsed.schemaVersion !== 1 && parsed.schemaVersion !== 2) return defaultProgress();
    return migrateProgress(parsed);
  } catch {
    return defaultProgress();
  }
}

export function persistProgress(progress: LearningProgress) {
  if (typeof window !== "undefined") window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function createBackup(progress: LearningProgress): string {
  return JSON.stringify({ schemaVersion: 2, exportedAt: new Date().toISOString(), progress }, null, 2);
}

export function parseBackup(text: string): LearningProgress {
  const parsed = JSON.parse(text) as { schemaVersion?: number; progress?: LegacyProgress | LearningProgress };
  if ((parsed.schemaVersion !== 1 && parsed.schemaVersion !== 2) || !parsed.progress) {
    throw new Error("Tệp sao lưu không đúng định dạng Hoa Ngữ 180 Ngày.");
  }
  return migrateProgress(parsed.progress);
}

function openMediaDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("records")) db.createObjectStore("records");
    };
    request.onsuccess = () => resolve(request.result);
  });
}

async function storeLargeData(key: string, value: Blob | string) {
  if (typeof window === "undefined" || !window.indexedDB) throw new Error("Trình duyệt này không hỗ trợ lưu media cục bộ.");
  const db = await openMediaDb();
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction("records", "readwrite");
    transaction.objectStore("records").put({ savedAt: new Date().toISOString(), value }, key);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

export async function saveAudioRecord(lessonId: string, blob: Blob) { return storeLargeData(`audio:${lessonId}:${Date.now()}`, blob); }
export async function saveWritingPractice(input: { lessonId: string; character: string; strokeCount: number; imageData: string }): Promise<WritingPracticeSummary> {
  if (typeof window === "undefined" || !window.indexedDB) throw new Error("Trình duyệt này không hỗ trợ lưu nét viết lâu dài.");
  const savedAt = new Date().toISOString();
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `writing-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const record: WritingPracticeRecord = { id, lessonId: input.lessonId, character: input.character, strokeCount: input.strokeCount, savedAt, imageData: input.imageData, status: "practice-saved" };
  const db = await openMediaDb();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction("records", "readwrite");
      transaction.objectStore("records").put(record, `writing:${record.id}`);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error ?? new Error("Không thể hoàn tất lưu nét viết."));
      transaction.onabort = () => reject(transaction.error ?? new Error("Lưu nét viết đã bị hủy."));
    });
    return { id: record.id, lessonId: record.lessonId, character: record.character, strokeCount: record.strokeCount, savedAt: record.savedAt, status: record.status };
  } finally {
    db.close();
  }
}
