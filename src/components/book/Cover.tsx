"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  type MotionValue,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/design-system";
import { useBookReadingNav } from "./BookReadingContext";
import {
  COVER_OPEN_ANGLE,
  COVER_SHEEN_SPRING,
  PAGE_BASE_PEEL_LEFT_DEG,
  PAGE_HOVER_BOOST_DEG,
  PAGE_Z_STEP,
} from "./constants";

const coverTextStyle = { fontFamily: "var(--font-caveat)" } as const;

/** Orbit amplitude (% of the cover) for each drifting wash centre. */
const SHEEN_DRIFT = 9;
/** Even phase spacing so the five washes drift apart rather than in unison. */
const SHEEN_PHASE = (2 * Math.PI) / 5;

const coverTitleClass = cn(
  "text-cover-ink absolute inset-x-0 text-center text-3xl leading-snug font-bold",
);

type Props = {
  openness: MotionValue<number>;
  /** Sheet count — cover z must sit above the full stack (see Book). */
  numPages: number;
  /** Hides the CoverInside text on mobile where the left page is off-screen. */
  isMobile?: boolean;
  /** Page 0 only: peel the open cover when the left page is hovered (close affordance). */
  closePeelActive?: boolean;
};

/**
 * Front cover of the book. Hinges on its left edge; rotates from 0° (closed)
 * to COVER_OPEN_ANGLE (fully swung open to the left of the spine) as the
 * book's `openness` motion value travels [0 → 1].
 *
 * The cover opens during the first half of the openness range so the inner
 * pages can fan during the second half — see {@link Page} and constants.ts.
 */
