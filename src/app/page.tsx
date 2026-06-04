import { Stage } from "@/design-system";
import { Book } from "@/components/book";
import { LeftPageText } from "@/components/book/LeftPageText";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/ryan-p-471b82411/",
    label: "LinkedIn",
    icon: "/images/socials/icn-linkedin.svg",
  },
  {
    href: "https://x.com/ryanpurdyca",
    label: "X / Twitter",
    icon: "/images/socials/icn-x-twitter.svg",
  },
  {
    href: "https://github.com/ryanpurdyca",
    label: "GitHub",
    icon: "/images/socials/icn-github.svg",
  },
] as const;

const MOBILE_CHROME_ABOVE_BOOK_TOP = "calc(50vh - var(--book-height) / 2 - 48px)";

function SocialLinks() {
  return (
    <>
      {socialLinks.map(({ href, label, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group relative opacity-80 hover:opacity-100 focus-visible:opacity-100"
        >
          <img src={icon} alt="" width={20} height={20} className="size-5" />
          <span
            role="tooltip"
            className="bg-ink pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-sm px-2 py-1 font-mono text-xs whitespace-nowrap text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            {label}
          </span>
        </a>
      ))}
    </>
  );
}

export default function HomePage() {
  return (
    <Stage>
      {/* LeftPageText must come before Book so it renders behind the 3D scene */}
      <LeftPageText />
      <Book />
      {/* Gutter frame — sits above content, 28px border fills the edge zones */}
      <div
        aria-hidden
        className="border-gutter pointer-events-none absolute inset-0 hidden border-[28px] md:block"
      />
      {/* Decorative rules — above gutter so they run fully edge to edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-7 hidden h-px md:block"
        style={{
          background:
            "repeating-linear-gradient(90deg, var(--color-rule) 0, var(--color-rule) 6px, transparent 6px, transparent 13px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-7 hidden h-px md:block"
        style={{
          background:
            "repeating-linear-gradient(90deg, var(--color-rule) 0, var(--color-rule) 6px, transparent 6px, transparent 13px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-7 hidden w-px md:block"
        style={{
          background:
            "repeating-linear-gradient(180deg, var(--color-rule) 0, var(--color-rule) 6px, transparent 6px, transparent 13px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-7 hidden w-px md:block"
        style={{
          background:
            "repeating-linear-gradient(180deg, var(--color-rule) 0, var(--color-rule) 6px, transparent 6px, transparent 13px)",
        }}
      />
      {/* Mobile: author + socials in one row above the closed-book footprint */}
      <div
        className="absolute left-[calc(50vw-var(--book-width)/2)] flex w-[var(--book-width)] items-center justify-between md:hidden"
        style={{ top: MOBILE_CHROME_ABOVE_BOOK_TOP }}
      >
        <span className="text-ink-subtle font-mono text-sm">Ryan P.</span>
        <div className="flex items-center gap-2">
          <SocialLinks />
        </div>
      </div>
      <span className="text-ink-subtle pointer-events-none absolute bottom-4 left-[calc(50vw-var(--book-width)/2)] hidden font-mono text-sm md:bottom-[44px] md:left-[52px] md:block">
        Ryan P.
      </span>
      <div className="absolute right-[calc(50vw-var(--book-width)/2)] bottom-4 hidden items-center gap-2 md:right-[52px] md:bottom-[44px] md:flex">
        <SocialLinks />
      </div>
    </Stage>
  );
}
