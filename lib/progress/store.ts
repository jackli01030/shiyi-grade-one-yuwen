"use client";

import type {
  CharacterReviewRecord,
  ExerciseProgressRecord,
  ExerciseResult,
  ImportedLessonText,
  LearnerSettings,
  ProgressState,
  ReadingRecord,
  WritingRecord
} from "@/types/progress";
import { createNewReviewRecord, nextStatusAfterAnswer } from "@/lib/review/scheduler";

const STORAGE_KEY = "xiaohe-yuwen-progress-v1";

const defaultSettings: LearnerSettings = {
  nickname: "小朋友",
  dailyGoalMinutes: 15,
  soundEnabled: true
};

export function createDefaultProgress(): ProgressState {
  return {
    version: 1,
    settings: defaultSettings,
    exerciseRecords: [],
    characterReviews: {},
    readingRecords: [],
    writingRecords: [],
    oralRecords: [],
    importedLessonTexts: []
  };
}

function canUseLocalStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

let memoryProgress: ProgressState = createDefaultProgress();

function normalizeProgress(value: Partial<ProgressState> | null | undefined): ProgressState {
  return {
    ...createDefaultProgress(),
    ...value,
    settings: {
      ...defaultSettings,
      ...(value?.settings ?? {})
    },
    exerciseRecords: value?.exerciseRecords ?? [],
    characterReviews: value?.characterReviews ?? {},
    readingRecords: value?.readingRecords ?? [],
    writingRecords: value?.writingRecords ?? [],
    oralRecords: value?.oralRecords ?? [],
    importedLessonTexts: value?.importedLessonTexts ?? []
  };
}

export function getProgress(): ProgressState {
  if (!canUseLocalStorage()) {
    return memoryProgress;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return createDefaultProgress();
  }

  try {
    return normalizeProgress(JSON.parse(raw));
  } catch {
    return createDefaultProgress();
  }
}

export function saveProgress(progress: ProgressState) {
  const normalized = normalizeProgress(progress);
  if (!canUseLocalStorage()) {
    memoryProgress = normalized;
    return normalized;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

export function updateSettings(settings: Partial<LearnerSettings>) {
  const progress = getProgress();
  progress.settings = { ...progress.settings, ...settings };
  return saveProgress(progress);
}

export function markExerciseDone(
  lessonId: string,
  exerciseId: string,
  result: ExerciseResult,
  durationSeconds: number,
  stars = result === "correct" || result === "parentChecked" ? 2 : 1
) {
  const progress = getProgress();
  const record: ExerciseProgressRecord = {
    lessonId,
    exerciseId,
    completedAt: new Date().toISOString(),
    result,
    durationSeconds,
    stars
  };

  progress.exerciseRecords = [...progress.exerciseRecords, record];
  progress.currentLessonId = lessonId;
  return saveProgress(progress);
}

export function updateCharacterReview(char: string, isCorrect: boolean) {
  const progress = getProgress();
  const current: CharacterReviewRecord = progress.characterReviews[char] ?? createNewReviewRecord(char);
  progress.characterReviews[char] = nextStatusAfterAnswer(current, isCorrect);
  return saveProgress(progress);
}

export function recordReading(record: Omit<ReadingRecord, "recordedAt">) {
  const progress = getProgress();
  progress.readingRecords = [...progress.readingRecords, { ...record, recordedAt: new Date().toISOString() }];
  return saveProgress(progress);
}

export function recordWriting(record: Omit<WritingRecord, "practicedAt">) {
  const progress = getProgress();
  progress.writingRecords = [...progress.writingRecords, { ...record, practicedAt: new Date().toISOString() }];
  return saveProgress(progress);
}

export function recordOral(sceneId: string) {
  const progress = getProgress();
  progress.oralRecords = [
    ...progress.oralRecords,
    { sceneId, completedAt: new Date().toISOString(), parentChecked: true }
  ];
  return saveProgress(progress);
}

export function saveImportedLessonText(text: Omit<ImportedLessonText, "updatedAt">) {
  const progress = getProgress();
  const next = { ...text, updatedAt: new Date().toISOString() };
  progress.importedLessonTexts = [
    ...progress.importedLessonTexts.filter((item) => item.lessonId !== text.lessonId),
    next
  ];
  return saveProgress(progress);
}

export function exportProgress() {
  return JSON.stringify(getProgress(), null, 2);
}

export function importProgress(json: string) {
  const parsed = JSON.parse(json) as Partial<ProgressState>;
  return saveProgress(normalizeProgress(parsed));
}

export function resetProgress() {
  const empty = createDefaultProgress();
  if (canUseLocalStorage()) {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  memoryProgress = empty;
  return empty;
}
