// ---------------------------------------------------------------------------
// DAN logo — transparent PNG.
//
// https://i.ibb.co/5XDsNhYx/logo-DAN.png (provided 2026-11-12). The PNG has a
// transparent background, so it works directly on light surfaces with no
// tile and no blend-mode trick. The old JPG (logo-DAN.jpg) has the black
// background baked in and must NOT be used on light backgrounds.
// One place to swap the URL if the logo ever changes.
// ---------------------------------------------------------------------------

export const DAN_LOGO_PNG_URL = 'https://i.ibb.co/5XDsNhYx/logo-DAN.png'

export function DanLogo({ className }: { className?: string }) {
  return (
    <img
      src={DAN_LOGO_PNG_URL}
      alt="Digital Access Now"
      className={className ?? 'mx-auto h-12 w-auto object-contain'}
    />
  )
}
