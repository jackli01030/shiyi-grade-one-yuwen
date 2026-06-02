"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { BigButton } from "@/components/ui/BigButton";
import { ExerciseFrame } from "@/components/exercise/ExerciseFrame";
import type { ExerciseProps } from "@/components/exercise/types";

const placeholders = ["太阳", "月亮", "山", "水", "小手", "小脚", "小口", "耳朵"];

export function CharMatchExercise({ lesson, template, onResult }: ExerciseProps) {
  const options = template.options?.filter(Boolean) ?? lesson.recognitionChars.map((item) => item.char);
  const [selected, setSelected] = useState<string[]>([]);
  const [stars, setStars] = useState(0);

  function toggle(item: string) {
    setSelected((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]));
  }

  return (
    <ExerciseFrame title={template.title} prompt={template.prompt} stars={stars}>
      <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <div className="grid grid-cols-2 gap-3">
          {options.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => toggle(item)}
              className={`min-h-24 rounded-lg border p-3 text-center transition ${selected.includes(item) ? "border-leaf-500 bg-leaf-50" : "border-leaf-100 bg-white"}`}
              aria-pressed={selected.includes(item)}
            >
              <span className="block text-4xl font-black">{item}</span>
              <span className="mt-2 block text-sm font-bold text-ink/55">点一点</span>
            </button>
          ))}
        </div>
        <div className="rounded-lg bg-paper p-4">
          <p className="mb-3 text-base font-black">图标占位</p>
          <div className="grid grid-cols-2 gap-2">
            {placeholders.slice(0, Math.max(4, Math.min(options.length, placeholders.length))).map((item) => (
              <div key={item} className="min-h-16 rounded-lg bg-white p-3 text-center font-bold">
                {item}
              </div>
            ))}
          </div>
          <BigButton
            className="mt-4 w-full"
            onClick={() => {
              setStars(2);
              onResult("parentChecked", 2);
            }}
            icon={Check}
            ariaLabel="配好了"
          >
            配好了
          </BigButton>
        </div>
      </div>
    </ExerciseFrame>
  );
}
