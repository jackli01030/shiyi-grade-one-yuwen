import { describe, expect, it } from "vitest";
import { catalog, getLessonById, getUnitsByVolume } from "@/lib/content/catalog";

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
});
