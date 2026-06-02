"use client";

import { useMemo, useState } from "react";
import { BigButton } from "@/components/ui/BigButton";
import { ExerciseFrame } from "@/components/exercise/ExerciseFrame";
import type { ExerciseProps } from "@/components/exercise/types";

export function FillBlankExercise({ template, onResult }: ExerciseProps) {
  const answers = useMemo(() => (Array.isArray(template.answer) ? template.answer : template.answer ? [template.answer] : []), [template.answer]);
  const blanks = answers.length || 1;
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState("选一选");
  const [stars, setStars] = useState(0);

  function choose(option: string) {
    setSelected((current) => (current.length >= blanks ? [option] : [...current, option]));
  }

  function check() {
    const correct = answers.length > 0 && answers.every((answer, index) => selected[index] === answer);
    if (correct) {
      setMessage("太棒了");
      setStars(3);
      onResult("correct", 3);
    } else {
      setMessage("这个字还想再见你一次");
      setStars(1);
      onResult("wrong", 1);
    }
  }

  return (
    <ExerciseFrame title={template.title} prompt={template.prompt} stars={stars}>
      <div className="rounded-lg bg-paper p-4">
        <p className="text-xl font-black">{message}</p>
        <div className="mt-4 flex min-h-16 flex-wrap gap-2 rounded-lg bg-white p-3">
          {Array.from({ length: blanks }).map((_, index) => (
            <span key={index} className="grid h-12 min-w-12 place-items-center rounded-lg border border-dashed border-skysoft-300 px-3 text-2xl font-black">
              {selected[index] ?? "＿"}
            </span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 md:grid-cols-6">
          {(template.options ?? []).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => choose(option)}
              className="min-h-14 rounded-lg border border-leaf-100 bg-white text-2xl font-black"
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <BigButton onClick={check} ariaLabel="看看选得怎样">
            看看
          </BigButton>
          <BigButton
            onClick={() => {
              setSelected([]);
              setMessage("再试一次");
              setStars(0);
            }}
            variant="sun"
            ariaLabel="再试一次"
          >
            再试一次
          </BigButton>
        </div>
      </div>
    </ExerciseFrame>
  );
}
