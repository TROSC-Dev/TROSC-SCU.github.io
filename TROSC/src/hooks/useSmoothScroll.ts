// this file is 100% vibe codded

import { useCallback, useRef } from "react";

type SmoothScrollOptions = {
    offset?: number;
    duration?: number;
};

/**
 * Easing function: easeInOutCubic for a natural feel.
 */
function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * A reusable smooth scroll utility hook.
 * Uses a manual requestAnimationFrame animation so it works
 * regardless of CSS overrides or browser prefers-reduced-motion.
 *
 * @param options.offset - Pixels to offset from the top (e.g. fixed navbar height). Default: 80
 * @param options.duration - Animation duration in ms. Default: 800
 *
 * @returns scrollTo - Scrolls to a given element ID (e.g. "home" or "#home")
 * @returns handleAnchorClick - Click handler for <a href="#section"> links
 */
export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
    const { offset = 80, duration = 800 } = options;
    const animationRef = useRef<number | null>(null);

    /** Scroll to a section by its ID. Accepts "home" or "#home". */
    const scrollTo = useCallback(
        (target: string) => {
            const id = target.startsWith("#") ? target.substring(1) : target;
            const element = document.getElementById(id);

            if (!element) return;

            // Cancel any ongoing animation
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
            }

            const startPosition = window.scrollY;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const targetPosition = elementPosition - offset;
            const distance = targetPosition - startPosition;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeInOutCubic(progress);

                window.scrollTo(0, startPosition + distance * easedProgress);

                if (progress < 1) {
                    animationRef.current = requestAnimationFrame(animate);
                } else {
                    animationRef.current = null;
                }
            };

            animationRef.current = requestAnimationFrame(animate);
        },
        [offset, duration]
    );

    /** Click handler for anchor elements. Prevents default and smooth-scrolls. */
    const handleAnchorClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            const href = e.currentTarget.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                scrollTo(href);
            }
        },
        [scrollTo]
    );

    return { scrollTo, handleAnchorClick };
};
