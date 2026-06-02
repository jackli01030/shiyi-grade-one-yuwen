"use client";

import { useState } from "react";
import { BigButton } from "@/components/ui/BigButton";
import { ExerciseFrame } from "@/components/exercise/ExerciseFrame";
import type { ExerciseProps } from "@/components/exercise/types";

export function ParentChildReadExercise({ template, onResult }: ExerciseProps) {
  const [book, setBook] = useState("");
  const [minutes, setMinutes] = useState(10);
  const [canTell, setCanTell] = useState(false);

  return (
    <ExerciseFrame title={template.title} prompt={template.prompt} stars={canTell ? 3 : 1}>
      <div className="grid gap-4 rounded-lg bg-paper p-4 md:grid-cols-3">
        <label className="grid gap-2 text-base font-bold">
          书名
          <input
            value={book}
            onChange={(event) => setBook(event.target.value)}
            className="min-h-12 rounded-lg border border-leaf-100 px-3"
            placeholder="今天读的书"
          />
        </label>
        <label className="grid gap-2 text-base font-bold">
          分钟
          <input
            type="number"
            min={1}
            max={60}
            value={minutes}
            onChange={(event) => setMinutes(Number(event.target.value))}
            className="min-h-12 rounded-lg border border-leaf-100 px-3"
          />
        </label>
        <label className="flex min-h-12 items-center gap-3 rounded-lg bg-white px-3 text-base font-bold md:mt-8">
          <input type="checkbox" checked={canTell} onChange={(event) => setCanTell(event.target.checked)} className="h-5 w-5" />
          能讲一个小片段
        </label>
      </div>
      <BigButton
        className="mt-4"
        onClick={() => onResult("parentChecked", canTell ? 3 : 2)}
        ariaLabel="亲子共读打卡"
      >
        亲子确认
      </BigButton>
    </ExerciseFrame>
  );
}