export function Cover({ openness, numPages, isMobile = false, closePeelActive = false }: Props) {
  const rotateY = useTransform(openness, [0, 0.55], [0, COVER_OPEN_ANGLE], { clamp: true });
  const hoverPeel = useMotionValue(0);
  const combinedRotY = useTransform(
    [rotateY, hoverPeel],
    ([r, h]) => (r as number) + (h as number),
  );

  useEffect(() => {
    const peel = closePeelActive ? PAGE_BASE_PEEL_LEFT_DEG + PAGE_HOVER_BOOST_DEG : 0;
    const controls = animate(hoverPeel, peel, { type: "spring", stiffness: 220, damping: 22 });
    return () => controls.stop();
  }, [closePeelActive, hoverPeel]);

  // Translate forward so the cover sits above the page stack when closed.
  const translateZ = (numPages + 1) * PAGE_Z_STEP;

  // Iridescent sheen that tracks the pointer across the cover face. The cover
  // can't receive its own pointer events (the perspective container sets
  // `pointerEvents: none`, see §7), so we listen on the window and measure the
  // face's projected rect to derive a local 0–1 position. The sheen is always
  // visible; `hover` lifts wash alphas and overall brightness on the footprint.
  const faceRef = useRef<HTMLDivElement>(null);
  const sheenX = useMotionValue(50);
  const sheenY = useMotionValue(50);
  const hover = useMotionValue(0);
  const smoothX = useSpring(sheenX, COVER_SHEEN_SPRING);
  const smoothY = useSpring(sheenY, COVER_SHEEN_SPRING);
  const smoothHover = useSpring(hover, COVER_SHEEN_SPRING);
  const sheenBrightness = useTransform(smoothHover, [0, 1], [1, 1.14]);
  const sheenCyanAlpha = useTransform(smoothHover, [0, 1], [0.24, 0.3]);
  const sheenMagentaAlpha = useTransform(smoothHover, [0, 1], [0.22, 0.27]);
  const sheenGreenAlpha = useTransform(smoothHover, [0, 1], [0.2, 0.25]);
  const sheenGoldAlpha = useTransform(smoothHover, [0, 1], [0.19, 0.23]);
  const sheenPurpleAlpha = useTransform(smoothHover, [0, 1], [0.22, 0.27]);
  const sheenWhiteAlpha = useTransform(smoothHover, [0, 1], [0.09, 0.11]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = faceRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      hover.set(inside ? 1 : 0);
      if (inside) {
        sheenX.set(x * 100);
        sheenY.set(y * 100);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [sheenX, sheenY, hover]);

  // Gentle continuous drift (radians) so the iridescence shimmers like a
  // holographic sticker even when the pointer is still — no hard conic centre.
  const shimmer = useMotionValue(0);
  useEffect(() => {
    const controls = animate(shimmer, Math.PI * 2, {
      duration: 5,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [shimmer]);

  // Five large washes in distinct hues (cyan, magenta, green, gold, purple)
  // anchored across the cover's corners and centre. Each orbits its anchor at
  // SHEEN_PHASE apart, so they drift in and out of overlap continuously —
  // creating rainbow mixing across the whole surface like a holographic sticker.
  // A soft white pointer-follow adds a specular accent wherever the cursor sits.
  const a1x = useTransform(shimmer, (s) => 22 + Math.cos(s) * SHEEN_DRIFT);
  const a1y = useTransform(shimmer, (s) => 18 + Math.sin(s) * SHEEN_DRIFT);
  const a2x = useTransform(shimmer, (s) => 78 + Math.cos(s + SHEEN_PHASE) * SHEEN_DRIFT);
  const a2y = useTransform(shimmer, (s) => 20 + Math.sin(s + SHEEN_PHASE) * SHEEN_DRIFT);
  const a3x = useTransform(shimmer, (s) => 20 + Math.cos(s + SHEEN_PHASE * 2) * SHEEN_DRIFT);
  const a3y = useTransform(shimmer, (s) => 80 + Math.sin(s + SHEEN_PHASE * 2) * SHEEN_DRIFT);
  const a4x = useTransform(shimmer, (s) => 80 + Math.cos(s + SHEEN_PHASE * 3) * SHEEN_DRIFT);
  const a4y = useTransform(shimmer, (s) => 78 + Math.sin(s + SHEEN_PHASE * 3) * SHEEN_DRIFT);
  const a5x = useTransform(shimmer, (s) => 50 + Math.cos(s + SHEEN_PHASE * 4) * SHEEN_DRIFT);
  const a5y = useTransform(shimmer, (s) => 50 + Math.sin(s + SHEEN_PHASE * 4) * SHEEN_DRIFT);

  const sheenBackground = useMotionTemplate`radial-gradient(90% 80% at ${a1x}% ${a1y}%, rgba(48,188,210,${sheenCyanAlpha}) 0%, rgba(48,188,210,0) 65%), radial-gradient(85% 75% at ${a2x}% ${a2y}%, rgba(220,80,178,${sheenMagentaAlpha}) 0%, rgba(220,80,178,0) 65%), radial-gradient(90% 80% at ${a3x}% ${a3y}%, rgba(52,205,145,${sheenGreenAlpha}) 0%, rgba(52,205,145,0) 65%), radial-gradient(85% 75% at ${a4x}% ${a4y}%, rgba(220,178,62,${sheenGoldAlpha}) 0%, rgba(220,178,62,0) 65%), radial-gradient(80% 70% at ${a5x}% ${a5y}%, rgba(145,98,225,${sheenPurpleAlpha}) 0%, rgba(145,98,225,0) 65%), radial-gradient(50% 50% at ${smoothX}% ${smoothY}%, rgba(255,255,255,${sheenWhiteAlpha}) 0%, rgba(255,255,255,0) 65%)`;

  return (
    <motion.div
      data-testid="book-cover"
      className={cn(
        "absolute inset-0 bg-cover",
        "rounded-[10px]",
        "border-ink border",
        "shadow-[0_4px_12px_rgba(11,13,18,0.06),_0_20px_48px_rgba(11,13,18,0.12)]",
      )}
      style={{
        transformOrigin: "0% 50%",
        transformStyle: "preserve-3d",
        translateZ,
        rotateY: combinedRotY,
      }}
    >
      <div
        aria-hidden
        className="border-cover-border-inner pointer-events-none absolute inset-[3px] rounded-[7px] border"
      />
      <CoverFace
        faceRef={faceRef}
        sheenBackground={sheenBackground}
        sheenBrightness={sheenBrightness}
      />
      <CoverInside hideText={isMobile} />
    </motion.div>
  );
}

type CoverFaceProps = {
  faceRef: React.Ref<HTMLDivElement>;
  sheenBackground: MotionValue<string>;
  sheenBrightness: MotionValue<number>;
};

function CoverFace({ faceRef, sheenBackground, sheenBrightness }: CoverFaceProps) {
  const sheenFilter = useMotionTemplate`brightness(${sheenBrightness})`;
  return (
    <div ref={faceRef} className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
      <img
        src="/images/stickers/vitally-01.svg"
        alt=""
        width={166}
        height={216}
        className="absolute top-[7%] left-[9%] h-auto w-[26%] max-w-[94px] -rotate-6 select-none"
        draggable={false}
      />
      <img
        src="/images/stickers/vitally-02.svg"
        alt=""
        width={216}
        height={155}
        className="absolute right-[7%] bottom-[8%] h-auto w-[42%] max-w-[138px] rotate-[7deg] select-none"
        draggable={false}
      />
      <p
        className={cn(
          coverTitleClass,
          "top-1/2 left-1/2 w-full max-w-[85%] -translate-x-1/2 -translate-y-1/2 px-6",
        )}
        style={coverTextStyle}
      >
        Memories from
        <br />
        my time at Vitally
      </p>
      {/* Iridescent sheen — screen-blended so it only adds light over the black
          cover (and brightens the white type/artwork it passes), never darkens. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[10px]"
        style={{
          background: sheenBackground,
          filter: sheenFilter,
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}

function CoverInside({ hideText = false }: { hideText?: boolean }) {
  const readingNav = useBookReadingNav();

  return (
    <div
      className={cn(
        "bg-surface-raised absolute inset-0 flex items-center justify-center rounded-[10px] p-8",
        readingNav?.coverPageInteractive && "pointer-events-auto cursor-pointer",
      )}
      style={{
        transform: "rotateY(180deg) translateZ(1px)",
        backfaceVisibility: "hidden",
      }}
      onMouseEnter={readingNav?.coverPageInteractive ? readingNav.onCoverPagePointer : undefined}
      onMouseLeave={readingNav?.coverPageInteractive ? readingNav.onCoverPageLeave : undefined}
      onClick={readingNav?.coverPageInteractive ? readingNav.onCoverPageClick : undefined}
    >
      {!hideText && (
        <p
          className="text-ink pointer-events-none px-4 text-center text-2xl leading-snug font-bold"
          style={coverTextStyle}
        >
          Some of the folks who made my time special.
        </p>
      )}
    </div>
  );
}
