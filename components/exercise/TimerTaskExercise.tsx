"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Square } from "lucide-react";
import { BigButton } from "@/components/ui/BigButton";
import { ExerciseFrame } from "@/components/exercise/ExerciseFrame";
import type { ExerciseProps } from "@/components/exercise/types";

export function TimerTaskExercise({ template, onResult }: ExerciseProps) {
  const [remaining, setRemaining] = useState(60);
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          setRunning(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function start() {
    setRemaining(60);
    setRunning(true);
  }

  function stop() {
    setRunning(false);
    clearInterval(intervalRef.current);
  }

  return (
    <ExerciseFrame title={template.title} prompt={template.prompt} stars={remaining === 0 ? 2 : 0}>
      <div className="grid gap-4 md:grid-cols-[18rem_1fr]">
        <div className="grid min-h-56 place-items-center rounded-lg bg-paper p-5 text-center">
          <div>
            <p className="text-base font-black text-ink/55">倒计时</p>
            <p className="text-7xl font-black text-leaf-700">{remaining}</p>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4">
          <div className="flex flex-wrap gap-2">
            {!running ? (
              <BigButton onClick={start} icon={Play} ariaLabel="开始一分钟计时">
                开始
              </BigButton>
            ) : (
              <BigButton onClick={stop} icon={Square} variant="berry" ariaLabel="停止计时">
                停止
              </BigButton>
            )}
          </div>
          <label className="mt-4 grid gap-2 text-base font-bold">
            本地记录
            <input
              value={count}
              onChange={(event) => setCount(event.target.value)}
              className="min-h-12 rounded-lg border border-leaf-100 px-3"
              placeholder="写几个字 / 走几步"
            />
          </label>
          <BigButton className="mt-4" onClick={() => onResult("parentChecked", 2)} ariaLabel="记录好了">
            记录好了
          </BigButton>
        </div>
      </div>
    </ExerciseFrame>
  );
}
