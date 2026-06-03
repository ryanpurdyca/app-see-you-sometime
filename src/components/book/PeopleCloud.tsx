"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn, Popover, Tooltip } from "@/design-system";
import {
  PEOPLE_CLOUD_AREA_FILL,
  PEOPLE_CLOUD_EDGE_PAD_PX,
  PEOPLE_CLOUD_GAP_PX,
  PEOPLE_CLOUD_RELAX_ITERATIONS,
  PEOPLE_CLOUD_SOLVE_ITERATIONS,
  PEOPLE_CLOUD_STABLE_THRESHOLD,
} from "./constants";
import { useBookReadingNav } from "./BookReadingContext";
import { people, type Person } from "./people";

/** Matches Tooltip / Popover fade duration (`--duration-fast`). */
const HOVER_CHROME_FADE_MS = 160;

type HoverChrome = {
  id: string;
  name: string;
  anchor: { x: number; top: number; bottom: number };
};

type SimBubble = Person & {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  r: number;
};

function computeBaseRadius(width: number, height: number, count: number): number {
  return Math.sqrt((PEOPLE_CLOUD_AREA_FILL * width * height) / (count * Math.PI));
}

function clampBubble(b: SimBubble, width: number, height: number) {
  const pad = PEOPLE_CLOUD_EDGE_PAD_PX;
  b.x = Math.max(b.r + pad, Math.min(width - b.r - pad, b.x));
  b.y = Math.max(b.r + pad, Math.min(height - b.r - pad, b.y));
}

function resolvePair(a: SimBubble, b: SimBubble, gap: number): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  let dist = Math.hypot(dx, dy);
  const minDist = a.r + b.r + gap;
  if (dist < 1e-4) {
    dist = 1e-4;
  }
  if (dist >= minDist) return 0;

  const overlap = minDist - dist;
  const nx = dx / dist;
  const ny = dy / dist;

  const half = overlap / 2;
  const ax = a.x;
  const ay = a.y;
  const bx = b.x;
  const by = b.y;
  a.x -= nx * half;
  a.y -= ny * half;
  b.x += nx * half;
  b.y += ny * half;
  return Math.max(Math.abs(a.x - ax), Math.abs(a.y - ay), Math.abs(b.x - bx), Math.abs(b.y - by));
}

function relaxPass(bubbles: SimBubble[], width: number, height: number): number {
  let maxMove = 0;
  for (let iter = 0; iter < PEOPLE_CLOUD_RELAX_ITERATIONS; iter++) {
    for (let i = 0; i < bubbles.length; i++) {
      for (let j = i + 1; j < bubbles.length; j++) {
        maxMove = Math.max(maxMove, resolvePair(bubbles[i], bubbles[j], PEOPLE_CLOUD_GAP_PX));
      }
    }
    for (const b of bubbles) {
      const prevX = b.x;
      const prevY = b.y;
      clampBubble(b, width, height);
      maxMove = Math.max(maxMove, Math.abs(b.x - prevX), Math.abs(b.y - prevY));
    }
  }
  return maxMove;
}

function solveLayout(bubbles: SimBubble[], width: number, height: number): void {
  for (let pass = 0; pass < PEOPLE_CLOUD_SOLVE_ITERATIONS; pass++) {
    const moved = relaxPass(bubbles, width, height);
    if (moved < PEOPLE_CLOUD_STABLE_THRESHOLD) break;
  }
}

function seedHomeLayout(width: number, height: number, baseR: number): SimBubble[] {
  const n = people.length;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const maxDist = Math.min(width, height) * 0.38;

  const bubbles: SimBubble[] = people.map((p, i) => {
    const t = n > 1 ? i / (n - 1) : 0;
    const angle = i * golden;
    const dist = Math.sqrt(t) * maxDist;
    const x = width / 2 + Math.cos(angle) * dist;
    const y = height / 2 + Math.sin(angle) * dist;
    return {
      ...p,
      x,
      y,
      homeX: x,
      homeY: y,
      r: baseR,
    };
  });

  solveLayout(bubbles, width, height);

  for (const b of bubbles) {
    b.homeX = b.x;
    b.homeY = b.y;
  }

  return bubbles;
}

