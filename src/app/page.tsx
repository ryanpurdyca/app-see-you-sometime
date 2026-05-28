import { Stage } from "@/design-system";
import { Book } from "@/components/book";
import { LeftPageText } from "@/components/book/LeftPageText";

export default function HomePage() {
  return (
    <Stage>
      {/* LeftPageText must come before Book so it renders behind the 3D scene */}
      <LeftPageText />
      <Book />
      {/* Gutter frame — sits above content, 28px border fills the edge zones */}
      <div
        aria-hidden
        className="border-gutter pointer-events-none absolute inset-0 border-[28px]"
      />
      {/* Decorative rules — above gutter so they run fully edge to edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-7 h-px"
        style={{
          background:
            "repeating-linear-gradient(90deg, var(--color-rule) 0, var(--color-rule) 6px, transparent 6px, transparent 13px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-7 h-px"
        style={{
          background:
            "repeating-linear-gradient(90deg, var(--color-rule) 0, var(--color-rule) 6px, transparent 6px, transparent 13px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-7 w-px"
        style={{
          background:
            "repeating-linear-gradient(180deg, var(--color-rule) 0, var(--color-rule) 6px, transparent 6px, transparent 13px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-7 w-px"
        style={{
          background:
            "repeating-linear-gradient(180deg, var(--color-rule) 0, var(--color-rule) 6px, transparent 6px, transparent 13px)",
        }}
      />
      <span className="text-ink-subtle pointer-events-none absolute right-[52px] bottom-[44px] font-mono text-sm">
        Change Log
      </span>
    </Stage>
  );
}
