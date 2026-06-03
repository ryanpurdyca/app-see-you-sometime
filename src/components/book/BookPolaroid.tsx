"use client";

import { useState, type ComponentProps } from "react";
import { cn, ImageLightbox, Polaroid } from "@/design-system";
import { useBookReadingNav } from "./BookReadingContext";

type Props = ComponentProps<typeof Polaroid> & {
  /** Index in `bookPages` for this face — gates pointer events to the active spread. */
  bookPageIndex: number;
};

/**
 * Polaroid that opens a full-screen lightbox on click (does not trigger page turns).
 * Only interactive when its page face is visible on the current reading spread.
 */
export function BookPolaroid({
  className,
  onClick,
  image,
  alt,
  caption,
  bookPageIndex,
  ...rest
}: Props) {
  const readingNav = useBookReadingNav();
  const interactive = readingNav?.isPolaroidFaceActive(bookPageIndex) ?? false;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isLightboxOpen = lightboxOpen && interactive;

  return (
    <>
      <Polaroid
        {...rest}
        image={image}
        alt={alt}
        caption={caption}
        className={cn(
          interactive ? "pointer-events-auto cursor-pointer" : "pointer-events-none",
          className,
        )}
        onClick={(e) => {
          if (!interactive) return;
          onClick?.(e);
          if (e.defaultPrevented) return;
          e.stopPropagation();
          setLightboxOpen(true);
        }}
      />
      <ImageLightbox
        open={isLightboxOpen}
        onClose={() => setLightboxOpen(false)}
        image={image}
        alt={alt}
        caption={caption}
      />
    </>
  );
}
