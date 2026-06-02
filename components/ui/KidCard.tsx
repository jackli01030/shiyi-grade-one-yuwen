import { cn } from "@/lib/utils/cn";

export function KidCard({
  children,
  className,
  accent = "leaf"
}: {
  children: React.ReactNode;
  className?: string;
  accent?: "leaf" | "sky" | "sun" | "berry" | "plain";
}) {
  const accentClass = {
    leaf: "border-l-leaf-500",
    sky: "border-l-skysoft-300",
    sun: "border-l-sun-300",
    berry: "border-l-berry-400",
    plain: "border-l-transparent"
  }[accent];

  return (
    <section className={cn("rounded-lg border border-leaf-100 bg-white p-4 shadow-soft md:p-5", accentClass, "border-l-4", className)}>
      {children}
    </section>
  );
}
