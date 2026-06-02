"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { BigButton } from "@/components/ui/BigButton";
import { KidCard } from "@/components/ui/KidCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getProgress, updateSettings } from "@/lib/progress/store";
import type { LearnerSettings } from "@/types/progress";

export function SettingsPage() {
  const [settings, setSettings] = useState<LearnerSettings>({
    nickname: "小朋友",
    dailyGoalMinutes: 15,
    soundEnabled: true
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getProgress().settings);
  }, []);

  function save(next = settings) {
    const savedProgress = updateSettings(next);
    setSettings(savedProgress.settings);
    setSaved(true);
  }

  return (
    <div className="space-y-5 pb-20 md:pb-0">
      <SectionTitle title="设置" subtitle="昵称、目标时间和声音提示都只保存在本地浏览器。" />
      <KidCard accent="leaf">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-base font-black">
            孩子昵称
            <input
              value={settings.nickname}
              onChange={(event) => setSettings((current) => ({ ...current, nickname: event.target.value }))}
              className="min-h-12 rounded-lg border border-leaf-100 px-3 text-lg"
              placeholder="小朋友"
            />
          </label>
          <div>
            <p className="mb-2 text-base font-black">每天目标时间</p>
            <div className="flex flex-wrap gap-2">
              {[10, 15, 20].map((minutes) => (
                <button
                  key={minutes}
                  type="button"
                  onClick={() => setSettings((current) => ({ ...current, dailyGoalMinutes: minutes as 10 | 15 | 20 }))}
                  className={`min-h-12 rounded-lg px-4 text-base font-black ${settings.dailyGoalMinutes === minutes ? "bg-leaf-500 text-white" : "bg-paper text-ink"}`}
                  aria-label={`每天${minutes}分钟`}
                >
                  {minutes} 分钟
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <BigButton
            onClick={() => {
              const next = { ...settings, soundEnabled: !settings.soundEnabled };
              setSettings(next);
              save(next);
            }}
            icon={settings.soundEnabled ? Volume2 : VolumeX}
            variant="sky"
            ariaLabel="切换声音提示"
          >
            声音提示：{settings.soundEnabled ? "开" : "关"}
          </BigButton>
          <BigButton onClick={() => save()} ariaLabel="保存设置">
            保存
          </BigButton>
          {saved ? <span className="rounded-lg bg-sun-100 px-3 py-2 text-sm font-black text-sun-600">已保存</span> : null}
        </div>
      </KidCard>
    </div>
  );
}
