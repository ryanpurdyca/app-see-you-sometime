"use client";

import { animate, motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/design-system";
import {
  COVER_OPEN_ANGLE,
  NUM_PAGES,
  PAGE_FAN_SPREAD,
  PAGE_HOVER_LIFT_PX,
  PAGE_Z_STEP,
} from "./constants";

type Props = {
  index: number;
  openness: MotionValue<number>;
  /**
   * null  → idle fan mode.
   * number → reading mode; pages with index < readingPage sit on the left
   *          stack (COVER_OPEN_ANGLE), others sit on the right stack (0°).
   */
  readingPage: number | null;
  /** True when the user is hovering the side of the spread this page belongs to. */
  hovered: boolean;
};

export function Page({ index, openness, readingPage, hovered }: Props) {
  const fanFraction = (index + 1) / (NUM_PAGES + 1);
  const finalAngle = -PAGE_FAN_SPREAD * fanFraction;

  const opensAt = 0.1 + (1 - fanFraction) * 0.5;
  const idleRotateY = useTransform(openness, [opensAt, 1], [0, finalAngle], { clamp: true });

  const isEdgePage = index === NUM_PAGES - 1;

  // Persistent rotateY — always in style, driven by subscription (idle) or
  // imperative spring (reading) so Framer Motion never loses the current angle.
  const rotateY = useMotionValue(idleRotateY.get());

  useEffect(() => {
    if (readingPage === null) {
      rotateY.set(idleRotateY.get());
      return idleRotateY.on("change", (v) => rotateY.set(v));
    }
    const target = index < readingPage ? COVER_OPEN_ANGLE : 0;
    const controls = animate(rotateY, target, { type: "spring", stiffness: 140, damping: 24 });
    return () => controls.stop();
  }, [readingPage, index, idleRotateY, rotateY]);

  // Hover lift: springs translateZ up when the user hovers this page's side.
  const baseTZ = (index + 1) * PAGE_Z_STEP;
  const lift = useMotionValue(0);
  const translateZ = useTransform(lift, (v) => baseTZ + v);

  useEffect(() => {
    const controls = animate(lift, hovered ? PAGE_HOVER_LIFT_PX : 0, {
      type: "spring",
      stiffness: 220,
      damping: 22,
    });
    return () => controls.stop();
  }, [hovered, lift]);

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
