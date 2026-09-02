import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { smoothScrollToId } from "../utils/smoothScroll";

/**
 * Listens to route changes and smoothly scrolls to the element matching
 * the URL hash (#section-id) using our custom requestAnimationFrame scroller.
 * Retries up to 10 times (every 80ms) to handle elements that haven't
 * mounted yet (e.g. navigating from /contact → /#tracks).
 */
export default function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    // No hash — snap to the top of the new page immediately.
    // This prevents the previous page's scroll position from carrying over
    // when navigating to routes like /track/:id or /contact.
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    const id = location.hash.replace("#", "");
    const MAX_ATTEMPTS = 10;
    let attempts = 0;

    const tryScroll = () => {
      const found = smoothScrollToId(id);
      if (!found && attempts < MAX_ATTEMPTS) {
        attempts++;
        setTimeout(tryScroll, 80);
      }
    };

    // Small delay so React finishes rendering the new route's DOM
    const timer = setTimeout(tryScroll, 50);
    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);
}
