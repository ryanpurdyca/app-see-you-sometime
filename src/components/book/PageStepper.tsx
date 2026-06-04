"use client";

import { cn } from "@/design-system";
import {
  isDisplayPageInSpread,
  PAGE_STEPPER_GAP_PX,
  PAGE_STEPPER_HEIGHT_PX,
  PAGE_STEPPER_WIDTH_PX,
  READING_PAGE_COUNT,
} from "./constants";

type Props = {
  currentPage: number;
  onGoToDisplayPage: (displayPage: number) => void;
};

export function PageStepper({ currentPage, onGoToDisplayPage }: Props) {
  return (
    <nav
      className="flex items-center"
      style={{ gap: PAGE_STEPPER_GAP_PX }}
      aria-label="Page navigation"
    >
      {Array.from({ length: READING_PAGE_COUNT }, (_, i) => {
        const displayPage = i + 1;
        const selected = isDisplayPageInSpread(displayPage, currentPage);
        return (
          <button
            key={displayPage}
            type="button"
            className={cn(
              "shrink-0 cursor-pointer rounded-full border-0 p-0 transition-colors",
              selected ? "bg-stepper-active" : "bg-stepper",
            )}
            style={{
              width: PAGE_STEPPER_WIDTH_PX,
              height: PAGE_STEPPER_HEIGHT_PX,
            }}
            aria-label={`Page ${displayPage}`}
            aria-current={selected ? "step" : undefined}
            onMouseEnter={() => onGoToDisplayPage(displayPage)}
            onFocus={() => onGoToDisplayPage(displayPage)}
            onClick={() => onGoToDisplayPage(displayPage)}
          />
        );
      })}
    </nav>
  );
}
