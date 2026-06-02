"use client";

import { useEffect, useState } from "react";
import { BigButton } from "@/components/ui/BigButton";
import { KidCard } from "@/components/ui/KidCard";
import { loadProgress, updateCharacterReview } from "@/lib/progress/store";
import { pickReviewChars } from "@/lib/review/scheduler";

export function ReviewQueue({ compact = false }: { compact?: boolean }) {
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    void loadProgress().then((progress) => setChars(pickReviewChars(progress, compact ? 3 : 12)));
  }, [compact]);

  function answer(char: string, correct: boolean) {
    const next = updateCharacterReview(char, correct);
    setChars(pickReviewChars(next, compact ? 3 : 12));
  }

  return (
    <KidCard accent="sun">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-sun-600">今日复习</p>
          <h2 className="text-xl font-black">再见一面</h2>
        </div>
      </div>
      {chars.length === 0 ? (
        <p className="rounded-lg bg-paper p-3 text-base font-bold text-ink/70">今天先学新内容吧。</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {chars.map((char) => (
            <div key={char} className="rounded-lg bg-paper p-3">
              <p className="text-center text-5xl font-black">{char}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <BigButton onClick={() => answer(char, true)} className="px-2 text-base" ariaLabel={`认识${char}`}>
                  认识
                </BigButton>
                <BigButton onClick={() => answer(char, false)} variant="sun" className="px-2 text-base" ariaLabel={`再练${char}`}>
                  再练
                </BigButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </KidCard>
  );
}
