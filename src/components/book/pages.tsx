import type { ReactNode } from "react";
import { PageSurface } from "@/design-system";
import { BookPolaroid } from "./BookPolaroid";
import { PeopleCloud } from "./PeopleCloud";
import { AutocampOffsitePageLabels } from "./AutocampOffsitePageLabels";
import { LeadershipOffsitePageLabels } from "./LeadershipOffsitePageLabels";
import { NashvilleOffsitePageLabels } from "./NashvilleOffsitePageLabels";
import { NycHolidayOffsitePageLabels } from "./NycHolidayOffsitePageLabels";
import { PolaroidPageLabels } from "./PolaroidPageLabels";
import { SummerOffsitePageLabels } from "./SummerOffsitePageLabels";
import { WinterOffsitePageLabels } from "./WinterOffsitePageLabels";

const SPRING_OFFSITE_IMG = "/images/images/2026-spring-offsite";
const WINTER_OFFSITE_IMG = "/images/images/2026-winter-offsite";
const NASHVILLE_OFFSITE_IMG = "/images/images/2025-winter-offsite";
const SUMMER_OFFSITE_IMG = "/images/images/2024-summer-offsite";
const FALL_2023_OFFSITE_IMG = "/images/images/2023-fall-offsite";
const SPRING_2023_OFFSITE_IMG = "/images/images/2023-spring-offsite";
const WINTER_2022_OFFSITE_IMG = "/images/images/2022-winter-offsite";

/**
 * The book's content, authored as a flat list of pages.
 *
 * Each entry is one page-face. The book pairs them into physical sheets:
 * sheet 0 = { front: bookPages[0], back: bookPages[1] }, sheet 1 = { 2, 3 }, …
 * which matches reading order — flipping a sheet reveals its back on the left
 * and the next sheet's front on the right. An odd final page gets a blank back.
 *
 * Display page numbers: page 1 is the inside front cover (not in this list).
 * `bookPages[i]` is display page `i + 2`. Spread labels are Pages 1–2, 3–4, …
 *
 * The book's thickness is derived from this list (see NUM_PAGES in constants.ts),
 * so adding or removing pages here changes how many sheets the book renders.
 *
 * To customize: edit a component below, or add a new one and drop it into
 * `bookPages`. Every page inherits its frame (paper, border, padding) from
 * <PageSurface>; pass `className` to extend or override it.
 */

/** `bookPages` index 0 — display page 2 (people cloud; page 1 is inside cover). */
function ChapterOpen() {
  return (
    <PageSurface className="pointer-events-none overflow-hidden p-0">
      <PeopleCloud />
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 0 verso) — display page 3. */
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

/** `bookPages` index for this face (sheet 1 recto) — display page 4. */
const TWO_POLAROIDS_FACE = 2;

function TwoPolaroids() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={TWO_POLAROIDS_FACE}
          className="absolute top-2 right-2 z-30"
          image={`${SPRING_OFFSITE_IMG}/img-2026-04.jpg`}
          alt="Flip cup tournament"
          caption="Flip cup tournament"
          rotation={-1}
          tape={2}
          tapeRotation={0}
        />
        <BookPolaroid
          bookPageIndex={TWO_POLAROIDS_FACE}
          className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          image={`${SPRING_OFFSITE_IMG}/img-2026-05.jpg`}
          alt="Morning work sessions"
          caption="Morning work sessions"
          rotation={1}
          tape={3}
          tapeRotation={-1}
        />
        <BookPolaroid
          bookPageIndex={TWO_POLAROIDS_FACE}
          className="absolute bottom-2 left-2 z-10"
          image={`${SPRING_OFFSITE_IMG}/img-2026-06.jpg`}
          alt="Axe throwing"
          caption="Axe throwing"
          rotation={-2}
          tape={5}
          tapeRotation={2}
        />
      </div>
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 1 verso) — display page 5. */
const WINTER_OFFSITE_PAGE_5_FACE = 3;

