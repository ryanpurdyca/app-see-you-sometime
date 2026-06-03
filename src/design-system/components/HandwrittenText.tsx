"use client";

import { motion } from "framer-motion";
import { cn } from "../cn";

const EASE = [0.22, 0.61, 0.36, 1] as const;
export const HANDWRITTEN_LETTER_STAGGER_S = 0.048;
export const HANDWRITTEN_LETTER_DURATION_S = 0.14;

const LETTER_STAGGER_S = HANDWRITTEN_LETTER_STAGGER_S;

const letterVariants = {
  hidden: { opacity: 0, y: 5, rotate: -10, scale: 0.72 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: HANDWRITTEN_LETTER_DURATION_S, ease: EASE },
  },
};

type Props = {
  text: string;
  /** When false, render static text (no letter animation). */
  animate?: boolean;
  /** Delay before the first letter (seconds). */
  delayChildren?: number;
  className?: string;
};

/**
 * Caveat label with optional per-letter “handwriting” reveal (staggered opacity +
 * slight rotation). Uses `--font-caveat` inline for reliable runtime resolution.
 */
export function HandwrittenText({ text, animate = true, delayChildren = 0, className }: Props) {
  const style = { fontFamily: "var(--font-caveat)" } as const;

  if (!animate) {
    return (
      <span className={cn("font-bold", className)} style={style}>
        {text}
      </span>
    );
  }

  return (
    <motion.span
      className={cn("inline-flex font-bold", className)}
      style={style}
      aria-hidden
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: LETTER_STAGGER_S, delayChildren },
        },
      }}
    >
      {Array.from(text).map((char, i) => (
        <motion.span
          key={`${i}-${char}`}
          className="inline-block origin-bottom-left"
          variants={letterVariants}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </motion.span>
  );
}
