"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../cn";

const FADE_TRANSITION = { duration: 0.16, ease: [0.22, 0.61, 0.36, 1] as const };

type Props = {
  /** Center X in the positioning parent's coordinate space (px). */
  x: number;
  /** Bottom edge of the anchor element (px). */
  anchorBottom: number;
  visible: boolean;
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
  children,
  position = "absolute",
  gapPx = 8,
  className,
}: Props) {
  return (
    <motion.div
      aria-hidden={!visible}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={FADE_TRANSITION}
      className={cn(
        "border-rule bg-surface text-ink pointer-events-none z-50 rounded-sm border px-2 py-1.5 text-xs shadow-[0_2px_8px_var(--color-paper-shadow)]",
        position === "fixed" ? "fixed" : "absolute",
        className,
      )}
      style={{
        left: x,
        top: anchorBottom,
        transform: `translate(-50%, ${gapPx}px)`,
      }}
    >
      {children}
    </motion.div>
  );
}
