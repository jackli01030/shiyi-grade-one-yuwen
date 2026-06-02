import type { ExerciseTemplate, Lesson } from "@/types/content";
import type { ExerciseResult } from "@/types/progress";

export type ExerciseProps = {
  lesson: Lesson;
  template: ExerciseTemplate;
  onResult: (result: ExerciseResult, stars?: number) => void;
};
