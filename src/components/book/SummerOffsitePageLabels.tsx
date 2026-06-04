"use client";

import { useBookReadingNav } from "./BookReadingContext";
import { SpreadPageLabels } from "./SpreadPageLabels";

const PRODUCT_LINES = ["Product", "Team", "Offsite"] as const;
const SUMMER_LINES = ["Summer", "2024"] as const;

/** Product / Team / Offsite + Summer 2024 labels on the summer offsite spread (bookPages[9]). */
export function SummerOffsitePageLabels() {
  const readingNav = useBookReadingNav();

  return (
    <SpreadPageLabels
      topLines={PRODUCT_LINES}
      bottomLines={SUMMER_LINES}
      animate={readingNav?.summerOffsiteLabelsAnimate ?? false}
      animationKey={readingNav?.summerOffsiteLabelsKey ?? 0}
    />
  );
}
