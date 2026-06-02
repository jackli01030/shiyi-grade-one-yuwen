"use client";

import { useEffect, useMemo, useState } from "react";
import { Leaf } from "lucide-react";
import { BigButton } from "@/components/ui/BigButton";
import { KidCard } from "@/components/ui/KidCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { allCharacters, allLessons, catalog, getUnitsByVolume } from "@/lib/content/catalog";
import { getProgress, updateCharacterReview } from "@/lib/progress/store";
import type { VolumeId } from "@/types/content";
import type { ProgressState } from "@/types/progress";

export function CharactersPage() {
  const [volumeId, setVolumeId] = useState<VolumeId>("g1a");
  const [lessonId, setLessonId] = useState("all");
  const [progress, setProgress] = useState<ProgressState>();

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const units = getUnitsByVolume(volumeId);
  const lessons = allLessons.filter((lesson) => lesson.volumeId === volumeId);
  const chars = useMemo(() => {
    const source =
      lessonId === "all"
        ? allCharacters.filter((item) =>
            lessons.some((lesson) => [...lesson.recognitionChars, ...lesson.writingChars].some((char) => char.char === item.char))
          )
        : (allLessons.find((lesson) => lesson.id === lessonId)?.recognitionChars ?? []).concat(
            allLessons.find((lesson) => lesson.id === lessonId)?.writingChars ?? []
          );
    return Array.from(new Map(source.map((item) => [item.char, item])).values());
  }, [lessonId, lessons]);

  const selectedLesson = lessonId === "all" ? undefined : allLessons.find((lesson) => lesson.id === lessonId);

  function answer(char: string, correct: boolean) {
    setProgress(updateCharacterReview(char, correct));
  }

  return (
    <div className="space-y-5 pb-20 md:pb-0">
      <SectionTitle title="识字花园" subtitle="按册、课筛选。答对会延后复习，想再练会进今日复习。" />
      <KidCard accent="leaf">
        <div className="grid gap-3 md:grid-cols-[auto_1fr] md:items-center">
          <div className="flex gap-2">
            {catalog.volumes.map((volume) => (
              <BigButton
                key={volume.id}
                onClick={() => {
                  setVolumeId(volume.id);
                  setLessonId("all");
                }}
                variant={volumeId === volume.id ? "leaf" : "white"}
                ariaLabel={volume.title}
              >
                {volume.title}
              </BigButton>
            ))}
          </div>
          <select
            value={lessonId}
            onChange={(event) => setLessonId(event.target.value)}
            className="min-h-12 rounded-lg border border-leaf-100 bg-white px-3 text-base font-bold"
            aria-label="选择课文"
          >
            <option value="all">全部课文</option>
            {units.map((unit) => (
              <optgroup key={unit.id} label={unit.title}>
                {unit.lessons.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </KidCard>
      {chars.length === 0 ? (
        <KidCard accent="sky">
          <h2 className="text-xl font-black">{selectedLesson ? selectedLesson.title : "本册生字"}</h2>
          <p className="mt-2 text-base font-bold leading-relaxed text-ink/70">
            这课已经在课程目录里，生字卡还没录入。可以先去课时页完成朗读、口语或亲子任务，后续在
            <span className="font-black"> lib/content/catalog.ts </span>
            继续补充 recognitionChars 和 writingChars。
          </p>
          {selectedLesson ? (
            <BigButton href={`/lesson/${selectedLesson.id}`} className="mt-4" variant="white" ariaLabel={`进入${selectedLesson.title}`}>
              去这课看看
            </BigButton>
          ) : null}
        </KidCard>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {chars.map((item) => {
            const review = progress?.characterReviews[item.char];
            return (
              <KidCard key={item.char} accent={item.isWriting ? "sun" : "leaf"}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-6xl font-black">{item.char}</p>
                    <p className="mt-1 text-lg font-bold text-ink/65">{item.pinyin}</p>
                  </div>
                  <Leaf className="h-8 w-8 text-leaf-500" aria-hidden="true" />
                </div>
                <div className="mt-3 space-y-1 text-sm font-bold text-ink/65">
                  <p>组词：{item.words.join("、") || "想一个词"}</p>
                  <p>结构：{item.structure ?? "以后补充"} · 偏旁：{item.radical ?? "以后补充"}</p>
                  <p>
                    {item.isRecognition ? "会认" : ""} {item.isWriting ? "会写" : ""} · 状态：{review?.status ?? "new"}
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <BigButton onClick={() => answer(item.char, true)} className="px-2 text-base" ariaLabel={`我认识${item.char}`}>
                    我认识了
                  </BigButton>
                  <BigButton onClick={() => answer(item.char, false)} variant="sun" className="px-2 text-base" ariaLabel={`${item.char}再练一次`}>
                    再练一次
                  </BigButton>
                </div>
              </KidCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
