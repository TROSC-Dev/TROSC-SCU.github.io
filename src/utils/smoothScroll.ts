/**
 * Custom smooth scroll implementation using requestAnimationFrame.
 * Does NOT rely on scroll-behavior: smooth or scrollIntoView — fully
 * hand-rolled so it works regardless of browser quirks or React Router.
 */

// 64px (h-16 navbar) + 16px breathing room so section headings aren't
// flush against the navbar bottom edge after scroll.
const NAVBAR_HEIGHT = 80;
const DURATION = 800; // ms — scroll animation duration

/** Cubic ease-in-out: starts slow, speeds up, ends slow */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Smoothly scrolls the window to a target Y position.
 * @param targetY  Absolute Y coordinate to scroll to (in px)
 * @param duration Animation duration in ms (default 800)
 */
export function smoothScrollToY(targetY: number, duration = DURATION): void {
  const startY = window.scrollY;
  const distance = targetY - startY;

  // Nothing to scroll
  if (Math.abs(distance) < 1) return;

  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

/**
 * Finds an element by id and smoothly scrolls to it,
 * accounting for the fixed navbar height.
 * @param id       The element's id (without the #)
 * @param offset   Extra offset from the top (default = navbar height)
 * @returns        true if element was found, false otherwise
 */
export function smoothScrollToId(id: string, offset = NAVBAR_HEIGHT): boolean {
  const element = document.getElementById(id);
  if (!element) return false;

  // getBoundingClientRect gives position relative to viewport;
  // add current scroll to get the absolute document position.
  const absoluteTop = element.getBoundingClientRect().top + window.scrollY;
  smoothScrollToY(absoluteTop - offset);
  return true;
}
