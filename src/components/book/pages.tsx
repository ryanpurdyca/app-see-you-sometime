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
      <div className="relative size-full">
        <Polaroid
          className="absolute top-2 left-2 z-30"
          image="/images/people/img-laura.png"
          alt="Laura"
          caption="First week"
          rotation={-2}
          tape={3}
          tapeRotation={1}
        />
        <div className="pointer-events-none absolute top-2 right-2 bottom-[calc(50%-5.5rem)] left-[10.5rem] z-25 flex items-start justify-center pt-5">
          <p className="text-ink text-center text-xl leading-snug font-bold" style={caveat}>
            Cape
            <br />
            Cod
          </p>
        </div>
        <Polaroid
          className="absolute top-1/2 right-2 z-20 -translate-y-1/2"
          image="/images/people/img-jason.jpeg"
          alt="Jason"
          caption="Team lunch"
          rotation={2}
          tape={1}
          tapeRotation={-1}
        />
        <Polaroid
          className="absolute bottom-2 left-2 z-10"
          image="/images/people/img-anna.jpeg"
          alt="Anna"
          caption="All hands"
          rotation={-1}
          tape={5}
          tapeRotation={2}
        />
        <div className="pointer-events-none absolute top-[calc(50%+4.5rem)] right-2 bottom-2 left-[10.5rem] z-15 flex items-center justify-center">
          <p className="text-ink text-center text-xl leading-snug font-bold" style={caveat}>
            2023
            <br />
            Offsite
          </p>
        </div>
      </div>
    </PageSurface>
  );
}

function TwoPolaroids() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <Polaroid
          className="absolute top-10 right-6 z-20"
          image="/images/people/img-parker.jpeg"
          alt="Parker"
          caption="Ship day"
          rotation={-1}
          tape={2}
          tapeRotation={0}
        />
        <Polaroid
          className="absolute bottom-10 left-6 z-10"
          image="/images/people/img-mimi.jpeg"
          alt="Mimi"
          caption="Late night deploy"
          rotation={2}
          tape={4}
          tapeRotation={-2}
        />
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
  <TwoPolaroids key="two-polaroids" />,
  <AQuote key="a-quote" />,
  ...Array.from({ length: 8 }, (_, i) => <PlaceholderPage key={`placeholder-${i}`} n={i + 5} />),
];
