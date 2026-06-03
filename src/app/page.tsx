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
      <div className="absolute right-[52px] bottom-[44px] flex items-center gap-5">
        <span className="text-ink-subtle font-mono text-sm">Stay in touch</span>
        <div className="flex items-center gap-2">
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
        </div>
      </div>
    </Stage>
  );
}
