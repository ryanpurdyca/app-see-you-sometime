"use client";

import {
  HandwrittenText,
  HANDWRITTEN_LETTER_DURATION_S,
  HANDWRITTEN_LETTER_STAGGER_S,
} from "@/design-system";
import { useBookReadingNav } from "./BookReadingContext";

/** Delay before Autocamp / 2026 Offsite labels begin (after page flip). Lives here to avoid constants → pages import cycle. */
const POLAROID_LABEL_HANDWRITING_DELAY_S = 0.35;

const labelClass = "text-ink text-2xl leading-snug";

const AUTOCAMP_LINES = ["Autocamp", "Catskills"] as const;
const OFFSITE_LINES = ["2026", "Offsite"] as const;

/** Seconds for one line's letters to finish animating. */
function lineDurationS(text: string): number {
  const n = text.length;
  if (n === 0) return 0;
  return (n - 1) * HANDWRITTEN_LETTER_STAGGER_S + HANDWRITTEN_LETTER_DURATION_S;
}

function blockDurationS(lines: readonly string[]): number {
  return lines.reduce((sum, line) => sum + lineDurationS(line), 0);
}

function lineDelaysS(lines: readonly string[], startDelayS: number): number[] {
  const delays: number[] = [];
  let cursor = startDelayS;
  for (const line of lines) {
    delays.push(cursor);
    cursor += lineDurationS(line);
  }
  return delays;
}

const OFFSITE_START_DELAY_S = POLAROID_LABEL_HANDWRITING_DELAY_S + blockDurationS(AUTOCAMP_LINES);

type LabelBlockProps = {
  lines: readonly string[];
  animate: boolean;
  animationKey: number;
  startDelayS: number;
};

function LabelBlock({ lines, animate, animationKey, startDelayS }: LabelBlockProps) {
  if (!animate) {
    return (
      <p
        className={`text-center font-bold ${labelClass}`}
        style={{ fontFamily: "var(--font-caveat)" }}
      >
        {lines.map((line, i) => (
          <span key={line}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </p>
    );
  }

  const delays = lineDelaysS(lines, startDelayS);

  return (
    <div className="flex flex-col items-center gap-0 text-center">
      {lines.map((line, i) => (
        <HandwrittenText
          key={`${animationKey}-${line}`}
          text={line}
          animate
          delayChildren={delays[i]}
          className={labelClass}
        />
      ))}
    </div>
  );
}

/** Autocamp / Catskills + 2026 Offsite labels on the polaroid preview spread (bookPages[1]). */
export function PolaroidPageLabels() {
  const readingNav = useBookReadingNav();
  const animate = readingNav?.polaroidPreviewLabelsAnimate ?? false;
  const animationKey = readingNav?.polaroidPreviewLabelsKey ?? 0;

  return (
    <>
      <div className="pointer-events-none absolute top-2 right-2 bottom-[calc(50%-5.5rem)] left-[10.5rem] z-25 flex items-start justify-center pt-5">
        <LabelBlock
          lines={AUTOCAMP_LINES}
          animate={animate}
          animationKey={animationKey}
          startDelayS={POLAROID_LABEL_HANDWRITING_DELAY_S}
        />
      </div>
      <div className="pointer-events-none absolute top-[calc(50%+4.5rem)] right-2 bottom-2 left-[10.5rem] z-15 flex items-center justify-center">
        <LabelBlock
          lines={OFFSITE_LINES}
          animate={animate}
          animationKey={animationKey + 1}
          startDelayS={OFFSITE_START_DELAY_S}
        />
      </div>
    </>
  );
}
