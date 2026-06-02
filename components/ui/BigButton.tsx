import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type BigButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: LucideIcon;
  ariaLabel?: string;
  variant?: "leaf" | "sky" | "sun" | "berry" | "white";
  className?: string;
  disabled?: boolean;
};

const variants = {
  leaf: "bg-leaf-500 text-white hover:bg-leaf-700",
  sky: "bg-skysoft-600 text-white hover:bg-skysoft-300 hover:text-ink",
  sun: "bg-sun-300 text-ink hover:bg-sun-100",
  berry: "bg-berry-400 text-white hover:bg-berry-700",
  white: "bg-white text-ink hover:bg-leaf-50"
};

export function BigButton({
  children,
  href,
  onClick,
  icon: Icon,
  ariaLabel,
  variant = "leaf",
  className,
  disabled
}: BigButtonProps) {
  const base = cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-center text-lg font-black shadow-soft transition disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className
  );

  const content = (
    <>
      {Icon ? <Icon className="h-6 w-6 shrink-0" aria-hidden="true" /> : null}
      <span className="leading-tight">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={base} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={base} aria-label={ariaLabel} disabled={disabled}>
      {content}
    </button>
  );
}
