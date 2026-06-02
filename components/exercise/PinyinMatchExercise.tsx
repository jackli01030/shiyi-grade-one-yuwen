"use client";

import { useMemo, useState } from "react";
import { Volume2 } from "lucide-react";
import { BigButton } from "@/components/ui/BigButton";
import { ExerciseFrame } from "@/components/exercise/ExerciseFrame";
import type { ExerciseProps } from "@/components/exercise/types";

const defaultFinals = ["a", "o", "e", "i", "u", "ü"];

export function PinyinMatchExercise({ template, onResult }: ExerciseProps) {
  const items = template.options?.filter(Boolean) ?? [];
  const initials = useMemo(() => items.filter((item) => item.length <= 2).slice(0, 5), [items]);
  const [left, setLeft] = useState(initials[0] ?? "b");
  const [right, setRight] = useState(defaultFinals[0]);
  const combo = `${left}${right}`;
  const [stars, setStars] = useState(0);

  function speak() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(combo));
  }

  return (
    <ExerciseFrame title={template.title} prompt={template.prompt} stars={stars}>
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
        <div>
          <p className="mb-2 text-base font-black">声母</p>
          <div className="grid grid-cols-2 gap-2">
            {(initials.length ? initials : ["b", "p", "m", "f"]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLeft(item)}
                className={`min-h-14 rounded-lg border text-2xl font-black ${left === item ? "border-leaf-500 bg-leaf-50" : "border-leaf-100 bg-white"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-base font-black">韵母</p>
          <div className="grid grid-cols-2 gap-2">
            {defaultFinals.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRight(item)}
                className={`min-h-14 rounded-lg border text-2xl font-black ${right === item ? "border-skysoft-300 bg-skysoft-100" : "border-leaf-100 bg-white"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="grid place-items-center rounded-lg bg-paper p-5 text-center">
          <p className="text-base font-black text-ink/60">拼读小火车</p>
          <p className="my-4 text-6xl font-black text-leaf-700">{combo}</p>
          <div className="grid w-full gap-2">
            <BigButton onClick={speak} icon={Volume2} variant="sky" ariaLabel="读拼音提示">
              读提示
            </BigButton>
            <BigButton
              onClick={() => {
                setStars(2);
                onResult("correct", 2);
              }}
              ariaLabel="拼好了"
            >
              拼好了
            </BigButton>
          </div>
        </div>
      </div>
    </ExerciseFrame>
  );
}
