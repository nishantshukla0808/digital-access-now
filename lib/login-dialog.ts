// ---------------------------------------------------------------------------
// Shared open-state for the login dialog.
//
// Same approach as lib/register-dialog.ts: a window event. The dialog
// itself is mounted once, inside the Navbar (which is rendered on every
// public page), and any trigger — the navbar "Sign in" button, the
// AuthGatePopup "Log in" button, the register dialog's "Sign in" link —
// just calls openLoginDialog(). No provider, no root-layout change, and
// no prop drilling across components that don't share a parent.
//
// The dialog subscribes in a useEffect and opens on this event. The
// register dialog works the same way (REGISTER_DIALOG_OPEN_EVENT); the
// two dialogs are independent, so switching between them is close-one
// then dispatch the other's event.
// ---------------------------------------------------------------------------

export const LOGIN_DIALOG_OPEN_EVENT = 'dan:open-login-dialog'

/** Open the login dialog, wherever it is mounted. Safe to call anywhere. */
export function openLoginDialog(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(LOGIN_DIALOG_OPEN_EVENT))
}
