"use client";

import { cn } from "@/design-system";
import {
  isDisplayPageInSpread,
  PAGE_STEPPER_HEIGHT_PX,
  PAGE_STEPPER_PAD_X_PX,
  PAGE_STEPPER_WIDTH_PX,
  READING_PAGE_COUNT,
} from "./constants";

type Props = {
  currentPage: number;
  onGoToDisplayPage: (displayPage: number) => void;
};

export function PageStepper({ currentPage, onGoToDisplayPage }: Props) {
  const lastPage = READING_PAGE_COUNT;

  return (
    <nav className="flex items-center" aria-label="Page navigation">
      {Array.from({ length: READING_PAGE_COUNT }, (_, i) => {
        const displayPage = i + 1;
        const selected = isDisplayPageInSpread(displayPage, currentPage);
        const padLeft = displayPage === 1 ? 0 : PAGE_STEPPER_PAD_X_PX;
        const padRight = displayPage === lastPage ? 0 : PAGE_STEPPER_PAD_X_PX;

        return (
          <button
            key={displayPage}
            type="button"
            className="flex shrink-0 cursor-pointer items-center border-0 bg-transparent p-0"
            style={{ paddingLeft: padLeft, paddingRight: padRight }}
            aria-label={`Page ${displayPage}`}
            aria-current={selected ? "step" : undefined}
            onMouseEnter={() => onGoToDisplayPage(displayPage)}
            onFocus={() => onGoToDisplayPage(displayPage)}
            onClick={() => onGoToDisplayPage(displayPage)}
          >
            <span
              className={cn(
                "block shrink-0 rounded-full transition-colors",
                selected ? "bg-stepper-active" : "bg-stepper",
              )}
              style={{
                width: PAGE_STEPPER_WIDTH_PX,
                height: PAGE_STEPPER_HEIGHT_PX,
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
