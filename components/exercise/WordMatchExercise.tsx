"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { BigButton } from "@/components/ui/BigButton";
import { ExerciseFrame } from "@/components/exercise/ExerciseFrame";
import type { ExerciseProps } from "@/components/exercise/types";

export function WordMatchExercise({ template, onResult }: ExerciseProps) {
  const pairs = template.options?.filter(Boolean) ?? ["春-花", "夏-雨", "秋-叶", "冬-雪"];
  const [checked, setChecked] = useState<string[]>([]);
  const [stars, setStars] = useState(0);

  return (
    <ExerciseFrame title={template.title} prompt={template.prompt} stars={stars}>
      <div className="grid gap-3 md:grid-cols-2">
        {pairs.map((pair) => {
          const [left, right] = pair.split("-");
          const active = checked.includes(pair);
          return (
            <button
              key={pair}
              type="button"
              onClick={() => setChecked((current) => (active ? current.filter((item) => item !== pair) : [...current, pair]))}
              className={`flex min-h-16 items-center justify-between gap-3 rounded-lg border p-4 text-left text-lg font-black ${active ? "border-leaf-500 bg-leaf-50" : "border-leaf-100 bg-white"}`}
              aria-pressed={active}
            >
              <span>{left}</span>
              <span className="text-ink/35">→</span>
              <span>{right ?? "想一想"}</span>
            </button>
          );
        })}
      </div>
      <BigButton
        className="mt-4"
        icon={Check}
        onClick={() => {
          setStars(2);
          onResult("parentChecked", 2);
        }}
        ariaLabel="连好了"
      >
        连好了
      </BigButton>
    </ExerciseFrame>
  );
}
