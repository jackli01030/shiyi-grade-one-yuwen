"use client";

import { useState } from "react";
import { BigButton } from "@/components/ui/BigButton";
import { ExerciseFrame } from "@/components/exercise/ExerciseFrame";
import type { ExerciseProps } from "@/components/exercise/types";

export function DragSortExercise({ template, onResult }: ExerciseProps) {
  const options = template.options ?? ["第一步", "第二步", "第三步"];
  const answer = Array.isArray(template.answer) ? template.answer : options;
  const [picked, setPicked] = useState<string[]>([]);
  const [stars, setStars] = useState(0);

  function add(item: string) {
    setPicked((current) => (current.includes(item) ? current : [...current, item]));
  }

  function check() {
    const correct = answer.length === picked.length && answer.every((item, index) => picked[index] === item);
    setStars(correct ? 3 : 1);
    onResult(correct ? "correct" : "wrong", correct ? 3 : 1);
  }

  return (
    <ExerciseFrame title={template.title} prompt={template.prompt} stars={stars}>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-base font-black">点一点击排序</p>
          <div className="grid gap-2">
            {options.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => add(item)}
                className="min-h-14 rounded-lg border border-leaf-100 bg-white px-4 text-left text-lg font-black"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-base font-black">我的顺序</p>
          <div className="min-h-40 rounded-lg bg-paper p-3">
            {picked.map((item, index) => (
              <button
                key={`${item}-${index}`}
                type="button"
                onClick={() => setPicked((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                className="mb-2 mr-2 min-h-12 rounded-lg bg-white px-4 text-lg font-black"
              >
                {index + 1}. {item}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <BigButton onClick={check} ariaLabel="排好了">
              排好了
            </BigButton>
            <BigButton onClick={() => setPicked([])} variant="sun" ariaLabel="重来">
              重来
            </BigButton>
          </div>
        </div>
      </div>
    </ExerciseFrame>
  );
}
