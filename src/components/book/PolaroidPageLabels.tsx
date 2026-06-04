"use client";

import { useBookReadingNav } from "./BookReadingContext";
import { SpreadPageLabels } from "./SpreadPageLabels";

const AUTOCAMP_LINES = ["AutoCamp", "Catskills", "Offsite"] as const;
const SPRING_LINES = ["Spring", "2026"] as const;

/** Autocamp / Catskills / Offsite + Spring 2026 labels on the polaroid preview spread (bookPages[1]). */
export function PolaroidPageLabels() {
  const readingNav = useBookReadingNav();

  return (
    <SpreadPageLabels
      topLines={AUTOCAMP_LINES}
      bottomLines={SPRING_LINES}
      animate={readingNav?.polaroidPreviewLabelsAnimate ?? false}
      animationKey={readingNav?.polaroidPreviewLabelsKey ?? 0}
    />
  );
}
