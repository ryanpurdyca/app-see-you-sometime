/**
 * Text that lives in the area the front cover occupies when fully open.
 * It sits behind the 3D book scene (rendered before <Book /> in DOM order)
 * so the swinging cover gradually conceals it as the book opens.
 *
 * Positioned at `calc(50vw - var(--book-width))` — the left boundary of the
 * open spread — with the same dimensions as the book itself so the cover
 * masks it perfectly at full openness.
 */

import { DESKTOP_BOOK_TOP } from "./constants";

const caveatStyle = { fontFamily: "var(--font-caveat)" } as const;

export function LeftPageText() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute hidden flex-col justify-center overflow-hidden py-8 pr-16 pl-8 md:flex"
      style={{
        left: "calc(50vw - var(--book-width))",
        top: DESKTOP_BOOK_TOP,
        width: "var(--book-width)",
        height: "var(--book-height)",
      }}
    >
      <p
        className="text-ink mb-4 text-left text-[1.75rem] leading-snug font-bold"
        style={caveatStyle}
      >
        Dear friends,
      </p>
      <p
        className="text-ink mb-6 text-left text-[1.75rem] leading-snug font-bold"
        style={caveatStyle}
      >
        Here&apos;s to a great four years of building, shipping, and laughing together. This is bye
        for now, not forever. I&apos;ll see you sometime.
      </p>
      <p className="text-ink text-left text-[1.75rem] leading-snug font-bold" style={caveatStyle}>
        — Ryan
      </p>
    </div>
  );
}
