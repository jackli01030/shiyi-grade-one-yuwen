"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Mic, PencilLine, Sprout } from "lucide-react";
import { KidCard } from "@/components/ui/KidCard";
import type { ProgressState } from "@/types/progress";
import { loadProgress } from "@/lib/progress/store";
import { todayKey } from "@/lib/utils/cn";

function lastNDays(days: number) {
  return Array.from({ length: days }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - index - 1));
    return todayKey(date);
  });
}

export function ParentDashboard({ refreshKey = 0 }: { refreshKey?: number }) {
  const [progress, setProgress] = useState<ProgressState>();

  useEffect(() => {
    void loadProgress().then(setProgress);
  }, [refreshKey]);

  const stats = useMemo(() => {
    const state = progress;
    if (!state) {
      return {
        mastered: 0,
        review: 0,
        read: 0,
        writing: 0,
        oral: 0,
        dayCounts: lastNDays(7).map((day) => ({ day, count: 0 }))
      };
    }
    const reviews = Object.values(state.characterReviews);
    const dayCounts = lastNDays(7).map((day) => ({
      day,
      count: state.exerciseRecords.filter((record) => record.completedAt.startsWith(day)).length
    }));
    return {
      mastered: reviews.filter((item) => item.status === "mastered").length,
      review: reviews.filter((item) => item.status === "review" || item.status === "learning").length,
      read: state.readingRecords.length,
      writing: state.writingRecords.length,
      oral: state.oralRecords.length,
      dayCounts
    };
  }, [progress]);

  const cards = [
    { label: "已掌握生字", value: stats.mastered, icon: Sprout, accent: "leaf" },
    { label: "需要复习生字", value: stats.review, icon: CalendarDays, accent: "sun" },
    { label: "朗读次数", value: stats.read, icon: Mic, accent: "sky" },
    { label: "写字次数", value: stats.writing, icon: PencilLine, accent: "berry" }
  ] as const;

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <KidCard key={card.label} accent={card.accent}>
              <Icon className="h-7 w-7 text-leaf-700" aria-hidden="true" />
              <p className="mt-3 text-sm font-black text-ink/55">{card.label}</p>
              <p className="mt-1 text-4xl font-black">{card.value}</p>
            </KidCard>
          );
        })}
      </div>
      <KidCard accent="plain">
        <h2 className="text-xl font-black">最近 7 天</h2>
        <div className="mt-4 grid grid-cols-7 gap-2">
          {stats.dayCounts.map((item) => (
            <div key={item.day} className="rounded-lg bg-paper p-2 text-center">
              <div className="mx-auto flex h-20 items-end justify-center rounded-md bg-white p-1">
                <div
                  className="w-full rounded-md bg-leaf-500"
                  style={{ height: `${Math.min(100, 16 + item.count * 18)}%` }}
                  aria-label={`${item.day} 完成 ${item.count} 个任务`}
                />
              </div>
              <p className="mt-2 text-xs font-bold text-ink/60">{item.day.slice(5)}</p>
              <p className="text-sm font-black">{item.count}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-base font-bold leading-relaxed text-ink/70">
          口语任务完成 {stats.oral} 次。建议明天先复习状态为“再见一面”的字，再读一小段。
        </p>
      </KidCard>
    </div>
  );
}
