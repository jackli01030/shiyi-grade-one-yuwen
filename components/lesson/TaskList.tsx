"use client";

import { CheckCircle2, Circle } from "lucide-react";
import type { ExerciseTemplate } from "@/types/content";

export function TaskList({
  templates,
  completedIds,
  onSelect,
  selectedId
}: {
  templates: ExerciseTemplate[];
  completedIds: string[];
  selectedId?: string;
  onSelect: (template: ExerciseTemplate) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {templates.map((template, index) => {
        const done = completedIds.includes(template.id);
        const selected = selectedId === template.id;
        return (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelect(template)}
            className={`min-h-20 rounded-lg border p-4 text-left transition ${
              selected ? "border-leaf-500 bg-leaf-50" : "border-leaf-100 bg-white hover:bg-paper"
            }`}
            aria-label={`选择任务${template.title}`}
          >
            <div className="flex items-start gap-3">
              {done ? (
                <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-leaf-500" aria-hidden="true" />
              ) : (
                <Circle className="mt-1 h-6 w-6 shrink-0 text-skysoft-300" aria-hidden="true" />
              )}
              <div>
                <p className="text-sm font-black text-ink/55">任务 {index + 1}</p>
                <h3 className="text-lg font-black">{template.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm font-bold text-ink/60">{template.prompt}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
