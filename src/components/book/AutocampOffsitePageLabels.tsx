"use client";

import { SpreadPageLabels } from "./SpreadPageLabels";

const AUTOCAMP_LINES = ["Autocamp", "Cape Cod", "Offsite"] as const;
const SPRING_LINES = ["Spring", "2023"] as const;

const CENTERED_TOP_REGION_CLASS =
  "pointer-events-none absolute inset-x-0 top-8 bottom-1/2 z-10 flex items-center justify-center";

const CENTERED_BOTTOM_REGION_CLASS =
  "pointer-events-none absolute inset-x-0 top-1/2 bottom-8 z-10 flex items-center justify-center";

/** Autocamp / Cape Cod / Offsite + Spring 2023 labels on page 15 (`bookPages[14]`). */
export function AutocampOffsitePageLabels() {
  return (
    <SpreadPageLabels
      topLines={AUTOCAMP_LINES}
      bottomLines={SPRING_LINES}
      animate={false}
      animationKey={0}
      topRegionClassName={CENTERED_TOP_REGION_CLASS}
      bottomRegionClassName={CENTERED_BOTTOM_REGION_CLASS}
      topBlockAlign="center"
      bottomBlockAlign="center"
    />
  );
}
