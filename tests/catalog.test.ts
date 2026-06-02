import { describe, expect, it } from "vitest";
import { allLessons, catalog, getLessonById, getUnitsByVolume } from "@/lib/content/catalog";
import { lessonPracticeItems, lessonRecognitionItems, lessonWritingItems } from "@/lib/content/lessonSections";

describe("catalog", () => {
  it("contains upper and lower volumes with units", () => {
    expect(catalog.volumes.map((volume) => volume.id)).toEqual(["g1a", "g1b"]);
    expect(getUnitsByVolume("g1a").length).toBeGreaterThan(0);
    expect(getUnitsByVolume("g1b").length).toBeGreaterThan(0);
  });

  it("contains required sample lessons", () => {
    expect(getLessonById("g1a-u1-2-jin-mu-shui-huo-tu")?.exerciseTemplates.some((item) => item.type === "writing-grid")).toBe(true);
    expect(getLessonById("g1b-u1-3-xiao-qing-wa")?.exerciseTemplates.some((item) => item.type === "fill-blank")).toBe(true);
    expect(getLessonById("g1b-u7-15-yi-fen-zhong")?.exerciseTemplates.some((item) => item.type === "timer-task")).toBe(true);
  });

  it("contains recognition and writing characters for lower volume unit 8 reading lessons", () => {
    const lesson = getLessonById("g1b-u8-19-gu-dong");
    expect(lesson?.recognitionChars.length).toBeGreaterThan(0);
    expect(lesson?.writingChars.length).toBeGreaterThan(0);
  });

  it("fills lesson summary sections for every lesson", () => {
    for (const lesson of allLessons) {
      expect(lesson.goals, `${lesson.id} goals`).not.toHaveLength(0);
      expect(lessonRecognitionItems(lesson), `${lesson.id} recognition section`).not.toHaveLength(0);
      expect(lessonWritingItems(lesson), `${lesson.id} writing section`).not.toHaveLength(0);
      expect(lessonPracticeItems(lesson), `${lesson.id} practice section`).not.toHaveLength(0);
      expect(lesson.exerciseTemplates, `${lesson.id} exercise templates`).not.toHaveLength(0);
    }
  });

  it("contains corrected character table data for crow drinks water", () => {
    const lesson = getLessonById("g1a-u8-9-wu-ya-he-shui");

    expect(lessonRecognitionItems(lesson!)).toEqual(
      expect.arrayContaining(["喝 he", "只 zhi", "着 zhao", "许 xu", "石 shi", "进 jin"])
    );
    expect(lessonWritingItems(lesson!)).toEqual(expect.arrayContaining(["只 zhi", "个 ge", "多 duo", "石 shi", "出 chu"]));
  });
});
