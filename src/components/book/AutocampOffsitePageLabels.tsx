"use client";

import { SpreadPageLabels } from "./SpreadPageLabels";

const AUTOCAMP_LINES = ["AutoCamp", "Cape Cod", "Offsite"] as const;
const SPRING_LINES = ["Spring", "2023"] as const;

const TOP_REGION_CLASS =
  "pointer-events-none absolute top-14 -left-6 z-25 flex w-[7.5rem] items-start justify-center";

const BOTTOM_REGION_CLASS =
  "pointer-events-none absolute bottom-18 left-[11rem] z-15 flex w-[6.5rem] items-center justify-center";

/** Autocamp / Cape Cod / Offsite + Spring 2023 labels on display page 16 (`bookPages[14]`). */
export function AutocampOffsitePageLabels() {
  return (
    <SpreadPageLabels
      topLines={AUTOCAMP_LINES}
      bottomLines={SPRING_LINES}
      animate={false}
      animationKey={0}
      topRegionClassName={TOP_REGION_CLASS}
      bottomRegionClassName={BOTTOM_REGION_CLASS}
      topBlockAlign="center"
      bottomBlockAlign="center"
    />
  );
}
