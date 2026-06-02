"use client";

import { useMemo, useState } from "react";
import { Train } from "lucide-react";
import { ExerciseRenderer } from "@/components/exercise/ExerciseRenderer";
import { KidCard } from "@/components/ui/KidCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BigButton } from "@/components/ui/BigButton";
import { allLessons } from "@/lib/content/catalog";

export function PinyinPage() {
  const pinyinLessons = useMemo(() => allLessons.filter((lesson) => lesson.lessonType === "拼音"), []);
  const [lessonId, setLessonId] = useState(pinyinLessons[0]?.id);
  const lesson = pinyinLessons.find((item) => item.id === lessonId) ?? pinyinLessons[0];
  const matchTask = lesson.exerciseTemplates.find((item) => item.type === "pinyin-match") ?? lesson.exerciseTemplates[0];

  return (
    <div className="space-y-5 pb-20 md:pb-0">
      <SectionTitle title="拼音乐园" subtitle="读卡片，听提示，坐上拼读小火车。浏览器支持时会用 SpeechSynthesis 读拼音提示。" />
      <KidCard accent="sky">
        <div className="flex flex-wrap gap-2">
          {pinyinLessons.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLessonId(item.id)}
              className={`min-h-12 rounded-lg px-4 text-base font-black ${lesson.id === item.id ? "bg-skysoft-600 text-white" : "bg-paper text-ink"}`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </KidCard>
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <KidCard accent="sun">
          <Train className="h-9 w-9 text-sun-600" aria-hidden="true" />
          <h2 className="mt-3 text-xl font-black">拼音卡片</h2>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {lesson.pinyinItems.map((item) => (
              <div key={item} className="grid min-h-20 place-items-center rounded-lg bg-paper text-3xl font-black">
                {item}
              </div>
            ))}
          </div>
          <BigButton href={`/lesson/${lesson.id}`} className="mt-4 w-full" variant="white" ariaLabel="进入拼音课时">
            进课时
          </BigButton>
        </KidCard>
        {matchTask ? <ExerciseRenderer lesson={lesson} template={matchTask} /> : null}
      </div>
    </div>
  );
}
