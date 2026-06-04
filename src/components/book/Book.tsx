"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cover } from "./Cover";
import { Page } from "./Page";
import { BackCover } from "./BackCover";
import { BackCoverInsidePage } from "./BackCoverInsidePage";
import { BookButtons, type BookMode } from "./BookButtons";
import { CursorFollower } from "./CursorFollower";
import { BookReadingProvider } from "./BookReadingContext";
import { PageSurface } from "@/design-system";
import { bookPages } from "./pages";
import {
  BOOK_HEIGHT_PX,
  BOOK_WIDTH_PX,
  NUM_PAGES,
  OPEN_CENTRE_OFFSET,
  OPENNESS_SPRING,
  SCENE_PERSPECTIVE_PX,
} from "./constants";

/**
 * Interactive 3D book. Pointer X drives `openness` (0 = closed, 1 = open)
 * while in idle mode. In reading mode the book is pinned open and Next/Back
 * flip individual pages via imperative spring animations.
 *
 * The outer div is `absolute inset-0` so that BookButtons — which lives
 * outside the perspective container — can use viewport-relative positioning
 * without being affected by 3D transforms.
 */
export function Book() {
  const openness = useMotionValue(0);
  const smoothOpenness = useSpring(openness, OPENNESS_SPRING);

  const baseTiltX = useTransform(smoothOpenness, [0, 1], [0, 0]);
  const tiltZ = useTransform(smoothOpenness, [0, 1], [0, 0]);
  // Snaps to -12 when entering reading mode to cancel baseTiltX, giving 0° total.
  const readingTiltX = useMotionValue(0);
  const tiltX = useTransform([baseTiltX, readingTiltX], ([b, r]) => (b as number) + (r as number));

  const [mode, setMode] = useState<BookMode>("idle");
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
  const [hoveringBook, setHoveringBook] = useState(false);
  // True while the close sequence is running. Suppresses page peel so the
  // "about-to-flip" page doesn't stay tilted at -25° throughout the close and
  // then snap back to flat once mode finally flips to idle.
  const [isClosing, setIsClosing] = useState(false);
  const [polaroidPreviewLabelsPlay, setPolaroidPreviewLabelsPlay] = useState(false);
  const [polaroidPreviewLabelsKey, setPolaroidPreviewLabelsKey] = useState(0);
  const [winterOffsiteLabelsPlay, setWinterOffsiteLabelsPlay] = useState(false);
  const [winterOffsiteLabelsKey, setWinterOffsiteLabelsKey] = useState(0);
  const [nashvilleOffsiteLabelsPlay, setNashvilleOffsiteLabelsPlay] = useState(false);
  const [nashvilleOffsiteLabelsKey, setNashvilleOffsiteLabelsKey] = useState(0);
  const [summerOffsiteLabelsPlay, setSummerOffsiteLabelsPlay] = useState(false);
  const [summerOffsiteLabelsKey, setSummerOffsiteLabelsKey] = useState(0);
  const [polaroidLightboxOpen, setPolaroidLightboxOpen] = useState(false);

  // Refs mirror state so event handlers registered once always see current values.
  const modeRef = useRef<BookMode>("idle");
  const currentPageRef = useRef(0);

  const setModeSync = (m: BookMode) => {
    modeRef.current = m;
    setMode(m);
  };

  const setCurrentPageSync = (p: number) => {
    currentPageRef.current = p;
    setCurrentPage(p);
  };

  useEffect(() => {
    const setFromClientX = (clientX: number) => {
      if (modeRef.current === "reading") return; // book is pinned open
      const w = window.innerWidth || 1;
      const spineX = w / 2;
      const closeAt = spineX + BOOK_WIDTH_PX - 100;
      const openAt = spineX - BOOK_WIDTH_PX + 100;
      const clamped = Math.max(openAt, Math.min(closeAt, clientX));
      openness.set(1 - (clamped - openAt) / (closeAt - openAt));
    };

    const onPointerMove = (e: PointerEvent) => setFromClientX(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setFromClientX(t.clientX);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [openness]);

  const goToNextPage = useCallback(() => {
    const from = currentPageRef.current;
    const to = Math.min(from + 1, NUM_PAGES);
    if (from === 0 && to === 1) {
      setPolaroidPreviewLabelsPlay(true);
      setPolaroidPreviewLabelsKey((k) => k + 1);
      setWinterOffsiteLabelsPlay(false);
    } else if (from === 1 && to === 2) {
      setPolaroidPreviewLabelsPlay(false);
      setWinterOffsiteLabelsPlay(true);
      setWinterOffsiteLabelsKey((k) => k + 1);
      setNashvilleOffsiteLabelsPlay(false);
    } else if (from === 2 && to === 3) {
      setPolaroidPreviewLabelsPlay(false);
      setWinterOffsiteLabelsPlay(false);
      setNashvilleOffsiteLabelsPlay(true);
      setNashvilleOffsiteLabelsKey((k) => k + 1);
      setSummerOffsiteLabelsPlay(false);
    } else if (from === 4 && to === 5) {
      setPolaroidPreviewLabelsPlay(false);
      setWinterOffsiteLabelsPlay(false);
      setNashvilleOffsiteLabelsPlay(false);
      setSummerOffsiteLabelsPlay(true);
      setSummerOffsiteLabelsKey((k) => k + 1);
    } else {
      setPolaroidPreviewLabelsPlay(false);
      setWinterOffsiteLabelsPlay(false);
      setNashvilleOffsiteLabelsPlay(false);
      setSummerOffsiteLabelsPlay(false);
    }
    setCurrentPageSync(to);
  }, []);

  const goToPrevPage = useCallback(() => {
    setPolaroidPreviewLabelsPlay(false);
    setWinterOffsiteLabelsPlay(false);
    setNashvilleOffsiteLabelsPlay(false);
    setSummerOffsiteLabelsPlay(false);
    setCurrentPageSync(Math.max(currentPageRef.current - 1, 0));
  }, []);

  const handleRead = () => {
    openness.set(1);
    // Directly drive smoothOpenness: useSpring tracking stalls when source jumps from 0.
    animate(smoothOpenness, 1, { type: "spring", stiffness: 400, damping: 40 });
    setCurrentPageSync(0);
    setPolaroidPreviewLabelsPlay(false);
    setWinterOffsiteLabelsPlay(false);
    setNashvilleOffsiteLabelsPlay(false);
    setSummerOffsiteLabelsPlay(false);
    setPolaroidLightboxOpen(false);
    setIsClosing(false);
    setHoveringBook(false);
    setModeSync("reading");
    animate(readingTiltX, 0, { type: "spring", ...OPENNESS_SPRING });
  };

  const handleCancel = () => {
    setModeSync("idle");
    setHoveredSide(null);
    animate(readingTiltX, 0, { type: "spring", ...OPENNESS_SPRING });
  };

  const handleNext = () => {
    goToNextPage();
  };

  const handleBack = () => {
    goToPrevPage();
  };

  const handleClose = () => {
    setIsClosing(true);
    setHoveredSide(null);
    animate(readingTiltX, 0, { type: "spring", ...OPENNESS_SPRING });

    const finishClose = () => {
      setPolaroidPreviewLabelsPlay(false);
      setWinterOffsiteLabelsPlay(false);
      setNashvilleOffsiteLabelsPlay(false);
      setSummerOffsiteLabelsPlay(false);
      setPolaroidLightboxOpen(false);
      setModeSync("idle");
      setIsClosing(false);
    };

    const closeCover = () => {
      openness.set(0);
      // Defer the idle-mode switch until smoothOpenness has fully closed.
      // Switching modes prematurely would make every page snap to its idle
      // (fan) position. Once smoothOpenness reaches 0, idleRotateY for every
      // page is 0, so the subscription that runs after mode=idle does not
      // move anything.
      if (smoothOpenness.get() < 0.01) {
        finishClose();
      } else {
        const unsub = smoothOpenness.on("change", (v) => {
          if (v < 0.01) {
            unsub();
            finishClose();
          }
        });
      }
    };

    // Sequentially flip left-stack pages back to the right stack — most
    // recently flipped first — so each page closes in order. After the last
    // page flip has started, pause briefly, then close the cover last. This
    // avoids the cover sweeping over still-open pages mid-rotation.
    const STEP_MS = 90;
    const COVER_DELAY_MS = 200;

    const flipNext = () => {
      const current = currentPageRef.current;
      if (current === 0) {
        setTimeout(closeCover, COVER_DELAY_MS);
        return;
      }
      setCurrentPageSync(current - 1);
      setTimeout(flipNext, STEP_MS);
    };

    flipNext();
  };

  const handleCloseRef = useRef(handleClose);
  useEffect(() => {
    handleCloseRef.current = handleClose;
  });

  // Keyboard navigation — only active in reading mode.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (modeRef.current !== "reading") return;
      if (e.key === "ArrowRight") {
        goToNextPage();
      } else if (e.key === "ArrowLeft") {
        if (currentPageRef.current === 0) {
          handleClose();
        } else {
          goToPrevPage();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Nav overlays sit behind page content (pointer-events-none faces). Drive peel
  // from pointer position anywhere on the page footprint (bubbles, polaroids, etc.).
  useEffect(() => {
    if (mode !== "reading") return;

    const onPointerMove = (e: PointerEvent) => {
      const top = window.innerHeight / 2 - BOOK_HEIGHT_PX / 2;
      const bottom = top + BOOK_HEIGHT_PX;
      const { clientX, clientY } = e;
      if (clientY < top || clientY > bottom) {
        setHoveredSide(null);
        return;
      }
      const spine = window.innerWidth / 2;
      if (clientX >= spine && clientX < spine + BOOK_WIDTH_PX) {
        setHoveredSide("right");
      } else if (clientX >= spine - BOOK_WIDTH_PX && clientX < spine) {
        setHoveredSide("left");
      } else {
        setHoveredSide(null);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [mode]);

  const readingPage = mode === "reading" ? currentPage : null;

  const readingNav = useMemo(
    () => ({
      onPageFaceClick: (clientX: number) => {
        if (modeRef.current !== "reading") return;
        const spine = window.innerWidth / 2;
        if (clientX < spine) {
          if (currentPageRef.current > 0) {
            goToPrevPage();
          } else {
            handleCloseRef.current();
          }
        } else if (currentPageRef.current < NUM_PAGES) {
          goToNextPage();
        }
      },
      onRightPagePointer: () => setHoveredSide("right"),
      onRightPageClick: () => {
        if (currentPageRef.current < NUM_PAGES) {
          goToNextPage();
        }
      },
      peopleCloudInteractive: mode === "reading" && currentPage === 0,
      coverPageInteractive: mode === "reading" && currentPage === 0,
      onCoverPagePointer: () => setHoveredSide("left"),
      onCoverPageLeave: () => setHoveredSide(null),
      onCoverPageClick: () => handleCloseRef.current(),
      isPolaroidFaceActive: (bookPageIndex: number) => {
        if (mode !== "reading") return false;
        const rightFace = currentPage * 2;
        const leftFace = currentPage > 0 ? currentPage * 2 - 1 : -1;
        return bookPageIndex === rightFace || bookPageIndex === leftFace;
      },
      polaroidPreviewLabelsAnimate:
        mode === "reading" && currentPage === 1 && polaroidPreviewLabelsPlay,
      polaroidPreviewLabelsKey,
      winterOffsiteLabelsAnimate:
        mode === "reading" && currentPage === 2 && winterOffsiteLabelsPlay,
      winterOffsiteLabelsKey,
      nashvilleOffsiteLabelsAnimate:
        mode === "reading" && currentPage === 3 && nashvilleOffsiteLabelsPlay,
      nashvilleOffsiteLabelsKey,
      summerOffsiteLabelsAnimate:
        mode === "reading" && currentPage === 5 && summerOffsiteLabelsPlay,
      summerOffsiteLabelsKey,
      polaroidLightboxOpen,
      setPolaroidLightboxOpen,
    }),
    [
      mode,
      currentPage,
      polaroidPreviewLabelsPlay,
      polaroidPreviewLabelsKey,
      winterOffsiteLabelsPlay,
      winterOffsiteLabelsKey,
      nashvilleOffsiteLabelsPlay,
      nashvilleOffsiteLabelsKey,
      summerOffsiteLabelsPlay,
      summerOffsiteLabelsKey,
      polaroidLightboxOpen,
      goToNextPage,
      goToPrevPage,
    ],
  );

  return (
    <BookReadingProvider value={readingNav}>
      <div data-testid="book-root" className="absolute inset-0">
        {/* Reading-mode nav overlays sit behind the 3D scene so page content can
          re-enable pointer-events on interactive elements (e.g. people bubbles)
          while empty page areas pass through to these regions for peel + click. */}
        {mode === "reading" && (
          <>
            <div
              className="absolute cursor-pointer"
              style={{
                left: "calc(50vw - var(--book-width))",
                top: "calc(50vh - var(--book-height) / 2)",
                width: "var(--book-width)",
                height: "var(--book-height)",
              }}
              onClick={currentPage > 0 ? handleBack : handleClose}
              onMouseEnter={() => setHoveredSide("left")}
              onMouseLeave={() => setHoveredSide(null)}
            />
            <div
              className="absolute cursor-pointer"
              style={{
                left: "50vw",
                top: "calc(50vh - var(--book-height) / 2)",
                width: "var(--book-width)",
                height: "var(--book-height)",
              }}
              onClick={currentPage < NUM_PAGES ? handleNext : undefined}
              onMouseEnter={() => setHoveredSide("right")}
              onMouseLeave={() => setHoveredSide(null)}
            />
          </>
        )}

        {/* 3D scene — centred within the viewport-filling wrapper */}
        <div
          className="flex h-full items-center justify-center"
          style={{
            perspective: `${SCENE_PERSPECTIVE_PX}px`,
            perspectiveOrigin: "50% 45%",
            pointerEvents: "none",
          }}
        >
          <motion.div
            className="relative"
            style={{
              width: "var(--book-width)",
              height: "var(--book-height)",
              left: OPEN_CENTRE_OFFSET,
              transformStyle: "preserve-3d",
              rotateX: tiltX,
              rotateZ: tiltZ,
            }}
          >
            <BackCover openness={smoothOpenness} />
            {Array.from({ length: NUM_PAGES }, (_, i) => {
              const isOddTailSheet = i === NUM_PAGES - 1 && bookPages.length % 2 === 1;
              return (
                <Page
                  key={i}
                  index={i}
                  openness={smoothOpenness}
                  readingPage={readingPage}
                  front={bookPages[i * 2] ?? <PageSurface />}
                  back={
                    bookPages[i * 2 + 1] ??
                    (isOddTailSheet ? <BackCoverInsidePage /> : <PageSurface />)
                  }
                  peeled={
                    !isClosing &&
                    readingPage !== null &&
                    ((i === readingPage - 1 && readingPage > 0) || i === readingPage)
                  }
                  subPeeled={
                    !isClosing && readingPage !== null && i === readingPage + 1 && i < NUM_PAGES
                  }
                  hovered={
                    readingPage !== null &&
                    ((i === readingPage - 1 && readingPage > 0 && hoveredSide === "left") ||
                      (i === readingPage && hoveredSide === "right"))
                  }
                />
              );
            })}
            <Cover
              openness={smoothOpenness}
              closePeelActive={
                mode === "reading" && currentPage === 0 && hoveredSide === "left" && !isClosing
              }
            />
          </motion.div>
        </div>

        {/* Idle-mode click region — clicking anywhere on the book triggers Read */}
        {mode === "idle" && (
          <div
            className="absolute cursor-pointer"
            style={{
              left: "calc(50vw - var(--book-width))",
              top: "calc(50vh - var(--book-height) / 2)",
              width: "calc(var(--book-width) * 2)",
              height: "var(--book-height)",
            }}
            onClick={handleRead}
            onMouseEnter={() => setHoveringBook(true)}
            onMouseLeave={() => setHoveringBook(false)}
          />
        )}

        {/* 2D button overlay — outside the perspective container so it isn't
          affected by 3D transforms. Absolutely positioned using vw/vh so it
          aligns with the open book spread regardless of viewport size. */}
        <BookButtons
          openness={smoothOpenness}
          mode={mode}
          currentPage={currentPage}
          onRead={handleRead}
          onCancel={handleCancel}
          onNext={handleNext}
          onBack={handleBack}
          onClose={handleClose}
        />

        <CursorFollower openness={smoothOpenness} mode={mode} hoveringBook={hoveringBook} />
      </div>
    </BookReadingProvider>
  );
}
