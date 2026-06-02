"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { ExerciseRenderer } from "@/components/exercise/ExerciseRenderer";
import { KidCard } from "@/components/ui/KidCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { oralScenes, oralSceneToTemplate } from "@/lib/content/oral";
import type { Lesson } from "@/types/content";

const oralLesson: Lesson = {
  id: "oral-scenes",
  volumeId: "g1b",
  unitId: "oral",
  title: "口语交际",
  lessonType: "口语交际",
  goals: ["在真实场景里说", "家长观察，不排名", "说清楚、有礼貌"],
  recognitionChars: [],
  writingChars: [],
  pinyinItems: [],
  words: [],
  recite: false,
  exerciseTemplates: []
};

export function OralPage() {
  const [sceneId, setSceneId] = useState(oralScenes[0].id);
  const scene = oralScenes.find((item) => item.id === sceneId) ?? oralScenes[0];
  const template = useMemo(() => oralSceneToTemplate(scene), [scene]);

  return (
    <div className="space-y-5 pb-20 md:pb-0">
      <SectionTitle title="口语交际" subtitle="真实场景，不做考试题。家长只观察孩子有没有说清楚、听清楚。" />
      <div className="grid gap-3 md:grid-cols-5">
        {oralScenes.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSceneId(item.id)}
            className={`min-h-24 rounded-lg border p-4 text-left font-black shadow-soft ${scene.id === item.id ? "border-leaf-500 bg-leaf-50" : "border-leaf-100 bg-white"}`}
            aria-label={`选择${item.title}`}
          >
            <MessageCircle className="mb-3 h-6 w-6 text-leaf-700" aria-hidden="true" />
            {item.title}
          </button>
        ))}
      </div>
      <KidCard accent="sun">
        <h2 className="text-xl font-black">示例句式</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {scene.hints.map((hint) => (
            <span key={hint} className="rounded-lg bg-paper px-3 py-2 text-base font-bold">
              {hint}
            </span>
          ))}
        </div>
      </KidCard>
      <ExerciseRenderer lesson={oralLesson} template={template} />
    </div>
  );
}
