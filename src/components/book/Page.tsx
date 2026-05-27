"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { cn } from "@/design-system";
import { NUM_PAGES, PAGE_FAN_SPREAD, PAGE_Z_STEP } from "./constants";

type Props = {
  /** 0 = innermost page (against the back cover), NUM_PAGES-1 = outermost (just inside the front cover). */
  index: number;
  openness: MotionValue<number>;
};

/**
 * A single hinged page. Pages stagger their opening so that the cover lifts
 * first; the outermost page follows just behind the cover, and each page
 * inward lags a little more. At full openness, pages settle into a fan whose
 * outer edge approaches the cover's open angle and whose innermost page
 * barely lifts off the back cover — matching the reference fan-of-pages.
 */
export function Page({ index, openness }: Props) {
  // Higher index = more outward = opens earlier and farther.
  const fanFraction = (index + 1) / (NUM_PAGES + 1);
  const finalAngle = -PAGE_FAN_SPREAD * fanFraction;

  // Pages start lifting just after the cover begins, with the outermost page
  // leading and each inner page lagging slightly. All complete by openness = 1
  // so the fan is fully spread at the leftmost cursor position.
  const opensAt = 0.1 + (1 - fanFraction) * 0.5;
  const rotateY = useTransform(openness, [opensAt, 1], [0, finalAngle], { clamp: true });

  const translateZ = (index + 1) * PAGE_Z_STEP;

  // Inner pages are slightly cooler/dimmer; outermost page picks up subtle accent edge.
  const isEdgePage = index === NUM_PAGES - 1;

  return (
    <motion.div
      data-testid="book-page"
      data-index={index}
      className={cn(
        "bg-paper absolute inset-0",
        "rounded-l-[8px] rounded-r-[8px]",
        isEdgePage ? "border-accent/70 border" : "border-paper-edge border",
      )}
      style={{
        transformOrigin: "0% 50%",
        transformStyle: "preserve-3d",
        translateZ,
        rotateY,
      }}
    >
      {/* Subtle gradient hints at page curvature without using an image. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-l-[8px] rounded-r-[8px]"
        style={{
          background:
            "linear-gradient(to right, rgba(11,13,18,0.04) 0%, transparent 8%, transparent 92%, rgba(11,13,18,0.03) 100%)",
        }}
      />
    </motion.div>
  );
}
