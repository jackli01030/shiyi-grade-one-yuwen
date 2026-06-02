"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen } from "lucide-react";
import { UnitMap } from "@/components/lesson/UnitMap";
import { BigButton } from "@/components/ui/BigButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { catalog, getUnitsByVolume } from "@/lib/content/catalog";
import { loadProgress } from "@/lib/progress/store";
import type { VolumeId } from "@/types/content";

export function CatalogPage({ volumeId }: { volumeId: VolumeId }) {
  const [completedByLesson, setCompletedByLesson] = useState<Record<string, number>>({});

  useEffect(() => {
    void loadProgress().then((progress) => {
      const grouped = progress.exerciseRecords.reduce<Record<string, Set<string>>>((acc, record) => {
        acc[record.lessonId] ??= new Set();
        acc[record.lessonId].add(record.exerciseId);
        return acc;
      }, {});
      setCompletedByLesson(
        Object.fromEntries(Object.entries(grouped).map(([lessonId, ids]) => [lessonId, ids.size]))
      );
    });
  }, []);

  const units = useMemo(() => getUnitsByVolume(volumeId), [volumeId]);

  return (
    <div className="pb-20 md:pb-0">
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <SectionTitle title="课程地图" subtitle="按上册、下册和单元走。每课最多 6 个小任务。" />
        <div className="flex gap-2">
          {catalog.volumes.map((volume) => (
            <BigButton
              key={volume.id}
              href={`/catalog?volume=${volume.id}`}
              icon={BookOpen}
              variant={volumeId === volume.id ? "leaf" : "white"}
              ariaLabel={`打开${volume.title}`}
            >
              {volume.title}
            </BigButton>
          ))}
        </div>
      </div>
      <UnitMap units={units} completedByLesson={completedByLesson} />
    </div>
  );
}
