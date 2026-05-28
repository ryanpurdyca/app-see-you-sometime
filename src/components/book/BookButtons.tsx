"use client";

import { AnimatePresence, motion, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState } from "react";
import { Button } from "@/design-system";

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
}: Props) {
  const [interactive, setInteractive] = useState(false);

  useMotionValueEvent(openness, "change", (v) => {
    setInteractive(v > 0.15);
  });

  const isReading = mode === "reading";
  const showBack = isReading && currentPage > 0;
  const pageWord = currentPage === 0 ? "Page" : "Pages";
  const pageLeft = currentPage === 0 ? "1" : `${currentPage * 2}`;
  const pageRight = currentPage === 0 ? null : `${currentPage * 2 + 1}`;

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
      {/* Book metadata labels — only visible in reading mode, fade with openness */}
      {isReading && (
        <>
          <motion.span
            className="text-ink-subtle pointer-events-none absolute font-mono text-sm"
            style={{
              opacity: openness,
              left: "calc(50vw - var(--book-width))",
              top: "calc(50vh - var(--book-height) / 2 - 56px)",
            }}
          >
            Ryan Purdy
          </motion.span>
          <motion.span
            className="text-ink-subtle pointer-events-none absolute font-mono text-sm"
            style={{
              opacity: openness,
              right: "calc(50vw - var(--book-width))",
              top: "calc(50vh - var(--book-height) / 2 - 56px)",
            }}
          >
            Spring 2026
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
        {/* Left group — Back fades in once past page 0 */}
        <div className="flex items-center gap-2">
          <Button variant="primary" onClick={isReading ? onNext : onRead}>
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

        {/* Centered page label — only in reading mode */}
        {isReading && (
          <span className="text-ink-subtle absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center font-mono text-sm">
            <span>{pageWord}&nbsp;</span>
            <AnimatedNumber value={pageLeft} dir={dir} />
            {pageRight && (
              <>
                <span>-</span>
                <AnimatedNumber value={pageRight} dir={dir} staggerOffset={1} />
              </>
            )}
          </span>
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
