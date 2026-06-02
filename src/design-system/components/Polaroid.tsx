import type { HTMLAttributes } from "react";
import { cn } from "../cn";

/** Slight tilt in degrees — mimics a casually placed print. */
export type PolaroidRotation = -3 | -2 | -1 | 0 | 1 | 2 | 3;

/** Masking-tape graphic variant (`public/images/tape/tape-N.webp`). */
export type PolaroidTape = 1 | 2 | 3 | 4 | 5 | 6;

/** Tape strip tilt in degrees. */
export type PolaroidTapeRotation = 2 | 1 | 0 | -1 | -2;

const ROTATION_CLASS: Record<PolaroidRotation, string> = {
  [-3]: "-rotate-3",
  [-2]: "-rotate-2",
  [-1]: "-rotate-1",
  0: "",
  1: "rotate-1",
  2: "rotate-2",
  3: "rotate-3",
};

const TAPE_SRC: Record<PolaroidTape, string> = {
  1: "/images/tape/tape-1.webp",
  2: "/images/tape/tape-2.webp",
  3: "/images/tape/tape-3.webp",
  4: "/images/tape/tape-4.webp",
  5: "/images/tape/tape-5.webp",
  6: "/images/tape/tape-6.webp",
};

interface PolaroidProps extends HTMLAttributes<HTMLDivElement> {
  /** Path or URL to the photo. */
  image: string;
  /** Alt text for accessibility. */
  alt?: string;
  /** Optional Caveat-font caption rendered below the photo. */
  caption?: string;
  /** Slight rotation in degrees. Defaults to 0. */
  rotation?: PolaroidRotation;
  /** Masking-tape graphic at the top edge (1–6). */
  tape?: PolaroidTape;
  /** Tape strip rotation in degrees. Defaults to 0. */
  tapeRotation?: PolaroidTapeRotation;
}

/**
 * Polaroid — a photo print with a white border and handwritten caption.
 *
 * Image area is 140×108px. Shadow is intentionally light.
 */
export function Polaroid({
  image,
  alt = "",
  caption,
  rotation = 0,
  tape,
  tapeRotation = 0,
  className,
  style,
  ...rest
}: PolaroidProps) {
  return (
    <div
      {...rest}
      className={cn(
        "group border-rule pointer-events-auto relative inline-flex flex-col rounded-[8px] border bg-white",
        ROTATION_CLASS[rotation],
        className,
      )}
      style={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.07), 0 1px 2px rgba(0, 0, 0, 0.05)",
        ...style,
      }}
    >
      {tape != null && (
        <img
          src={TAPE_SRC[tape]}
          alt=""
          aria-hidden
          draggable={false}
          className="pointer-events-none absolute top-0 left-1/2 z-10 h-auto w-[76px] max-w-none object-contain"
          style={{
            transform: `translate(-50%, -42%) rotate(${tapeRotation}deg)`,
          }}
        />
      )}

      <div className="border-rule relative mx-1.5 mt-1.5 h-[108px] w-[140px] overflow-hidden rounded-[3px] border">
        <img
          src={image}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
          draggable={false}
        />
      </div>

      <div className="flex min-h-6 items-center justify-center px-1.5 pt-0.5 pb-1 text-center">
        {caption && (
          <span
            className="text-ink text-base leading-snug font-bold"
            style={{ fontFamily: "var(--font-caveat)" }}
          >
            {caption}
          </span>
        )}
      </div>
    </div>
  );
}
