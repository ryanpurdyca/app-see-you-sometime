"use client";

import { useBookReadingNav } from "./BookReadingContext";
import { SpreadPageLabels } from "./SpreadPageLabels";

const NASHVILLE_LINES = ["Nashville", "PDE", "Offsite"] as const;
const WINTER_LINES = ["Winter", "2025"] as const;

/** Nashville / PDE / Offsite + Winter 2025 labels on the Nashville spread (bookPages[5]). */
export function NashvilleOffsitePageLabels() {
  const readingNav = useBookReadingNav();

  return (
    <SpreadPageLabels
      topLines={NASHVILLE_LINES}
      bottomLines={WINTER_LINES}
      animate={readingNav?.nashvilleOffsiteLabelsAnimate ?? false}
      animationKey={readingNav?.nashvilleOffsiteLabelsKey ?? 0}
      topRegionClassName="pointer-events-none absolute top-14 -left-6 z-25 flex w-[7.5rem] items-start justify-center"
      topBlockAlign="center"
      bottomRegionClassName="pointer-events-none absolute bottom-18 left-[11rem] z-15 flex w-[6.5rem] items-center justify-center"
      bottomBlockAlign="center"
    />
  );
}
