import type { ExerciseType } from "@/types/content";

export const exerciseComponentNames: Record<ExerciseType, string> = {
  flashcard: "FlashcardExercise",
  "pinyin-match": "PinyinMatchExercise",
  "char-match": "CharMatchExercise",
  "word-match": "WordMatchExercise",
  "fill-blank": "FillBlankExercise",
  compare: "CompareExercise",
  "drag-sort": "DragSortExercise",
  "read-aloud": "ReadAloudExercise",
  "recite-check": "ReciteCheckExercise",
  "writing-grid": "WritingGridExercise",
  "oral-roleplay": "OralRoleplayExercise",
  "parent-child-read": "ParentChildReadExercise",
  "daily-accumulation": "DailyAccumulationExercise",
  "timer-task": "TimerTaskExercise",
  "sentence-expand": "SentenceExpandExercise"
};

export function getExerciseComponentName(type: ExerciseType) {
  return exerciseComponentNames[type];
}
