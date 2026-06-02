export type ExerciseResult = "correct" | "wrong" | "skipped" | "parentChecked";

export type CharacterReviewStatus = "new" | "learning" | "review" | "mastered";

export interface ExerciseProgressRecord {
  lessonId: string;
  exerciseId: string;
  completedAt: string;
  result: ExerciseResult;
  durationSeconds: number;
  stars: number;
}

export interface CharacterReviewRecord {
  char: string;
  status: CharacterReviewStatus;
  correctStreak: number;
  lastPracticedAt?: string;
  nextReviewAt?: string;
  totalCorrect: number;
  totalTried: number;
}

export interface ReadingRecord {
  lessonId: string;
  exerciseId: string;
  recordedAt: string;
  durationSeconds: number;
  confirmedByParent: boolean;
}

export interface WritingRecord {
  char: string;
  lessonId?: string;
  practicedAt: string;
  parentNote: "写得不错" | "还要再练";
}

export interface OralRecord {
  sceneId: string;
  completedAt: string;
  parentChecked: boolean;
}

export interface LearnerSettings {
  nickname: string;
  dailyGoalMinutes: 10 | 15 | 20;
  soundEnabled: boolean;
}

export interface ImportedLessonText {
  lessonId: string;
  title: string;
  body: string;
  updatedAt: string;
}

export interface ProgressState {
  version: 1;
  settings: LearnerSettings;
  exerciseRecords: ExerciseProgressRecord[];
  characterReviews: Record<string, CharacterReviewRecord>;
  readingRecords: ReadingRecord[];
  writingRecords: WritingRecord[];
  oralRecords: OralRecord[];
  currentLessonId?: string;
  importedLessonTexts: ImportedLessonText[];
}

export interface TodayPlan {
  reviewChars: string[];
  newItems: string[];
  readOrSpeakTask?: string;
  writingChars: string[];
  parentTip: string;
}
