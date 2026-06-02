import type { LearnerSettings, ProgressState } from "@/types/progress";

export const defaultSettings: LearnerSettings = {
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

export function normalizeProgress(value: Partial<ProgressState> | null | undefined): ProgressState {
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