function WinterOffsitePage5() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={WINTER_OFFSITE_PAGE_5_FACE}
          className="absolute top-2 right-2 z-30"
          image={`${WINTER_OFFSITE_IMG}/img-2026-07.png`}
          alt="Pizza slices with Parker"
          caption="Pizza slices w/Parker"
          rotation={2}
          tape={1}
          tapeRotation={-1}
        />
        <WinterOffsitePageLabels />
        <BookPolaroid
          bookPageIndex={WINTER_OFFSITE_PAGE_5_FACE}
          className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          image={`${WINTER_OFFSITE_IMG}/img-2026-08.jpg`}
          alt="The brass factory office"
          caption="The brass factory office"
          rotation={-1}
          tape={3}
          tapeRotation={1}
        />
        <BookPolaroid
          bookPageIndex={WINTER_OFFSITE_PAGE_5_FACE}
          className="absolute bottom-2 left-2 z-10"
          image={`${WINTER_OFFSITE_IMG}/img-2026-09.jpg`}
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

/** `bookPages` index for this face (sheet 2 recto) — display page 6. */
const WINTER_OFFSITE_PAGE_6_FACE = 4;

function WinterOffsitePage6() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={WINTER_OFFSITE_PAGE_6_FACE}
          className="absolute top-2 left-2 z-30"
          image={`${WINTER_OFFSITE_IMG}/img-2026-10.jpg`}
          alt="Central Park sunset"
          caption="Central Park sunset"
          rotation={-1}
          tape={1}
          tapeRotation={0}
        />
        <BookPolaroid
          bookPageIndex={WINTER_OFFSITE_PAGE_6_FACE}
          className="absolute top-1/2 right-2 z-20 -translate-y-1/2"
          image={`${WINTER_OFFSITE_IMG}/img-2026-11.jpg`}
          alt="Wall Street Bull"
          caption="Wall Street Bull"
          rotation={1}
          tape={3}
          tapeRotation={-2}
        />
        <BookPolaroid
          bookPageIndex={WINTER_OFFSITE_PAGE_6_FACE}
          className="absolute bottom-2 left-2 z-10"
          image={`${WINTER_OFFSITE_IMG}/img-2026-12.jpg`}
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

/** `bookPages` index for this face (sheet 2 verso) — display page 7. */
const NASHVILLE_OFFSITE_PAGE_7_FACE = 5;

function NashvilleOffsitePage7() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_7_FACE}
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
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_7_FACE}
          className="absolute bottom-10 left-6 z-10"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2025-02.jpg`}
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

/** `bookPages` index for this face (sheet 3 recto) — display page 8. */
const NASHVILLE_OFFSITE_PAGE_8_FACE = 6;

function NashvilleOffsitePage8() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_8_FACE}
          className="absolute top-2 left-2 z-30"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2025-03.jpg`}
          alt="Predators hockey game"
          caption="Predators hockey game"
          rotation={-1}
          tape={1}
          tapeRotation={0}
        />
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_8_FACE}
          className="absolute top-1/2 right-2 z-20 -translate-y-1/2"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2025-04.jpg`}
          alt="Anomia match"
          caption="Anomia match"
          rotation={1}
          tape={3}
          tapeRotation={-2}
        />
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_8_FACE}
          className="absolute bottom-2 left-2 z-10"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2025-05.jpg`}
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

/** `bookPages` index for this face (sheet 3 verso) — display page 9. */
const NASHVILLE_OFFSITE_PAGE_9_FACE = 7;

