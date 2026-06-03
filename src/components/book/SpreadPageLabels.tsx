"use client";

import {
  HandwrittenText,
  HANDWRITTEN_LETTER_DURATION_S,
  HANDWRITTEN_LETTER_STAGGER_S,
} from "@/design-system";

/** Delay before the bottom label block begins (after page flip). */
const DEFAULT_HANDWRITING_DELAY_S = 0.35;

const labelClass = "text-ink text-2xl leading-snug";

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

type LabelAlign = "left" | "center" | "right";

const LABEL_ALIGN_CLASS: Record<LabelAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const LABEL_ITEMS_CLASS: Record<LabelAlign, string> = {
  left: "items-start",
  center: "items-center",
  right: "items-end",
};

type LabelBlockProps = {
  lines: readonly string[];
  animate: boolean;
  animationKey: number;
  startDelayS: number;
  align?: LabelAlign;
};

function LabelBlock({
  lines,
  animate,
  animationKey,
  startDelayS,
  align = "center",
}: LabelBlockProps) {
  if (!animate) {
    return (
      <p
        className={`font-bold ${labelClass} ${LABEL_ALIGN_CLASS[align]}`}
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
    <div className={`flex flex-col gap-0 ${LABEL_ITEMS_CLASS[align]} ${LABEL_ALIGN_CLASS[align]}`}>
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

export type SpreadPageLabelsProps = {
  topLines: readonly string[];
  bottomLines: readonly string[];
  animate: boolean;
  animationKey: number;
  handwritingDelayS?: number;
  /** Override the top label region positioning. */
  topRegionClassName?: string;
  /** Override the bottom label region positioning. */
  bottomRegionClassName?: string;
  topBlockAlign?: LabelAlign;
  bottomBlockAlign?: LabelAlign;
};

const DEFAULT_TOP_REGION_CLASS =
  "pointer-events-none absolute top-0 right-2 bottom-[calc(50%-4.5rem)] left-[10.5rem] z-25 flex items-start justify-center pt-1";

const DEFAULT_BOTTOM_REGION_CLASS =
  "pointer-events-none absolute top-[calc(50%+4rem)] right-2 bottom-2 left-[10.5rem] z-15 flex items-center justify-center";

/** Caveat spread labels in two stacked blocks (e.g. beside a polaroid stack). */
export function SpreadPageLabels({
  topLines,
  bottomLines,
  animate,
  animationKey,
  handwritingDelayS = DEFAULT_HANDWRITING_DELAY_S,
  topRegionClassName = DEFAULT_TOP_REGION_CLASS,
  bottomRegionClassName = DEFAULT_BOTTOM_REGION_CLASS,
  topBlockAlign = "center",
  bottomBlockAlign = "center",
}: SpreadPageLabelsProps) {
  const bottomStartDelayS = handwritingDelayS + blockDurationS(topLines);

  return (
    <>
      <div className={topRegionClassName}>
        <LabelBlock
          lines={topLines}
          animate={animate}
          animationKey={animationKey}
          startDelayS={handwritingDelayS}
          align={topBlockAlign}
        />
      </div>
      <div className={bottomRegionClassName}>
        <LabelBlock
          lines={bottomLines}
          animate={animate}
          animationKey={animationKey + 1}
          startDelayS={bottomStartDelayS}
          align={bottomBlockAlign}
        />
      </div>
    </>
  );
}
