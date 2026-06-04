"use client";

import { SpreadPageLabels } from "./SpreadPageLabels";

const LEADERSHIP_LINES = ["Leadership", "Offsite"] as const;
const FALL_LINES = ["Fall", "2023"] as const;

const TOP_REGION_CLASS =
  "pointer-events-none absolute top-14 -left-6 z-25 flex w-[7.5rem] items-start justify-center";

const BOTTOM_REGION_CLASS =
  "pointer-events-none absolute bottom-18 left-[11rem] z-15 flex w-[6.5rem] items-center justify-center";

/** Leadership / Offsite + Fall 2023 labels on display page 14 (`bookPages[12]`). */
export function LeadershipOffsitePageLabels() {
  return (
    <SpreadPageLabels
      topLines={LEADERSHIP_LINES}
      bottomLines={FALL_LINES}
      animate={false}
      animationKey={0}
      topRegionClassName={TOP_REGION_CLASS}
      bottomRegionClassName={BOTTOM_REGION_CLASS}
      topBlockAlign="center"
      bottomBlockAlign="center"
    />
  );
}
