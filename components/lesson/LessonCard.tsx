import Link from "next/link";
import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import type { Lesson } from "@/types/content";

export function LessonCard({
  lesson,
  completedTasks = 0
}: {
  lesson: Lesson;
  completedTasks?: number;
}) {
  const total = lesson.exerciseTemplates.length;
  const done = total > 0 && completedTasks >= total;

  return (
    <Link
      href={`/lesson/${lesson.id}`}
      className="block rounded-lg border border-leaf-100 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-leaf-300"
      aria-label={`进入${lesson.title}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-bold text-leaf-700">{lesson.lessonType}</p>
          <h3 className="mt-1 break-words text-lg font-black leading-snug">{lesson.title}</h3>
        </div>
        {done ? (
          <CheckCircle2 className="h-7 w-7 shrink-0 text-leaf-500" aria-hidden="true" />
        ) : (
          <Circle className="h-7 w-7 shrink-0 text-skysoft-300" aria-hidden="true" />
        )}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 text-sm font-bold text-ink/70">
        <span className="inline-flex items-center gap-1">
          <Sparkles className="h-4 w-4 text-sun-600" aria-hidden="true" />
          {completedTasks}/{total} 个任务
        </span>
        <span>{done ? "已完成" : "去学习"}</span>
      </div>
    </Link>
  );
}
