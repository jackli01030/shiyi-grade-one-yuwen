"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpenText,
  CalendarCheck,
  Ear,
  Leaf,
  Mic,
  PencilLine,
  PlayCircle,
  Settings,
  Shapes,
  Users
} from "lucide-react";
import { BigButton } from "@/components/ui/BigButton";
import { KidCard } from "@/components/ui/KidCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ReviewQueue } from "@/components/parent/ReviewQueue";
import { allLessons, getFirstLessonId, getLessonById, getNextLessonId } from "@/lib/content/catalog";
import { buildTodayPlan } from "@/lib/review/scheduler";
import { getProgress } from "@/lib/progress/store";
import type { ProgressState } from "@/types/progress";

const entries = [
  { title: "今日学习", href: "/lesson/g1a-u1-2-jin-mu-shui-huo-tu", icon: CalendarCheck, color: "leaf" },
  { title: "继续上次", href: "/catalog", icon: PlayCircle, color: "sky" },
  { title: "拼音乐园", href: "/pinyin", icon: Ear, color: "sun" },
  { title: "识字花园", href: "/characters", icon: Leaf, color: "leaf" },
  { title: "课文阅读", href: "/reading", icon: BookOpenText, color: "berry" },
  { title: "写字练习", href: "/writing", icon: PencilLine, color: "sky" },
  { title: "口语交际", href: "/oral", icon: Mic, color: "sun" },
  { title: "家长中心", href: "/parent", icon: Users, color: "berry" }
] as const;

export function HomePage() {
  const [progress, setProgress] = useState<ProgressState>();

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const currentLessonId = progress?.currentLessonId ?? getFirstLessonId();
  const todayLesson = getLessonById(getNextLessonId(currentLessonId)) ?? allLessons[0];
  const continueLesson = getLessonById(currentLessonId) ?? allLessons[0];
  const plan = useMemo(
    () => buildTodayPlan(progress ?? getProgress(), todayLesson.recognitionChars.map((item) => item.char)),
    [progress, todayLesson]
  );

  return (
    <div className="pb-20 md:pb-0">
      <section className="mb-6 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <KidCard accent="leaf" className="overflow-hidden">
          <div className="grid gap-5 md:grid-cols-[1fr_13rem] md:items-center">
            <div>
              <p className="text-base font-black text-leaf-700">今天也慢慢来</p>
              <SectionTitle title={`你好，${progress?.settings.nickname ?? "小朋友"}`} subtitle="每次 10 到 15 分钟。认一认，读一读，写一写，就很好。" />
              <div className="flex flex-wrap gap-2">
                <BigButton href={`/lesson/${todayLesson.id}`} icon={CalendarCheck} ariaLabel="开始今日学习">
                  开始今日学习
                </BigButton>
                <BigButton href={`/lesson/${continueLesson.id}`} icon={PlayCircle} variant="sky" ariaLabel="继续上次学习">
                  继续上次
                </BigButton>
              </div>
            </div>
            <div className="grid min-h-52 place-items-center rounded-lg bg-leaf-50 p-4">
              <div className="relative h-40 w-40" aria-hidden="true">
                <div className="absolute bottom-0 left-1/2 h-20 w-5 -translate-x-1/2 rounded bg-leaf-700" />
                <div className="absolute left-6 top-10 h-20 w-24 rounded-full bg-leaf-300" />
                <div className="absolute right-5 top-3 h-24 w-28 rounded-full bg-skysoft-100" />
                <div className="absolute left-11 top-2 h-24 w-24 rounded-full bg-sun-100" />
                <div className="absolute bottom-4 left-5 right-5 rounded-lg bg-white px-3 py-2 text-center text-lg font-black text-leaf-700 shadow-soft">
                  + 星星
                </div>
              </div>
            </div>
          </div>
        </KidCard>
        <KidCard accent="sky">
          <h2 className="text-xl font-black">今日路径</h2>
          <ol className="mt-4 space-y-2 text-base font-bold leading-relaxed text-ink/75">
            <li>1. 复习 {plan.reviewChars.length || 3} 个旧字</li>
            <li>2. 学 {plan.newItems.length || 3} 个新字或一组拼音</li>
            <li>3. 读一读或说一说</li>
            <li>4. 写 1 到 2 个字</li>
            <li>5. 家长确认</li>
          </ol>
          <p className="mt-4 rounded-lg bg-paper p-3 text-sm font-bold text-ink/65">{plan.parentTip}</p>
        </KidCard>
      </section>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {entries.map((entry) => (
          <BigButton
            key={entry.title}
            href={entry.title === "继续上次" ? `/lesson/${continueLesson.id}` : entry.href}
            icon={entry.icon}
            variant={entry.color}
            className="min-h-24 justify-start text-left"
            ariaLabel={entry.title}
          >
            {entry.title}
          </BigButton>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <ReviewQueue compact />
        <KidCard accent="plain">
          <div className="flex items-center gap-3">
            <Shapes className="h-8 w-8 text-skysoft-600" aria-hidden="true" />
            <div>
              <h2 className="text-xl font-black">本地优先</h2>
              <p className="text-base font-bold text-ink/65">昵称、录音、学习记录都只在浏览器里。</p>
            </div>
          </div>
          <BigButton href="/settings" icon={Settings} variant="white" className="mt-4" ariaLabel="打开设置">
            打开设置
          </BigButton>
        </KidCard>
      </div>
    </div>
  );
}
