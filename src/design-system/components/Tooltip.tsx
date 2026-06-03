"use client";

import { motion } from "framer-motion";
import { cn } from "../cn";

const FADE_TRANSITION = { duration: 0.22, ease: [0.22, 0.61, 0.36, 1] as const };

type Props = {
  label: string;
  /** Center X in the positioning parent's coordinate space (px). */
  x: number;
  /** Center Y in the positioning parent's coordinate space (px). */
  y: number;
  visible: boolean;
  /** `fixed` for viewport coords (e.g. portaled tooltips); default `absolute`. */
  position?: "absolute" | "fixed";
  /** Gap between the anchor point and the bottom of the tooltip (px). */
  gapPx?: number;
  className?: string;
};

/**
 * Presentational label tooltip. Does not capture pointer events so it never
 * interferes with hit targets or layout simulations beneath it.
 */
export function Tooltip({
  label,
  x,
  y,
  visible,
  position = "absolute",
  gapPx = 12,
  className,
}: Props) {
  return (
    <motion.div
      role="tooltip"
      aria-hidden={!visible}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={FADE_TRANSITION}
      className={cn(
        "bg-ink pointer-events-none z-50 rounded-sm px-2 py-1 font-mono text-xs whitespace-nowrap text-white",
        position === "fixed" ? "fixed" : "absolute",
        className,
      )}
      style={{
        left: x,
        top: y,
        transform: `translate(-50%, calc(-100% - ${gapPx}px))`,
      }}
    >
      {label}
    </motion.div>
  );
}
