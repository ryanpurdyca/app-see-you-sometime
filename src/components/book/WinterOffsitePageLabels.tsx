"use client";

import { useBookReadingNav } from "./BookReadingContext";
import { SpreadPageLabels } from "./SpreadPageLabels";

const PRODUCT_LINES = ["Product", "Team", "Offsite"] as const;
const WINTER_LINES = ["Winter", "2026"] as const;

/** Product / Team / Offsite + Winter 2026 labels on the winter offsite spread (bookPages[3]). */
export function WinterOffsitePageLabels() {
  const readingNav = useBookReadingNav();

  return (
    <SpreadPageLabels
      topLines={PRODUCT_LINES}
      bottomLines={WINTER_LINES}
      animate={readingNav?.winterOffsiteLabelsAnimate ?? false}
      animationKey={readingNav?.winterOffsiteLabelsKey ?? 0}
      topRegionClassName="pointer-events-none absolute top-2 left-4 z-25 flex max-w-[7rem] items-start"
      bottomRegionClassName="pointer-events-none absolute right-7 bottom-8 z-15 flex max-w-[6rem] items-end"
      topBlockAlign="left"
      bottomBlockAlign="right"
    />
  );
}