function NashvilleOffsitePage9() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_9_FACE}
          className="absolute top-2 left-2 z-30"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2025-06.jpg`}
          alt="Insanely hot chicken"
          caption="Insanely hot chicken"
          rotation={2}
          tape={1}
          tapeRotation={-1}
        />
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_9_FACE}
          className="absolute top-1/2 right-2 z-20 -translate-y-1/2"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2025-07.jpg`}
          alt="Scooter gang"
          caption="Scooter gang"
          rotation={-1}
          tape={3}
          tapeRotation={1}
        />
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_9_FACE}
          className="absolute bottom-2 left-2 z-10"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2025-08.JPEG`}
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

/** `bookPages` index for this face (sheet 4 recto) — display page 10. */
const NASHVILLE_OFFSITE_PAGE_10_FACE = 8;

function NashvilleOffsitePage10() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_10_FACE}
          className="absolute top-1 right-1 z-40"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2025-09.JPEG`}
          alt="Designers designing"
          caption="Designers designing"
          rotation={3}
          tape={2}
          tapeRotation={2}
        />
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_10_FACE}
          className="absolute top-[22%] left-1 z-35"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2025-10.jpg`}
          alt="Broadway bar crawl"
          caption="Broadway bar crawl"
          rotation={-2}
          tape={1}
          tapeRotation={-2}
        />
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_10_FACE}
          className="absolute top-[61%] right-8 z-30 -translate-y-[42%]"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2025-11.jpg`}
          alt="First ever honky tonk"
          caption="First ever honky tonk"
          rotation={2}
          tape={4}
          tapeRotation={1}
        />
        <BookPolaroid
          bookPageIndex={NASHVILLE_OFFSITE_PAGE_10_FACE}
          className="absolute bottom-2 left-2 z-25"
          image={`${NASHVILLE_OFFSITE_IMG}/img-2025-12.jpg`}
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

/** `bookPages` index for this face (sheet 4 verso) — display page 11. */
const SUMMER_OFFSITE_PAGE_11_FACE = 9;

function SummerOffsitePage11() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={SUMMER_OFFSITE_PAGE_11_FACE}
          className="absolute top-2 left-2 z-30"
          image={`${SUMMER_OFFSITE_IMG}/img-2024-01.jpg`}
          alt="Roadmap session"
          caption="Roadmap session"
          rotation={-1}
          tape={1}
          tapeRotation={0}
        />
        <SummerOffsitePageLabels />
        <BookPolaroid
          bookPageIndex={SUMMER_OFFSITE_PAGE_11_FACE}
          className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          image={`${SUMMER_OFFSITE_IMG}/img-2024-02.jpg`}
          alt="2hr morning walk"
          caption="2hr morning walk"
          rotation={1}
          tape={3}
          tapeRotation={-1}
        />
        <BookPolaroid
          bookPageIndex={SUMMER_OFFSITE_PAGE_11_FACE}
          className="absolute bottom-2 left-2 z-10"
          image={`${SUMMER_OFFSITE_IMG}/img-2024-03.jpg`}
          alt="Padel match"
          caption="Padel match"
          rotation={2}
          tape={5}
          tapeRotation={1}
        />
      </div>
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 5 recto) — display page 12. */
const SUMMER_OFFSITE_PAGE_12_FACE = 10;

function SummerOffsitePage12() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={SUMMER_OFFSITE_PAGE_12_FACE}
          className="absolute top-1 left-1 z-40"
          image={`${SUMMER_OFFSITE_IMG}/img-2024-04.jpg`}
          alt="Post padel beers"
          caption="Post padel beers"
          rotation={3}
          tape={2}
          tapeRotation={2}
        />
        <BookPolaroid
          bookPageIndex={SUMMER_OFFSITE_PAGE_12_FACE}
          className="absolute top-[22%] right-1 z-35"
          image={`${SUMMER_OFFSITE_IMG}/img-2024-05.jpg`}
          alt="Late night sushi"
          caption="Late night sushi"
          rotation={-2}
          tape={1}
          tapeRotation={-2}
        />
        <BookPolaroid
          bookPageIndex={SUMMER_OFFSITE_PAGE_12_FACE}
          className="absolute top-[61%] left-8 z-30 -translate-y-[42%]"
          image={`${SUMMER_OFFSITE_IMG}/img-2024-06.jpg`}
          alt="Two bad dart players"
          caption="Two bad dart players"
          rotation={2}
          tape={4}
          tapeRotation={1}
        />
        <BookPolaroid
          bookPageIndex={SUMMER_OFFSITE_PAGE_12_FACE}
          className="absolute right-2 bottom-2 z-25"
          image={`${SUMMER_OFFSITE_IMG}/img-2024-07.PNG`}
          alt="Early night team photo"
          caption="Early night team photo"
          rotation={-3}
          tape={6}
          tapeRotation={-1}
        />
      </div>
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 5 verso) — display page 13. */
const SUMMER_OFFSITE_PAGE_13_FACE = 11;

