import { ProgressStars } from "@/components/ui/ProgressStars";

export function ExerciseFrame({
  title,
  prompt,
  children,
  stars = 0
}: {
  title: string;
  prompt: string;
  children: React.ReactNode;
  stars?: number;
}) {
  return (
    <section className="rounded-lg border border-leaf-100 bg-white p-5 shadow-soft">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-black text-leaf-700">我来练</p>
          <h2 className="text-2xl font-black md:text-3xl">{title}</h2>
          <p className="mt-2 max-w-2xl text-base font-bold leading-relaxed text-ink/70">{prompt}</p>
        </div>
        <ProgressStars count={stars} />
      </div>
      {children}
    </section>
  );
}
