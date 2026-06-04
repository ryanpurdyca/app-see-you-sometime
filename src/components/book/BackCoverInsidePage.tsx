import { PageSurface } from "@/design-system";

/** Inside of the back cover — used as the verso when the book has an odd page count. */
export function BackCoverInsidePage() {
  return <PageSurface className="bg-surface border-ink pointer-events-none" aria-hidden />;
}
