import type { ExerciseTemplate, Lesson } from "@/types/content";

export function createRecognitionTasks(lesson: Pick<Lesson, "id" | "recognitionChars" | "title">): ExerciseTemplate[] {
  if (lesson.recognitionChars.length === 0) {
    return [];
  }

  return [
    {
      id: `${lesson.id}-recognition-flashcard`,
      type: "flashcard",
      title: "认一认",
      prompt: "看卡片，读一读。",
      options: lesson.recognitionChars.map((item) => item.char)
    }
  ];
}

export function createWritingTasks(lesson: Pick<Lesson, "id" | "writingChars">): ExerciseTemplate[] {
  if (lesson.writingChars.length === 0) {
    return [];
  }

  return [
    {
      id: `${lesson.id}-writing-grid`,
      type: "writing-grid",
      title: "写一写",
      prompt: "在田字格里慢慢写。",
      options: lesson.writingChars.map((item) => item.char)
    }
  ];
}

export function createReadingTasks(lesson: Pick<Lesson, "id" | "lessonType" | "recite">): ExerciseTemplate[] {
  if (lesson.lessonType !== "阅读" && lesson.lessonType !== "古诗") {
    return [];
  }

  const tasks: ExerciseTemplate[] = [
    {
      id: `${lesson.id}-read-aloud`,
      type: "read-aloud",
      title: "读一读",
      prompt: "录下来听一听，录音只存在这台设备里。"
    }
  ];

  if (lesson.recite) {
    tasks.push({
      id: `${lesson.id}-recite-check`,
      type: "recite-check",
      title: "背一背",
      prompt: "从看着读开始，一步一步来。"
    });
  }

  return tasks;
}

export function createPinyinTasks(lesson: Pick<Lesson, "id" | "pinyinItems">): ExerciseTemplate[] {
  if (lesson.pinyinItems.length === 0) {
    return [];
  }

  return [
    {
      id: `${lesson.id}-pinyin-card`,
      type: "flashcard",
      title: "拼音卡",
      prompt: "读一读拼音朋友。",
      options: lesson.pinyinItems
    },
    {
      id: `${lesson.id}-pinyin-match`,
      type: "pinyin-match",
      title: "拼一拼",
      prompt: "把声母和韵母组成小火车。",
      options: lesson.pinyinItems
    }
  ];
}

export function createOralTasks(lesson: Pick<Lesson, "id" | "oralTask">): ExerciseTemplate[] {
  if (!lesson.oralTask) {
    return [];
  }

  return [
    {
      id: `${lesson.id}-oral`,
      type: "oral-roleplay",
      title: "说一说",
      prompt: lesson.oralTask,
      hints: ["先听别人说完", "说清楚", "用上礼貌的话"]
    }
  ];
}

export function createDefaultTasks(lesson: Lesson): ExerciseTemplate[] {
  const tasks = [
    ...createRecognitionTasks(lesson),
    ...createPinyinTasks(lesson),
    ...createReadingTasks(lesson),
    ...createWritingTasks(lesson),
    ...createOralTasks(lesson)
  ].slice(0, 6);

  if (tasks.length > 0) {
    return tasks;
  }

  return [
    {
      id: `${lesson.id}-parent-check`,
      type: "parent-child-read",
      title: "亲子确认",
      prompt: "和家长说一说今天学到的一件事。",
      hints: ["声音自然", "不着急", "说完给自己一颗星"]
    }
  ];
}
