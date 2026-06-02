"use client";

import type { ComponentProps } from "react";
import { cn, Polaroid } from "@/design-system";
import { useBookReadingNav } from "./BookReadingContext";

/**
 * Polaroid wired for reading mode — forwards clicks to page nav by spine X
 * (same semantics as the left/right nav overlays behind the 3D scene).
 */
export function BookPolaroid({ className, onClick, ...rest }: ComponentProps<typeof Polaroid>) {
  const readingNav = useBookReadingNav();

  return (
    <Polaroid
      {...rest}
      className={cn(readingNav && "cursor-pointer", className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          readingNav?.onPageFaceClick(e.clientX);
        }
      }}
    />
  );
}