function SummerOffsitePage13() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={SUMMER_OFFSITE_PAGE_13_FACE}
          className="absolute top-1 left-1 z-40"
          image={`${SUMMER_OFFSITE_IMG}/img-2024-08.jpg`}
          alt="Late night team photo"
          caption="Late night team photo"
          rotation={-3}
          tape={2}
          tapeRotation={2}
        />
        <BookPolaroid
          bookPageIndex={SUMMER_OFFSITE_PAGE_13_FACE}
          className="absolute top-[22%] right-1 z-35"
          image={`${SUMMER_OFFSITE_IMG}/img-2024-09.jpg`}
          alt="Photo booth pics"
          caption="Photo booth pics"
          rotation={2}
          tape={1}
          tapeRotation={-2}
        />
        <BookPolaroid
          bookPageIndex={SUMMER_OFFSITE_PAGE_13_FACE}
          className="absolute top-[61%] left-8 z-30 -translate-y-[42%]"
          image={`${SUMMER_OFFSITE_IMG}/img-2024-10.jpg`}
          alt="Second dinner of the night"
          caption="Second dinner of the night"
          rotation={-2}
          tape={4}
          tapeRotation={1}
        />
        <BookPolaroid
          bookPageIndex={SUMMER_OFFSITE_PAGE_13_FACE}
          className="absolute right-2 bottom-2 z-25"
          image={`${SUMMER_OFFSITE_IMG}/img-2024-11.jpg`}
          alt="Fancy drinks"
          caption="Fancy drinks"
          rotation={3}
          tape={6}
          tapeRotation={-1}
        />
      </div>
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 6 verso) — display page 14. */
const LEADERSHIP_OFFSITE_PAGE_14_FACE = 12;

function LeadershipOffsitePage14() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={LEADERSHIP_OFFSITE_PAGE_14_FACE}
          className="absolute top-10 right-6 z-20"
          image={`${FALL_2023_OFFSITE_IMG}/img-2023-10.jpeg`}
          alt="Team Photo"
          caption="Team Photo"
          rotation={-1}
          tape={2}
          tapeRotation={0}
        />
        <LeadershipOffsitePageLabels />
        <BookPolaroid
          bookPageIndex={LEADERSHIP_OFFSITE_PAGE_14_FACE}
          className="absolute bottom-10 left-6 z-10"
          image={`${FALL_2023_OFFSITE_IMG}/img-2023-11.jpg`}
          alt="Featherball bar"
          caption="Featherball bar"
          rotation={2}
          tape={4}
          tapeRotation={-2}
        />
      </div>
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 7 recto) — display page 15. */
const LEADERSHIP_OFFSITE_PAGE_15_FACE = 13;

function LeadershipOffsitePage15() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={LEADERSHIP_OFFSITE_PAGE_15_FACE}
          className="absolute top-2 right-2 z-30"
          image={`${FALL_2023_OFFSITE_IMG}/img-2023-12.jpg`}
          alt="Brooklyn Bridge"
          caption="Brooklyn Bridge"
          rotation={-2}
          tape={1}
          tapeRotation={1}
        />
        <BookPolaroid
          bookPageIndex={LEADERSHIP_OFFSITE_PAGE_15_FACE}
          className="absolute top-[42%] left-2 z-20 -translate-y-1/2"
          image={`${FALL_2023_OFFSITE_IMG}/img-2023-13.jpg`}
          alt="First time in Dumbo"
          caption="First time in Dumbo"
          rotation={1}
          tape={5}
          tapeRotation={-1}
        />
        <BookPolaroid
          bookPageIndex={LEADERSHIP_OFFSITE_PAGE_15_FACE}
          className="absolute bottom-2 left-1/2 z-25 -translate-x-1/2"
          image={`${FALL_2023_OFFSITE_IMG}/img-2023-14.jpg`}
          alt="My beloved Essex Pizza"
          caption="My beloved Essex Pizza"
          rotation={-1}
          tape={3}
          tapeRotation={2}
        />
      </div>
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 7 verso) — display page 16. */
const AUTOCAMP_OFFSITE_PAGE_16_FACE = 14;

