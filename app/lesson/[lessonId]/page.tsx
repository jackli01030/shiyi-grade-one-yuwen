import { notFound } from "next/navigation";
import { LessonPageClient } from "@/app/lesson/[lessonId]/LessonPageClient";
import { allLessons, getLessonById } from "@/lib/content/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return allLessons.map((lesson) => ({
    lessonId: lesson.id
  }));
}

export default async function Page({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);
  if (!lesson) {
    notFound();
  }

  return <LessonPageClient lesson={lesson} />;
}
