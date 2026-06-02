"use client";

import { useEffect, useMemo, useState } from "react";
import { ExerciseRenderer } from "@/components/exercise/ExerciseRenderer";
import { BigButton } from "@/components/ui/BigButton";
import { KidCard } from "@/components/ui/KidCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { allLessons } from "@/lib/content/catalog";
import { getProgress, saveImportedLessonText } from "@/lib/progress/store";
import type { ExerciseTemplate } from "@/types/content";
import type { ImportedLessonText } from "@/types/progress";

export function ReadingPage() {
  const lessons = useMemo(
    () => allLessons.filter((lesson) => lesson.lessonType === "阅读" || lesson.lessonType === "古诗"),
    []
  );
  const [lessonId, setLessonId] = useState(lessons[0]?.id);
  const [localText, setLocalText] = useState("");
  const [savedText, setSavedText] = useState<ImportedLessonText | undefined>();
  const lesson = lessons.find((item) => item.id === lessonId) ?? lessons[0];
  const readTask =
    lesson.exerciseTemplates.find((item) => item.type === "read-aloud") ??
    ({
      id: `${lesson.id}-read-page`,
      type: "read-aloud",
      title: "朗读",
      prompt: "录下来听一听，录音只存在这台设备里。"
    } satisfies ExerciseTemplate);

  useEffect(() => {
    const imported = getProgress().importedLessonTexts.find((item) => item.lessonId === lesson.id);
    setSavedText(imported);
    setLocalText(imported?.body ?? "");
  }, [lesson.id]);

  function saveText() {
    const next = saveImportedLessonText({ lessonId: lesson.id, title: lesson.title, body: localText });
    setSavedText(next.importedLessonTexts.find((item) => item.lessonId === lesson.id));
  }

  return (
    <div className="space-y-5 pb-20 md:pb-0">
      <SectionTitle title="课文阅读" subtitle="朗读、背诵、理解、角色朗读和亲子共读。录音只在本地回放，不做自动评分。" />
      <KidCard accent="berry">
        <select
          value={lesson.id}
          onChange={(event) => setLessonId(event.target.value)}
          className="min-h-12 w-full rounded-lg border border-leaf-100 bg-white px-3 text-base font-bold"
          aria-label="选择阅读课"
        >
          {lessons.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </KidCard>
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <KidCard accent="sky">
          <h2 className="text-xl font-black">本地课文导入</h2>
          <p className="mt-2 text-base font-bold leading-relaxed text-ink/70">
            这里可以由家长粘贴完整课文或自备阅读材料。内容只保存在浏览器，不进入源码，不上传。
          </p>
          <textarea
            value={localText}
            onChange={(event) => setLocalText(event.target.value)}
            className="mt-4 min-h-56 w-full rounded-lg border border-leaf-100 p-3 text-base leading-relaxed"
            placeholder="家长可在这里粘贴本地阅读材料"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <BigButton onClick={saveText} ariaLabel="保存本地阅读材料">
              保存本地内容
            </BigButton>
            <BigButton href={`/lesson/${lesson.id}`} variant="white" ariaLabel="进入课时">
              进课时
            </BigButton>
          </div>
          {savedText ? <p className="mt-3 text-sm font-bold text-ink/55">已保存：{new Date(savedText.updatedAt).toLocaleString()}</p> : null}
        </KidCard>
        <ExerciseRenderer lesson={lesson} template={readTask} />
      </div>
    </div>
  );
}