function AutocampOffsitePage16() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={AUTOCAMP_OFFSITE_PAGE_16_FACE}
          className="absolute top-10 right-6 z-20"
          image={`${SPRING_2023_OFFSITE_IMG}/img-2023-01.jpg`}
          alt="Gorgeous weather"
          caption="Gorgeous weather"
          rotation={-1}
          tape={2}
          tapeRotation={0}
        />
        <AutocampOffsitePageLabels />
        <BookPolaroid
          bookPageIndex={AUTOCAMP_OFFSITE_PAGE_16_FACE}
          className="absolute bottom-10 left-6 z-10"
          image={`${SPRING_2023_OFFSITE_IMG}/img-2023-02.png`}
          alt="PDE team photo"
          caption="PDE team photo"
          rotation={2}
          tape={4}
          tapeRotation={-2}
        />
      </div>
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 8 recto) — display page 17. */
const AUTOCAMP_OFFSITE_PAGE_17_FACE = 15;

function AutocampOffsitePage17() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={AUTOCAMP_OFFSITE_PAGE_17_FACE}
          className="absolute top-1 left-1 z-40"
          image={`${SPRING_2023_OFFSITE_IMG}/img-2023-03.JPG`}
          alt="Team at work"
          caption="Team at work"
          rotation={3}
          tape={2}
          tapeRotation={2}
        />
        <BookPolaroid
          bookPageIndex={AUTOCAMP_OFFSITE_PAGE_17_FACE}
          className="absolute top-[22%] right-1 z-35"
          image={`${SPRING_2023_OFFSITE_IMG}/img-2023-04.jpg`}
          alt="BFFs"
          caption="BFFs"
          rotation={-2}
          tape={1}
          tapeRotation={-2}
        />
        <BookPolaroid
          bookPageIndex={AUTOCAMP_OFFSITE_PAGE_17_FACE}
          className="absolute top-[61%] left-8 z-30 -translate-y-[42%]"
          image={`${SPRING_2023_OFFSITE_IMG}/img-2023-05.jpg`}
          alt="Late night drinks"
          caption="Late night drinks"
          rotation={2}
          tape={4}
          tapeRotation={1}
        />
        <BookPolaroid
          bookPageIndex={AUTOCAMP_OFFSITE_PAGE_17_FACE}
          className="absolute right-2 bottom-2 z-25"
          image={`${SPRING_2023_OFFSITE_IMG}/img-2023-06.jpg`}
          alt="Flip cup origins"
          caption="Flip cup origins"
          rotation={-3}
          tape={6}
          tapeRotation={-1}
        />
      </div>
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 8 verso) — display page 18. */
const AUTOCAMP_OFFSITE_PAGE_18_FACE = 16;

function AutocampOffsitePage18() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={AUTOCAMP_OFFSITE_PAGE_18_FACE}
          className="absolute top-2 right-2 z-30"
          image={`${SPRING_2023_OFFSITE_IMG}/img-2023-07.JPEG`}
          alt="Sums up the relationship"
          caption="Sums up the relationship"
          rotation={2}
          tape={1}
          tapeRotation={-1}
        />
        <BookPolaroid
          bookPageIndex={AUTOCAMP_OFFSITE_PAGE_18_FACE}
          className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          image={`${SPRING_2023_OFFSITE_IMG}/img-2023-08.JPG`}
          alt="Morning gym crew"
          caption="Morning gym crew"
          rotation={-1}
          tape={3}
          tapeRotation={1}
        />
        <BookPolaroid
          bookPageIndex={AUTOCAMP_OFFSITE_PAGE_18_FACE}
          className="absolute bottom-2 left-2 z-10"
          image={`${SPRING_2023_OFFSITE_IMG}/img-2023-09.jpg`}
          alt="Bunch of awesome folks"
          caption="Bunch of awesome folks"
          rotation={-2}
          tape={5}
          tapeRotation={2}
        />
      </div>
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 9 recto) — display page 19. */
const NYC_HOLIDAY_OFFSITE_PAGE_19_FACE = 17;

