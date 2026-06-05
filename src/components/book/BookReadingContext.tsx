"use client";

import { createContext, useContext, type ReactNode } from "react";

export type BookReadingNav = {
  /** Left = Back/Close, right = Next — by viewport X vs spine. */
  onPageFaceClick: (clientX: number) => void;
  onRightPagePointer: () => void;
  onRightPageClick: () => void;
  /** True only when sheet 0's front (people cloud) is the active right page. */
  peopleCloudInteractive: boolean;
  /** True on reading page 0 — inside cover (left) closes the book like the Close button. */
  coverPageInteractive: boolean;
  onCoverPagePointer: () => void;
  onCoverPageLeave: () => void;
  onCoverPageClick: () => void;
  /** `bookPages` face index — true only for the left/right page on the current spread. */
  isPolaroidFaceActive: (bookPageIndex: number) => boolean;
  /** True once after advancing to reading page 1 via Next or right-page click (not stepper). */
  polaroidPreviewLabelsAnimate: boolean;
  /** Bumps on each 0 → 1 advance so handwriting can replay. */
  polaroidPreviewLabelsKey: number;
  /** True once after advancing to reading page 2 via Next or right-page click (not stepper). */
  winterOffsiteLabelsAnimate: boolean;
  /** Bumps on each 1 → 2 advance so handwriting can replay. */
  winterOffsiteLabelsKey: number;
  /** True once after advancing to reading page 3 via Next or right-page click (not stepper). */
  nashvilleOffsiteLabelsAnimate: boolean;
  /** Bumps on each 2 → 3 advance so handwriting can replay. */
  nashvilleOffsiteLabelsKey: number;
  /** True once after advancing to reading page 5 via Next or right-page click (not stepper). */
  summerOffsiteLabelsAnimate: boolean;
  /** Bumps on each 4 → 5 advance so handwriting can replay. */
  summerOffsiteLabelsKey: number;
  /** True while any polaroid lightbox on the active spread is open. */
  polaroidLightboxOpen: boolean;
  setPolaroidLightboxOpen: (open: boolean) => void;
};

const BookReadingContext = createContext<BookReadingNav | null>(null);

export function BookReadingProvider({
  value,
  children,
}: {
  value: BookReadingNav;
  children: ReactNode;
}) {
  return <BookReadingContext.Provider value={value}>{children}</BookReadingContext.Provider>;
}

export function useBookReadingNav(): BookReadingNav | null {
  return useContext(BookReadingContext);
}
