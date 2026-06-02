"use client";

import { useState } from "react";
import { BigButton } from "@/components/ui/BigButton";
import { ExerciseFrame } from "@/components/exercise/ExerciseFrame";
import type { ExerciseProps } from "@/components/exercise/types";

export function SentenceExpandExercise({ template, onResult }: ExerciseProps) {
  const [value, setValue] = useState("");
  const ready = value.trim().length >= 4;

  return (
    <ExerciseFrame title={template.title} prompt={template.prompt} stars={ready ? 2 : 0}>
      <div className="rounded-lg bg-paper p-4">
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="min-h-32 w-full rounded-lg border border-leaf-100 p-3 text-lg font-bold leading-relaxed"
          placeholder="可以写下来，也可以口头说给家长听"
        />
        <p className="mt-3 text-base font-bold text-ink/60">例：花儿在阳光下开放。</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <BigButton onClick={() => onResult(ready ? "correct" : "parentChecked", ready ? 2 : 1)} ariaLabel="说好了">
            说好了
          </BigButton>
          <BigButton onClick={() => setValue("")} variant="sun" ariaLabel="再说一次">
            再说一次
          </BigButton>
        </div>
      </div>
    </ExerciseFrame>
  );
}
