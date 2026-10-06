import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  action?: string;
  defaultValue?: string;
  placeholder?: string;
  name?: string;
  compact?: boolean;
};

export function SearchBar({
  action = "/search",
  defaultValue,
  placeholder = "Search blood pressure monitors, gloves, wheelchairs...",
  name = "q",
  compact = false,
}: SearchBarProps) {
  return (
    <form
      action={action}
      className={`flex w-full items-center gap-3 rounded-[2rem] border border-[color:var(--border)] bg-white p-2 shadow-[0_18px_40px_-36px_rgba(11,99,206,0.45)] ${compact ? "" : "max-w-3xl"}`}
    >
      <div className="flex flex-1 items-center gap-3 px-3">
        <Search className="h-5 w-5 text-[color:var(--muted-ink)]" />
        <Input
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="h-auto border-0 px-0 py-0 shadow-none focus:ring-0"
        />
      </div>
      <Button type="submit" className="min-w-28">
        Search
      </Button>
    </form>
  );
}
