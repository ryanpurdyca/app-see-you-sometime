import { cn } from "../cn";
import type { HTMLAttributes } from "react";

/**
 * PageSurface — the visible "paper card" that every book page is drawn on.
 * Owns the shared page look (paper background, ink border, rounding, padding)
 * so authored pages only supply content and inherit a consistent frame.
 *
 * It fills its parent (the leaf's 3D face wrapper in {@link Page}); it does NOT
 * own any 3D transform — the leaf positions each face.
 */
export function PageSurface({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn(
        "bg-paper text-ink border-ink absolute inset-0 flex flex-col rounded-[10px] border p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
