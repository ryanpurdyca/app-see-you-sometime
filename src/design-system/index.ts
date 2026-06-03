/**
 * Public surface of the design system. Components and apps should import
 * primitives from here (e.g. `import { Stage, cn } from "@/design-system"`)
 * rather than reaching into internal files.
 */
export { cn } from "./cn";
export { Stage } from "./components/Stage";
export { HalftoneSquare } from "./components/HalftoneSquare";
export { Button } from "./components/Button";
export { PageSurface } from "./components/PageSurface";
export { Tooltip } from "./components/Tooltip";
export { Popover } from "./components/Popover";
export { Polaroid } from "./components/Polaroid";
export type { PolaroidRotation, PolaroidTape, PolaroidTapeRotation } from "./components/Polaroid";
export { ImageLightbox } from "./components/ImageLightbox";
export {
  HandwrittenText,
  HANDWRITTEN_LETTER_DURATION_S,
  HANDWRITTEN_LETTER_STAGGER_S,
} from "./components/HandwrittenText";
