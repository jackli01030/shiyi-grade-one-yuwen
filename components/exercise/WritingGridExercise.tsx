"use client";

import { useMemo, useState } from "react";
import { BigButton } from "@/components/ui/BigButton";
import { ExerciseFrame } from "@/components/exercise/ExerciseFrame";
import type { ExerciseProps } from "@/components/exercise/types";
import { recordWriting } from "@/lib/progress/store";

export function WritingGridExercise({ lesson, template, onResult }: ExerciseProps) {
  const chars = useMemo(
    () => template.options?.filter(Boolean) ?? lesson.writingChars.map((item) => item.char),
    [lesson.writingChars, template.options]
  );
  const [index, setIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const current = chars[index] ?? "一";
  const charMeta = lesson.writingChars.find((item) => item.char === current) ?? lesson.recognitionChars.find((item) => item.char === current);

  function confirm(note: "写得不错" | "还要再练") {
    recordWriting({ char: current, lessonId: lesson.id, parentNote: note });
    setStars(note === "写得不错" ? 3 : 1);
    onResult("parentChecked", note === "写得不错" ? 3 : 1);
    setIndex((value) => (value + 1) % Math.max(chars.length, 1));
  }

  return (
    <ExerciseFrame title={template.title} prompt={template.prompt} stars={stars}>
      <div className="grid gap-5 md:grid-cols-[20rem_1fr]">
        <div className="grid place-items-center rounded-lg bg-paper p-5">
          <div className="tianzige grid h-72 w-72 place-items-center rounded-lg border-2 border-berry-100 bg-white">
            <span className="text-8xl font-black text-ink/85">{current}</span>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4">
          <p className="text-5xl font-black">{current}</p>
          <p className="mt-2 text-lg font-bold text-ink/70">拼音：{charMeta?.pinyin ?? "跟家长读"}</p>
          <p className="mt-2 text-lg font-bold text-ink/70">组词：{charMeta?.words.join("、") || "想一个词"}</p>
          <p className="mt-4 rounded-lg bg-leaf-50 p-3 text-base font-bold leading-relaxed text-leaf-700">
            笔顺提示：先看清字在格子里的位置，再慢慢写。这里预留 hanzi-writer 描红能力，当前使用静态田字格。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <BigButton onClick={() => confirm("写得不错")} ariaLabel="写得不错">
              写得不错
            </BigButton>
            <BigButton onClick={() => confirm("还要再练")} variant="sun" ariaLabel="还要再练">
              还要再练
            </BigButton>
          </div>
        </div>
      </div>
    </ExerciseFrame>
  );
}
