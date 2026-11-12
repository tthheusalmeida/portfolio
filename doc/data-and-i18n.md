# Data and i18n

## Where the content lives
All portfolio content is in `src/data/` and is written in **English**. The UI never imports these files directly; it reads them through `useData()` (`src/contexts/LanguageContext.tsx`), which returns the data of the current language.

| File | Content |
|---|---|
| `experience.ts` | Work experiences, one entry per company with its roles |
| `education.ts` | Degrees, with academic activities |
| `certification.ts` | Certifications |
| `impact.ts` | The "Impact in numbers" counters |
| `project.ts` | Projects |
| `stack.ts`, `social-media.ts`, `testimonial.ts` | Current stack, links, testimonials |
| `pt.ts` | Portuguese overrides for the files above |
| `index.ts` | Merges English + Portuguese into `DATA_BY_LANG` |

## Portuguese overrides are aligned by index
`pt.ts` exports arrays with only the translatable fields (title, description, achievements, role names...). `index.ts` merges `pt.experiences[i]` into `experiences[i]`, and the same for roles (`roles[j]`), education activities, projects, etc.
Consequences:
- Add the item in `pt.ts` **at the same position** as in the English file.
- Keep the same number of items, of `achievements` per experience and of education `experiences` (`tests/i18n.test.ts` fails otherwise). `highlights` and `roles` are not checked by tests, but must also have the same length and order or the merge breaks.
- Because the Portuguese entry can override `name`, anything that looks an experience up by name must use the name of the language being rendered (the CV does this, see `cv-generation.md`).

## Experience model (`ExperienceInterface`)
- One entry per **company**: `name`, `logo`, `description`, `achievements`, `highlights`, `roles`, `src`/`alt`.
- `roles` goes from the most recent to the oldest; each role has `role`, `type`, `start`, `end` (`null` = current).
- Entries are ordered from the most recent company to the oldest.
- Dates are strings in `dd/mm/yyyy`; format them with `formatedDateMonthYear` in `src/utils/date.tsx`.

## UI texts
`src/i18n/dictionary.ts` holds the UI strings in `en` and `pt` (same keys in both; typed by `DictionaryKey`). `**text**` renders highlighted text and `\n` a line break (`rich()`).
Do not change existing copy unless asked.
