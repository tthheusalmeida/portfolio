# Components and styling

## Atomic layers (`src/app/components/`)
- `atoms/`: smallest pieces (`Button`, `Title`, `Tag`, `Subtitle`, badges...). `Button` supports `variant`, `size`, `isLoading`.
- `molecules/`: small compositions (`DownloadCvButton`, `Modal`, `Carousel`, `Menu`, `LanguageSwitch`, `Input`...).
- `organisms/`: full sections (`CoverSection`, `ExperiencesSection`, `EducationSection`, `ContactSection`, `Header`, `Footer`, `Toast`...).
- `src/templates/` composes organisms into pages; `src/layouts/` has the shell and providers.

A component that needs texts uses `useLanguage().t("key")` (UI texts) or `useData()` (portfolio content). Client components start with `"use client"`.

## Dialogs (`Modal`)
`molecules/Modal.tsx` (used by the mobile `Menu`) is an accessible modal: `role="dialog"`, `aria-modal`, `aria-label` (its `title`), and the keyboard behavior from `src/hooks/useDialogFocus.ts`: focus moves into it on open, Tab/Shift+Tab stay inside, Escape closes it and focus returns to the element that opened it. Reuse `useDialogFocus` for any new dialog.

## Contact form
`organisms/Form.tsx` validates on the client and sends through `services/sendEmail.ts` (external mail gateway). When the send fails (`success: false` or an exception) it shows `molecules/SendFailureNotice.tsx` (`role="alert"`): the error and a "Send on WhatsApp" link that carries the typed name, e-mail and message (`src/utils/whatsapp.ts`: `withWhatsAppText`, `fillMessageTemplate`; texts `form.whatsapp.*` in the dictionary). The typed values are kept, and the notice disappears on the next attempt. The WhatsApp number comes from the `whatsapp` item of `socialMedia` in `src/data`.

## Notifications
`organisms/Toast.tsx` exports `Toast.success/error/info/loading`; the `<Toaster>` is mounted in `src/layouts/RootShell.tsx`.

## Styling
Tailwind CSS 4 with CSS variables defined in `src/app/globals.css` (`--color-background`, `--color-foreground`, `--action`...). Join classes with `mergeClassNames` from `src/utils/classNames.tsx`. Page font: Poppins (`src/layouts/fonts.ts`).

## The CV button
`DownloadCvButton` (`molecules/DownloadCvButton.tsx`) is rendered in `CoverSection` and in the `Footer` (column "Find me online"). It calls `downloadCv(lang)` from `src/cv/downloadCv.ts`, shows the button loader while the PDF is built and a toast on error.

## Claude Code mascot
`organisms/ClaudeMascot.tsx` (mounted in `layouts/PageLayout.tsx`, so on every page) is a decorative 3D mascot built with Three.js. It sits (80% size, Claude orange) on the author's shoulder on the cover photo, looks at the laptop, turns to the screen and waves. On its first hop it transforms (subtle glow + sparkles) into the theme color (`--action`), then visits "perches" down the page and stays on one until it scrolls away. Clicking it plays a random reaction (flip, spin, dance, squish, wave).
- Perches are marked in the markup and visited in reading order:
  - `data-mascot-shoulder`: cover photo wrappers (anchor point: `SHOULDER` in the component).
  - `data-mascot-perch=""` on the last impact card: the first stop after the shoulder.
  - `data-mascot-perch="title"`: section titles (`Title` `perch` prop, set by `TitleAndSubtitleSection`); it stands on the title text.
  - `"stand-right"`: `Project`, `Certification`, `Testimonial`; only cards in the right-hand column (or full width on mobile).
  - `"hang"`: the timeline year (`TimelineDate`); it hangs by one hand from the bottom edge of the last digit, body diagonal and swinging side to side, and the year turns light (`data-mascot-on:` variant in `TimelineDate`, same color as the card hover). While hanging the mascot's z-index drops to 20 so it stays behind the year (`Timeline` gives the date `z-[35]`) and behind the contact title block (`z-30`).
  - `"press"`: the first education row (postgraduate). The accordion starts closed; the mascot stomps and clicks the row's button to open it.
  - `"hang-end"`: the contact title; it hangs from the "?".
  - `"ground"`: the `<footer>`; at the end of the page it stands at the bottom of the screen waving every few seconds.
- Position: the mascot is rendered into a layer on `<body>` (`usePortal`) and, while it stands on a perch, drawn `absolute` in document coordinates, so the browser scrolls it with the page (no JS writes and no lag while scrolling). Only hops and the ground perch use `position: fixed`. Perch geometry is measured now and then (resize, `ResizeObserver`, every 0.6s); only the current perch is re-measured each frame (sticky cards). Weak devices (<=4 cores or <=4GB) get no antialiasing, pixel ratio 1 and 30fps.
- It hops when its head reaches a line at 25% of the viewport height and the next perch is on screen (`topLine`/`reachLine` in `perch.ts`). Cards that share a DOM column split (projects) declare `data-mascot-order` so the visit follows reading order on mobile.
- `src/mascot/perch.ts`: pure perch/hop logic (`advancePerch`, `firstPerch`, `hopPoint`), covered by `tests/mascot/`.
- `src/mascot/createMascot.ts`: the model (boxes only, no model files): sit, hang/swing, hop squash, click actions, transformation.
- Three.js loads lazily after the page is idle; the box is `aria-hidden` and `pointer-events-none` except the character itself (clicks). With `prefers-reduced-motion` there is no animation loop (it snaps to the perch on scroll, no intro/stomp); without WebGL nothing is shown.
- The subtle statement ("Yes, I use AI in my development, especially Claude Code.") is the `cover.ai` text in `CoverSection`.

## Performance rules
- Animate only `transform` and `opacity` (compositor, no layout). Do not animate `width`, `height`, `top/left` or `box-shadow` on scroll-driven or infinite effects. The timeline fill is a full-height line moved with `scaleY` for this reason.
- Scroll handlers are `passive`, throttled with `requestAnimationFrame`, write only styles that do not trigger layout, and live only while their block is near the screen (`IntersectionObserver`, see `Timeline`).
- Infinite decorative animations (hero light, soft skills carousel) are paused while off screen: put `ref={pauseOffscreen}` (`src/utils/pauseOffscreen.ts`) on the animated block; `globals.css` pauses its animations when it is marked `data-offscreen="true"`.
- Weak devices (`src/utils/devicePower.ts`: <= 4 cores or <= 4 GB) get fewer falling-code layers in `BackgroundBlur` and a lighter mascot renderer.
- The mascot renders only while it is on screen, at full frame rate only while something moves (hop, click action, transformation, hanging swing), 30fps parked (20fps on weak devices). It uses `MeshLambertMaterial`, reuses one `Range` and its per-frame buffers, and measures perch geometry once a second (plus on resize/layout changes).
- Known costly effects left as they are (they change the look; decide before touching): `backdrop-blur` on the header (fixed, re-blurs every scroll frame), on certification cards and toasts (`backdrop-blur-3xl`) and on many cards; the `Balloon` hover that animates `width`; `grid-template-rows` transitions of accordions.
