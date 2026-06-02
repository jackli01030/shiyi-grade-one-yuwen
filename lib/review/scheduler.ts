import type {
  CharacterReviewRecord,
  CharacterReviewStatus,
  ProgressState,
  TodayPlan
} from "@/types/progress";

export function createNewReviewRecord(char: string): CharacterReviewRecord {
  return {
    char,
    status: "new",
    correctStreak: 0,
    totalCorrect: 0,
    totalTried: 0
  };
}

function daysFromNow(days: number, now = new Date()) {
  const next = new Date(now);
  next.setDate(now.getDate() + days);
  return next.toISOString();
}

export function nextStatusAfterAnswer(
  record: CharacterReviewRecord,
  isCorrect: boolean,
  now = new Date()
): CharacterReviewRecord {
  if (!isCorrect) {
    return {
      ...record,
      status: "review",
      correctStreak: 0,
      lastPracticedAt: now.toISOString(),
      nextReviewAt: now.toISOString(),
      totalTried: record.totalTried + 1
    };
  }

  const correctStreak = record.correctStreak + 1;
  let status: CharacterReviewStatus = "learning";
  if (correctStreak >= 3) {
    status = "mastered";
  }

  return {
    ...record,
    status,
    correctStreak,
    lastPracticedAt: now.toISOString(),
    nextReviewAt: daysFromNow(status === "mastered" ? 7 : 1, now),
    totalCorrect: record.totalCorrect + 1,
    totalTried: record.totalTried + 1
  };
}

export function pickReviewChars(progress: ProgressState, limit = 3, now = new Date()) {
  const dueTime = now.getTime();
  const records = Object.values(progress.characterReviews);
  const bucket = (status: CharacterReviewStatus) =>
    records
      .filter((record) => record.status === status)
      .filter((record) => !record.nextReviewAt || new Date(record.nextReviewAt).getTime() <= dueTime)
      .map((record) => record.char);

  return [...bucket("review"), ...bucket("learning"), ...bucket("new")].slice(0, limit);
}

export function buildTodayPlan(progress: ProgressState, currentLessonChars: string[]): TodayPlan {
  const reviewChars = pickReviewChars(progress, 3);
  const newItems = currentLessonChars.filter((char) => !reviewChars.includes(char)).slice(0, 3);
  const writingChars = currentLessonChars.slice(0, 2);

  return {
    reviewChars,
    newItems,
    readOrSpeakTask: "读一读今天的课题，再说一句自己的话",
    writingChars,
    parentTip: "今天以鼓励为主，听孩子读一遍，再帮他选一个最想复习的字。"
  };
}
