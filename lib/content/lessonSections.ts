import type { Lesson } from "@/types/content";
import { unique } from "@/lib/utils/cn";

function exerciseOptions(lesson: Lesson) {
  return unique(lesson.exerciseTemplates.flatMap((template) => template.options ?? [])).slice(0, 8);
}

export function lessonRecognitionItems(lesson: Lesson) {
  if (lesson.recognitionChars.length > 0) {
    return lesson.recognitionChars.map((item) => `${item.char} ${item.pinyin}`);
  }

  if (lesson.pinyinItems.length > 0) {
    return lesson.pinyinItems;
  }

  if (lesson.words.length > 0) {
    return lesson.words;
  }

  const options = exerciseOptions(lesson);
  if (options.length > 0) {
    return options;
  }

  return lesson.goals;
}

export function lessonWritingItems(lesson: Lesson) {
  if (lesson.writingChars.length > 0) {
    return lesson.writingChars.map((item) => `${item.char} ${item.pinyin}`);
  }

  const writableRecognition = lesson.recognitionChars.filter((item) => item.isWriting);
  if (writableRecognition.length > 0) {
    return writableRecognition.map((item) => `${item.char} ${item.pinyin}`);
  }

  if (lesson.pinyinItems.length > 0) {
    return lesson.pinyinItems.slice(0, 6).map((item) => `描一描 ${item}`);
  }

  if (lesson.words.length > 0) {
    return lesson.words.slice(0, 6).map((word) => `关键词 ${word}`);
  }

  const options = exerciseOptions(lesson);
  if (options.length > 0) {
    return options.slice(0, 6).map((item) => `练一练 ${item}`);
  }

  return lesson.goals.slice(0, 2);
}

export function lessonPracticeItems(lesson: Lesson) {
  const tasks = lesson.exerciseTemplates.map((item) => item.title);
  if (tasks.length > 0) {
    return tasks;
  }

  return lesson.goals.slice(0, 3).map((goal) => `练一练：${goal}`);
}
