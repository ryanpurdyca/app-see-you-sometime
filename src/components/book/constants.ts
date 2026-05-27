/**
 * Book layout & motion constants. Centralized so the page-fan animation can
 * be tuned in one place without hunting through components.
 *
 * Geometry assumes the spine lives at the LEFT edge of the book root; the
 * cover and every page hinge on that edge (transform-origin: 0% 50%).
 */

export const NUM_PAGES = 12;

/** Maximum opening angle for the front cover (degrees, negative = swings left). */
export const COVER_OPEN_ANGLE = -174;

/**
 * Maximum total fan spread across all pages, in degrees. The innermost page
 * barely moves; the outermost page ends near (but inside of) the cover.
 */
export const PAGE_FAN_SPREAD = 158;

/**
 * Static scene tilt — gives the book the slight three-quarter perspective
 * shown in the reference images without forcing the user to move their mouse.
 */
export const SCENE_TILT_X_DEG = 8;
export const SCENE_TILT_Z_DEG = -2;

/** Perspective depth applied to the scene container. Smaller = more dramatic. */
export const SCENE_PERSPECTIVE_PX = 2400;

/**
 * Spring tuning for openness → rendered angle. Soft enough that the book
 * doesn't snap; firm enough to feel responsive to mouse moves.
 */
export const OPENNESS_SPRING = {
  stiffness: 90,
  damping: 18,
  mass: 0.6,
} as const;

/** Z-offset between stacked pages (px). Prevents z-fighting when closed. */
export const PAGE_Z_STEP = 0.4;

/**
 * How far from each edge (px) the pointer range starts. Prevents the book
 * from requiring the cursor to reach the very edge of the screen to hit
 * fully-open or fully-closed.
 */
export const POINTER_EDGE_MARGIN_PX = 100;

/**
 * Horizontal offset applied to the book container so the open state (spread
 * evenly around the spine) appears visually centred on screen. Equal to half
 * the book width: when open, the spine is at screen centre; when closed, the
 * cover is shifted to the right of centre by the same amount.
 */
export const OPEN_CENTRE_OFFSET = "calc(var(--book-width) / 2)";
