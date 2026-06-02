"use client";

import { useState } from "react";
import { LocalDataImportExport } from "@/components/parent/LocalDataImportExport";
import { ParentDashboard } from "@/components/parent/ParentDashboard";
import { ReviewQueue } from "@/components/parent/ReviewQueue";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function ParentPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-5 pb-20 md:pb-0">
      <SectionTitle title="家长中心" subtitle="看进度、看复习建议、导出导入本地 JSON。这里不显示排名，也不使用“落后”这类词。" />
      <ParentDashboard refreshKey={refreshKey} />
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <ReviewQueue />
        <LocalDataImportExport onChanged={() => setRefreshKey((value) => value + 1)} />
      </div>
    </div>
  );
}
