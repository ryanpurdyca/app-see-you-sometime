"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { HalftoneSquare, cn } from "@/design-system";
import { COVER_OPEN_ANGLE, NUM_PAGES, PAGE_Z_STEP } from "./constants";

type Props = {
  openness: MotionValue<number>;
};

/**
 * Front cover of the book. Hinges on its left edge; rotates from 0° (closed)
 * to COVER_OPEN_ANGLE (fully swung open to the left of the spine) as the
 * book's `openness` motion value travels [0 → 1].
 *
 * The cover opens during the first half of the openness range so the inner
 * pages can fan during the second half — see {@link Page} and constants.ts.
 */
export function Cover({ openness }: Props) {
  const rotateY = useTransform(openness, [0, 0.55], [0, COVER_OPEN_ANGLE], { clamp: true });

  // Translate forward so the cover sits above the page stack when closed.
  const translateZ = (NUM_PAGES + 1) * PAGE_Z_STEP;

  return (
    <motion.div
      data-testid="book-cover"
      className={cn(
        "bg-surface absolute inset-0",
        "rounded-[10px]",
        "border-accent border",
        "shadow-[0_18px_40px_-20px_var(--color-paper-shadow)]",
      )}
      style={{
        transformOrigin: "0% 50%",
        transformStyle: "preserve-3d",
        translateZ,
        rotateY,
      }}
    >
      <div
        aria-hidden
        className="border-accent pointer-events-none absolute inset-[3px] rounded-[7px] border"
      />
      <CoverFace />
      <CoverInside />
    </motion.div>
  );
}

function CoverFace() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-7 px-6"
      style={{ backfaceVisibility: "hidden" }}
    >
      <HalftoneSquare size={132} resolution={26} />
      <div className="flex flex-col items-center gap-2">
        <span className="text-ink text-2xl font-semibold tracking-tight">blank.</span>
        <span className="text-ink-muted text-sm">Interactive 3D Book</span>
      </div>
    </div>
  );
}

function CoverInside() {
  return (
    <div
      className="bg-surface-raised border-accent-soft absolute inset-0 rounded-[10px] border"
      style={{
        transform: "rotateY(180deg) translateZ(1px)",
        backfaceVisibility: "hidden",
      }}
    />
  );
}
