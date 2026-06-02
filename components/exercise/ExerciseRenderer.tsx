"use client";

import { useMemo, useRef } from "react";
import type { ExerciseTemplate, Lesson } from "@/types/content";
import type { ExerciseResult } from "@/types/progress";
import { getExerciseComponentName } from "@/lib/exercises/engine";
import { markExerciseDone } from "@/lib/progress/store";
import { FlashcardExercise } from "@/components/exercise/FlashcardExercise";
import { PinyinMatchExercise } from "@/components/exercise/PinyinMatchExercise";
import { CharMatchExercise } from "@/components/exercise/CharMatchExercise";
import { WordMatchExercise } from "@/components/exercise/WordMatchExercise";
import { FillBlankExercise } from "@/components/exercise/FillBlankExercise";
import { CompareExercise } from "@/components/exercise/CompareExercise";
import { DragSortExercise } from "@/components/exercise/DragSortExercise";
import { ReadAloudExercise } from "@/components/exercise/ReadAloudExercise";
import { ReciteCheckExercise } from "@/components/exercise/ReciteCheckExercise";
import { WritingGridExercise } from "@/components/exercise/WritingGridExercise";
import { OralRoleplayExercise } from "@/components/exercise/OralRoleplayExercise";
import { ParentChildReadExercise } from "@/components/exercise/ParentChildReadExercise";
import { DailyAccumulationExercise } from "@/components/exercise/DailyAccumulationExercise";
import { TimerTaskExercise } from "@/components/exercise/TimerTaskExercise";
import { SentenceExpandExercise } from "@/components/exercise/SentenceExpandExercise";

const componentMap = {
  FlashcardExercise,
  PinyinMatchExercise,
  CharMatchExercise,
  WordMatchExercise,
  FillBlankExercise,
  CompareExercise,
  DragSortExercise,
  ReadAloudExercise,
  ReciteCheckExercise,
  WritingGridExercise,
  OralRoleplayExercise,
  ParentChildReadExercise,
  DailyAccumulationExercise,
  TimerTaskExercise,
  SentenceExpandExercise
};

export function ExerciseRenderer({
  lesson,
  template,
  onDone
}: {
  lesson: Lesson;
  template: ExerciseTemplate;
  onDone?: (result: ExerciseResult) => void;
}) {
  const startedAt = useRef(Date.now());
  const Component = useMemo(() => {
    const name = getExerciseComponentName(template.type);
    return componentMap[name as keyof typeof componentMap] ?? FlashcardExercise;
  }, [template.type]);

  function handleResult(result: ExerciseResult, stars?: number) {
    const durationSeconds = Math.max(1, Math.round((Date.now() - startedAt.current) / 1000));
    markExerciseDone(lesson.id, template.id, result, durationSeconds, stars);
    onDone?.(result);
  }

  return <Component lesson={lesson} template={template} onResult={handleResult} />;
}
