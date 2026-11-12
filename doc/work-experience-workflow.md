# Workflow: changing a work experience

The portfolio and the CV must always agree. **Whenever a work experience is added, edited or removed, update the CV too.**

## Checklist
1. `src/data/experience.ts`: add/edit the company (roles from most recent to oldest, dates `dd/mm/yyyy`, `end: null` if current). Put it in the right position (most recent first).
2. `src/data/pt.ts` (`experiences`): same position, same number of `achievements`, `highlights` and `roles` (tests only check `achievements`), in Portuguese. Add `name` only if the Portuguese name differs.
3. If the experience has a strong measurable result, also update `src/data/impact.ts` (+ `impacts` in `pt.ts`, same order) when it deserves a counter.
4. **CV, English:** `src/cv/content/experiences.en.ts`, key = experience `name`. One item in `roles` per role, with up to 3 key `bullets` (best first, with numbers when they exist) and `technologies` (most valuable first). Add `company` if the CV should show a long/legal name.
5. **CV, Portuguese:** `src/cv/content/experiences.pt.ts`, same key as the Portuguese `name`, same order and number of bullets.
6. If it is a new top result, update `mainResults` in `src/cv/content/profile.ts` (EN and PT) and, if the career story changed, the resume paragraphs and objective.
7. Education or certification changes need no CV file: they come from `education.ts` / `certification.ts` (+ `pt.ts`).
8. Verify: `npx tsc --noEmit`, `npm run lint`, `npm test`. Check the PDF visually (see `cv-generation.md`, Tests): 2 pages, no job split, numbers visible.

## Do not
- Do not invent numbers or tools; ask the owner for missing metrics.
- Do not add a technologies line as bullets.
- Do not use `hidden: true` unless the owner asked to keep an experience out of the CV.
