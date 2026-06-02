import { describe, expect, it } from "vitest";
import { createNewReviewRecord, nextStatusAfterAnswer } from "@/lib/review/scheduler";

describe("review scheduler", () => {
  it("moves a new character to learning after one correct answer", () => {
    const next = nextStatusAfterAnswer(createNewReviewRecord("青"), true, new Date("2026-06-02T00:00:00Z"));
    expect(next.status).toBe("learning");
    expect(next.correctStreak).toBe(1);
    expect(next.totalCorrect).toBe(1);
  });

  it("moves to mastered after three consecutive correct answers", () => {
    const first = nextStatusAfterAnswer(createNewReviewRecord("青"), true);
    const second = nextStatusAfterAnswer(first, true);
    const third = nextStatusAfterAnswer(second, true);
    expect(third.status).toBe("mastered");
    expect(third.correctStreak).toBe(3);
  });

  it("puts an incorrect answer into review", () => {
    const next = nextStatusAfterAnswer(createNewReviewRecord("青"), false);
    expect(next.status).toBe("review");
    expect(next.correctStreak).toBe(0);
    expect(next.totalTried).toBe(1);
  });
});
