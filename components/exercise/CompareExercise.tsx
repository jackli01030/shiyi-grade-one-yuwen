"use client";

import { useState } from "react";
import { BigButton } from "@/components/ui/BigButton";
import { ExerciseFrame } from "@/components/exercise/ExerciseFrame";
import type { ExerciseProps } from "@/components/exercise/types";

export function CompareExercise({ template, onResult }: ExerciseProps) {
  const [found, setFound] = useState(false);

  return (
    <ExerciseFrame title={template.title} prompt={template.prompt} stars={found ? 2 : 0}>
      <div className="grid gap-3 md:grid-cols-3">
        {(template.options?.length ? template.options : ["青", "清", "晴", "睛", "情", "请"]).map((item) => (
          <div key={item} className="min-h-20 rounded-lg bg-paper p-4 text-center text-2xl font-black">
            {item}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg bg-leaf-50 p-4 text-base font-bold leading-relaxed text-leaf-700">
        可以说：“它们有一样的地方，也有不一样的地方。”
      </div>
      <BigButton
        className="mt-4"
        onClick={() => {
          setFound(true);
          onResult("parentChecked", 2);
        }}
        ariaLabel="我发现了"
      >
        我发现了
      </BigButton>
    </ExerciseFrame>
  );
}
