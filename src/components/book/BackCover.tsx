"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/design-system";
import { BookPolaroid } from "./BookPolaroid";
const BYE_POLAROID_IMG = "/images/images/Portrait/portrait.png";

type Props = {
  openness: MotionValue<number>;
  insideBackCoverIndex: number;
};

/**
 * Back of the book — static, sits behind every page. Provides the visible
 * outline you see in the reference fully-open state and prevents the page
 * stack from looking floating when the front cover swings away.
 *
 * Faded out when the book is closed/mid-closing so the front cover swings
 * cleanly without a "stuck" outline visible behind it.
 */
export function BackCover({ openness, insideBackCoverIndex }: Props) {
  const opacity = useTransform(openness, [0.55, 1], [0, 1], { clamp: true });

  return (
    <motion.div
      data-testid="book-back-cover"
      className={cn(
        "border-ink bg-surface absolute inset-0",
        "rounded-[10px] border",
        "shadow-[0_4px_12px_rgba(11,13,18,0.06),_0_20px_48px_rgba(11,13,18,0.12)]",
      )}
      style={{
        transformStyle: "preserve-3d",
        transform: "translateZ(0px)",
        opacity,
      }}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
        <BookPolaroid
          bookPageIndex={insideBackCoverIndex}
          className="z-10"
          image={BYE_POLAROID_IMG}
          alt="Portrait"
          caption="See you sometime"
          rotation={-2}
          tape={2}
          tapeRotation={1}
        />
      </div>
    </motion.div>
  );
}
