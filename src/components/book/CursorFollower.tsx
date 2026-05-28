"use client";

import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { type BookMode } from "./BookButtons";

type Props = {
  openness: MotionValue<number>;
  mode: BookMode;
  hoveringBook: boolean;
};

export function CursorFollower({ openness, mode, hoveringBook }: Props) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 250, damping: 25 });
  const y = useSpring(rawY, { stiffness: 250, damping: 25 });
  const modeScale = useMotionValue(1);
  const hoverScale = useMotionValue(0);
  const opacity = useTransform([openness, modeScale, hoverScale], ([o, m, h]) => {
    const nearEnd = Math.min(1, Math.max(0, ((o as number) - 0.65) / 0.3));
    return nearEnd * (m as number) * (h as number);
  });
  const [hasMoved, setHasMoved] = useState(false);
  const hasMovedRef = useRef(false);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        // Snap to cursor on first appearance — no spring sweep from (0,0)
        x.set(e.clientX);
        y.set(e.clientY);
        setHasMoved(true);
      }
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y, rawX, rawY]);

  useEffect(() => {
    animate(modeScale, mode === "reading" ? 0 : 1, { duration: 0.2 });
  }, [mode, modeScale]);

  useEffect(() => {
    animate(hoverScale, hoveringBook ? 1 : 0, { duration: 0.15 });
  }, [hoveringBook, hoverScale]);

  if (!hasMoved) return null;

  return (
    <motion.div
      className="bg-ink pointer-events-none fixed z-50 flex items-center justify-center rounded-full px-4 py-2 font-medium text-white"
      style={{
        top: 0,
        left: 0,
        x,
        y,
        translateX: "20px",
        translateY: "14px",
        opacity,
        fontSize: "12px",
      }}
    >
      Open
    </motion.div>
  );
}
