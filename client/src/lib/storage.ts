/**
 * Mực Đỏ Thực Hành: Lưu tiến độ cục bộ có version; IndexedDB chỉ dành cho dữ liệu nặng như audio/nét viết.
 */
import type { LearningProgress, SkillId } from "@/lib/types";

const PROGRESS_KEY = "hoa-ngu-180-progress-v1";
const DB_NAME = "hoa-ngu-180-media-v1";

export const defaultProgress = (): LearningProgress => ({
  schemaVersion: 1,
  currentLessonId: "w01-s02",
  currentSection: "speaking",
  completedLessonIds: ["w01-s01"],
  completedSections: { "w01-s01": ["listening", "speaking", "reading", "writing"], "w01-s02": ["listening"] },
  exerciseResults: [],
  difficultWordIds: [],
  skills: {
    listening: { lastScore: 62, average: 62, attempts: 1 },
    speaking: { lastScore: 48, average: 48, attempts: 1 },
    reading: { lastScore: 76, average: 76, attempts: 1 },
    writing: { lastScore: 54, average: 54, attempts: 1 },
  },
  totalMinutes: 75,
  streakDays: 3,
  lastStudiedAt: null,
  settings: { showPinyin: true, showTranslation: true, speechRate: 0.8, volume: 1, compactMode: false },
});

export function loadProgress(): LearningProgress {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw) as LearningProgress;
    if (parsed.schemaVersion !== 1) return defaultProgress();
    return { ...defaultProgress(), ...parsed, settings: { ...defaultProgress().settings, ...parsed.settings } };
  } catch {
    return defaultProgress();
  }
}

export function persistProgress(progress: LearningProgress) {
  if (typeof window !== "undefined") window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function createBackup(progress: LearningProgress): string {
  return JSON.stringify({ schemaVersion: 1, exportedAt: new Date().toISOString(), progress }, null, 2);
}

export function parseBackup(text: string): LearningProgress {
  const parsed = JSON.parse(text) as { schemaVersion?: number; progress?: LearningProgress };
  if (parsed.schemaVersion !== 1 || !parsed.progress || parsed.progress.schemaVersion !== 1) {
    throw new Error("Tệp sao lưu không đúng định dạng Hoa Ngữ 180 Ngày phiên bản 1.");
  }
  return { ...defaultProgress(), ...parsed.progress, settings: { ...defaultProgress().settings, ...parsed.progress.settings } };
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
  if (typeof window === "undefined" || !window.indexedDB) return;
  const db = await openMediaDb();
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction("records", "readwrite");
    transaction.objectStore("records").put({ savedAt: new Date().toISOString(), value }, key);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

export async function saveAudioRecord(lessonId: string, blob: Blob) {
  return storeLargeData(`audio:${lessonId}:${Date.now()}`, blob);
}

export async function saveWritingPractice(lessonId: string, imageData: string, skill: SkillId = "writing") {
  return storeLargeData(`${skill}:${lessonId}:${Date.now()}`, imageData);
}
