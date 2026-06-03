"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../cn";

const POPOVER_TRANSITION = { duration: 0.22, ease: [0.22, 0.61, 0.36, 1] as const };
/** Extra Y (px) when hidden — slides up into place on show, down on hide. */
const SLIDE_OFFSET_PX = 6;

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 10 16"
      className={cn("h-4 w-[10px] shrink-0", className)}
      fill="currentColor"
    >
      <path d="M0 0h10v15Q10 16 9 16L5 12L1 16Q0 16 0 15V0z" />
    </svg>
  );
}

type Props = {
  /** Center X in the positioning parent's coordinate space (px). */
  x: number;
  /** Bottom edge of the anchor element (px). */
  anchorBottom: number;
  visible: boolean;
  /** Optional header label in a subtle gray bar above the body. */
  title?: string;
  children: ReactNode;
  /** `fixed` for viewport coords (e.g. portaled popovers); default `absolute`. */
  position?: "absolute" | "fixed";
  /** Gap between the anchor bottom and the top of the popover (px). */
  gapPx?: number;
  className?: string;
};

/**
 * Presentational popover anchored below a point. Does not capture pointer events.
 */
export function Popover({
  x,
  anchorBottom,
  visible,
  title,
  children,
  position = "absolute",
  gapPx = 8,
  className,
}: Props) {
  const restY = gapPx + SLIDE_OFFSET_PX;

  return (
    <motion.div
      aria-hidden={!visible}
      initial={{ opacity: 0, x: "-50%", y: restY }}
      animate={{
        opacity: visible ? 1 : 0,
        x: "-50%",
        y: visible ? gapPx : restY,
      }}
      transition={POPOVER_TRANSITION}
      className={cn(
        "border-rule bg-surface text-ink pointer-events-none z-50 overflow-hidden rounded-sm border text-xs shadow-[0_2px_8px_var(--color-paper-shadow)]",
        position === "fixed" ? "fixed" : "absolute",
        className,
      )}
      style={{
        left: x,
        top: anchorBottom,
      }}
    >
      {title ? (
        <>
          <div className="border-highlight-border bg-highlight-surface relative border-b pr-2 pb-1.5 pl-2">
            <p className="text-highlight-ink pt-1.5 text-[10px] leading-none font-medium">
              {title}
            </p>
            <BookmarkIcon className="text-highlight-ink absolute top-0 right-3" />
          </div>
          <div className="px-2 py-1.5">{children}</div>
        </>
      ) : (
        <div className="px-2 py-1.5">{children}</div>
      )}
    </motion.div>
  );
}
