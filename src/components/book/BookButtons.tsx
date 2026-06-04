"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/design-system";
import { MAX_READING_PAGE_INDEX, spreadPageRange } from "./constants";
import { PageStepper } from "./PageStepper";

export type BookMode = "idle" | "reading";

type Props = {
  openness: MotionValue<number>;
  mode: BookMode;
  currentPage: number;
  onRead: () => void;
  onCancel: () => void;
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
  onGoToDisplayPage: (displayPage: number) => void;
};

export function BookButtons({
  openness,
  mode,
  currentPage,
  onRead,
  onCancel,
  onNext,
  onBack,
  onClose,
  onGoToDisplayPage,
}: Props) {
  const [interactive, setInteractive] = useState(false);

  useMotionValueEvent(openness, "change", (v) => {
    setInteractive(v > 0.15);
  });

  const isReading = mode === "reading";
  const isAtEnd = isReading && currentPage >= MAX_READING_PAGE_INDEX;
  const showBack = isReading && currentPage > 0;

  // Starts at 0 each time reading mode is entered so labels fade in even when
  // openness is already 1. Multiplied with openness so they fade out naturally
  // as the book closes.
  const readingLabelOpacity = useMotionValue(0);
  const labelOpacity = useTransform(
    [readingLabelOpacity, openness],
    ([r, o]) => (r as number) * (o as number),
  );

  useEffect(() => {
    if (isReading) {
      readingLabelOpacity.set(0);
      const controls = animate(readingLabelOpacity, 1, { duration: 0.35, ease: "easeOut" });
      return () => controls.stop();
    } else {
      readingLabelOpacity.set(0);
    }
  }, [isReading, readingLabelOpacity]);
  const pageWord = "Pages";
  const spread = spreadPageRange(currentPage);
  const pageLeft = `${spread.left}`;
  const pageRight = `${spread.right}`;

  // Track direction so numbers roll up on Next and down on Back.
  // Render-phase state update: React re-renders immediately, letting us
  // read the committed previous value before it's overwritten.
  const [prevPage, setPrevPage] = useState(currentPage);
  const [dir, setDir] = useState(1);
  if (prevPage !== currentPage) {
    setDir(currentPage > prevPage ? 1 : -1);
    setPrevPage(currentPage);
  }

  return (
    <>
      {/* Book metadata labels — only visible in reading mode, fade in on enter
          and fade out with openness as the book closes. */}
      {isReading && (
        <>
          <motion.span
            className="text-ink-subtle pointer-events-none absolute font-mono text-sm"
            style={{
              opacity: labelOpacity,
              left: "calc(50vw - var(--book-width))",
              top: "calc(50vh - var(--book-height) / 2 - 56px)",
            }}
          >
            Ryan Purdy
          </motion.span>
          <motion.span
            className="text-ink-subtle pointer-events-none absolute font-mono text-sm"
            style={{
              opacity: labelOpacity,
              right: "calc(50vw - var(--book-width))",
              top: "calc(50vh - var(--book-height) / 2 - 56px)",
            }}
          >
            2022-2026
          </motion.span>
          {/* Centered page label — final spread is Pages 21–22 (last verso +
              inside back cover). Fades with labelOpacity on close. */}
          <motion.span
            className="text-ink-subtle pointer-events-none absolute left-1/2 flex -translate-x-1/2 items-center font-mono text-sm"
            style={{
              opacity: labelOpacity,
              top: "calc(50vh - var(--book-height) / 2 - 56px)",
            }}
          >
            <span>{pageWord}&nbsp;</span>
            <AnimatedNumber value={pageLeft} dir={dir} />
            {pageRight && (
              <>
                <span>-</span>
                <AnimatedNumber value={pageRight} dir={dir} staggerOffset={1} />
              </>
            )}
          </motion.span>
        </>
      )}

      <motion.div
        className="absolute flex items-center justify-between"
        style={{
          left: "calc(50vw - var(--book-width))",
          top: "calc(50vh + var(--book-height) / 2 + 52px)",
          width: "calc(var(--book-width) * 2)",
          opacity: openness,
          pointerEvents: interactive ? "auto" : "none",
        }}
      >
        {/* Left group — Next disabled at back cover; Back fades in once past page 0 */}
        <div className="flex items-center gap-2">
          <Button variant="primary" onClick={isReading ? onNext : onRead} disabled={isAtEnd}>
            {isReading ? "Next" : "Open"}
          </Button>
          <AnimatePresence>
            {showBack && (
              <motion.div
                key="back"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Button variant="supporting" onClick={onBack}>
                  Back
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isReading && (
          <div className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <PageStepper currentPage={currentPage} onGoToDisplayPage={onGoToDisplayPage} />
          </div>
        )}

        {/* Right button */}
        <Button variant="secondary" onClick={isReading ? onClose : onCancel}>
          Close
        </Button>
      </motion.div>
    </>
  );
}

function AnimatedNumber({
  value,
  dir,
  staggerOffset = 0,
}: {
  value: string;
  dir: number;
  staggerOffset?: number;
}) {
  const [snapshot, setSnapshot] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  if (value !== snapshot) {
    setPrevValue(snapshot);
    setSnapshot(value);
  }

  const digits = value.split("");
  const prevDigits = prevValue.split("");

  // If digit count changed, animate the whole number as a block.
  if (digits.length !== prevDigits.length) {
    return (
      <span className="inline-block overflow-hidden leading-none" style={{ height: "1em" }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            className="inline-block"
            initial={{ y: dir * 18 }}
            animate={{ y: 0 }}
            exit={{ y: dir * -18 }}
            transition={{
              duration: 0.18,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: staggerOffset * 0.06,
            }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  }

  return (
    <>
      {digits.map((digit, i) =>
        digit === prevDigits[i] ? (
          <span key={i}>{digit}</span>
        ) : (
          <span
            key={i}
            className="inline-block overflow-hidden leading-none"
            style={{ height: "1em" }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={digit}
                className="inline-block"
                initial={{ y: dir * 18 }}
                animate={{ y: 0 }}
                exit={{ y: dir * -18 }}
                transition={{
                  duration: 0.18,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: (staggerOffset + i) * 0.06,
                }}
              >
                {digit}
              </motion.span>
            </AnimatePresence>
          </span>
        ),
      )}
    </>
  );
}
