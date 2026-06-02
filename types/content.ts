export type VolumeId = "g1a" | "g1b";

export type UnitType =
  | "入学"
  | "识字"
  | "汉语拼音"
  | "阅读"
  | "语文园地"
  | "口语交际"
  | "快乐读书吧";

export type LessonType =
  | "入学"
  | "识字"
  | "拼音"
  | "阅读"
  | "古诗"
  | "语文园地"
  | "口语交际"
  | "快乐读书吧";

export type ExerciseType =
  | "flashcard"
  | "pinyin-match"
  | "char-match"
  | "word-match"
  | "fill-blank"
  | "compare"
  | "drag-sort"
  | "read-aloud"
  | "recite-check"
  | "writing-grid"
  | "oral-roleplay"
  | "parent-child-read"
  | "daily-accumulation"
  | "timer-task"
  | "sentence-expand";

export interface Volume {
  id: VolumeId;
  title: string;
}

export interface CharacterItem {
  char: string;
  pinyin: string;
  words: string[];
  radical?: string;
  structure?: string;
  isRecognition: boolean;
  isWriting: boolean;
}

export interface ExerciseTemplate {
  id: string;
  type: ExerciseType;
  title: string;
  prompt: string;
  options?: string[];
  answer?: string | string[];
  hints?: string[];
  sourceNote?: string;
}

export interface Lesson {
  id: string;
  volumeId: VolumeId;
  unitId: string;
  title: string;
  lessonType: LessonType;
  pageStart?: number;
  goals: string[];
  recognitionChars: CharacterItem[];
  writingChars: CharacterItem[];
  pinyinItems: string[];
  words: string[];
  recite: boolean;
  oralTask?: string;
  exerciseTemplates: ExerciseTemplate[];
}

export interface Unit {
  id: string;
  volumeId: VolumeId;
  index: number;
  title: string;
  type: UnitType;
  lessons: Lesson[];
}

export interface ContentCatalog {
  volumes: Volume[];
  units: Unit[];
}
