import type { ReactNode } from "react";
import { PageSurface } from "@/design-system";
import { BookPolaroid } from "./BookPolaroid";
import { PeopleCloud } from "./PeopleCloud";
import { NashvilleOffsitePageLabels } from "./NashvilleOffsitePageLabels";
import { PolaroidPageLabels } from "./PolaroidPageLabels";
import { WinterOffsitePageLabels } from "./WinterOffsitePageLabels";

const SPRING_OFFSITE_IMG = "/images/images/2026-spring-offsite";
const WINTER_OFFSITE_IMG = "/images/images/2026-winter-offsite";
const NASHVILLE_OFFSITE_IMG = "/images/images/2025-winter-offsite";

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

/** `bookPages` index for this face (sheet 1 verso) — page 4. */
const WINTER_OFFSITE_PAGE_4_FACE = 3;

function WinterOffsitePage4() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={WINTER_OFFSITE_PAGE_4_FACE}
          className="absolute top-2 right-2 z-30"
          image={`${WINTER_OFFSITE_IMG}/img-2026-06.png`}
          alt="Pizza slices with Parker"
          caption="Pizza slices w/Parker"
          rotation={2}
          tape={1}
          tapeRotation={-1}
        />
        <WinterOffsitePageLabels />
        <BookPolaroid
          bookPageIndex={WINTER_OFFSITE_PAGE_4_FACE}
          className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          image={`${WINTER_OFFSITE_IMG}/img-2026-07.jpg`}
          alt="The brass factory office"
          caption="The brass factory office"
          rotation={-1}
          tape={3}
          tapeRotation={1}
        />
        <BookPolaroid
          bookPageIndex={WINTER_OFFSITE_PAGE_4_FACE}
          className="absolute bottom-2 left-2 z-10"
          image={`${WINTER_OFFSITE_IMG}/img-2026-08.jpg`}
          alt="IPAs with Moshy"
          caption="IPAs with Moshy"
          rotation={-2}
          tape={5}
          tapeRotation={2}
        />
      </div>
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 2 recto) — page 5. */
const WINTER_OFFSITE_PAGE_5_FACE = 4;

function WinterOffsitePage5() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={WINTER_OFFSITE_PAGE_5_FACE}
          className="absolute top-2 left-2 z-30"
          image={`${WINTER_OFFSITE_IMG}/img-2026-09.jpg`}
          alt="Central Park sunset"
          caption="Central Park sunset"
          rotation={-1}
          tape={1}
          tapeRotation={0}
        />
        <BookPolaroid
          bookPageIndex={WINTER_OFFSITE_PAGE_5_FACE}
          className="absolute top-1/2 right-2 z-20 -translate-y-1/2"
          image={`${WINTER_OFFSITE_IMG}/img-2026-10.jpg`}
          alt="Wall Street Bull"
          caption="Wall Street Bull"
          rotation={1}
          tape={3}
          tapeRotation={-2}
        />
        <BookPolaroid
          bookPageIndex={WINTER_OFFSITE_PAGE_5_FACE}
          className="absolute bottom-2 left-2 z-10"
          image={`${WINTER_OFFSITE_IMG}/img-2026-11.jpg`}
          alt={"Evergreen being born"}
          caption={'"Evergreen" being born'}
          rotation={2}
          tape={5}
          tapeRotation={1}
        />
      </div>
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 2 verso) — page 6. */
const NASHVILLE_OFFSITE_PAGE_6_FACE = 5;

function NashvilleOffsitePage6() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_6_FACE}
          className="absolute top-10 right-6 z-20"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2025-01.JPEG`}
          alt="PDE team rooftop photo"
          caption="PDE team rooftop photo"
          rotation={-1}
          tape={2}
          tapeRotation={0}
        />
        <NashvilleOffsitePageLabels />
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_6_FACE}
          className="absolute bottom-10 left-6 z-10"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2026-02.jpg`}
          alt="Team dinner"
          caption="Team dinner"
          rotation={2}
          tape={4}
          tapeRotation={-2}
        />
      </div>
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 3 recto) — page 7. */
const NASHVILLE_OFFSITE_PAGE_7_FACE = 6;

function NashvilleOffsitePage7() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_7_FACE}
          className="absolute top-2 left-2 z-30"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2026-03.jpg`}
          alt="Predators hockey game"
          caption="Predators hockey game"
          rotation={-1}
          tape={1}
          tapeRotation={0}
        />
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_7_FACE}
          className="absolute top-1/2 right-2 z-20 -translate-y-1/2"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2026-04.jpg`}
          alt="Anomia match"
          caption="Anomia match"
          rotation={1}
          tape={3}
          tapeRotation={-2}
        />
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_7_FACE}
          className="absolute bottom-2 left-2 z-10"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2026-05.jpg`}
          alt="Head to head Scrabble"
          caption="Head to head Scrabble"
          rotation={2}
          tape={5}
          tapeRotation={1}
        />
      </div>
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 3 verso) — page 8. */
const NASHVILLE_OFFSITE_PAGE_8_FACE = 7;

function NashvilleOffsitePage8() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_8_FACE}
          className="absolute top-2 left-2 z-30"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2026-06.jpg`}
          alt="Insanely hot chicken"
          caption="Insanely hot chicken"
          rotation={2}
          tape={1}
          tapeRotation={-1}
        />
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_8_FACE}
          className="absolute top-1/2 right-2 z-20 -translate-y-1/2"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2026-07.jpg`}
          alt="Scooter gang"
          caption="Scooter gang"
          rotation={-1}
          tape={3}
          tapeRotation={1}
        />
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_8_FACE}
          className="absolute bottom-2 left-2 z-10"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2026-08.JPEG`}
          alt="Beers and jamming"
          caption="Beers and jamming"
          rotation={1}
          tape={5}
          tapeRotation={0}
        />
      </div>
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 4 recto) — page 9. */
const NASHVILLE_OFFSITE_PAGE_9_FACE = 8;

function NashvilleOffsitePage9() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_9_FACE}
          className="absolute top-1 right-1 z-40"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2026-09.JPEG`}
          alt="Designers designing"
          caption="Designers designing"
          rotation={3}
          tape={2}
          tapeRotation={2}
        />
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_9_FACE}
          className="absolute top-[22%] left-1 z-35"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2026-10.jpg`}
          alt="Broadway bar crawl"
          caption="Broadway bar crawl"
          rotation={-2}
          tape={1}
          tapeRotation={-2}
        />
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_9_FACE}
          className="absolute top-[61%] right-8 z-30 -translate-y-[42%]"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2026-11.jpg`}
          alt="First ever honky tonk"
          caption="First ever honky tonk"
          rotation={2}
          tape={4}
          tapeRotation={1}
        />
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_9_FACE}
          className="absolute bottom-2 left-2 z-25"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2026-12.jpg`}
          alt="Morning after bar crawl"
          caption="Morning after bar crawl"
          rotation={-3}
          tape={6}
          tapeRotation={-1}
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
  <WinterOffsitePage4 key="winter-offsite-page-4" />,
  <WinterOffsitePage5 key="winter-offsite-page-5" />,
  <NashvilleOffsitePage6 key="nashville-offsite-page-6" />,
  <NashvilleOffsitePage7 key="nashville-offsite-page-7" />,
  <NashvilleOffsitePage8 key="nashville-offsite-page-8" />,
  <NashvilleOffsitePage9 key="nashville-offsite-page-9" />,
  ...Array.from({ length: 4 }, (_, i) => <PlaceholderPage key={`placeholder-${i}`} n={i + 10} />),
];
