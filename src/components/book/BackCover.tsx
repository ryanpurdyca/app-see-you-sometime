import { cn } from "@/design-system";

/**
 * Back of the book — static, sits behind every page. Provides the visible
 * outline you see in the reference fully-open state and prevents the page
 * stack from looking floating when the front cover swings away.
 */
export function BackCover() {
  return (
    <div
      data-testid="book-back-cover"
      className={cn(
        "border-accent bg-surface absolute inset-0",
        "rounded-l-[8px] rounded-r-[10px] border-2",
      )}
      style={{
        transformStyle: "preserve-3d",
        transform: "translateZ(0px)",
      }}
    />
  );
}
