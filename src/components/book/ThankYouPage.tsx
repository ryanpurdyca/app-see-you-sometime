import { PageSurface } from "@/design-system";

const caveatStyle = { fontFamily: "var(--font-caveat)" } as const;

/** Display page 21 — thank-you copy on the final spread (left). */
export function ThankYouPage() {
  return (
    <PageSurface className="bg-surface border-ink pointer-events-none">
      <p
        className="text-ink flex flex-1 items-center justify-start px-6 text-left text-2xl leading-snug font-bold"
        style={caveatStyle}
      >
        Thank you for taking the time to browse some of my favorite Vitally memories. Please keep in
        touch, and don&apos;t be a stranger.
      </p>
    </PageSurface>
  );
}
