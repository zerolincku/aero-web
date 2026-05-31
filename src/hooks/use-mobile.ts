import * as React from "react"

const MOBILE_BREAKPOINT = 768

const mobileMediaQuery = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

function getMobileSnapshot() {
  return window.matchMedia(mobileMediaQuery).matches
}

function subscribeToMobileChanges(callback: () => void) {
  const mql = window.matchMedia(mobileMediaQuery)
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

export function useIsMobile() {
  return React.useSyncExternalStore(
    subscribeToMobileChanges,
    getMobileSnapshot,
    () => false,
  )
}
