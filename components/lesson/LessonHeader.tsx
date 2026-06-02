import Link from "next/link";
import { ArrowLeft, BookMarked } from "lucide-react";
import type { Lesson } from "@/types/content";
import { KidCard } from "@/components/ui/KidCard";

export function LessonHeader({ lesson }: { lesson: Lesson }) {
  return (
    <KidCard accent={lesson.lessonType === "拼音" ? "sky" : lesson.lessonType === "阅读" ? "berry" : "leaf"}>
      <Link href="/catalog" className="mb-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-leaf-50 px-3 font-bold text-leaf-700">
        <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        回课程地图
      </Link>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-black text-leaf-700">{lesson.lessonType}</p>
          <h1 className="mt-1 text-3xl font-black md:text-5xl">{lesson.title}</h1>
        </div>
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-sun-100 text-leaf-700">
          <BookMarked className="h-12 w-12" aria-hidden="true" />
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {lesson.goals.slice(0, 3).map((goal) => (
          <div key={goal} className="rounded-lg bg-paper p-3 text-base font-bold leading-relaxed">
            {goal}
          </div>
        ))}
      </div>
    </KidCard>
  );
}
