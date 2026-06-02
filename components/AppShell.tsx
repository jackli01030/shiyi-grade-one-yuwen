"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Leaf, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/", label: "首页", icon: Home },
  { href: "/catalog", label: "课程", icon: BookOpen },
  { href: "/characters", label: "识字", icon: Leaf },
  { href: "/parent", label: "家长", icon: Users },
  { href: "/settings", label: "设置", icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen text-ink">
      <header className="sticky top-0 z-30 border-b border-leaf-100/80 bg-paper/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
          <Link href="/" className="flex min-h-11 items-center gap-3 rounded-lg px-1" aria-label="回到十一的一年级语文首页">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-leaf-500 text-xl font-black text-white shadow-soft">
              禾
            </span>
            <span className="min-w-0">
              <span className="block text-xl font-black leading-tight">十一的一年级语文</span>
              <span className="block text-xs text-ink/60">本地保存 · 不上传儿童数据</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-2 md:flex" aria-label="主要导航">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex min-h-11 items-center gap-2 rounded-lg px-4 text-base font-bold transition",
                    active ? "bg-leaf-500 text-white" : "bg-white text-ink hover:bg-leaf-50"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-8">{children}</main>
      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-leaf-100 bg-paper/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden"
        aria-label="底部导航"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg text-xs font-bold",
                active ? "bg-leaf-500 text-white" : "text-ink/75"
              )}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
