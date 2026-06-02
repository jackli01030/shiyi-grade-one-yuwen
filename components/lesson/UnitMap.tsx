"use client";

import type { Unit } from "@/types/content";
import { LessonCard } from "@/components/lesson/LessonCard";
import { KidCard } from "@/components/ui/KidCard";

export function UnitMap({
  units,
  completedByLesson
}: {
  units: Unit[];
  completedByLesson: Record<string, number>;
}) {
  return (
    <div className="space-y-5">
      {units.map((unit) => (
        <KidCard key={unit.id} accent={unit.type === "汉语拼音" ? "sky" : unit.type === "阅读" ? "berry" : "leaf"}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-black text-ink/55">第 {unit.index} 组</p>
              <h2 className="text-xl font-black md:text-2xl">{unit.title}</h2>
            </div>
            <span className="rounded-lg bg-leaf-50 px-3 py-2 text-sm font-bold text-leaf-700">{unit.type}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {unit.lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} completedTasks={completedByLesson[lesson.id] ?? 0} />
            ))}
          </div>
        </KidCard>
      ))}
    </div>
  );
}
