# Overflow Debugger

## How to Use

The overflow debugger automatically runs when the page loads and will:
- Highlight any elements causing horizontal overflow with a **red outline**
- Log details to the browser console

## Manual Debugging

1. Open your browser DevTools (F12 or Cmd+Option+I on Mac)
2. Go to the **Console** tab
3. Type: `debugOverflow()`
4. Press Enter

## What to Look For

The debugger will show you:
- **Tag**: The HTML element type (DIV, SECTION, etc.)
- **Class**: The CSS classes applied
- **Scroll Width**: The actual width of the element
- **Viewport Width**: The width of your screen
- **Overflow By**: How many pixels it's extending beyond the viewport

## Common Culprits

1. **100vw usage** - Should be 100% instead
2. **Negative margins** - Can push elements outside viewport
3. **Absolute positioning** - Elements with `right: -X` or `left: -X`
4. **Canvas/SVG elements** - Need explicit width constraints
5. **Images without max-width** - Should have `max-width: 100%`

## Quick Fixes

Once you identify the problematic element:
- Add `overflow-x: hidden` to its parent
- Change `width: 100vw` to `width: 100%`
- Add `max-width: 100%` to the element
- Ensure parent has `overflow: hidden`
