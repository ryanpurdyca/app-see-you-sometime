"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "../cn";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const SCRIM_TRANSITION = { duration: 0.28, ease: EASE };
const SLIDE_ENTER_PX = 72;
const SLIDE_EXIT_PX = 96;
const IMAGE_TRANSITION = { duration: 0.4, ease: EASE };
const CHROME_FADE_IN = { duration: 0.22, ease: EASE };
const CHROME_FADE_OUT = { duration: 0.12, ease: EASE };

const LETTER_STAGGER_S = 0.048;
/** Letters begin as the chrome row fades in (after the image slide). */
const HANDWRITING_DELAY_S = IMAGE_TRANSITION.duration;

const letterVariants = {
  hidden: { opacity: 0, y: 5, rotate: -10, scale: 0.72 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.14, ease: EASE },
  },
};

function HandwrittenCaption({ text }: { text: string }) {
  return (
    <motion.span
      className="text-cover-ink inline-flex max-w-full min-w-0 truncate text-3xl leading-none font-bold"
      style={{ fontFamily: "var(--font-caveat)" }}
      aria-hidden
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: LETTER_STAGGER_S, delayChildren: HANDWRITING_DELAY_S },
        },
      }}
    >
      {Array.from(text).map((char, i) => (
        <motion.span
          key={`${i}-${char}`}
          className="inline-block origin-bottom-left"
          variants={letterVariants}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </motion.span>
  );
}

const panelVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: IMAGE_TRANSITION.duration,
      staggerDirection: -1,
    },
  },
  exit: {
    transition: { staggerChildren: 0 },
  },
};

const chromeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: CHROME_FADE_IN },
  exit: { opacity: 0, transition: CHROME_FADE_OUT },
};

const imageVariants = {
  hidden: { opacity: 0, y: SLIDE_ENTER_PX },
  visible: { opacity: 1, y: 0, transition: IMAGE_TRANSITION },
  exit: { opacity: 0, y: SLIDE_EXIT_PX, transition: IMAGE_TRANSITION },
};

type Props = {
  open: boolean;
  onClose: () => void;
  image: string;
  alt?: string;
  /** Polaroid caption — Caveat, letter-by-letter handwriting animation. */
  caption?: string;
  className?: string;
};

/**
 * Full-viewport image lightbox — scrim overlay and enlarged photo only.
 * Portaled to `document.body`. Close via Escape, backdrop, or Close control.
 */
export function ImageLightbox({ open, onClose, image, alt = "", caption, className }: Props) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            key="lightbox-backdrop"
            type="button"
            className="bg-ink/75 fixed inset-0 z-[100]"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={SCRIM_TRANSITION}
            onClick={onClose}
          />
          <motion.div
            key="lightbox-panel"
            role="dialog"
            aria-modal="true"
            aria-label={alt || "Photo"}
            className={cn(
              "pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-6",
              className,
            )}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="pointer-events-auto mx-auto flex w-fit max-w-[min(92vw,560px)] flex-col gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                variants={chromeVariants}
                className="flex min-h-9 w-full items-center justify-between gap-4"
              >
                {caption ? (
                  <div key={caption} className="flex min-w-0 flex-1 items-center self-stretch">
                    <HandwrittenCaption text={caption} />
                  </div>
                ) : (
                  <span className="sr-only">{alt || "Photo"}</span>
                )}
                <button
                  type="button"
                  aria-label="Close"
                  className="text-cover-ink/80 hover:text-cover-ink shrink-0 cursor-pointer rounded-sm p-0.5"
                  onClick={onClose}
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="size-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  >
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </motion.div>
              <motion.img
                variants={imageVariants}
                src={image}
                alt={alt}
                className="block h-auto max-h-[min(72vh,520px)] w-auto max-w-[min(88vw,480px)] rounded-md object-contain shadow-[0_8px_32px_var(--color-paper-shadow)]"
                draggable={false}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
