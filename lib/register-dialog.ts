// ---------------------------------------------------------------------------
// Shared open-state for the register dialog.
//
// Smallest approach that works: a window event. The dialog itself is mounted
// once, inside the Navbar (which is rendered on every public page), and any
// trigger — the navbar "Join us" button, the AuthGatePopup Register button —
// just calls openRegisterDialog(). No provider, no root-layout change, and
// no prop drilling across components that don't share a parent.
//
// The dialog subscribes in a useEffect and opens on this event.
// ---------------------------------------------------------------------------

export const REGISTER_DIALOG_OPEN_EVENT = 'dan:open-register-dialog'

/** Open the register dialog, wherever it is mounted. Safe to call anywhere. */
export function openRegisterDialog(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(REGISTER_DIALOG_OPEN_EVENT))
}
