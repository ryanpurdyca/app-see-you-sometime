"use client";

import { SpreadPageLabels } from "./SpreadPageLabels";

const NYC_LINES = ["NYC", "Holiday", "Offsite"] as const;
const WINTER_LINES = ["Winter", "2022"] as const;

const TOP_REGION_CLASS =
  "pointer-events-none absolute top-14 -left-6 z-25 flex w-[7.5rem] items-start justify-center";

const BOTTOM_REGION_CLASS =
  "pointer-events-none absolute bottom-18 left-[11rem] z-15 flex w-[6.5rem] items-center justify-center";

/** NYC / Holiday / Offsite + Winter 2022 labels on page 18 (`bookPages[17]`). */
export function NycHolidayOffsitePageLabels() {
  return (
    <SpreadPageLabels
      topLines={NYC_LINES}
      bottomLines={WINTER_LINES}
      animate={false}
      animationKey={0}
      topRegionClassName={TOP_REGION_CLASS}
      bottomRegionClassName={BOTTOM_REGION_CLASS}
      topBlockAlign="center"
      bottomBlockAlign="center"
    />
  );
}
