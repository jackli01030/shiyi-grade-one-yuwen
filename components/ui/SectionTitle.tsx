export function SectionTitle({
  title,
  subtitle
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-black tracking-normal md:text-4xl">{title}</h1>
      {subtitle ? <p className="mt-2 max-w-3xl text-base leading-relaxed text-ink/70 md:text-lg">{subtitle}</p> : null}
    </div>
  );
}
