import { router } from "expo-router";
import type { Href } from "expo-router";

let isNavigating = false;
let navToken = 0;

/**
 * Safely navigates back if there is history in the navigation stack,
 * otherwise navigates to the provided fallback route (defaults to /(tabs)).
 * Uses an in-flight guard with monotonic token to prevent double-navigation on Android.
 */
export function goBackOrHome(fallback: Href = "/(tabs)") {
  if (isNavigating) return;
  isNavigating = true;
  const token = ++navToken;

  try {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(fallback);
    }
  } catch (e) {
    console.warn("goBackOrHome failed", e);
    isNavigating = false;
    return;
  }

  const reset = () => {
    if (token === navToken) {
      isNavigating = false;
    }
  };

  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(() => {
      requestAnimationFrame(reset);
    });
  } else {
    setTimeout(reset, 0);
  }
}
