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
