"use client";

import { AnimatePresence, motion, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState } from "react";
import { cn } from "@/design-system";

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

  return (
    <motion.div
      className="absolute flex items-center justify-between"
      style={{
        left: "calc(50vw - var(--book-width))",
        top: "calc(50vh + var(--book-height) / 2 + 32px)",
        width: "calc(var(--book-width) * 2)",
        opacity: openness,
        pointerEvents: interactive ? "auto" : "none",
      }}
    >
      {/* Left group — Back fades in beside Next once past page 0 */}
      <div className="flex items-center gap-2">
        <Btn onClick={isReading ? onNext : onRead}>{isReading ? "Next" : "Read"}</Btn>
        <AnimatePresence>
          {showBack && (
            <motion.div
              key="back"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Btn onClick={onBack}>Back</Btn>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right button — always Close in reading mode, Close in idle */}
      <Btn onClick={isReading ? onClose : onCancel}>Close</Btn>
    </motion.div>
  );
}

function Btn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-full border px-5 py-2 text-sm font-medium",
        "border-accent/40 text-ink-muted bg-transparent",
        "hover:border-accent hover:text-ink transition-colors duration-150",
      )}
    >
      {children}
    </button>
  );
}
