import { Alert } from "react-native";
import type { AlertButton, AlertOptions } from "react-native";

let activeGuard: string | null = null;
let activeOwnerId: string | null = null;
const activeOwners = new Set<string>();

/**
 * Global alert and in-flight guard primitive to prevent stacked alerts and race conditions.
 * Allows owner re-acquisition for clean error alert transitions from the same screen.
 */
export function acquireGuard(key: string, ownerId?: string): boolean {
  if (activeGuard !== null && (ownerId === undefined || activeOwnerId !== ownerId)) {
    return false;
  }
  activeGuard = key;
  activeOwnerId = ownerId ?? null;
  if (ownerId) activeOwners.add(ownerId);
  return true;
}

/**
 * Releases the global guard if no key is provided, or if the current active guard matches the key.
 */
export function releaseGuard(key?: string): void {
  if (key === undefined || activeGuard === key) {
    if (activeOwnerId) activeOwners.delete(activeOwnerId);
    activeGuard = null;
    activeOwnerId = null;
  }
}

/**
 * Releases the global guard if the current active guard is owned by the specified ownerId.
 */
export function releaseGuardsForOwner(ownerId: string): void {
  if (activeOwnerId === ownerId) {
    activeGuard = null;
    activeOwnerId = null;
  }
  activeOwners.delete(ownerId);
}

export function isGuardActive(): boolean {
  return activeGuard !== null;
}

/**
 * Presents an alert guarded by acquireGuard, ensuring that stacked alerts are blocked
 * and the guard is released once and only once across button presses, dismissals, or synchronous failures.
 */
export function showGuardedAlert(
  key: string,
  title: string,
  message?: string,
  buttons?: AlertButton[],
  options?: AlertOptions,
  ownerId?: string
): boolean {
  if (!acquireGuard(key, ownerId)) {
    return false;
  }

  let released = false;
  const safeRelease = () => {
    if (!released) {
      released = true;
      releaseGuard(key);
    }
  };

  const wrappedButtons: AlertButton[] =
    buttons && buttons.length > 0
      ? buttons.map((btn) => ({
          ...btn,
          onPress: (value?: string) => {
            try {
              btn.onPress?.(value);
            } finally {
              safeRelease();
            }
          },
        }))
      : [{ text: "OK", onPress: safeRelease }];

  try {
    Alert.alert(title, message, wrappedButtons, {
      ...options,
      cancelable: options?.cancelable ?? false,
      onDismiss: () => {
        try {
          options?.onDismiss?.();
        } finally {
          safeRelease();
        }
      },
    });
    return true;
  } catch (e) {
    safeRelease();
    console.error("Alert failed:", e);
    return false;
  }
}