/** 3D-tilted circles project as ellipses; use the painted AABB as an ellipse hit target. */
function pointerInEllipse(clientX: number, clientY: number, box: DOMRect, scale = 1): boolean {
  const rx = (box.width / 2) * scale;
  const ry = (box.height / 2) * scale;
  if (rx < 1 || ry < 1) return false;
  const cx = box.left + box.width / 2;
  const cy = box.top + box.height / 2;
  const dx = clientX - cx;
  const dy = clientY - cy;
  return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
}

function pointerInCloud(clientX: number, clientY: number, container: HTMLElement): boolean {
  const box = container.getBoundingClientRect();
  return clientX >= box.left && clientX <= box.right && clientY >= box.top && clientY <= box.bottom;
}

/** Closest bubble under the pointer (screen-space ellipse), with sticky hover during peel/animation. */
function hitTestBubble(
  clientX: number,
  clientY: number,
  bubbleRefs: Map<string, HTMLDivElement>,
  stickyId: string | null,
): { id: string } | null {
  let best: { id: string; dist: number } | null = null;
  for (const [id, el] of bubbleRefs) {
    const box = el.getBoundingClientRect();
    if (!pointerInEllipse(clientX, clientY, box, 1.02)) continue;
    const cx = box.left + box.width / 2;
    const cy = box.top + box.height / 2;
    const dist = Math.hypot(clientX - cx, clientY - cy);
    if (!best || dist < best.dist) {
      best = { id, dist };
    }
  }
  if (best) return { id: best.id };

  if (stickyId) {
    const el = bubbleRefs.get(stickyId);
    if (el && pointerInEllipse(clientX, clientY, el.getBoundingClientRect(), 1.12)) {
      return { id: stickyId };
    }
  }
  return null;
}

