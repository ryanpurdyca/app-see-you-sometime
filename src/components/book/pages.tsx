import type { ReactNode } from "react";
import { PageSurface } from "@/design-system";
import { BookPolaroid } from "./BookPolaroid";
import { PeopleCloud } from "./PeopleCloud";
import { PolaroidPageLabels } from "./PolaroidPageLabels";

const SPRING_OFFSITE_IMG = "/images/images/2026-spring-offsite";

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

function ChapterOpen() {
  return (
    <PageSurface className="pointer-events-none overflow-hidden p-0">
      <PeopleCloud />
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 0 verso). */
const POLAROID_PREVIEW_FACE = 1;

function PolaroidPreview() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={POLAROID_PREVIEW_FACE}
          className="absolute top-2 left-2 z-30"
          image={`${SPRING_OFFSITE_IMG}/img-2026-01.jpg`}
          alt="Product redesign and vision"
          caption="Product redesign & vision"
          rotation={-2}
          tape={3}
          tapeRotation={1}
        />
        <PolaroidPageLabels />
        <BookPolaroid
          bookPageIndex={POLAROID_PREVIEW_FACE}
          className="absolute top-1/2 right-2 z-20 -translate-y-1/2"
          image={`${SPRING_OFFSITE_IMG}/img-2026-02.jpg`}
          alt="Celebratory tequila"
          caption="Celebratory tequila"
          rotation={2}
          tape={1}
          tapeRotation={-1}
        />
        <BookPolaroid
          bookPageIndex={POLAROID_PREVIEW_FACE}
          className="absolute bottom-2 left-2 z-10"
          image={`${SPRING_OFFSITE_IMG}/img-2026-03.jpg`}
          alt="One of many great meals"
          caption="One of many great meals"
          rotation={-1}
          tape={5}
          tapeRotation={2}
        />
      </div>
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 1 recto). */
const TWO_POLAROIDS_FACE = 2;

function TwoPolaroids() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={TWO_POLAROIDS_FACE}
          className="absolute top-10 right-6 z-20"
          image={`${SPRING_OFFSITE_IMG}/img-2026-04.jpg`}
          alt="Flip cup tournament"
          caption="Flip cup tournament"
          rotation={-1}
          tape={2}
          tapeRotation={0}
        />
        <BookPolaroid
          bookPageIndex={TWO_POLAROIDS_FACE}
          className="absolute bottom-10 left-6 z-10"
          image={`${SPRING_OFFSITE_IMG}/img-2026-05.jpg`}
          alt="Morning work sessions"
          caption="Morning work sessions"
          rotation={2}
          tape={4}
          tapeRotation={-2}
        />
      </div>
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
  <TwoPolaroids key="two-polaroids" />,
  <PageSurface key="page-4" />,
  ...Array.from({ length: 8 }, (_, i) => <PlaceholderPage key={`placeholder-${i}`} n={i + 5} />),
];
