"use client";

import { useState } from "react";
import { BigButton } from "@/components/ui/BigButton";
import { ExerciseFrame } from "@/components/exercise/ExerciseFrame";
import type { ExerciseProps } from "@/components/exercise/types";

export function DailyAccumulationExercise({ template, onResult }: ExerciseProps) {
  const items = template.options?.length ? template.options : ["读书百遍，其义自见。"];
  const [index, setIndex] = useState(0);

  return (
    <ExerciseFrame title={template.title} prompt={template.prompt} stars={index > 0 ? 2 : 0}>
      <div className="grid min-h-48 place-items-center rounded-lg bg-paper p-5 text-center">
        <p className="text-3xl font-black leading-relaxed">{items[index % items.length]}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <BigButton onClick={() => setIndex((value) => value + 1)} ariaLabel="下一张">
          下一张
        </BigButton>
        <BigButton onClick={() => onResult("parentChecked", 2)} variant="sun" ariaLabel="读完了">
          读完了
        </BigButton>
      </div>
    </ExerciseFrame>
  );
}
