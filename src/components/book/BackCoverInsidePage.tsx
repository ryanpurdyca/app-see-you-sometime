import { PageSurface } from "@/design-system";

/** Display page 21 — last sheet verso when the book has an odd face count. */
export function BackCoverInsidePage() {
  return <PageSurface className="bg-surface border-ink pointer-events-none" aria-hidden />;
}
