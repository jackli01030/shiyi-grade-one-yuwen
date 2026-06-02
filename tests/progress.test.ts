import { beforeEach, describe, expect, it } from "vitest";
import {
  exportProgress,
  getProgress,
  importProgress,
  markExerciseDone,
  resetProgress,
  updateCharacterReview
} from "@/lib/progress/store";

describe("progress store", () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetProgress();
  });

  it("exports and imports progress", () => {
    markExerciseDone("lesson-a", "exercise-a", "correct", 12, 2);
    updateCharacterReview("青", true);

    const json = exportProgress();
    resetProgress();
    expect(getProgress().exerciseRecords).toHaveLength(0);

    importProgress(json);
    const restored = getProgress();
    expect(restored.exerciseRecords).toHaveLength(1);
    expect(restored.characterReviews["青"].status).toBe("learning");
  });
});
