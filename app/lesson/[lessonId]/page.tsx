import { notFound } from "next/navigation";
import { LessonPageClient } from "@/app/lesson/[lessonId]/LessonPageClient";
import { getLessonById } from "@/lib/content/catalog";

export default async function Page({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);
  if (!lesson) {
    notFound();
  }

  return <LessonPageClient lesson={lesson} />;
}
