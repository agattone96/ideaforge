# Manual Screen Reader Accessibility Checklist

Use this checklist to manually verify accessibility with screen readers (VoiceOver, NVDA, JAWS, etc.):

- [ ] All interactive elements (buttons, links, inputs) have descriptive accessible names/labels.
- [ ] All images and icons have appropriate `alt` text or `aria-label`.
- [ ] Headings are used in a logical, hierarchical order (h1, h2, h3, ...).
- [ ] Landmarks (main, nav, aside, footer) are present and correctly labeled.
- [ ] Modal dialogs announce themselves and trap focus when open.
- [ ] Error messages are announced to screen readers (use `aria-live`).
- [ ] All form fields have associated labels.
- [ ] Keyboard focus is always visible and logical.
- [ ] No content is hidden from screen readers unless intentionally (`aria-hidden`).
- [ ] Dynamic content updates are announced (use `aria-live` or similar).

Test with at least one screen reader on macOS and one on Windows for best coverage.

# Screen Reader Accessibility Checklist

- [ ] All interactive elements are reachable by keyboard.
- [ ] ARIA roles and labels are present where needed.
- [ ] Dynamic content updates are announced.
- [ ] No keyboard traps.
- [ ] Visual focus indicators are visible.

<!-- TODO: manual fix required – SCREEN_READER_CHECKLIST.md is empty. Add accessibility checklist for e2e tests. -->
