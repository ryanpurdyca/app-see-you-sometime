import type { HTMLAttributes } from "react";
import { cn } from "../cn";

/** Slight tilt in degrees — mimics a casually placed print. */
export type PolaroidRotation = -3 | -2 | -1 | 0 | 1 | 2 | 3;

interface PolaroidProps extends HTMLAttributes<HTMLDivElement> {
  /** Path or URL to the photo. */
  image: string;
  /** Alt text for accessibility. */
  alt?: string;
  /** Optional Caveat-font caption rendered below the photo. */
  caption?: string;
  /** Slight rotation in degrees. Defaults to 0. */
  rotation?: PolaroidRotation;
}

/**
 * Polaroid — a photo print with a white border and handwritten caption.
 *
 * Image area is 160×124px. Shadow is intentionally light.
 */
export function Polaroid({
  image,
  alt = "",
  caption,
  rotation = 0,
  className,
  style,
  ...rest
}: PolaroidProps) {
  return (
    <div
      {...rest}
      className={cn(
        "border-rule relative inline-flex flex-col rounded-[8px] border bg-white",
        className,
      )}
      style={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.07), 0 1px 2px rgba(0, 0, 0, 0.05)",
        transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
        ...style,
      }}
    >
      <div className="border-rule relative mx-2 mt-2 h-[124px] w-[160px] overflow-hidden rounded-[4px] border">
        <img
          src={image}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>

      <div className="flex min-h-6 items-center px-2 pt-0.5 pb-1.5">
        {caption && (
          <span
            className="text-ink text-sm leading-snug"
            style={{ fontFamily: "var(--font-caveat)" }}
          >
            {caption}
          </span>
        )}
      </div>
    </div>
  );
}
