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
import { createDefaultProgress, normalizeProgress } from "@/lib/progress/defaults";

const STORAGE_KEY = "xiaohe-yuwen-progress-v1";
const SERVER_PROGRESS_ENDPOINT = "/api/progress";

function canUseLocalStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

let memoryProgress: ProgressState = createDefaultProgress();
let serverStorageAvailable: boolean | undefined;
let loadPromise: Promise<ProgressState> | null = null;

function canUseServerStorage() {
  return typeof window !== "undefined" && typeof window.fetch === "function" && process.env.NODE_ENV !== "test";
}

async function fetchServerProgress() {
  const response = await fetch(SERVER_PROGRESS_ENDPOINT, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Progress server returned ${response.status}`);
  }
  return normalizeProgress((await response.json()) as Partial<ProgressState>);
}

async function writeServerProgress(progress: ProgressState) {
  const response = await fetch(SERVER_PROGRESS_ENDPOINT, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(progress)
  });
  if (!response.ok) {
    throw new Error(`Progress server returned ${response.status}`);
  }
  return normalizeProgress((await response.json()) as Partial<ProgressState>);
}

function saveLocalProgress(progress: ProgressState) {
  if (!canUseLocalStorage()) {
    memoryProgress = progress;
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function getLocalProgress() {
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

function clearLocalProgress() {
  if (canUseLocalStorage()) {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

async function persistProgress(progress: ProgressState) {
  if (!canUseServerStorage() || serverStorageAvailable === false) {
    saveLocalProgress(progress);
    return progress;
  }

  try {
    const saved = await writeServerProgress(progress);
    serverStorageAvailable = true;
    memoryProgress = saved;
    clearLocalProgress();
    return saved;
  } catch {
    serverStorageAvailable = false;
    saveLocalProgress(progress);
    return progress;
  }
}

export async function loadProgress(): Promise<ProgressState> {
  if (!canUseServerStorage()) {
    memoryProgress = getLocalProgress();
    return memoryProgress;
  }

  loadPromise ??= fetchServerProgress()
    .then((progress) => {
      serverStorageAvailable = true;
      memoryProgress = progress;
      clearLocalProgress();
      return progress;
    })
    .catch(() => {
      serverStorageAvailable = false;
      memoryProgress = getLocalProgress();
      return memoryProgress;
    })
    .finally(() => {
      loadPromise = null;
    });

  return loadPromise;
}

export function getProgress(): ProgressState {
  return serverStorageAvailable ? memoryProgress : getLocalProgress();
}

export function saveProgress(progress: ProgressState) {
  const normalized = normalizeProgress(progress);
  memoryProgress = normalized;
  void persistProgress(normalized);
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

export async function exportProgressAsync() {
  return JSON.stringify(await loadProgress(), null, 2);
}

export function importProgress(json: string) {
  const parsed = JSON.parse(json) as Partial<ProgressState>;
  return saveProgress(normalizeProgress(parsed));
}

export async function importProgressAsync(json: string) {
  const parsed = JSON.parse(json) as Partial<ProgressState>;
  const normalized = normalizeProgress(parsed);
  memoryProgress = normalized;
  await persistProgress(normalized);
  return normalized;
}

export function resetProgress() {
  const empty = createDefaultProgress();
  clearLocalProgress();
  memoryProgress = empty;
  void persistProgress(empty);
  return empty;
}

export async function resetProgressAsync() {
  const empty = createDefaultProgress();
  clearLocalProgress();
  memoryProgress = empty;

  if (canUseServerStorage() && serverStorageAvailable !== false) {
    try {
      const response = await fetch(SERVER_PROGRESS_ENDPOINT, { method: "DELETE" });
      if (response.ok) {
        serverStorageAvailable = true;
        memoryProgress = normalizeProgress((await response.json()) as Partial<ProgressState>);
        return memoryProgress;
      }
    } catch {
      serverStorageAvailable = false;
    }
  }

  saveLocalProgress(empty);
  return empty;
}
