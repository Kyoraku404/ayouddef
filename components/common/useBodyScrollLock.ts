"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import { lockBodyScroll } from "@/lib/body-scroll-lock";

export function useBodyScrollLock(active: boolean) {
  const release = useRef<(() => void) | undefined>(undefined);
  const unlock = useCallback(() => { release.current?.(); release.current = undefined; }, []);
  useLayoutEffect(() => {
    if (active) release.current = lockBodyScroll();
    return unlock;
  }, [active, unlock]);
  return unlock;
}
