/*
 * FYRO LOGO — the single source of truth for the mark.
 *
 * Three lockups, because one does not survive every size:
 *   nav     hexagon mark + FYRO wordmark, horizontal. The "AI CONSULTING"
 *           tagline is deliberately absent here — at 24px tall it is mush.
 *   lockup  full stacked mark, wordmark and tagline. Hero and footer only,
 *           where it has the room the tagline needs.
 *   mark    hexagon symbol alone. Favicon, avatars, tight spaces.
 *
 * `theme` picks the INK, not the background: "dark" is the white-ink art for
 * dark grounds (the site default), "light" is near-black ink for light grounds.
 * The orange is identical in both — it is the one colour that never changes.
 *
 * Assets are transparent PNGs cut from the source artwork, so do not render
 * `lockup` much above ~340px until the vector redraw lands.
 */

type Variant = "nav" | "lockup" | "mark";
type Theme = "dark" | "light";

/** Intrinsic ratios of the exported art — used so width never has to be guessed. */
const RATIO: Record<Variant, number> = {
  nav: 1749 / 400,
  lockup: 971 / 693,
  mark: 658 / 426,
};

export default function FyroLogo({
  variant = "nav",
  theme = "dark",
  height = 28,
  className,
}: {
  variant?: Variant;
  theme?: Theme;
  /** Rendered height in px. Width follows from the lockup ratio. */
  height?: number;
  className?: string;
}) {
  const src = `/brand/fyro-${variant}${theme === "light" ? "-light" : ""}.png`;
  return (
    <img
      src={src}
      alt="Fyro"
      width={Math.round(height * RATIO[variant])}
      height={height}
      className={className}
      style={{ height, width: "auto", display: "block" }}
      draggable={false}
    />
  );
}
