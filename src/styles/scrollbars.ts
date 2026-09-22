/**
 * Persistent scrollbar for the scrolling form column.
 *
 * macOS uses overlay scrollbars, which stay hidden until the user is already
 * scrolling, so a long form gives no hint that there is more below. Styling
 * `::-webkit-scrollbar` opts the element out of overlay behaviour and keeps the
 * track on the right edge of the form at all times.
 */
export const formScrollbarSx = {
  // NB: no `scrollbar-width` / `scrollbar-color` here. Setting either makes
  // Chromium use the standard scrollbar, which on macOS is an overlay that
  // stays hidden and takes no layout space, and it ignores the rules below.
  '&::-webkit-scrollbar': {
    width: '10px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#9A9AA0',
    borderRadius: '999px',
    // Transparent border + content-box clip insets the thumb from the track.
    border: '3px solid transparent',
    backgroundClip: 'content-box',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#76767C',
  },
} as const;
