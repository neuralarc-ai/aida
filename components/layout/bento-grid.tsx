import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(150px,auto)] gap-6",
        className,
      )}
      role="group"
      aria-label="Dashboard widgets"
    >
      {children}
    </div>
  );
}
