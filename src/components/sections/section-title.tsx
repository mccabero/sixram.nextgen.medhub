import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  return (
    <div className={cn("space-y-4", align === "center" && "text-center")}>
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <div className="space-y-2">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-[color:var(--ink)] sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-base leading-7 text-[color:var(--muted-ink)]">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
