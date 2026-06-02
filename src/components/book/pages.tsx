import type { ReactNode } from "react";
import { PageSurface, Polaroid } from "@/design-system";
import { PeopleCloud } from "./PeopleCloud";

/**
 * The book's content, authored as a flat list of pages.
 *
 * Each entry is one page-face. The book pairs them into physical sheets:
 * sheet 0 = { front: bookPages[0], back: bookPages[1] }, sheet 1 = { 2, 3 }, …
 * which matches reading order — flipping a sheet reveals its back on the left
 * and the next sheet's front on the right. An odd final page gets a blank back.
 *
 * The book's thickness is derived from this list (see NUM_PAGES in constants.ts),
 * so adding or removing pages here changes how many sheets the book renders.
 *
 * To customize: edit a component below, or add a new one and drop it into
 * `bookPages`. Every page inherits its frame (paper, border, padding) from
 * <PageSurface>; pass `className` to extend or override it.
 */

const caveat = { fontFamily: "var(--font-caveat)" } as const;

function ChapterOpen() {
  return (
    <PageSurface className="pointer-events-none overflow-hidden p-0">
      <PeopleCloud />
    </PageSurface>
  );
}

function PolaroidPreview() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative mx-auto h-[300px] w-[200px]">
        <Polaroid
          className="absolute top-0 left-0 z-10"
          image="/images/people/img-laura.png"
          alt="Laura"
          caption="First week"
          rotation={-2}
          tape={3}
          tapeRotation={1}
        />
        <Polaroid
          className="absolute top-[88px] left-7 z-20"
          image="/images/people/img-jason.jpeg"
          alt="Jason"
          caption="Team lunch"
          rotation={2}
          tape={1}
          tapeRotation={-1}
        />
        <Polaroid
          className="absolute top-[176px] left-1 z-30"
          image="/images/people/img-anna.jpeg"
          alt="Anna"
          caption="All hands"
          rotation={-1}
          tape={5}
          tapeRotation={2}
        />
      </div>
    </PageSurface>
  );
}

function APhoto() {
  return (
    <PageSurface className="items-center justify-center">
      <div className="border-ink/30 text-ink-subtle flex h-40 w-40 items-center justify-center rounded-lg border border-dashed text-xs">
        photo slot
      </div>
    </PageSurface>
  );
}

function AQuote() {
  return (
    <PageSurface className="items-center justify-center text-center">
      <p className="text-ink text-2xl leading-snug font-bold" style={caveat}>
        “A quote that mattered.”
      </p>
    </PageSurface>
  );
}

function PlaceholderPage({ n }: { n: number }) {
  return (
    <PageSurface className="items-center justify-center">
      <span className="text-ink-subtle font-mono text-sm">Page {n}</span>
    </PageSurface>
  );
}

export const bookPages: ReactNode[] = [
  <ChapterOpen key="chapter-open" />,
  <PolaroidPreview key="polaroid-preview" />,
  <APhoto key="a-photo" />,
  <AQuote key="a-quote" />,
  ...Array.from({ length: 8 }, (_, i) => <PlaceholderPage key={`placeholder-${i}`} n={i + 5} />),
];
