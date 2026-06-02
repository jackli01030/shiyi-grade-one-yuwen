"use client";

import { useMemo, useState } from "react";
import { ExerciseRenderer } from "@/components/exercise/ExerciseRenderer";
import { KidCard } from "@/components/ui/KidCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { allLessons } from "@/lib/content/catalog";
import type { ExerciseTemplate } from "@/types/content";

export function WritingPage() {
  const lessons = useMemo(() => allLessons.filter((lesson) => lesson.writingChars.length > 0), []);
  const [lessonId, setLessonId] = useState(lessons[0]?.id);
  const lesson = lessons.find((item) => item.id === lessonId) ?? lessons[0];
  const template: ExerciseTemplate = {
    id: `${lesson.id}-writing-page`,
    type: "writing-grid",
    title: "田字格练习",
    prompt: "看清位置，慢慢写。家长只做鼓励确认。",
    options: lesson.writingChars.map((item) => item.char)
  };

  return (
    <div className="space-y-5 pb-20 md:pb-0">
      <SectionTitle title="写字练习" subtitle="静态田字格和临摹区域。后续可以接入 hanzi-writer 做描红和笔顺动画。" />
      <KidCard accent="sun">
        <select
          value={lesson.id}
          onChange={(event) => setLessonId(event.target.value)}
          className="min-h-12 w-full rounded-lg border border-leaf-100 bg-white px-3 text-base font-bold"
          aria-label="选择写字课"
        >
          {lessons.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </KidCard>
      <ExerciseRenderer lesson={lesson} template={template} />
    </div>
  );
}
