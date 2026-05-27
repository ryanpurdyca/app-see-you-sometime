"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { Cover } from "./Cover";
import { Page } from "./Page";
import { BackCover } from "./BackCover";
import {
  BOOK_WIDTH_PX,
  NUM_PAGES,
  OPEN_CENTRE_OFFSET,
  OPENNESS_SPRING,
  SCENE_PERSPECTIVE_PX,
  SCENE_TILT_X_DEG,
  SCENE_TILT_Z_DEG,
} from "./constants";

/**
 * Interactive 3D book. The user's pointer X position drives the book's
 * `openness` value (0 = closed at the right edge of the viewport, 1 = open
 * at the left edge). A spring smooths the raw input so quick flicks settle
 * naturally instead of snapping.
 *
 * The book is drawn entirely with CSS borders, gradients, and an SVG
 * halftone — no raster textures or imported images.
 */
export function Book() {
  const openness = useMotionValue(0);
  const smoothOpenness = useSpring(openness, OPENNESS_SPRING);

  useEffect(() => {
    const setFromClientX = (clientX: number) => {
      const w = window.innerWidth || 1;
      // Fully closed when cursor reaches the right edge of the closed book;
      // fully open when cursor reaches the left edge of the fully-open spread.
      // Spine sits at screen centre (w/2), book extends ±BOOK_WIDTH_PX from it.
      const spineX = w / 2;
      const closeAt = spineX + BOOK_WIDTH_PX;
      const openAt = spineX - BOOK_WIDTH_PX;
      const clamped = Math.max(openAt, Math.min(closeAt, clientX));
      openness.set(1 - (clamped - openAt) / (closeAt - openAt));
    };

    const onPointerMove = (e: PointerEvent) => setFromClientX(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setFromClientX(t.clientX);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [openness]);

  return (
    <div
      data-testid="book-root"
      className="flex items-center justify-center"
      style={{
        perspective: `${SCENE_PERSPECTIVE_PX}px`,
        perspectiveOrigin: "50% 45%",
      }}
    >
      <div
        className="relative"
        style={{
          width: "var(--book-width)",
          height: "var(--book-height)",
          left: OPEN_CENTRE_OFFSET,
          transformStyle: "preserve-3d",
          transform: `rotateX(${SCENE_TILT_X_DEG}deg) rotateZ(${SCENE_TILT_Z_DEG}deg)`,
        }}
      >
        <BackCover />
        {Array.from({ length: NUM_PAGES }, (_, i) => (
          <Page key={i} index={i} openness={smoothOpenness} />
        ))}
        <Cover openness={smoothOpenness} />
      </div>
    </div>
  );
}
