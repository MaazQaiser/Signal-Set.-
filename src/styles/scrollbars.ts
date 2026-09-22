const THUMB = '#9A9AA0';
const THUMB_HOVER = '#76767C';

/**
 * Persistent scrollbar for the scrolling form column.
 *
 * macOS uses overlay scrollbars, which stay hidden until the user is already
 * scrolling, so a long form gives no hint that there is more below. Styling
 * `::-webkit-scrollbar` opts the element out of overlay behaviour and keeps the
 * track on the right edge of the form at all times.
 */
export const formScrollbarSx = {
  '&::-webkit-scrollbar': {
    width: '10px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: THUMB,
    borderRadius: '999px',
    // Transparent border + content-box clip insets the thumb from the track.
    border: '3px solid transparent',
    backgroundClip: 'content-box',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: THUMB_HOVER,
  },
  // Firefox has no ::-webkit-scrollbar and needs the standard properties. They
  // cannot be set unconditionally: in Chromium they switch the element to the
  // standard scrollbar, which on macOS is a hidden overlay that ignores the
  // rules above. This query is false wherever ::-webkit-scrollbar exists, so
  // each engine gets exactly one of the two styles.
  '@supports not selector(::-webkit-scrollbar)': {
    scrollbarWidth: 'thin',
    scrollbarColor: `${THUMB} transparent`,
  },
} as const;
