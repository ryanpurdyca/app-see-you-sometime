"use client";

import { createContext, useContext, type ReactNode } from "react";

export type BookReadingNav = {
  onRightPagePointer: () => void;
  onRightPageClick: () => void;
  /** True only when sheet 0's front (people cloud) is the active right page. */
  peopleCloudInteractive: boolean;
  /** True on reading page 0 — inside cover (left) closes the book like the Close button. */
  coverPageInteractive: boolean;
  onCoverPagePointer: () => void;
  onCoverPageLeave: () => void;
  onCoverPageClick: () => void;
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
