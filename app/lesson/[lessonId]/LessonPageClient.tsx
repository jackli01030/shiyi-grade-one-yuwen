"use client";

import { useEffect, useMemo, useState } from "react";
import { LessonHeader } from "@/components/lesson/LessonHeader";
import { TaskList } from "@/components/lesson/TaskList";
import { ExerciseRenderer } from "@/components/exercise/ExerciseRenderer";
import { KidCard } from "@/components/ui/KidCard";
import type { ExerciseTemplate, Lesson } from "@/types/content";
import { loadProgress } from "@/lib/progress/store";

export function LessonPageClient({ lesson }: { lesson: Lesson }) {
  const [selected, setSelected] = useState<ExerciseTemplate>(lesson.exerciseTemplates[0]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [doneMessage, setDoneMessage] = useState("");

  useEffect(() => {
    void loadProgress().then((progress) => {
      setCompletedIds(
        Array.from(
          new Set(progress.exerciseRecords.filter((record) => record.lessonId === lesson.id).map((record) => record.exerciseId))
        )
      );
    });
  }, [lesson.id]);

  const sections = useMemo(
    () => [
      { title: "今天学什么", items: lesson.goals },
      { title: "我会认", items: lesson.recognitionChars.map((item) => `${item.char} ${item.pinyin}`) },
      { title: "我会写", items: lesson.writingChars.map((item) => `${item.char} ${item.pinyin}`) },
      { title: "我来练", items: lesson.exerciseTemplates.map((item) => item.title) }
    ],
    [lesson]
  );

  return (
    <div className="space-y-5 pb-20 md:pb-0">
      <LessonHeader lesson={lesson} />
      <div className="grid gap-4 md:grid-cols-4">
        {sections.map((section) => (
          <KidCard key={section.title} accent="plain">
            <h2 className="text-lg font-black">{section.title}</h2>
            {section.items.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {section.items.slice(0, 8).map((item) => (
                  <span key={item} className="rounded-lg bg-paper px-3 py-2 text-sm font-bold text-ink/70">
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm font-bold text-ink/55">这一课先轻轻看一看。</p>
            )}
          </KidCard>
        ))}
      </div>
      <KidCard accent="sky">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-black">任务列表</h2>
          {doneMessage ? <p className="rounded-lg bg-sun-100 px-3 py-2 text-sm font-black text-sun-600">{doneMessage}</p> : null}
        </div>
        <TaskList templates={lesson.exerciseTemplates} completedIds={completedIds} selectedId={selected?.id} onSelect={setSelected} />
      </KidCard>
      {selected ? (
        <ExerciseRenderer
          lesson={lesson}
          template={selected}
          onDone={() => {
            setCompletedIds((current) => Array.from(new Set([...current, selected.id])));
            setDoneMessage("太棒了，得星星啦");
          }}
        />
      ) : null}
    </div>
  );
}
