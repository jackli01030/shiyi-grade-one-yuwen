"use client";

import { useState } from "react";
import { BigButton } from "@/components/ui/BigButton";
import { ExerciseFrame } from "@/components/exercise/ExerciseFrame";
import type { ExerciseProps } from "@/components/exercise/types";
import { recordOral } from "@/lib/progress/store";

export function OralRoleplayExercise({ template, onResult }: ExerciseProps) {
  const checklist = template.hints?.length ? template.hints : ["说清楚了", "用了礼貌用语", "听完别人说话"];
  const [checked, setChecked] = useState<string[]>([]);

  return (
    <ExerciseFrame title={template.title} prompt={template.prompt} stars={checked.length >= 2 ? 2 : 0}>
      <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <div className="rounded-lg bg-paper p-4">
          <p className="text-lg font-black">孩子任务</p>
          <p className="mt-2 text-xl font-black leading-relaxed">{template.prompt}</p>
          <div className="mt-4 rounded-lg bg-white p-3 text-base font-bold leading-relaxed text-ink/70">
            提示词：请、请问、您好、谢谢、不客气。
          </div>
        </div>
        <div className="rounded-lg bg-white p-4">
          <p className="mb-3 text-lg font-black">家长观察</p>
          <div className="grid gap-2">
            {checklist.map((item) => (
              <label key={item} className="flex min-h-12 items-center gap-3 rounded-lg bg-paper px-3 text-base font-bold">
                <input
                  type="checkbox"
                  checked={checked.includes(item)}
                  onChange={() =>
                    setChecked((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]))
                  }
                  className="h-5 w-5"
                />
                {item}
              </label>
            ))}
          </div>
          <BigButton
            className="mt-4 w-full"
            onClick={() => {
              recordOral(template.id);
              onResult("parentChecked", 2);
            }}
            ariaLabel="口语任务完成"
          >
            完成啦
          </BigButton>
        </div>
      </div>
    </ExerciseFrame>
  );
}
