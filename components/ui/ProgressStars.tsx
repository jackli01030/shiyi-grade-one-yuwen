import { Star } from "lucide-react";

export function ProgressStars({ count = 0, total = 3 }: { count?: number; total?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`获得 ${count} 颗星`}>
      {Array.from({ length: total }).map((_, index) => (
        <Star
          key={index}
          className={index < count ? "h-6 w-6 fill-sun-300 text-sun-600" : "h-6 w-6 text-ink/20"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
