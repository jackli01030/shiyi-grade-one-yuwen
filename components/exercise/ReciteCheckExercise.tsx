"use client";

import { useState } from "react";
import { BigButton } from "@/components/ui/BigButton";
import { ExerciseFrame } from "@/components/exercise/ExerciseFrame";
import type { ExerciseProps } from "@/components/exercise/types";

const steps = ["看着读", "遮住一半", "完全背诵"];

export function ReciteCheckExercise({ template, onResult }: ExerciseProps) {
  const [step, setStep] = useState(0);

  return (
    <ExerciseFrame title={template.title} prompt={template.prompt} stars={step + 1}>
      <div className="grid gap-3 md:grid-cols-3">
        {steps.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => setStep(index)}
            className={`min-h-24 rounded-lg border p-4 text-xl font-black ${step === index ? "border-leaf-500 bg-leaf-50" : "border-leaf-100 bg-white"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-paper p-4 text-base font-bold leading-relaxed text-ink/70">
        先完成当前档，再由家长确认。背不出来时，可以回到上一档。
      </p>
      <BigButton
        className="mt-4"
        onClick={() => onResult("parentChecked", step + 1)}
        ariaLabel="家长确认背诵"
      >
        家长确认
      </BigButton>
    </ExerciseFrame>
  );
}
