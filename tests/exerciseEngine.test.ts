import { describe, expect, it } from "vitest";
import { exerciseComponentNames, getExerciseComponentName } from "@/lib/exercises/engine";

describe("exercise engine", () => {
  it("maps exercise types to component names", () => {
    expect(getExerciseComponentName("flashcard")).toBe("FlashcardExercise");
    expect(getExerciseComponentName("pinyin-match")).toBe("PinyinMatchExercise");
    expect(getExerciseComponentName("timer-task")).toBe("TimerTaskExercise");
  });

  it("contains all requested interactive exercise mappings", () => {
    expect(Object.keys(exerciseComponentNames)).toHaveLength(15);
  });
});