export function PeopleCloud() {
  const readingNav = useBookReadingNav();
  const interactive = readingNav?.peopleCloudInteractive ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const layoutSizeRef = useRef({ width: 0, height: 0 });
  const hoveredIdRef = useRef<string | null>(null);
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [homeBubbles, setHomeBubbles] = useState<SimBubble[]>([]);
  const [baseR, setBaseR] = useState(0);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoverAnchor, setHoverAnchor] = useState<{
    x: number;
    top: number;
    bottom: number;
  } | null>(null);
  const [hoverChrome, setHoverChrome] = useState<HoverChrome | null>(null);

  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);

  const activeHoveredId = interactive ? hoveredId : null;

  const clearDismissTimer = useCallback(() => {
    if (dismissTimerRef.current !== null) {
      clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }
  }, []);

  const scheduleChromeDismiss = useCallback(() => {
    clearDismissTimer();
    dismissTimerRef.current = setTimeout(() => {
      setHoverChrome(null);
      dismissTimerRef.current = null;
    }, HOVER_CHROME_FADE_MS);
  }, [clearDismissTimer]);

  const mountHoverChrome = useCallback(
    (id: string, anchor: HoverChrome["anchor"]) => {
      const person = homeBubbles.find((b) => b.id === id);
      if (!person) return;
      clearDismissTimer();
      setHoverChrome((prev) => {
        if (prev?.id === id) return prev;
        return { id, name: person.name, anchor };
      });
    },
    [homeBubbles, clearDismissTimer],
  );

  const chromeAnchor = hoverAnchor ?? hoverChrome?.anchor ?? null;
  const chromeVisible = activeHoveredId !== null;

  const initLayout = useCallback((width: number, height: number) => {
    const r = computeBaseRadius(width, height, people.length);
    const home = seedHomeLayout(width, height, r);
    setHomeBubbles(home);
    setBaseR(r);
    setSize({ width, height });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const width = Math.round(el.clientWidth);
      const height = Math.round(el.clientHeight);
      if (width <= 0 || height <= 0) return;

      const prev = layoutSizeRef.current;
      const dw = Math.abs(width - prev.width);
      const dh = Math.abs(height - prev.height);
      if (prev.width > 0 && dw < 12 && dh < 12) return;
      if (hoveredIdRef.current) return;

      layoutSizeRef.current = { width, height };
      initLayout(width, height);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [initLayout]);

  const setBubbleRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) bubbleRefs.current.set(id, el);
    else bubbleRefs.current.delete(id);
  }, []);

  const updateHoverFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const hit = hitTestBubble(clientX, clientY, bubbleRefs.current, hoveredIdRef.current);
      const nextId = hit?.id ?? null;
      setHoveredId((prev) => {
        if (prev === nextId) return prev;
        if (nextId && prev === null) readingNav?.onRightPagePointer();
        return nextId;
      });
      if (!nextId) {
        setHoverAnchor(null);
        scheduleChromeDismiss();
      } else {
        clearDismissTimer();
      }
    },
    [readingNav, scheduleChromeDismiss, clearDismissTimer],
  );

  useEffect(() => {
    if (!interactive) return;

    const onPointerMove = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el || !pointerInCloud(e.clientX, e.clientY, el)) {
        if (hoveredIdRef.current) {
          setHoveredId(null);
          setHoverAnchor(null);
          scheduleChromeDismiss();
        }
        return;
      }
      updateHoverFromPointer(e.clientX, e.clientY);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      clearDismissTimer();
      setHoverChrome(null);
    };
  }, [interactive, updateHoverFromPointer, scheduleChromeDismiss, clearDismissTimer]);

  useEffect(() => {
    if (!activeHoveredId) return;

    let rafId = 0;
    let active = true;

    const updateHoverChrome = () => {
      if (!active) return;
      const el = bubbleRefs.current.get(activeHoveredId);
      if (el) {
        const box = el.getBoundingClientRect();
        const anchor = {
          x: box.left + box.width / 2,
          top: box.top,
          bottom: box.bottom,
        };
        setHoverAnchor(anchor);
        mountHoverChrome(activeHoveredId, anchor);
      }
      rafId = requestAnimationFrame(updateHoverChrome);
    };

    updateHoverChrome();
    return () => {
      active = false;
      cancelAnimationFrame(rafId);
    };
  }, [activeHoveredId, mountHoverChrome]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0",
        interactive ? "pointer-events-auto" : "pointer-events-none",
      )}
      data-testid="people-cloud"
      onClick={
        interactive
          ? (e) => {
              const hit = hitTestBubble(
                e.clientX,
                e.clientY,
                bubbleRefs.current,
                hoveredIdRef.current,
              );
              if (hit) readingNav?.onRightPageClick();
            }
          : undefined
      }
    >
      {size.width > 0 &&
        baseR > 0 &&
        homeBubbles.map((b, index) => {
          const d = baseR * 2;
          return (
            <div
              key={b.id}
              ref={(el) => setBubbleRef(b.id, el)}
              data-people-bubble
              className="pointer-events-none absolute overflow-hidden rounded-full"
              style={{
                left: b.homeX - baseR,
                top: b.homeY - baseR,
                width: d,
                height: d,
                zIndex: index + 1,
              }}
            >
              <Image
                src={b.src}
                alt={b.name}
                fill
                sizes={`${Math.ceil(d)}px`}
                className="pointer-events-none object-cover"
                draggable={false}
              />
            </div>
          );
        })}

      {interactive &&
        hoverChrome &&
        chromeAnchor &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <Tooltip
              label={hoverChrome.name}
              x={chromeAnchor.x}
              y={chromeAnchor.top}
              position="fixed"
              gapPx={12}
              visible={chromeVisible}
            />
            <Popover
              x={chromeAnchor.x}
              anchorBottom={chromeAnchor.bottom}
              position="fixed"
              gapPx={8}
              visible={chromeVisible}
              className="max-w-[200px] leading-snug"
            >
              A few words about what made working together memorable. Still figuring out the exact
              copy here.
            </Popover>
          </>,
          document.body,
        )}
    </div>
  );
}
