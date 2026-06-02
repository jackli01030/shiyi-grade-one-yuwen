"use client";

import { useMemo, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { BigButton } from "@/components/ui/BigButton";
import { ExerciseFrame } from "@/components/exercise/ExerciseFrame";
import type { ExerciseProps } from "@/components/exercise/types";
import { updateCharacterReview } from "@/lib/progress/store";

function isSingleHan(value: string) {
  return /^[\u4e00-\u9fff]$/.test(value);
}

export function FlashcardExercise({ lesson, template, onResult }: ExerciseProps) {
  const cards = useMemo(
    () => template.options?.filter(Boolean) ?? lesson.recognitionChars.map((item) => item.char),
    [lesson.recognitionChars, template.options]
  );
  const [index, setIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const card = cards[index] ?? "读";

  const moveNext = () => setIndex((current) => (current + 1) % Math.max(cards.length, 1));

  function handleKnown() {
    if (isSingleHan(card)) {
      updateCharacterReview(card, true);
    }
    setStars(2);
    onResult("correct", 2);
    moveNext();
  }

  function handleAgain() {
    if (isSingleHan(card)) {
      updateCharacterReview(card, false);
    }
    setStars(1);
    onResult("wrong", 1);
    moveNext();
  }

  return (
    <ExerciseFrame title={template.title} prompt={template.prompt} stars={stars}>
      <div className="grid gap-5 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div className="grid min-h-64 place-items-center rounded-lg bg-paper p-6">
          <div className="text-center">
            <div className="text-7xl font-black md:text-8xl">{card}</div>
            <p className="mt-4 text-lg font-bold text-ink/60">
              {index + 1}/{Math.max(cards.length, 1)}
            </p>
          </div>
        </div>
        <div className="grid gap-3">
          <BigButton onClick={handleKnown} icon={Check} ariaLabel="我认识了">
            我认识了
          </BigButton>
          <BigButton onClick={handleAgain} icon={RotateCcw} variant="sun" ariaLabel="再练一次">
            再练一次
          </BigButton>
          <p className="rounded-lg bg-leaf-50 p-3 text-base font-bold leading-relaxed text-leaf-700">
            不认识也没关系，这个字还想再见你一次。
          </p>
        </div>
      </div>
    </ExerciseFrame>
  );
}
