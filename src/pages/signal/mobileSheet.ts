/**
 * Shared geometry and styling for the Signal mobile bottom sheets.
 *
 * Every popup on the mobile contract screen — select menus, autocomplete
 * listboxes, date pickers and the signee drawer — is pinned to the bottom of
 * the simulated phone frame. Selects, autocompletes and pickers portal to the
 * document body and receive inline positioning from MUI, so they are driven by
 * global CSS with `!important`; the signee drawer renders inside the shell and
 * uses these same values via `sx`.
 */

export const MOBILE_SHELL_WIDTH = 375;
export const MOBILE_SHELL_HEIGHT = 812;
/** Height of the shell's home-indicator strip; sheets stop just above it. */
export const MOBILE_HOME_INDICATOR = 34;

export const MOBILE_SHEET_RADIUS = '16px 16px 0 0';
export const MOBILE_SHEET_SHADOW = '0 -8px 32px rgba(0,0,0,0.22)';
export const MOBILE_SHEET_SCRIM = 'rgba(0, 0, 0, 0.45)';
export const MOBILE_SHEET_MAX_HEIGHT = '48vh';
export const MOBILE_SHEET_TRANSITION = '260ms cubic-bezier(0.32, 0.72, 0, 1)';

/** Distance from the viewport bottom to the bottom edge of a sheet. */
export const MOBILE_SHEET_BOTTOM = `calc((100vh - ${MOBILE_SHELL_HEIGHT}px) / 2 + ${MOBILE_HOME_INDICATOR}px)`;

/** Popups that become sheets: autocomplete listbox, date picker, select menu. */
const SHEET_ROOTS = [
  '.MuiAutocomplete-popper',
  '.MuiPickersPopper-root',
  '.MuiPopover-root > .MuiPopover-paper',
].join(', ');

const SHEET_PAPERS = [
  '.MuiAutocomplete-popper .MuiAutocomplete-paper',
  '.MuiPickersPopper-root .MuiPickersPopper-paper',
  '.MuiPopover-root > .MuiPopover-paper',
].join(', ');

/**
 * Papers nested inside a positioned popper. These fill their popper, unlike the
 * Popover paper, which *is* the positioned element and owns the sheet width.
 */
const NESTED_SHEET_PAPERS = [
  '.MuiAutocomplete-popper .MuiAutocomplete-paper',
  '.MuiPickersPopper-root .MuiPickersPopper-paper',
].join(', ');

/** Id of the shared scrim element rendered by the phone shell. */
export const MOBILE_SHEET_SCRIM_ID = 'mobile-sheet-scrim';

/**
 * Poppers (autocomplete, date picker) have no backdrop of their own, so the
 * shell renders one scrim element that is revealed whenever a popper is in the
 * DOM. A pseudo-element on the popper cannot be used: it would belong to the
 * popup, so clicking it would count as a click inside and defeat click-away.
 */
const SHEET_SCRIM_TRIGGERS = ['.MuiAutocomplete-popper', '.MuiPickersPopper-root']
  .map((selector) => `body:has(${selector}) #${MOBILE_SHEET_SCRIM_ID}`)
  .join(', ');

const SHEET_HANDLES = SHEET_PAPERS.split(', ')
  .map((selector) => `${selector}::before`)
  .join(', ');

export const mobileSheetGlobalStyles = {
  // Animations rather than plain declarations: they have to win against the
  // inline transform/opacity that MUI's own transitions write onto these nodes.
  '@keyframes mobileSheetSlideUp': {
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0)' },
  },
  '@keyframes mobileSheetScrimIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  [SHEET_ROOTS]: {
    position: 'fixed !important',
    top: 'auto !important',
    right: 'auto !important',
    bottom: `${MOBILE_SHEET_BOTTOM} !important`,
    left: `calc(50% - ${MOBILE_SHELL_WIDTH / 2}px) !important`,
    width: `${MOBILE_SHELL_WIDTH}px !important`,
    maxWidth: `${MOBILE_SHELL_WIDTH}px !important`,
    minWidth: '0 !important',
    transformOrigin: 'bottom center !important',
    zIndex: '1400 !important',
    animation: `mobileSheetSlideUp ${MOBILE_SHEET_TRANSITION} both`,
  },
  [NESTED_SHEET_PAPERS]: {
    width: '100% !important',
    maxWidth: '100% !important',
  },
  [SHEET_PAPERS]: {
    margin: '0 !important',
    borderRadius: `${MOBILE_SHEET_RADIUS} !important`,
    maxHeight: `${MOBILE_SHEET_MAX_HEIGHT} !important`,
    boxShadow: `${MOBILE_SHEET_SHADOW} !important`,
    overflow: 'hidden !important',
  },
  // The scrim stops at the sheet's bottom edge so the home-indicator strip
  // stays white instead of reading as a grey band under the sheet.
  '.MuiPopover-root > .MuiBackdrop-root': {
    top: '0 !important',
    left: '0 !important',
    right: '0 !important',
    bottom: `${MOBILE_SHEET_BOTTOM} !important`,
    backgroundColor: `${MOBILE_SHEET_SCRIM} !important`,
    animation: 'mobileSheetScrimIn 260ms ease both',
  },
  [`#${MOBILE_SHEET_SCRIM_ID}`]: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: MOBILE_SHEET_BOTTOM,
    zIndex: 1350,
    backgroundColor: MOBILE_SHEET_SCRIM,
    opacity: 0,
    // Inert so outside clicks reach the document and dismiss the popup.
    pointerEvents: 'none',
    transition: 'opacity 260ms ease',
  },
  [SHEET_SCRIM_TRIGGERS]: {
    opacity: 1,
  },
  [SHEET_HANDLES]: {
    content: '""',
    display: 'block',
    flexShrink: 0,
    width: '40px',
    height: '4px',
    margin: '10px auto 6px',
    borderRadius: '100px',
    backgroundColor: '#D0CFD2',
  },
  '.MuiAutocomplete-popper .MuiAutocomplete-listbox': {
    maxHeight: `calc(${MOBILE_SHEET_MAX_HEIGHT} - 28px) !important`,
    paddingTop: '4px !important',
    paddingBottom: '8px !important',
  },
  '.MuiAutocomplete-popper .MuiAutocomplete-option, .MuiPopover-root .MuiMenuItem-root': {
    minHeight: '48px !important',
    fontSize: '15px !important',
    lineHeight: '22px !important',
    paddingLeft: '20px !important',
    paddingRight: '20px !important',
  },
} as const;