function NycHolidayOffsitePage19() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={NYC_HOLIDAY_OFFSITE_PAGE_19_FACE}
          className="absolute top-10 right-6 z-20"
          image={`${WINTER_2022_OFFSITE_IMG}/img-2022-01.jpg`}
          alt="Series B era Vitally"
          caption="Series B era Vitally"
          rotation={-1}
          tape={2}
          tapeRotation={0}
        />
        <NycHolidayOffsitePageLabels />
        <BookPolaroid
          bookPageIndex={NYC_HOLIDAY_OFFSITE_PAGE_19_FACE}
          className="absolute bottom-10 left-6 z-10"
          image={`${WINTER_2022_OFFSITE_IMG}/img-2022-02.jpg`}
          alt="122 Rivington St. office"
          caption="122 Rivington St. office"
          rotation={2}
          tape={4}
          tapeRotation={-2}
        />
      </div>
    </PageSurface>
  );
}

/** `bookPages` index for this face (sheet 9 verso) — display page 20. */
const NYC_HOLIDAY_OFFSITE_PAGE_20_FACE = 18;

function NycHolidayOffsitePage20() {
  return (
    <PageSurface className="overflow-hidden p-6">
      <div className="relative size-full">
        <BookPolaroid
          bookPageIndex={NYC_HOLIDAY_OFFSITE_PAGE_20_FACE}
          className="absolute top-2 right-2 z-30"
          image={`${WINTER_2022_OFFSITE_IMG}/img-2022-03.jpg`}
          alt="Post shuffleboard beers"
          caption="Post shuffleboard beers"
          rotation={2}
          tape={1}
          tapeRotation={-1}
        />
        <BookPolaroid
          bookPageIndex={NYC_HOLIDAY_OFFSITE_PAGE_20_FACE}
          className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          image={`${WINTER_2022_OFFSITE_IMG}/img-2022-04.jpg`}
          alt="First NYC pizza ever"
          caption="First NYC pizza ever"
          rotation={-1}
          tape={3}
          tapeRotation={1}
        />
        <BookPolaroid
          bookPageIndex={NYC_HOLIDAY_OFFSITE_PAGE_20_FACE}
          className="absolute bottom-2 left-2 z-10"
          image={`${WINTER_2022_OFFSITE_IMG}/img-2022-05.jpg`}
          alt="OG Vitally swag"
          caption="OG Vitally swag"
          rotation={-2}
          tape={5}
          tapeRotation={2}
        />
      </div>
    </PageSurface>
  );
}

export const bookPages: ReactNode[] = [
  <ChapterOpen key="chapter-open" />,
  <PolaroidPreview key="polaroid-preview" />,
  <TwoPolaroids key="two-polaroids" />,
  <WinterOffsitePage5 key="winter-offsite-page-5" />,
  <WinterOffsitePage6 key="winter-offsite-page-6" />,
  <NashvilleOffsitePage7 key="nashville-offsite-page-7" />,
  <NashvilleOffsitePage8 key="nashville-offsite-page-8" />,
  <NashvilleOffsitePage9 key="nashville-offsite-page-9" />,
  <NashvilleOffsitePage10 key="nashville-offsite-page-10" />,
  <SummerOffsitePage11 key="summer-offsite-page-11" />,
  <SummerOffsitePage12 key="summer-offsite-page-12" />,
  <SummerOffsitePage13 key="summer-offsite-page-13" />,
  <LeadershipOffsitePage14 key="leadership-offsite-page-14" />,
  <LeadershipOffsitePage15 key="leadership-offsite-page-15" />,
  <AutocampOffsitePage16 key="autocamp-offsite-page-16" />,
  <AutocampOffsitePage17 key="autocamp-offsite-page-17" />,
  <AutocampOffsitePage18 key="autocamp-offsite-page-18" />,
  <NycHolidayOffsitePage19 key="nyc-holiday-offsite-page-19" />,
  <NycHolidayOffsitePage20 key="nyc-holiday-offsite-page-20" />,
];
